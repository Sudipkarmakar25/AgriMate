import { Bot } from 'lucide-react'
import React from 'react'
import {useNavigate } from 'react-router-dom'

const ChatBotButton = () => {
    const navigate=useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate("/chatbot")}
                className="
    fixed                   /* stays in place while scrolling */
    bottom-6 right-6        /* bottom-right corner */
    bg-green-600 
    hover:bg-green-700 
    text-white 
    w-14 h-14 
    rounded-full 
    shadow-xl 
    flex items-center justify-center
    transition-all 
    duration-300
    z-50                    /* stays above all elements */
  "
            >
                <Bot className="w-7 h-7" />
            </button>

        </div>
    )
}

export default ChatBotButton
