import React, { useState } from 'react'
import "./Home.css"
import ChatBox from '../Components/ChatBox/ChatBox'
import PersonData from '../Components/Data/Data';
import Loader from '../Components/Loader/Loader';

const Home = () => {

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [loading, setLoading] = useState(true)

    const handleChatItemClick = (person) => {
        setSelectedPerson(person);
        setLoading(true);
        // Implement logic to open the chat of the selected person
        console.log(`Opening chat of ${person.name}`);
    };

    return (
        <div className='home'>
            <div className="home-main">
                <div className="home-sidebar">
                    <div className='sidebar'>
                        <div className="sidebar-heading">
                            <h1>Chats</h1>
                        </div>
                        <div className="sidebar-chatlist">
                            {PersonData.map((item) => (
                                <div className="chatlist-item"
                                    key={item.id}
                                    onClick={() => handleChatItemClick(item)}
                                >
                                    <div className="chatlist-item-image">
                                        <img src={item.profile_picture} alt="" />
                                    </div>
                                    <div className="chatlist-item-detail">
                                        <h4>{item.name}</h4>
                                        <p>{item.messages.map((items) => (items.text))} </p>
                                        <span>today</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="home-chatbox">

                    {selectedPerson ? (
                        <>
                        {/* {loading && <Loader />} */}
                    <ChatBox person={selectedPerson} />
                        </>
                    
                    ) : (
                        <>
                            <div className='chatbox-main'>
                                <h2>Chat</h2>
                                <p>Send and receive messages without keeping your phone online.</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
