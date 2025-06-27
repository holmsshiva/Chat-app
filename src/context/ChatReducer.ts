import { AppState, Action } from '../types';

export const chatReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_CHANNEL':
            return { ...state, currentChannel: action.payload, messages: action.payload.messages};
        case 'SET_MESSAGES':
            return { ...state, messages:[ ...action.payload ].reverse()};
        case 'ADD_MESSAGES':
            const MoreMessagesFetched = [...action.payload.messages].reverse()
            return { ...state, messages: action.payload.old ? [...MoreMessagesFetched, ...state.messages] : [...state.messages, ...MoreMessagesFetched] };
        case 'ADD_SENT_MESSAGE':
            const filteredMessages = state.messages.filter(msg=> msg.messageId !== "newKey")
            return { ...state, messages: [...filteredMessages, {...action.payload}] };
        case 'ADD_NEW_MESSAGE':
            const filteredErrMessages = state.messages.filter(msg=> msg.messageId !== "newKey")
            return { ...state, messages: [ ...filteredErrMessages, {...action.payload}] };
        case 'SET_UNSENT_MESSAGE':
            return { ...state, unsentMessage: action.payload };
        default:
            return state;
    }
};

