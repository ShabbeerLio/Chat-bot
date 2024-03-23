import React, { useState } from 'react'
import "./Home.css"
import ChatBox from '../Components/ChatBox/ChatBox'
import PersonData from '../Components/Data/Data';

const Home = () => {

    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleChatItemClick = (person) => {
        setSelectedPerson(person);
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
                                        <h5>{item.name}</h5>
                                        <p>{item.messages.map((items) => (items.text))} </p>
                                        <span>today</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="home-chatbox">
                    {selectedPerson ? (<ChatBox person={selectedPerson} />
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
