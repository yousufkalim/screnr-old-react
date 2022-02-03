import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import Timer from "../../utils/Timer";
import { useNavigate } from "react-router-dom";

const Motion_captureCam = () => {

  const [counter, setCounter] = React.useState(9);
  const [step, setStep] = useState(1);

  const [isPaused, setIsPaused] = useState(true);

  const init = () => {
    setStep(2);
    setIsPaused(false);
    setCounter(counter - 1);
  }

  // Tasali se krien gy bad me.

  // const timer = new Timer(() => {
  //   setCounter(counter - 1)
  // }, 1000);

  // timer.pause();

  // const init = () => {
  //   setStep(2);
  //   timer.resume();
  // }

  // useEffect(() => {
  //   counter > 0 && timer.resume();
  // }, [counter]);

  // const pauseTimer = () => {
  //   timer.pause();
  // }

  const navigate = useNavigate();

  const navToMotionCaptureRecording = () => {
    navigate("/patient/motion_capture_assessment_2");
  }

  useEffect(() => {
    if (counter > 0 && !isPaused) setTimeout(() => setCounter(counter - 1), 1000);
    if(counter == 0){
      navToMotionCaptureRecording();
    }
  }, [counter, isPaused]);

  return (
    <>
      {step === 1 ? (
        <div style={{ background: " #454238", height: "100vh !important" }}>
          <AppBar className="Motion_capture_appbar"></AppBar>
          <Grid
            className="Bottom_header_mobile"
            sx={{ backgroundColor: "#454238 !important" }}
          >
            <Typography
              className="Patient_heading"
              sx={{ color: "#25C8B4", marginTop: "2%" }}
            >
              Motion Capture
            </Typography>
          </Grid>
          <Typography className="recording_div" sx={{ height: "80vh" }}>
            Place your phone nearby before Recording
          </Typography>
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
                  Sets:3
                </Typography>
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Repitition:12
                </Typography>
              </div>
              <Typography onClick={(e) => init()} className="motionStatus">
                Start Recording
              </Typography>
            </Grid>
          </Grid>
          <MobileBottomBar className="bottom_nav" activeIndex={2} />
        </div>
      ) : step === 2 ? (
        <div style={{ background: " #454238", height: "100vh !important" }}>
          <AppBar className="Motion_capture_appbar"></AppBar>
          <Grid
            className="Bottom_header_mobile"
            sx={{ backgroundColor: "#454238 !important" }}
          >
            <Typography
              className="Patient_heading"
              sx={{ color: "#25C8B4", marginTop: "2%" }}
            >
              Motion Capture
            </Typography>
          </Grid>

          <div
            className={`${counter == "0" ? "App_" : "counterdiv"}`}
            style={{ height: "80vh" }}
          >
            <div> {counter == 0 ? "Start" : counter}</div>
          </div>
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
                  Sets:3
                </Typography>
                <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                  Repitition:12
                </Typography>
              </div>
              <Typography
                className="motionStatus"
                sx={{ background: "#FF4B33 !important" }}
                onClick={ () => setIsPaused(!isPaused) }
              >
                { isPaused ? "Resume" : "Stop" }
              </Typography>
            </Grid>
          </Grid>

          <MobileBottomBar className="bottom_nav" activeIndex={2} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Motion_captureCam;
