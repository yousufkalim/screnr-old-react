import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 440,
  height: 720,
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
        height={100 + "%"}
        width={100 + "%"}
        ref={webcamRef}
        audio={true}
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
    </>
  );
};

export default Camera;
