import React from 'react';
import { Message as MessageType } from '../types';
import { useChatContext } from '../context/ChatContext';
import { CheckCircleIcon, XCircleIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/16/solid';
import { getTimeFromDateTime } from '../utils/utils';

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
    const { state } = useChatContext()
    const isCurrentUser = message.userId === state.currentUser?.name;

    return (
        <div className={`flex items-start my-2 gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            <div className="box-border rounded-full mr-3 flex items-center justify-center flex-col">
                <img src={`/images/${message.userId}.png`} alt={message.userId} className={`w-10 h-10 text-xs mt-1 block text-gray-500`}/>
                <span>{message.userId}</span>
            </div>
            <p className= {`text-sm p-2 rounded-lg bg-white`}>{message.text}</p>
            <span className={`text-xs mt-1 text-gray-500`}>
                {getTimeFromDateTime(message.datetime)} 
                {isCurrentUser ?
                <>
                    {message.status === 'pending'&& <EllipsisHorizontalCircleIcon className='h-4 w-4 text-gray-500'/>}
                    {message.status === 'sent'&& <CheckCircleIcon className='h-4 w-4 text-green-500'/>}
                    {message.status === 'error'&& <XCircleIcon className='h-4 w-4 text-red-500'/>}
                </> 
                : null}
            </span>
        </div>
    );
};

export default Message;