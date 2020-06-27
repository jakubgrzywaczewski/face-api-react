import { useEffect, useState } from 'react';

const useVideo = (video) => {
  const [mediaStream, setMediaStream] = useState();

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.getUserMedia(
          { video: true },
          (stream) => {
            video.current.srcObject = stream;
          },
          (err) => console.error(err)
        );
        setMediaStream(stream);
      } catch (error) {
        console.error(error);
      }
    }
    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, video]);

  return mediaStream;
};

export default useVideo;
