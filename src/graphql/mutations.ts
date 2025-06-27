import { gql } from "@apollo/client";

// Post a new message to a channel
export const POST_MESSAGE = gql`
  mutation MessagePost($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;