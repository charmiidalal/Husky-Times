import React from "react";
import './video.scss'

// details of videos after search input
const VideoDetail = ({ video }) => {
  if (!video) { // case if no videos return empty div
    return <div>
    </div>;
  }
  // else statement
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  // return video ready for play
  return (
    <div>
      <div className="ui-embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
    </div>
  );
};

export default VideoDetail;