import React from 'react';
import VideoItem from './videoitem/videoitem';
import './video.scss'

// handles selection of video from search results list
const VideoList = ({videos , handleVideoSelect}) => {
    const renderedVideos =  videos.map((video) => { // returns video item selected
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
        // console.log(video.id);
    });

    return <div className='ui-list'>{renderedVideos}</div>;
};
export default VideoList;