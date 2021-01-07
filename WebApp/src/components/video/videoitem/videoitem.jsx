import React from 'react';
import './videoitem.scss';

// function handles video item selection from list
const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div onClick={ () => handleVideoSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header'>{video.snippet.title}</div>
            </div>
        </div>
    )
};
export default VideoItem;