import { useMutation } from '@apollo/client';
import React from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid'
import { POST_MESSAGE } from '../graphql/mutations';
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useChatContext } from '../context/ChatContext';
import ErrorDisplay from './ErrorToast';

const MessageInput: React.FC = () => {
    const { state, dispatch } = useChatContext();
    const [text, setText] = useLocalStorage('unsentMessage', '');
    const [postMessage, { loading, error }] = useMutation(POST_MESSAGE);

    const handleSendMessage = async () => {
        if (!text.trim() || !state.currentUser || !state.currentChannel) {
            return;
        }
        const newMessage = {messageId: "newKey", text, userId: state.currentUser.name, channelId: state.currentChannel.id, status: "pending"}
        try {
            dispatch({type: 'ADD_NEW_MESSAGE', payload: newMessage})
            const response = await postMessage({
                variables: {
                    channelId: state.currentChannel.id,
                    text: text,
                    userId: state.currentUser.name,
                },
            });
            if (response.data.postMessage) {
                dispatch({type: 'ADD_SENT_MESSAGE', payload: {...response.data.postMessage, status: 'sent'}})
            }else{
                dispatch({type: 'ADD_NEW_MESSAGE', payload: {...newMessage,status: 'error'}})
                dispatch({ type: 'SET_UNSENT_MESSAGE', payload: text });
            }
            setText('');
        } catch (e) {
            console.log("Failed to send message:", e);
            dispatch({type: 'ADD_NEW_MESSAGE', payload: {...newMessage, status: "error"}})
            dispatch({ type: 'SET_UNSENT_MESSAGE', payload: text });
        }
    };
    const isDisabled = loading || !state.currentChannel || !text.trim();

    return (
        <div className="mx-4 my-2">
            <div className='flex gap-2 justify-between items-center w-full'>
            <textarea
                className="w-full p-2 border rounded flex-1"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!state.currentChannel}
            />
            <button
                onClick={handleSendMessage}
                disabled={isDisabled}
                className={`${isDisabled? " cursor-not-allowed ": "cursor-pointer"} w-full flex gap-1 justify-center items-center max-w-[150px] mt-2 p-2 bg-cyan-500 text-white rounded disabled:bg-gray-400`}
            >
                {loading ? 'Sending...' : 'Send Message'} <PaperAirplaneIcon className='h-4 w-4 -rotate-45 '/>
            </button>
            </div>
            {error && <ErrorDisplay errorMessage={'Failed to send message. Your message is saved.'}/>}
        </div>
    );
};

export default MessageInput;