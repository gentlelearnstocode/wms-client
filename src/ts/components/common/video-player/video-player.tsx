import ReactPlayer from 'react-player';
import React from 'react';

import { VideoPlayerProps } from 'src/ts/types';

const VideoPlayer = (props: VideoPlayerProps, ref) => {
  const { videoPlaying = false, videoUrl, controls = false, onDurationTime } = props;

  return (
    <ReactPlayer url={videoUrl} playing={videoPlaying} controls={controls} ref={ref} onDuration={onDurationTime} />
  );
};

export default React.forwardRef(VideoPlayer);
