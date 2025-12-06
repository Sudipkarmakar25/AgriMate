import { Loader } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message';
import { robot, send } from '../assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatBox = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promt, setPromt] = useState('');
  const [mode, setMode] = useState('text');
  const containerRef = useRef(null);
  // console.log(promt);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const promptCopy = promt;
      setPromt("");
      setMessages(prev => [...prev, { role: 'user', content: promptCopy, timestamp: Date.now(), isImage: false }])
      const response = await axios.post(`http://localhost:3693/api/v1/message/${mode}`, { chatId: selectedChat._id, prompt: promptCopy }, { withCredentials: true });
      if (response.data.success) {
        setMessages(prev => [...prev, response.data.reply]);
      }
      else {
        toast.error(response.data.message);
        setPromt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPromt("");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat?.messages ?? []);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  })
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      <div ref={containerRef} className='shadow-lg border p-3 border-gray-300 flex-1 mb-5 overflow-y-scroll'>
        {
          messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-primary select-none">

              {/* Robot Icon with Glow */}
              <div className="relative">
                <img src={robot} className="w-20 h-20 drop-shadow-[0_0_20px_rgba(16,185,129,0.7)] animate-bounce" alt="" />

                {/* Glow Ring */}
                <div className="absolute inset-0 w-full h-full rounded-full blur-xl bg-green-400/30 animate-pulse"></div>
              </div>

              {/* Heading */}
              <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-green-700 text-transparent bg-clip-text">
                I am your Smart Assistant.
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-3xl text-center text-green-700/90 mt-2 tracking-wide">
                Ask me anything ✨
              </p>
            </div>

          )
        }
        {
          messages.map((message, index) => <Message key={index} message={message} />)
        }
        {
          loading && <Loader className='w-8 h-8 text-green-500 animate-spin' />
        }
      </div>
      <form onSubmit={handleSubmit} className=' shadow-lg border border-gray-400 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center' action="">
        <select onChange={(e) => setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
        <input onChange={(e) => setPromt(e.target.value)} value={promt} type="text" placeholder='Start your conversation here...' className='flex-1 w-full text-sm outline-none' required />
        <button disabled={loading} className='border border-green-700 rounded-full'><img src={send} className='w-10 h-10' alt="" /></button>
      </form>
    </div>
  )
}

export default ChatBox
