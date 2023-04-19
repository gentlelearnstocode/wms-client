import { useState, useEffect, useRef } from 'react';
import { Slider, Button } from '@mui/material';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import { FileUpload, VideoPlayer } from '@components/common';
import { CircularLoading } from '@components/core';
import classes from './styles.module.scss';

const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [videoState, setVideoState] = useState({
    start: 0,
    end: duration,
  });
  const [asyncProcessRunning, setAsyncProcessRunning] = useState(false);
  const [processedVideo, setProcessedVideo] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.seekTo(videoState.start, 'seconds');
  }, [videoRef.current]);

  useEffect(() => {
    ffmpeg
      .load()
      .then(() => setFfmpegLoaded(true))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (duration !== 0) {
      const [startPoint, endPoint] = sliderValue;
      setVideoState({
        start: (startPoint * duration) / 100,
        end: (endPoint * duration) / 100,
      });
    }
  }, [sliderValue]);

  const onChangeVideo = (e: any) => {
    const file = e.target.files;
    if (file) setVideoFile(file?.item(0));
  };

  const onChangeSlider = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const onGetDuration = (time: number) => {
    setDuration(time);
  };

  const onClickTrimming = async () => {
    setAsyncProcessRunning(true);
    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp4';
    ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
    await ffmpeg.run(
      '-i',
      inputFileName,
      '-ss',
      `${videoState.start}`,
      '-to',
      `${videoState.end}`,
      '-f',
      'mp4',
      outputFileName,
    );
    const data = ffmpeg.FS('readFile', outputFileName);
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    setAsyncProcessRunning(false);
    setProcessedVideo(url);
  };

  const onReset = () => {
    setProcessedVideo('');
    setSliderValue([0, 100]);
    setDuration(0);
    setVideoState({ start: 0, end: duration });
  };

  return (
    <div className={classes.container}>
      <h1>Upload video here</h1>
      {!ffmpegLoaded ? (
        <CircularLoading />
      ) : (
        <>
          <FileUpload onChange={onChangeVideo} type="file" showUploadButton={false} />
          {videoFile ? (
            <VideoPlayer
              controls={true}
              videoUrl={URL.createObjectURL(videoFile)}
              videoPlaying={false}
              onDurationTime={onGetDuration}
              ref={videoRef}
            />
          ) : null}
          <div className={classes.sliderContainer}>
            <Slider value={sliderValue} onChange={onChangeSlider} />
          </div>
          <div>
            {asyncProcessRunning ? (
              <CircularLoading />
            ) : (
              <div>
                <Button
                  color="secondary"
                  variant="outlined"
                  disabled={asyncProcessRunning}
                  onClick={() => onClickTrimming()}
                >
                  Cut video
                </Button>
                <Button onClick={() => onReset()} color="primary" variant="outlined" disabled={asyncProcessRunning}>
                  Reset
                </Button>
              </div>
            )}
            {!asyncProcessRunning && processedVideo ? (
              <VideoPlayer
                videoUrl={processedVideo}
                videoPlaying={false}
                onDurationTime={onGetDuration}
                controls={true}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

VideoEditor.propTypes = {};

export default VideoEditor;
