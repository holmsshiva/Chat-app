import React, { useEffect, useCallback } from "react";
import { useChatContext } from "../context/ChatContext";
import { Channel } from "../types";
import { channels } from "../utils/constants";


const SelectChannel: React.FC = () => {
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    if (!state.currentChannel) {
      dispatch({ type: "SET_CHANNEL", payload: channels[0] });
    }
  }, [state.currentChannel, dispatch]);

  const handleChannelClick = useCallback((channel: Channel) => {
    dispatch({ type: "SET_CHANNEL", payload: channel });
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">1. Choose your channel</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={`p-2 cursor-pointer ${
              state.currentChannel?.id === channel.id
                ? "bg-white"
                : "hover:bg-gray-400"
            }`}
          >
            {channel.name} Channel
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectChannel;