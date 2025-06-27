import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { chatReducer} from "./ChatReducer";
import { AppState} from '../types';


const initialState: AppState={
    currentUser: null,
    currentChannel: null,
    messages:[],
    unsentMessage:'',
}

export const ChatContext = createContext<{state: AppState; dispatch: Dispatch<any>}>({
    state: initialState,
    dispatch: () => null,
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = ()=>{
    const context = useContext(ChatContext);
    return context;

}