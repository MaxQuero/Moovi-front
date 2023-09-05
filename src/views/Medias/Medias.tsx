import React, {useEffect} from 'react';
import './Medias.scss';
import {Login} from '../../guards/Auth/Auth';
import {v4 as uuidv4} from 'uuid';
import Carousel from '../../components/Carousel/Carousel';
import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import Search from '../../components/Search/Search';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import {Movie, TvShow,} from "../../generated/graphql";
import {useMedias} from "./Medias.hook";
import MediasList from '../../components/MediasList/MediasList';

type MediasProps = {
    mediaType: MediaEnum;
};

function Medias({mediaType = MediaEnum.Movie}: MediasProps) {
    const {
        var: {session, sessionId, onTheAirLabel},
        state: {
            popularMedias,
            loadingPopularMedias,
            trendingMedias,
            loadingTrendingMedias,
            latestMedias,
            loadingLatestMedias,
            onTheAirMedias,
            loadingOnTheAirMedias,
            searchResults,
        },
        actions: {getTrendingMedias, getPopularMedias, getLatestMedias, getOnTheAirMedias, getSearchResults}
    } = useMedias(mediaType)

    useEffect(() => {
        if (session) {
            getTrendingMedias({variables: {mediaType: mediaType}})
            getPopularMedias({variables: {mediaType: mediaType}})
            getOnTheAirMedias({variables: {mediaType: mediaType}})
            getLatestMedias({variables: {mediaType: mediaType}})
        } else {
            Login().then();
        }
    }, [mediaType]);


    return (
        <div className="medias">
            <Carousel loading={loadingPopularMedias} medias={popularMedias}/>

            {searchResults.length > 0 ? (
                <section className="medias__section">
                    <div className="medias__results">
                        {searchResults &&
                            searchResults.map((media: Movie | TvShow) => (
                                <Media className="medias__media" hasActions media={media} key={uuidv4()}/>
                            ))}
                    </div>
                </section>
            ) : (
                <section className="medias__section">
                     <MediasList
                        className="media__trending-medias"
                        title="Tendances"
                        setElementsFilteredFunc={getTrendingMedias}
                        loading={loadingTrendingMedias}
                        medias={trendingMedias}
                    />
                    <MediasList
                        className="media__trending-in-theatres"
                        title="Actuellement au cinéma"
                        setElementsFilteredFunc={getOnTheAirMedias}
                        loading={loadingOnTheAirMedias}
                        medias={onTheAirMedias}
                    />
                    <MediasList
                        className="media__trending-upcoming"
                        title="Prochaines sorties"
                        setElementsFilteredFunc={getLatestMedias}
                        loading={loadingLatestMedias}
                        medias={latestMedias}
                        displayReleaseDate
                    />
                </section>
            )}
        </div>
    );
}

export default Medias;
