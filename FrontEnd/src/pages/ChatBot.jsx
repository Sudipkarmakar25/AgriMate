
import { useEffect, useState } from "react";
import { Navbar } from "../components";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";


const ChatBot = () => {
    const [chats,setChats]=useState([]);
    const [selectedChat,setSelectedChat]=useState(null);
    return (
        <>
            <div>
                <Navbar />
                <div className='flex h-screen w-screen'>
                    <Sidebar key={"sidebar"} chats={chats} setChats={setChats} setSelectedChat={setSelectedChat} />
                    <ChatBox selectedChat={selectedChat}/>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
