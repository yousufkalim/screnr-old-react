import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import Api from "../../api";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/Auth";
const Recording_ended = () => {
  const [counter, setCounter] = React.useState(8);
  const [step, setStep] = useState(1);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <>
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

        <Typography
          className="recording_div"
          sx={{ height: "80vh", display: "flex", justifyContent: "center" }}
        >
          Recording Ended
        </Typography>

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
                Sets:3
              </Typography>
              <Typography className="sets" sx={{ color: "#F6FAFB" }}>
                Repetition:12
              </Typography>
            </div>
            <Typography onClick={(e) => setStep(1)} className="motionStatus">
              Send to Therapist
            </Typography>
          </Grid>
        </Grid>

        <MobileBottomBar className="bottom_nav" activeIndex={2} />
      </div>
    </>
  );
};

export default Recording_ended;
