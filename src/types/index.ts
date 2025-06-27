export type User = {
  id: string;
  name: string;
}

export type Channel = {
  id: string;
  name: string;
  messages: Message[];
}

export type Message = {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
  status?: 'pending' | 'sent' | 'error';
}
export type Loading = {
  isLoading: boolean;
  message?: string
}

export type ErrorDisplayProps ={
    errorMessage: string;
    delay?: number;
}

export type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CHANNEL'; payload: Channel }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGES'; payload: {messages: Message[], old:boolean} }
  | { type: 'ADD_SENT_MESSAGE'; payload: Message }
  | { type: 'ADD_NEW_MESSAGE'; payload: Message }
  | { type: 'SET_UNSENT_MESSAGE'; payload: string };

export type AppState = {
  currentUser: User | null;
  currentChannel: Channel | null;
  messages: Message[];
  unsentMessage: string;
}

export type FetchMoreMessagesVariables = {
    channelId: string;
    messageId: string;
    old: boolean;
}

export type FetchMoreMessagesData = {
    fetchMoreMessages: Message[];
}

export type FetchLatestMessagesVariables = {
    channelId: string;
}

export type FetchLatestMessagesData = {
    fetchLatestMessages: Message[];
}
