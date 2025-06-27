import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { FETCH_LATEST_MESSAGES } from '../graphql/queries';
import { Channel, FetchLatestMessagesData, FetchLatestMessagesVariables } from '../types';


export const useFetchLatestMessages = (channel: Channel | null) => {
    const [fetchLatest, { loading, error, data }] = useLazyQuery<FetchLatestMessagesData, FetchLatestMessagesVariables>(FETCH_LATEST_MESSAGES);

    useEffect(() => {
        if (channel?.id) {
            fetchLatest({ variables: { channelId: channel.id } });
        }
    }, [channel?.id, fetchLatest]);

    return {
        latestMessages: data?.fetchLatestMessages || [],
        loadingLatest: loading,
        errorLatest: error,
        fetchLatestMessages: fetchLatest
    };
};