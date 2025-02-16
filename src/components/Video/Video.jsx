import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import useVideo from "../../hooks/useVideo.jsx";
import "./Video.css";
import { displaySize } from "./constant.jsx";
import { detectFace } from "./helper.jsx";

const Video = () => {
  const canvasRef = useRef();
  const textRef = useRef();
  const videoRef = useRef();
  const modelsLoaded = useRef(false);
  const intervalID = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const stream = useVideo(videoRef);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
        modelsLoaded.current = true;
        setIsVideoReady(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    if (!modelsLoaded.current) {
      loadModels();
    }

    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  function handleCanPlay() {
    if (modelsLoaded.current && isVideoReady) {
      videoRef.current
        .play()
        .then(() => {
          intervalID.current = detectFace(
            canvasRef,
            displaySize,
            faceapi,
            textRef,
            videoRef
          );
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
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
          playsInline
          muted
          width={displaySize.width}
          height={displaySize.height}
        />
      </div>
      <div ref={textRef} className="emotionText">
        {!isVideoReady ? "Loading models..." : "Waiting for video..."}
      </div>
    </>
  );
};

export default Video;
