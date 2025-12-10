import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
// Assuming PersonData is in "../../Components/Data/Data"
import PersonData from "../../Components/Data/Data";
import {
  IoChatbubbles,
  IoCall,
  IoSettingsSharp,
  IoDuplicateOutline,
} from "react-icons/io5";
import Calls from "../../Components/Data/Calls";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SideCalls from "../../Components/Sidebar/SideCalls";
import Setting from "../../Components/Sidebar/Setting";
import SideContact from "../../Components/Sidebar/SideContact";
import PersonalData from "../../Components/Data/Personal";
import ContactData from "../../Components/Data/Contact";
import SkeletonLoader from "../../Components/Loader/SkeletonLoader";
import Search from "../../Components/Search/Search";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  MoveLeft,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import defaultimg from "../../Assets/login.png";
import ChatDetails from "../../Components/ChatBox/ChatDetails";
import noprofile from "../../Assets/noprofile.png";
import Host from "../../Host/Host";
import LoaderItem from "../../Components/Loading/LoaderItem";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const {
    userDetail,
    getAccountDetails,
    allConnected,
    getAllConnected,
    socket,
    onlineUsers,
    callHistory,
    getCallHistory,
  } = useContext(NoteContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/welcome");
    } else {
      getAccountDetails();
      getAllConnected();
      getCallHistory();
      setTimeout(() => setLoading(false), 2000);
    }
  }, [navigate]);

  // console.log(allConnected,"allConnected")
  // ✅ Listen for incoming messages in real-time
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (data) => {
      console.log("📨 Message received in chat list:", data);
      getAllConnected(); // 🔁 refresh chat list with latest message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  // Filter users based on search text
  const filteredUsers =
    allConnected?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // console.log(filteredUsers, "filteredUsers");
  // Active users only
  // const activeUsers = Users.filter((user) => user.active);

  // Format last message time
  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }
  };

  // console.log(allConnected,"allConnected")
  // console.log(filteredUsers, "filteredUsers");

  const sData = [
    {
      id: 1,
      title: "Chat",
      data: [], // Will be populated by onlineUsers
    },
    {
      id: 2,
      title: "Calls",
      data: Calls,
    },
    {
      id: 3,
      title: "Setting",
      data: "setting",
    },
    {
      id: 4,
      title: "Profile",
      data: "profile",
    },
    {
      id: 5,
      title: "Contact",
      data: "Contact",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(sData[0].id);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleIconClick = (id) => {
    // console.log(id,"id")
    setSelectedTab(id);
    setSelectedPerson(null);
  };

  const [hideItems, setHideItems] = useState(false);
  const handleChatItemClick = (user) => {
    setSelectedPerson(user);
    setHideItems(true);
    console.log(`Opening chat with ${user.name} (${user._id})`);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 500);
  // }, [selectedTab, onlineUsers]);

  const getProfilePic = (profilePic, currentUserId) => {
    if (!profilePic) return noprofile; // fallback

    if (profilePic.isHidden === false && profilePic.url) {
      return profilePic.url;
    }

    // if hidden but allowed for this user
    if (
      profilePic.isHidden === true &&
      profilePic.allowedUsers?.includes(currentUserId)
    ) {
      return profilePic.url;
    }

    // otherwise show default hidden image
    return noprofile;
  };

  // console.log(userDetail, "userDetail");
  const imageUrl = getProfilePic(userDetail?.profilePic, noprofile);
  // const [callHistory, setHistory] = useState([]);

  // useEffect(() => {
  //   fetch(`${Host}/api/call/all`, {
  //     headers: { "auth-token": localStorage.getItem("token") },
  //   })
  //     .then((res) => res.json())
  //     .then(setHistory);
  // }, []);

  console.log(callHistory, "callHistory");

  return (
    <div className="home">
      <div className="home-main">
        <div
          className={`home-sidebar ${hideItems === false ? "hideitems" : ""}`}
        >
          <div className="sidebar-left">
            <div className="side-left-top">
              <IoChatbubbles
                onClick={() => handleIconClick(1)}
                className={selectedTab === 1 ? "active-icon" : ""}
              />
              <IoCall
                onClick={() => handleIconClick(2)}
                className={selectedTab === 2 ? "active-icon" : ""}
              />
            </div>
            <div className="side-left-bottom">
              <IoSettingsSharp
                onClick={() => handleIconClick(3)}
                className={selectedTab === 3 ? "active-icon" : ""}
              />
              <div
                className="side-bottom-profile"
                onClick={() => handleIconClick(4)}
              >
                <UserRound className={selectedTab === 4 ? "active-icon" : ""} />
                {/* <img
                  src={
                    imageUrl ||
                    "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                  }
                  alt=""
                  className={selectedTab === 4 ? "active-icon" : ""}
                /> */}
              </div>
              <div
                className="side-bottom-phbook"
                onClick={() => handleIconClick(5)}
              >
                <IoDuplicateOutline
                  className={selectedTab === 5 ? "active-icon" : ""}
                />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar-heading">
              <div className="sidebar-logo">
                <LoaderItem />
              </div>
              <h1>{sData.find((item) => item.id === selectedTab)?.title}</h1>
            </div>
            <div className="sidebar-search">
              <Search search={search} setSearch={setSearch} />
            </div>
            <div className="sidebar-chatlist">
              {loading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {selectedTab === 1 &&
                    filteredUsers.map((user) => (
                      <Sidebar
                        key={user._id}
                        item={user}
                        handleChatItemClick={handleChatItemClick}
                        formatTime={formatTime}
                      />
                    ))}
                  {selectedTab === 2 &&
                    callHistory.map((item) => (
                      <SideCalls
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                        userDetail={userDetail}
                        formatTime={formatTime}
                      />
                    ))}
                  {selectedTab === 3 &&
                    PersonalData.map((item) => (
                      <Setting
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                      />
                    ))}
                  {selectedTab === 4 &&
                    PersonalData.map((item) => (
                      <Setting
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                      />
                    ))}
                  {selectedTab === 5 &&
                    ContactData.map((item) => (
                      <SideContact
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                      />
                    ))}
                  {selectedTab !== 1 &&
                    selectedTab === 1 &&
                    PersonData &&
                    PersonData.map((item) => (
                      <Sidebar
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                        formatTime={formatTime}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`home-chatbox ${hideItems === true ? "hideitems" : ""}`}
        >
          {selectedPerson ? (
            <>
              <ChatDetails
                person={selectedPerson}
                setHideItems={setHideItems}
                socket={socket}
                formatTime={formatTime}
              />
            </>
          ) : (
            <div className="chatbox-main">
              <h2>{sData.find((item) => item.id === selectedTab)?.title}</h2>
              <p>Select a user to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
