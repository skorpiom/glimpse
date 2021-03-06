import axios from 'axios';
import {stringify} from "querystring";
import {VideoPlatforms} from "../app/video-platforms";

export class VimeoService {
    baseUrl: string = 'https://api.vimeo.com/';
    searchUrl: string = `${this.baseUrl}/videos?`;
    maxResultsSearch: number = 5;

    constructor(private apiKey: string = '') {}

    public set key(apiKey: string) {
        this.apiKey = apiKey;
    }

    async search(searchPhrase: string, page: number = 1) {

        const params = stringify(
            {
                page,
                query: searchPhrase,
                per_page: this.maxResultsSearch,
                access_token: this.apiKey
            });

        const search = await axios.get(this.searchUrl + params);

        return {
            nextPageToken: page + 1,
            origin: VideoPlatforms.Vimeo,
            data: search.data.data.map( (video: any) => (
                {
                    id: video.uri.replace('/videos/',''),
                    title: video.name,
                    player: `https://player.vimeo.com/video/${video.uri.replace('/videos/','')}`,
                    description: video.description || '',
                    channelTitle: video.user.name,
                    publishedAt: video.release_time,
                    thumbnail: {
                        height: video.pictures.sizes[3].height,
                        width: video.pictures.sizes[3].width,
                        url: video.pictures.sizes[3].link
                    },
                    statistics: {
                        viewCount: 0,
                        likeCount: 0,
                        dislikeCount: 0
                    }
                }
            ))
        };
    }

}
