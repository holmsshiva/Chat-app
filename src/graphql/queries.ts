import { gql } from "@apollo/client";

// Fetch the latest messages for a channel when it's first selected
export const FETCH_LATEST_MESSAGES = gql`
  query MessagesFetchLatest($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

// Fetch more messages (older messages) from a specific point
export const FETCH_MORE_MESSAGES = gql`
  query MessagesFetchMore($channelId: String!, $messageId: String!, $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;