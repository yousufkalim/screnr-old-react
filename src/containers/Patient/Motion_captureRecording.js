import React, { useState, useEffect } from "react";

import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import Api from "../../api";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/Auth";
import PauseButton from "../../assets/images/Button.svg";
import PButton from "../../assets/images/PButton.svg";
import Shape from "../../assets/images/Shape.svg";
const Motion_captureRecording = () => {
  const [counter, setCounter] = React.useState(8);
  const [step, setStep] = useState(1);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

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

          <div
            className={`${counter == "0" ? "App_" : "counterdiv"}`}
            style={{ height: "80vh" }}
          ></div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="pauseButton">
              <img src={PauseButton} onClick={(e) => setStep(5)}></img>
            </Grid>
          </Grid>

          <MobileBottomBar className="bottom_nav" activeIndex={1} />
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
            className={`${counter == "0" ? "App" : "counterdiv"}`}
            style={{ height: "80vh" }}
          ></div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="PButton">
              <img
                src={PButton}
                onClick={(e) => setStep(6)}
                style={{ width: "40%", marginTop: "5%" }}
              ></img>
            </Grid>
          </Grid>

          <MobileBottomBar className="bottom_nav" activeIndex={1} />
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

          <div
            className={`${counter == "0" ? "App_" : "counterdiv"}`}
            style={{ height: "80vh" }}
          >
            <img src={Shape} style={{ marginTop: "10%" }}></img>
          </div>
          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="PButton">
              <img
                src={PButton}
                onClick={(e) => setStep(7)}
                style={{ width: "40%" }}
              ></img>
            </Grid>
          </Grid>

          <MobileBottomBar className="bottom_nav" activeIndex={1} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Motion_captureRecording;
