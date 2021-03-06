import * as React from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";

import Rectangle from "../../skeletons/rectangle";
import {IVideoExtended} from "../../models/videos";

import styles from './video-tile-big.module.scss';

export interface VideoTileBigProps {
    videoData: IVideoExtended
}

const VideoTileBig: React.FC< VideoTileBigProps > = ({videoData}) => {
    const DESC_CHAR_LIMIT = 120;

    let history = useHistory();

    const [loaded, setLoaded] = useState(false);

    return (
        <div className={styles.container}
             aria-label="video tile"
             onClick={ () => history.push(`/watch/${videoData.id}`) }>

            <div className={styles.image}>
                { !loaded && <Rectangle aria-label="video placeholder" height={225} width={300} /> }
                <img src={videoData?.thumbnail?.url}
                     alt={videoData?.title}
                     onLoad={() => setLoaded(true)}/>
            </div>

            <div>
                <h1 aria-label="title">{videoData?.title}</h1>
                <p aria-label="views and channel">
                    { !!videoData?.statistics?.viewCount && (
                        videoData?.statistics?.viewCount > 1000000 ?
                            `${(Math.round(videoData?.statistics?.viewCount / 100000)/10)}M views   •  `
                            : videoData?.statistics?.viewCount > 999 ?
                            (`${(Math.round(videoData?.statistics?.viewCount / 100)/10)}k views  •  `) :
                            (`${videoData?.statistics?.viewCount} views  •  `)
                    )}
                    {`${videoData?.channelTitle}`}
                </p>

                <p>{videoData?.description && videoData?.description.substring(0,DESC_CHAR_LIMIT)+' ...'}</p>

            </div>
        </div>
    )
};

export default VideoTileBig;
