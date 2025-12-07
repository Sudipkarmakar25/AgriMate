import React from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import { bot, user } from '../assets'
const Message = ({ message }) => {
  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50  border border-[#649f60]/30 rounded-md max-w-2xl'>
            <p>{message.content}</p>
            <span className='text-xs text-gray-400'>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={user} alt="" className='h-8 w-8 ' />
        </div>
      ) : (
        <div className='flex items-start justify-start my-4 gap-2'>
          <img src={bot} alt="" className='w-8 h-8 mt-3'/>
          <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl border border-[#649f60]/30 rounded-md my-4'>
            {
              message.isImage ? (
                <img src={message.content} alt="" className='w-full max-w-md mt-2 rounded-md' />
              ) : (
                <div className='text-sm reset-tw'><Markdown>{message.content}</Markdown>
                </div>
              )
            }
            <span className='text-xs text-gray-400'>{moment(message.timestamp).fromNow()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
