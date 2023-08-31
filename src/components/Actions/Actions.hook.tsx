import {useApolloClient} from "@apollo/client";
import {useEffect, useState} from "react";
import {
    useMutateFavoriteMediaMutation,
    useMutateRateMediaMutation,
    useMutateWatchlistMediaMutation
} from "../../generated/graphql";

export function useActions(media) {
    const session: string = localStorage.getItem('user');
    const sessionId: string = JSON.parse(session).sessionId;
    const accountId: number = JSON.parse(session).id;
    const client = useApolloClient();
    const serializedState = client.cache.extract();
    const [mediaUpdated, setMediaUpdated] = useState(media)


    const [setRateMedia, {
        data: {rateMedia: mediaRated = {}} = {},
        loading: loadingRate
    }] = useMutateRateMediaMutation();
    const [setFavoriteMedia, {
        data: {favoriteMedia: mediaFavorite = {}} = {},
        loading: loadingFavorite
    }] = useMutateFavoriteMediaMutation();
    const [setWatchlistMedia, {
        data: {watchlistMedia: mediaWatchlisted = {}} = {},
        loading: laodingWathclisted
    }] = useMutateWatchlistMediaMutation();



    return {
        var: {
            accountId,
            sessionId,
        },
        state: {
            mediaUpdated,
            mediaRated,
            mediaFavorite,
            mediaWatchlisted
        },
        actions: {
            setMediaUpdated,
            setRateMedia,
            setFavoriteMedia,
            setWatchlistMedia
        }
    }
}