import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import Message from './Message';
import { useChatContext } from '../context/ChatContext';
import ErrorDisplay from './ErrorToast';
import { Message as MessageType } from '../types';
import { useFetchLatestMessages } from '../hooks/useFetchLatestMessages';
import { useFetchMoreMessages } from '../hooks/useFetchMoreMessages';
import Loader from './Loader';


const ChatWindow: React.FC = () => {
    const { state, dispatch } = useChatContext();
    const scrollBottomRef = useRef<HTMLDivElement>(null);
    const scrollTopRef = useRef<HTMLDivElement>(null);
    const [isOld, setIsOld] = useState<boolean | null>(null);
    const scrollDir = useRef<boolean>(false)

    const {
        latestMessages,
        loadingLatest,
        errorLatest
    } = useFetchLatestMessages(state.currentChannel);

    const {
        moreMessages,
        loadingMore,
        errorMore,
        fetchMoreMessages
    } = useFetchMoreMessages();

    const isLoading = useMemo(() => loadingLatest || loadingMore, [loadingLatest, loadingMore]);
    const isError = useMemo(() => errorLatest || errorMore, [errorLatest, errorMore]);

    useEffect(() => {
        if (latestMessages.length > 0) {
            dispatch({ type: 'SET_MESSAGES', payload: latestMessages });
            setTimeout(()=>{
                scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            },200)
        }
    }, [latestMessages, dispatch]);

    useEffect(() => {
        if (moreMessages.length > 0) {
            dispatch({ type: 'ADD_MESSAGES', payload: { messages: moreMessages, old: isOld } });
            scrollTopRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [moreMessages, dispatch, isOld]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!scrollDir.current){
                scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
            scrollDir.current = false;
        }, 200);

        return () => clearTimeout(timer);
    }, [state.messages]);

    const handleReadMore = useCallback((old: boolean) => {
        if (state.messages.length === 0 || !state.currentChannel) {
            return;
        }

        const refMessageId = old
            ? state.messages[0].messageId
            : state.messages[state.messages.length - 1].messageId;

        fetchMoreMessages({
            variables: {
                channelId: state.currentChannel.id,
                messageId: refMessageId,
                old: old
            }
        });
        setIsOld(old);
        scrollDir.current = old;
    }, [state.messages, state.currentChannel, fetchMoreMessages]);

    return (
        <div className="flex flex-col h-full relative">
            <h2 className="text-xl font-bold mb-4 border-b p-4 border-gray-300">
                {state.currentChannel?.name || 'Select a '} Channel
            </h2>

            {loadingLatest ?
            <Loader isLoading={loadingLatest}/>
            :
            <div className="flex-grow overflow-y-auto flex p-4 min-h-[64vh] max-h-[64vh]">
                <div className='flex flex-col w-full'>
                    <div ref={scrollTopRef} className='top-ref'></div>
                    {state.messages.length > 0 && (
                        <button
                            onClick={() => handleReadMore(true)}
                            disabled={isLoading}
                            className="p-1 absolute top-16 flex items-center justify-center max-w-[150px] bg-cyan-500 text-white rounded disabled:bg-gray-400"
                        >
                            {isLoading ? 'Loading...' : 'Read More'}
                            <ArrowUpIcon className="h-4 w-4" />
                        </button>
                    )}
                    {loadingMore && isOld && <Loader isLoading={loadingMore}/>}
                    {state.messages.map((msg: MessageType) => (
                        <Message key={msg.messageId} message={msg} />
                    ))}
                    {state.messages.length > 0 && (
                        <button
                            onClick={() => handleReadMore(false)}
                            disabled={isLoading}
                            className="p-1 absolute bottom-2 flex items-center justify-center max-w-[150px] bg-cyan-500 text-white rounded disabled:bg-gray-400"
                        >
                            {isLoading ? 'Loading...' : 'Read More'}
                            <ArrowDownIcon className="h-4 w-4" />
                        </button>
                    )}
                    <div ref={scrollBottomRef} className='bottom-ref'></div>
                </div>
            </div>
            }
            {isError && <ErrorDisplay errorMessage={'Error fetching messages.'} />}
        </div>
    );
};

export default ChatWindow;