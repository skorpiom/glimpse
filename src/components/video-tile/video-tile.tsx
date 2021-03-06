import * as React from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";

import Rectangle from "../../skeletons/rectangle";
import {IVideoExtended} from "../../models/videos";

import styles from './video-tile.module.scss';

export interface VideoTileProps {
    videoData: IVideoExtended
}

const VideoTile: React.FC< VideoTileProps > = ({videoData}) => {
    let history = useHistory();

    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.container}
             aria-label="video tile"
             onClick={ () => history.push(`/watch/${videoData.id}`) }>

            <img src={videoData?.thumbnail?.url}
                 alt={videoData?.title}
                 onLoad={() => setLoaded(true)}/>

            { !loaded && <Rectangle aria-label="video placeholder" height={180} width={320} /> }

            <h1 aria-label="title">{videoData?.title}</h1>
            <h2 aria-label="channel name">{videoData?.channelTitle}</h2>

            <p aria-label="views">
                { videoData?.statistics?.viewCount > 1000000 ?
                `${(Math.round(videoData?.statistics?.viewCount / 100000)/10)}M views`
                : videoData?.statistics?.viewCount > 999 ?
                    (`${(Math.round(videoData?.statistics?.viewCount / 100)/10)}k views`) :
                    (`${videoData?.statistics?.viewCount} views`)}
            </p>

        </div>

    )
};

export default VideoTile;
