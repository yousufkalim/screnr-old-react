import React, { useState, useEffect } from "react";

import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import { useNavigate } from "react-router-dom";
import PauseButton from "../../assets/images/Button.svg";
import PButton from "../../assets/images/PButton.svg";
import Shape from "../../assets/images/Shape.svg";

const Motion_captureRecording = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const navToRecordingEnded = () => {
    navigate("/patient/motion_capture_assessment_3");
  };

  return (
    <>
      {console.log(`THIS IS THE step: ${step}`)}
      {step === 1 ? (
        <div style={{ background: " #454238", height: "100vh !important" }}>
          <AppBar className="Motion_capture_appbar"></AppBar>
          <Grid
            className="Bottom_header_mobile"
            sx={{ backgroundColor: "#454238 !important" }}
          >
            <Typography
              className="Patient_heading"
              sx={{
                color: "#25C8B4",
                marginTop: "2%",
                marginLeft: "25px !important",
              }}
            >
              Motion Capture
            </Typography>
          </Grid>
          <div className="counterdiv" style={{ height: "80vh" }}></div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="pauseButton">
              <img src={PauseButton} onClick={(e) => setStep(2)}></img>
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
              sx={{
                color: "#25C8B4",
                marginTop: "2%",
                marginLeft: "25px !important",
              }}
            >
              Motion Capture
            </Typography>
          </Grid>
          <div className="counterdiv" style={{ height: "80vh" }}></div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="PButton">
              <img
                src={PButton}
                style={{ width: "40%", marginTop: "5%" }}
                onClick={(e) => setStep(3)}
              ></img>
            </Grid>
          </Grid>
          <MobileBottomBar className="bottom_nav" activeIndex={2} />
        </div>
      ) : step == 3 ? (
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

          <div className="counterdiv" style={{ height: "80vh" }}>
            <img src={Shape} style={{ marginTop: "10%" }}></img>
          </div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="PButton">
              <img
                src={PButton}
                style={{ width: "40%" }}
                onClick={() => navToRecordingEnded()}
              ></img>
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

export default Motion_captureRecording;
