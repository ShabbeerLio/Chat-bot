import React, { useState, useEffect } from "react";
import "./Home.css"
import ChatBox from "../../Components/ChatBox/ChatBox";
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

const Home = () => {
  const sData = [
    {
      id: 1,
      title: "Chat",
      data: PersonData,
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

  const [selectedTab, setSelectedTab] = useState(sData[0].id); // Default to first tab
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleIconClick = (id) => {
    setSelectedTab(id);
    setSelectedPerson(null); // Reset selected person when changing tabs
  };

  const handleChatItemClick = (person) => {
    setSelectedPerson(person);
    console.log(`Opening chat of ${person.name}`);
  };
  useEffect(() => {
    setLoading(true);
    // Simulate loading time for data
    setTimeout(() => setLoading(false), 1000);
  }, [selectedTab]);

  return (
    <div className="home">
      <div className="home-main">
        <div className="home-sidebar">
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
                <img
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                  className={selectedTab === 4 ? "active-icon" : ""}
                />
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
              <h1>{sData.find((item) => item.id === selectedTab)?.title}</h1>
            </div>
            <div className="sidebar-search">
              <Search/>
            </div>
            <div className="sidebar-chatlist">
              {loading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {selectedTab === 1 &&
                    PersonData.map((item) => (
                      <Sidebar
                        item={item}
                        handleChatItemClick={handleChatItemClick}
                      />
                    ))}
                  {selectedTab === 2 &&
                    Calls.map((item) => (
                      <SideCalls
                        item={item}
                        handleChatItemClick={handleChatItemClick}
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
                </>
              )}
            </div>
          </div>
        </div>
        <div className="home-chatbox">
          {selectedPerson ? (
            <>
              <ChatBox person={selectedPerson} />
            </>
          ) : (
            <div className="chatbox-main">
              <h2>{sData.find((item) => item.id === selectedTab)?.title}</h2>
              <p>
                Send and receive messages without keeping your phone online.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
