import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import useVideo from "../../hooks/useVideo.js";
import "./Video.css";
import { displaySize } from "./constant";
import { detectFace } from "./helper";

const Video = () => {
  const canvasRef = useRef();
  const textRef = useRef();
  const videoRef = useRef();
  const modelsLoaded = useRef(false);
  const intervalID = useRef(null);

  const stream = useVideo(videoRef);

  useEffect(() => {
    if (!modelsLoaded.current) {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(
          `${process.env.PUBLIC_URL}/models`
        ),
        faceapi.nets.faceExpressionNet.loadFromUri(
          `${process.env.PUBLIC_URL}/models`
        ),
      ])
        .then(() => {
          modelsLoaded.current = true;
        })
        .catch((error) => {
          console.error("Error loading models:", error);
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
      }
    };
  }, []);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }

  function handleCanPlay() {
    if (modelsLoaded.current) {
      videoRef.current.play();
      videoRef.current.addEventListener(
        "play",
        () => {
          intervalID.current = detectFace(
            canvasRef,
            displaySize,
            faceapi,
            textRef,
            videoRef
          );
        },
        { once: true }
      );
    } else {
      setTimeout(handleCanPlay, 100); // retry after 100ms
    }
  }

  return (
    <>
      <div className="wrapper">
        <canvas
          ref={canvasRef}
          className="canvas"
          width={displaySize.width}
          height={displaySize.height}
        />
        <video
          className="video"
          ref={videoRef}
          onCanPlay={handleCanPlay}
          autoPlay
          width={displaySize.width}
          height={displaySize.height}
        >
          <track kind="captions" label="Video captions" />
        </video>
      </div>
      <div ref={textRef} className="emotionText">
        Wait a second
      </div>
    </>
  );
};

export default Video;
