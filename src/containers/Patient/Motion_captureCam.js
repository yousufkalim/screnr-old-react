import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import Timer from "../../utils/Timer";
import { useNavigate, useLocation } from "react-router-dom";
import MotionCaptureRecording from "./Motion_captureRecording";
import Camera from "../../components/common/Camera";
import PButton from "../../assets/images/PButton.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../config";

const Motion_captureCam = (props) => {
  const [counter, setCounter] = React.useState(9);
  const [step, setStep] = useState(1);
  const [session, setSession] = useState("start");
  const [item, setItem] = useState();
  const [reps, setReps] = useState(0);
  const [brokenRules, setBrokenRules] = useState("");
  const [finalReps, setFinalReps] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [skeleton, setSkeleton] = useState(true);
  // const [rules, setRules] = useState();

  const [isPaused, setIsPaused] = useState(true);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const navToRecordingEnded = () => {
    window.location = "/patient/motion_capture_assessments";
  };

  // useEffect(() => {
  //   getRules();
  // }, [rules]);

  useEffect(() => {
    setItem(state.item);
    if (counter > 0 && !isPaused)
      setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, isPaused]);

  // const getRules = async () => {
  //   var config = {
  //     method: "get",
  //     url: "https://arqchicago.pythonanywhere.com/?input=Overhead%20Squat",
  //   };
  //   await axios(config)
  //     .then(function (response) {
  //       setRules(response.data);

  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const init = () => {
    setStep(2);
    setIsPaused(false);
    setCounter(counter - 1);
  };
  const handleSession = () => {
    if (item && item.reps === reps) {
      return "auto_end";
    } else if (step === 3) {
      return "end";
    } else if (counter === 0) {
      return "start";
    } else return "";
  };

  const handleSave = async () => {
    if (Object.keys(brokenRules).length > item.reps) {
      let keys = Object.keys(brokenRules);
      delete brokenRules[keys[keys.length - 1]];
    }

    setDisable(true);
    const res = await axios
      .put(`${baseUrl}/assessments/update/${item._id}`, {
        status: "submitted",
        broken_rules: brokenRules,
        final_reps: finalReps,
        time_start: startTime,
        time_end: endTime,
      })
      .then((response) => {
        toast.success("Ended successfully");
        setDisable(false);
        navToRecordingEnded();
      })
      .catch((e) => {
        console.log("err", e);
        setDisable(false);
        toast.error(e);
      });
  };

  const onSkeletonChange = (e) => {
    setSkeleton(!skeleton);
  };

  return (
    <>
      <div style={{ background: "#454238", height: "100vh" }}>
        <AppBar className="Motion_capture_appbar"></AppBar>
        <Grid
          className="Bottom_header_mobile"
          sx={{ backgroundColor: "#454238 !important" }}
        >
          {/* <Typography
            className="Patient_heading"
            sx={{ color: "#25C8B4", marginTop: "2%" }}
          >
            Motion Capture
          </Typography> */}
        </Grid>
        <Typography className="recording_div"></Typography>

        <div>
          {step === 1 ? (
            <div
              className={"counterdiv2"}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                marginTop: "12%",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 10,
              }}
            >
              <div>Place your phone nearby before Recording</div>
            </div>
          ) : step === 2 ? (
            <div
              className={"counterdiv"}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                marginTop: "6%",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 10,
              }}
            >
              <div> {counter === 0 ? "" : counter}</div>
            </div>
          ) : step === 3 ? (
            <div
              className={"counterdiv3"}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                marginTop: "12%",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 10,
              }}
            >
              <div>Recording Ended</div>
            </div>
          ) : (
            ""
          )}

          <Camera
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            display={counter > 0 || step === 3 ? "none" : ""}
            // rules={rules}
            handleSession={(e) => handleSession()}
            item={item}
            setReps={setReps}
            setBrokenRules={setBrokenRules}
            setFinalReps={setFinalReps}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            skeleton={skeleton}
            setStep={setStep}
          ></Camera>
        </div>
        {step === 3 ? (
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid
              item
              xs={10}
              sm={10}
              md={2}
              className="motion_capture_detail"
              sx={{ paddingLeft: "0px !important" }}
            >
              <div>
                <Typography
                  className="assessment_title"
                  sx={{ marginBottom: "2%" }}
                >
                  Shoulder Exercise
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Sets:{" " + state.item.sets}
                </Typography>
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Repetition:{" " + state.item.reps}
                </Typography>
              </div>
              <Button
                disabled={disable}
                onClick={handleSave}
                className="motionStatus"
                style={{ textTransform: "unset" }}
              >
                Send to Therapist
              </Button>
            </Grid>
          </Grid>
        ) : counter === 0 ? (
          <Grid container spacing={1} className="_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="PButton">
              <img
                src={PButton}
                style={{
                  width: "40%",
                }}
                onClick={(e) => [setStep(3), setSession("end")]}
              ></img>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="motion_capture_detail">
              <div>
                <Typography
                  className="assessment_title"
                  sx={{ marginBottom: "2%" }}
                >
                  Shoulder Exercise
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Sets{" " + state.item.sets}
                </Typography>
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Repetition:{" " + state.item.reps}
                </Typography>
              </div>
              {/* <div style={{ color: "white" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "white" }}
                      onChange={onSkeletonChange}
                      checked={skeleton}
                    />
                  }
                  label="Skeleton"
                />
              </div> */}
              {step === 1 ? (
                <Typography onClick={(e) => init()} className="motionStatus">
                  Start Recording
                </Typography>
              ) : step === 2 ? (
                <Typography
                  className="motionStatus"
                  sx={{ background: "#FF4B33 !important" }}
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? "Resume" : "Stop"}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        )}
        <MobileBottomBar className="bottom_nav" activeIndex={2} />
      </div>
    </>
  );
};

export default Motion_captureCam;
