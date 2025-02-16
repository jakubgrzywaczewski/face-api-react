import { useEffect, useState } from "react";

const useVideo = (video) => {
  const [mediaStream, setMediaStream] = useState();

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 720 },
            height: { ideal: 540 },
            facingMode: "user",
          },
        });
        if (video.current) {
          video.current.srcObject = stream;
        }
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    if (!mediaStream) {
      enableStream();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream, video]);

  return mediaStream;
};

export default useVideo;
