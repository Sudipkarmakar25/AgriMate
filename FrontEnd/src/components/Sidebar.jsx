import axios from 'axios';
import {MenuIcon, Search, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import moment from 'moment'

const Sidebar = ({chats,setChats, setSelectedChat,}) => {
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const getAllChats = async () => {
        try {
            const response = await axios.get("http://localhost:3693/api/v1/chat/get", { withCredentials: true });
            if (response.data.success) {
                setChats(response.data.chats);
                return response.data.chats;
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllChats();
    }, [])
    const createNewChat=async () => {
        try {
            const response = await axios.get("http://localhost:3693/api/v1/chat/create", { withCredentials: true });
            if (response.data.success) {
                const updatedChats=await getAllChats();
                // setSelectedChat(updatedChats.at(-1));
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const deleteChat=async (e,chatId) => {
        try {
            e.stopPropagation();
            const response = await axios.post("http://localhost:3693/api/v1/chat/delete",{chatId},{ withCredentials: true });
            getAllChats();
            if (response.data.success) {
                // setChats(prev=> prev.filter(chat => chat._id !== chatId))
                await getAllChats();
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            {
                !isMenuOpen && <MenuIcon className='absolute ml-3 mt-3 w-8 h-8 cursor-pointer md:hidden' onClick={() => setIsMenuOpen(true)} />
            }
            {isMenuOpen && <div className='shadow-lg flex flex-col h-screen min-w-72 p-5 border-r border-[#80609F]/30 
    backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1'>
                <button onClick={()=>createNewChat()} className='shadow-lg flex mt-4 justify-center items-center w-full
      py-2 text-white bg-green-500 text-md rounded-md cursor-pointer'>
                    <span className='mr-2 text-xl mb-1'>+</span> New Chat
                </button>
                <div className='shadow-lg flex items-center gap-3 p-3 mt-4 border border-gray-400 rounded-md'>
                    <Search className='w-6' />
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Conversations' className='
        text-md placeholder:gray-400 outline-none'/>
                </div>
                {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
                <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
                    {
                        chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase()))
                            .map((chat) => (
                                <div onClick={()=>setSelectedChat(chat)}key={chat._id} className='shadow-lg p-2 px-4 border border-gray-300 rounded-md cursor-pointer flex justify-between group'>
                                    <div>
                                        <p className='truncate w-full'>
                                            {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 24) : chat.name}
                                        </p>
                                        <p className='text-xs text-gray-500'>
                                            {
                                                moment(chat.updatedAt).fromNow()
                                            }
                                        </p>
                                    </div>
                                    <Trash onClick={(e)=>deleteChat(e,chat._id)} className='hidden group-hover:block text-red-600 w-4 ml-2 cursor-pointer' />
                                </div>
                            ))
                    }
                </div>
                <X className='absolute top-1 right-2 w-5  text-black h-5 cursor-pointer md:hidden' onClick={() => setIsMenuOpen(false)} />
            </div>}
        </>

    )
}

export default Sidebar
