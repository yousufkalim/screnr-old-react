import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 390,
  height: 660,
  facingMode: "user",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const onUserMedia = (e) => {
    console.log(e);
  };
  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={true}
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
    </>
  );
};

export default Camera;
