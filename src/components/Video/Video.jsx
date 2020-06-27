import React, { useRef } from 'react';
import * as faceapi from 'face-api.js';
import useVideo from '../../hooks/useVideo.js';
import './Video.css';
import { displaySize } from './constant';
import { detectFace } from './helper';

const Video = () => {
  const canvasRef = useRef();
  const textRef = useRef();
  const videoRef = useRef();

  const stream = useVideo(videoRef);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }

  function handleCanPlay() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('models'),
      faceapi.nets.faceExpressionNet.loadFromUri('models'),
    ]).then(() => videoRef.current.play());

    videoRef.current.addEventListener('play', () =>
      detectFace(canvasRef, displaySize, faceapi, textRef, videoRef)
    );
  }

  return (
    <>
      <div className="wrapper">
        <canvas
          ref={canvasRef}
          className="canvas"
          width={displaySize.width}
          height={displaySize.height}
        ></canvas>
        <video
          className="video"
          ref={videoRef}
          onCanPlay={handleCanPlay}
          autoPlay
          width={displaySize.width}
          height={displaySize.height}
        ></video>
      </div>
      <div ref={textRef} className="emotionText">
        Wait a second
      </div>
    </>
  );
};

export default Video;
