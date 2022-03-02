import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import * as POSE from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { updateLandmarks } from "../../utils/updateLandmarks";
import calculateAngles from "../../utils/calculateAngles";
import Loader from "../../components/common/Loader";

// Connections
import left_connections from "../../assets/connections/left_connections.json";
import right_connections from "../../assets/connections/right_connections.json";
import rules from "../../assets/rules.json";

var camera = null;
var showPoseLandmarks = true;
var showSmoothLandmarks = true;
var landmarks = undefined; // initializing default landmarks variable to send in onResult function when loopCounter is odd
var frames = 0;

// Smooth landmarks
var frameSets = new Array();
var smoothFrame = new Array();

// Phase detection
var currentPhase = 0;
var minAngle = 100;
var maxAngle = 100;
var reps = new Array();
var maxHipAngle = 0;

// Setting default cam width
window.camWidth = 1280;
window.camHeight = 720;

var checkSession = "";

// Rules Data
var brokenRules = {};

var stats = {
  joints: {},
  angles: {},
  leftSide: 0,
  rightSide: 0,
  phase: 0,
};

// Pose component
export default function Camera(props) {
  //Initializing
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let activeEffect = "mask";
  const [fps, setFps] = useState(0);
  const [poseSide, setPoseSide] = useState("BACK");
  const [sessionStarted, setSessionStarted] = useState(false);
  let [message, setMessage] = useState("");
  let [message2, setMessage2] = useState("");
  let [loopCounter, setLoopCounter] = useState(0);
  let [takeScreenshot, setTakeScreenshot] = useState(false);
  let [image, setImage] = useState();
  let [phase, setPhase] = useState(0); // We will update this state only to track in useEffect, Cz useEffect cannot track a variable, And we are not gonna use this in rules validation, We will use currentPhase variable there.

  const [session, setSession] = useState("");
  const [checkWebcam, setCheckWebcam] = useState(true);

  // Initializing the pose component and camera
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      selfieMode: false,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      // staticImageMode: true,
    });

    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          setLoopCounter(loopCounter++); // Incrementing the loop counter on every frame that we are getting from webcam

          // When loop counter is even then we will call mediapipe to process the frame, That's how we are skipping every second frame
          if (loopCounter % 2 === 0) {
            if (webcamRef.current) {
              await pose.send({ image: webcamRef.current.video });
            }
          }
        },
        width: webcamRef.current && window.camWidth,
        height: webcamRef.current && window.camHeight,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (checkSession === "" || checkSession === "start") {
      camera.start();
    } else {
      camera.stop();
    }
  }, [checkWebcam]);

  // Getting frames per second

  useEffect(() => {
    setInterval(() => {
      setFps(frames);
      frames = 0;
    }, 1000);
  }, []);

  // Check rules
  useEffect(() => {
    setInterval(() => {
      if (checkSession === "start") {
        checkRules();
      }
    }, 300);
  }, [sessionStarted]);

  useEffect(() => {
    if (takeScreenshot) {
      let img = webcamRef.current.getScreenshot();
      setImage(img);
    } else {
      setImage();
    }
  }, [takeScreenshot]);

  useEffect(() => {
    setSession(props.handleSession);
  }, [props.handleSession]);

  useEffect(() => {
    handleSession(session);
  }, [session]);

  // If loop counter is odd then we will call onResult function by our own to draw previous frame's landmark
  useEffect(() => {
    if (landmarks && loopCounter % 2 !== 0) {
      if (checkWebcam) {
        onResults(landmarks);
      }
    }
  }, [loopCounter]); // This code should run on every increment of loopCounter

  // Creating reps with rep details
  useEffect(() => {
    let newRules = {};
    Object.entries(rules).map(([key, value]) => {
      Object.entries(value).map(([k, val]) => {
        if (val.message === "sit hips lower") {
          newRules = val;
        }
      });
    });

    if (
      phase === 1 &&
      maxHipAngle > newRules.angles.hip.value &&
      sessionStarted
    ) {
      setMessage2(newRules.message);
      maxHipAngle = 0;
    } else {
      setMessage2("");
    }
    if (phase === 1 && minAngle < 100 && sessionStarted) {
      let repsCount = reps.length + 1;
      reps.push({ minAngle, maxAngle, repsCount });
      minAngle = 100;
      maxAngle = 100;
      props.setReps(reps.length);
    }
  }, [phase]); // This code runs each time when phase update

  const onResults = (results) => {
    // FPS --> Incrementing frames variable to calculate the frames after one second, because this onResult function runs on every frame to draw landmarks
    frames++;

    landmarks = results; // Setting the result to a landmarks variable to use when we call this function odd times

    // Pushing frame at the end of frameSet array
    if (results.poseLandmarks) {
      // Disabling face landmarks by setting it's visibility to zero
      results.poseLandmarks = results.poseLandmarks.map((a, i) =>
        i < 11 ? { ...a, visibility: 0.0 } : a
      );

      frameSets.push(results.poseLandmarks);
    }

    if (frameSets.length === 8) {
      // This loop will run 33 time to make average of each joint
      for (let i = 0; i < 33; i++) {
        // Making an array of each joints coordinates
        let x = frameSets.map((a) => a[i].x);
        let y = frameSets.map((a) => a[i].y);
        let z = frameSets.map((a) => a[i].z);
        let visibility = frameSets.map((a) => a[i].visibility);

        // Sorting the array into ascending order
        x = x.sort((a, b) => a - b);
        y = y.sort((a, b) => a - b);
        z = z.sort((a, b) => a - b);
        visibility = visibility.sort((a, b) => a - b);

        // Dropping 2 min and 2 max coordinates
        x = x.slice(2, 6);
        y = y.slice(2, 6);
        z = z.slice(2, 6);
        visibility = visibility.slice(2, 6);

        // Making the average of 4 remaining coordinates
        smoothFrame[i] = {
          x: x.reduce((a, b) => a + b, 0) / x.length,
          y: y.reduce((a, b) => a + b, 0) / y.length,
          z: z.reduce((a, b) => a + b, 0) / z.length,
          visibility: visibility.reduce((a, b) => a + b, 0) / visibility.length,
        };
      }

      // Removing the first frame from frameSet
      frameSets.shift();
    }

    // after first 8 frames we have averaged coordinates, So now updating the poseLandmarks with averaged coordinates
    if (smoothFrame.length > 0 && showSmoothLandmarks) {
      results.poseLandmarks = smoothFrame;
    }

    // This function will draw the coordinates
    drawOnCanvas(results);
  };

  // Results received from the pose component
  function drawOnCanvas(results) {
    // Setting canvas dimensions
    canvasRef.current.width = window.camWidth;
    canvasRef.current.height = window.camHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.segmentationMask) {
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // Only overwrite existing pixels.
      if (activeEffect === "mask" || activeEffect === "both") {
        canvasCtx.globalCompositeOperation = "source-in";
        // This can be a color or a texture or whatever...
        canvasCtx.fillStyle = "#00FF007F";
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      } else {
        canvasCtx.globalCompositeOperation = "source-out";
        canvasCtx.fillStyle = "#0000FF7F";
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      }

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-over";
    } else {
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
    }

    // CHECK IF RESULT CONTAINS POSE LANDMARKS
    if (results.poseLandmarks) {
      // With this function we will convert the landmarks array to an object with joint names
      const joints = updateLandmarks(results.poseLandmarks);

      // Checking phase and counting the reps
      checkPhase(calculateAngles.knee(joints));
      checkHipMaxAngle(calculateAngles.hip(joints));

      let angles = {
        shoulder: calculateAngles.shoulder(joints),
        elbow: calculateAngles.elbow(joints),
        knee: calculateAngles.knee(joints),
        spine: calculateAngles.spine(joints),
        shin: calculateAngles.shin(joints),
        OAH: calculateAngles.OAH(joints),
        hip: calculateAngles.hip(joints),
      };

      // Coords for left side of the body
      let leftSide =
        joints.shoulder.left_visibility +
        joints.elbow.left_visibility +
        joints.wrist.left_visibility +
        joints.hip.left_visibility +
        joints.knee.left_visibility +
        joints.ankle.left_visibility;

      // Coords for right side of the body
      let rightSide =
        joints.shoulder.right_visibility +
        joints.elbow.right_visibility +
        joints.wrist.right_visibility +
        joints.hip.right_visibility +
        joints.knee.right_visibility +
        joints.ankle.right_visibility;

      stats = {
        joints,
        angles,
        leftSide,
        rightSide,
        phase: currentPhase,
      };

      // Validate Rules
      checkPose(currentPhase, angles, leftSide, rightSide, setMessage);

      // Probability calculation for left and right sides
      let leftSideProbability = leftSide / (leftSide + rightSide);
      let rightSideProbability = rightSide / (leftSide + rightSide);

      // If both sides are facing screen, we need to draw

      if (
        leftSideProbability.toFixed(2) >= 0.57 &&
        rightSideProbability.toFixed(2) <= 0.52
      ) {
        setPoseSide(
          "LEFT - " +
            "L: " +
            leftSideProbability.toFixed(2) +
            " - R: " +
            rightSideProbability.toFixed(2)
        );

        // Draw Landmarks
        drawConnectors(canvasCtx, results.poseLandmarks, right_connections, {
          color: "white",
          lineWidth: 4,
        });
        drawLandmarks(
          canvasCtx,
          Object.values(POSE.POSE_LANDMARKS_LEFT).map(
            (index) => results.poseLandmarks[index]
          ),
          {
            visibilityMin: 0.65,
            color: "white",
            fillColor: "orange",
            lineWidth: 3,
          }
        );
      }
      // If right side is ahead
      else if (
        rightSideProbability.toFixed(2) >= 0.57 &&
        leftSideProbability.toFixed(2) <= 0.52
      ) {
        setPoseSide(
          "RIGHT - " +
            "L: " +
            leftSideProbability.toFixed(2) +
            " - R: " +
            rightSideProbability.toFixed(2)
        );

        // Draw Landmarks
        drawConnectors(canvasCtx, results.poseLandmarks, left_connections, {
          color: "white",
          lineWidth: 4,
        });
        // FACE INLINE POSE POSITIONS
        drawLandmarks(
          canvasCtx,
          Object.values(POSE.POSE_LANDMARKS_RIGHT).map(
            (index) => results.poseLandmarks[index]
          ),
          {
            visibilityMin: 0.65,
            color: "white",
            fillColor: "lightblue",
            lineWidth: 3,
          }
        );
      } else {
        setPoseSide(
          "CENTER - " +
            "L: " +
            leftSideProbability.toFixed(2) +
            " - R: " +
            rightSideProbability.toFixed(2)
        );

        // Draw Landmarks
        drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          POSE.POSE_CONNECTIONS,
          {
            color: "white",
            lineWidth: 4,
          }
        );
        drawLandmarks(
          canvasCtx,
          Object.values(POSE.POSE_LANDMARKS_LEFT).map(
            (index) => results.poseLandmarks[index]
          ),
          {
            visibilityMin: 0.65,
            color: "white",
            fillColor: "orange",
            lineWidth: 3,
          }
        );
        // FACE INLINE POSE POSITIONS
        drawLandmarks(
          canvasCtx,
          Object.values(POSE.POSE_LANDMARKS_RIGHT).map(
            (index) => results.poseLandmarks[index]
          ),
          {
            visibilityMin: 0.65,
            color: "white",
            fillColor: "lightblue",
            lineWidth: 3,
          }
        );
      }

      // taking screenshot when hand is above nose
      // if (
      //   results.poseLandmarks[20].y.toFixed(2) <
      //   results.poseLandmarks[0].y.toFixed(2)
      // ) {
      //   setTakeScreenshot(true);
      // } else if (
      //   results.poseLandmarks[19].y.toFixed(2) <
      //   results.poseLandmarks[0].y.toFixed(2)
      // ) {
      //   setTakeScreenshot(false);
      // }
    }

    canvasCtx.restore();
  }

  const checkHipMaxAngle = (hipAngle) => {
    let { left, right } = hipAngle;
    let { leftSide, rightSide } = stats;
    let visibility = leftSide < rightSide ? "right" : "left";

    if (visibility === "right" && right > maxHipAngle) {
      maxHipAngle = right;
    } else if (visibility === "left" && left > maxHipAngle) {
      maxHipAngle = left;
    }
  };

  // Function to check phase by checking knee angle for over head squat
  const checkPhase = (kneeAngle) => {
    let { left, right } = kneeAngle;

    // If knee angle is above 110 then it's phase one otherwise it's phase 2
    if (left > 115 || right > 115) {
      // Getting max angle
      if (right > maxAngle && left > maxAngle) {
        maxAngle = right;
      }
      currentPhase = 1; // Updating currentPhase var to use in rules validation
      setPhase(1); // Updating phase state to track in useEffect
    } else if ((left < 100 || right < 100) && (left >= 25 || right >= 25)) {
      // Getting min angle
      if (right < minAngle && left < minAngle) {
        minAngle = right;
      }
      currentPhase = 2; // Updating currentPhase var to use in rules validation
      setPhase(2); // Updating phase state to track in useEffect
    }
  };

  /**
   * With this function we will check the pose of an overhead squat
   * @param {Number} phase phase can be 1 or 2
   * @param {Object} angles calculated angles from specific joints
   * @param {String} poseSide poseSide can be left, center or right
   * @return {String} error message
   */
  const checkPose = (phase, angles, leftSide, rightSide, setMessage) => {
    // Destructuring angles
    let { shoulder, shin, OAH, hip, spine } = angles;

    //   If pose side is left then we have to check angles from left side
    let visibility = leftSide < rightSide ? "right" : "left";

    let mediapipe_angles_dict = {
      shoulder: shoulder[visibility],
      hip: hip[visibility],
      shin: shin[visibility],
      OAH: OAH[visibility],
      spine: spine[visibility],
    };

    let newRules = {};
    Object.entries(rules).map(([key, value]) => {
      newRules = value;
    });
    let feedback = checkDynamicRules(newRules, mediapipe_angles_dict, phase);

    let feedbackEntries = Object.entries(feedback);

    if (feedbackEntries.length === 0) {
      setMessage("");
    } else {
      feedbackEntries.reverse().map(([key, value]) => {
        if (value.message != "sit hips lower") {
          setMessage(value.message);
        }
      });
    }
  };

  /**
   * With this function we will check the rules of an overhead squat
   * @param {Number} phase phase can be 1 or 2
   * @param {Object} angles calculated angles from specific joints
   * @param {String} poseSide poseSide can be left, center or right
   * @return {String} error message
   */
  const checkRules = () => {
    // Destructuring angles
    let { phase, leftSide, rightSide, joints, angles } = stats;
    let { shoulder, shin, OAH, hip, spine } = angles;

    //   If pose side is left then we have to check angles from left side
    let visibility = leftSide < rightSide ? "right" : "left";

    if (Object.keys(angles).length != 0) {
      let mediapipe_angles_dict = {
        shoulder: shoulder[visibility],
        hip: hip[visibility],
        shin: shin[visibility],
        OAH: OAH[visibility],
        spine: spine[visibility],
      };
      let newRules = {};
      Object.entries(rules).map(([key, value]) => {
        newRules = value;
      });

      let feedback = checkDynamicRules(newRules, mediapipe_angles_dict, phase);

      Object.entries(feedback).map(([key, value]) => {
        if (!brokenRules[reps.length + 1]) {
          brokenRules[reps.length + 1] = [];
        }
        let found = brokenRules[reps.length + 1].find((e) => {
          if (e.rule_no === key) {
            return e;
          }
        });
        if (!found) {
          let broken = {
            rule_no: key,
            message: value.message,
            phase: currentPhase,
            rep_no: reps.length,
            // joints: joints,
            // angles: angles,
            brokenAt: new Date(),
          };
          brokenRules[reps.length + 1].push(broken);
          found = [];
        }
      });
    }
  };

  const checkDynamicRules = (rules_dict, angles_dict, phase) => {
    // rules_dict: 	dictionary of screnr rules from python server
    // angles_dict: dictionary of angles calculated by mediapipe in screnr app
    // phase: 		phase of the exercise calculated by mediapipe in screnr app

    let feedback_dict = {};

    // get all rule numbers
    let rule_num_list = Object.keys(rules_dict);

    // for each rule, get phase the rule applies to, background color for the message and the feedback message that should be displayed.
    for (let i = 0; i < rule_num_list.length; i++) {
      let rule_num = rule_num_list[i];
      let phase_rule = rules_dict[rule_num_list[i]]["phase"];
      let color_rule = rules_dict[rule_num_list[i]]["color"];
      let message_rule = rules_dict[rule_num_list[i]]["message"];
      let angles_rule = rules_dict[rule_num_list[i]]["angles"];

      // rule only applies if mediapipe phase is the same as rule phase
      if (phase_rule === phase) {
        // get all angle names in the rule
        let angle_rule = Object.keys(angles_rule);
        let n = angle_rule.length;

        // some rules have to check for two angles. this will help to check both angles when applying the rule
        let rule_set_flag_list = new Array(n).fill(false);
        let i = 0;

        // this will iterate over each angle, its sign and the value that should be checked against the angle calculated by mediapipe
        for (let j = 0; j < angle_rule.length; j++) {
          let angle_name = angle_rule[j];
          let sign_rule = angles_rule[angle_rule[j]]["sign"];
          let angle_value_rule = angles_rule[angle_rule[j]]["value"];

          if (sign_rule == "<") {
            if (angles_dict[angle_name] < angle_value_rule) {
              rule_set_flag_list[i] = true;
            }
          } else if (sign_rule == "<=") {
            if (angles_dict[angle_name] <= angle_value_rule) {
              rule_set_flag_list[i] = true;
            }
          } else if (sign_rule == ">") {
            if (angles_dict[angle_name] > angle_value_rule) {
              rule_set_flag_list[i] = true;
            }
          } else if (sign_rule == ">=") {
            if (angles_dict[angle_name] >= angle_value_rule) {
              rule_set_flag_list[i] = true;
            }
          } else if (sign_rule == "==") {
            if (angles_dict[angle_name] == angle_value_rule) {
              rule_set_flag_list[i] = true;
            }
          } else {
            rule_set_flag_list[i] = false;
          }

          i = i + 1;

          if (i == n) {
            // if rule_set_flag_list only contains true, it means the rule was violated by the patient. Return the rule message.
            if (!rule_set_flag_list.includes(false)) {
              feedback_dict[rule_num] = {
                message: message_rule,
                color: color_rule,
              };
            }
          }
        }
      }
    }

    return feedback_dict;
  };

  //  handleSession
  const handleSession = (session) => {
    if (session === "end") {
      props.setEndTime(new Date());
      setSessionStarted(false);
      checkSession = "end";
      props.setBrokenRules(brokenRules);
      props.setFinalReps(reps);
      setCheckWebcam(false);
      brokenRules = [];
      reps = [];
    } else if (session === "start") {
      props.setStartTime(new Date());
      setSessionStarted(true);
      checkSession = "start";
    }
  };

  return (
    <center>
      {checkWebcam && (
        <div className="webcam">
          <div className="webcam-container">
            {/* React Webcam component */}
            <Webcam
              className="webcam_main"
              ref={webcamRef}
              videoConstraints={{
                height: window.camHeight,
                width: window.camWidth,
                frameRate: { ideal: 30, max: 60 },
              }}
              style={{
                width: 390,
                height: 660,
                objectFit: window.innerWidth > 600 ? "cover" : "",
                display: session === "end" ? "none" : "",
              }}
            />

            {/* Canvas to display th output */}
            {loopCounter === 0 ? (
              <Loader />
            ) : (
              <canvas
                id="webCan"
                ref={canvasRef}
                className="output_canvas"
                style={{
                  objectFit: window.innerWidth > 600 ? "cover" : "",
                  display: session === "end" ? "none" : "",
                  width: 390,
                  height: 660,
                }}
              ></canvas>
            )}
          </div>

          {reps.length > 0 && (
            <div
              className="rep_count"
              style={{
                display: props.display === "none" ? "none" : "",
                width: 390,
              }}
            >
              <p>{reps.length}</p>
            </div>
          )}
          {/* Feedback msg */}

          {message && (
            <div
              className="feedback_msg"
              style={{
                display: props.display === "none" ? "none" : "",
                width: 390,
              }}
            >
              <p>{message2 === "" ? message : message2}</p>
            </div>
          )}
        </div>
      )}
    </center>
  );
}
