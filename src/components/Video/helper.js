export function showExpressions({ expressions }, text) {
  const arr = Object.entries(expressions);
  const max = arr.reduce((acc, expressionValue) => {
    return acc[1] > expressionValue[1] ? acc : expressionValue;
  }, []);

  text.current.textContent = max[0];
}

export async function detectFace(canvas, displaySize, faceapi, text, video) {
  const options = new faceapi.TinyFaceDetectorOptions();

  faceapi.matchDimensions(canvas.current, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video.current, options)
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.current
      .getContext('2d')
      .clearRect(0, 0, canvas.current.width, canvas.current.height);

    faceapi.draw.drawDetections(canvas.current, resizedDetections);

    if (detections.length) {
      showExpressions(detections[0], text);
    }
  }, 200);
}
