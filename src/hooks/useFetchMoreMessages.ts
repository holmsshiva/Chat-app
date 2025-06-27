import { useLazyQuery } from '@apollo/client';
import { FETCH_MORE_MESSAGES } from '../graphql/queries';
import { FetchMoreMessagesData, FetchMoreMessagesVariables } from '../types';

export const useFetchMoreMessages = () => {
    const [fetchMore, { loading, error, data }] = useLazyQuery<FetchMoreMessagesData, FetchMoreMessagesVariables>(FETCH_MORE_MESSAGES);

    return {
        moreMessages: data?.fetchMoreMessages || [],
        loadingMore: loading,
        errorMore: error,
        fetchMoreMessages: fetchMore
    };
};