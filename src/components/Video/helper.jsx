export function detectFace(canvas, displaySize, faceapi, text, video) {
  const options = new faceapi.TinyFaceDetectorOptions();
  faceapi.matchDimensions(canvas.current, displaySize);

  const intervalId = setInterval(async () => {
    try {
      const detections = await faceapi
        .detectAllFaces(video.current, options)
        .withFaceExpressions();

      if (detections && detections.length > 0) {
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        faceapi.draw.drawDetections(canvas.current, resizedDetections);

        if (text.current) {
          const expressions = detections[0].expressions;
          const maxExpression = Object.entries(expressions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          );
          text.current.textContent = `${maxExpression[0]}: ${Math.round(
            maxExpression[1] * 100
          )}%`;
        }
      }
    } catch (error) {
      console.error("Error in face detection:", error);
    }
  }, 100);

  return intervalId;
}
