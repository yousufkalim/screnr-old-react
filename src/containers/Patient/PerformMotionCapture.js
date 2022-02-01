import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as Calendar } from "../../assets/images/date_range.svg";
import { ReactComponent as Medicalicon } from "../../assets/images/medical.svg";
import MobileBottomBar from "../../components/common/MobileBottomBar";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../utils/Auth";

const PerformMotionCapture = () => {
  const [counter, setCounter] = React.useState(8);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [assessments, setAssessment] = useState([]);

  useEffect(() => {
    getAssessments();
  }, []);

  // func to get current project
  const getAssessments = async () => {
    const user = getUser();
    let response;
    try {
      response = await Api("get", `/assessments/${user._id}`);
      const assessmentsData = response.data.Assessment;
      setAssessment(assessmentsData);
    } catch (e) {
      console.trace(e);
    }
  };

  const navToPerformAssessment = async (id) => {
    navigate(`/patient/assessment/${id}`);
  };
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <>
      {step === 1 ? (
        <div>
          <AppBar className="Appbar_background"></AppBar>
          <Grid className="Bottom_header">
            <Typography className="Patient_heading">Motion Capture</Typography>
          </Grid>
          <Grid container spacing={1} className="patient_maindiv">
            {assessments.length == 0 ? (
              <Typography> No Assessments </Typography>
            ) : (
              assessments.map((item) => (
                <>
                  <Grid
                    xs={10}
                    sm={10}
                    md={2}
                    className={`Exercise_details ${
                      item.status == "nonActive" ? "non_ActiveClas" : ""
                    }`}
                  >
                    <>
                      {/* <Typography className="ExerciseName">
                    {`${item.exercise} Exercise`}
                  </Typography> */}
                      <div
                        style={{
                          marginLeft: "8%",
                          marginTop: "10%",
                          paddingBottom: "10%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Typography className="Date_title">
                            Assigned Date
                          </Typography>
                          <Typography className="date">13-Dec-2021</Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "2%",
                          }}
                        >
                          <Typography
                            className="Due_Date_title"
                            style={{ marginRight: "5%" }}
                          >
                            Due Date
                          </Typography>
                          <Typography className="date">13-Dec-2021</Typography>
                        </div>
                      </div>
                      <div>
                        <Typography className="assessment_title">
                          Shoulder exercise
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Typography className="sets">Sets:3</Typography>
                        <Typography className="sets">Repitition:12</Typography>
                      </div>
                    </>
                    <Typography
                      onClick={(e) => setStep(2)}
                      className={`${
                        item.status == "requested"
                          ? "motionStatus"
                          : "nonActive_testStatus "
                      }`}
                    >
                      {item.status == "requested"
                        ? "Lets start"
                        : item.status == "reviewed"
                        ? "Reviewed"
                        : "Completed"}
                    </Typography>
                  </Grid>
                </>
              ))
            )}
          </Grid>
          <MobileBottomBar className="bottomnav" activeIndex={1} />
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

          <Typography className="recording_div" sx={{ height: "80vh" }}>
            Place your phone nearby before Recording
          </Typography>
          {/* <div className="App" style={{ height: "80vh" }}>
            <div> {counter}</div>
          </div> */}

          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="motion_capture_detail">
              {/* <Typography className="ExerciseName">
                    {`${item.exercise} Exercise`}
                  </Typography> */}

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

              <Typography onClick={(e) => setStep(3)} className="motionStatus">
                Start Recording
              </Typography>
            </Grid>
          </Grid>

          <MobileBottomBar className="bottom_nav" activeIndex={1} />
        </div>
      ) : step === 3 ? (
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

          {/* <Typography className="recording_div" sx={{ height: "80vh" }}>
          Place your phone nearby before Recording
        </Typography> */}

          <div
            className={`${counter == "0" ? "App" : "counterdiv"}`}
            style={{ height: "80vh" }}
          >
            <div> {counter == 0 ? "Start" : counter}</div>
          </div>

          <Grid container spacing={1} className="patient_maindiv_motion">
            <Grid item xs={10} sm={10} md={2} className="motion_capture_detail">
              {/* <Typography className="ExerciseName">
                  {`${item.exercise} Exercise`}
                </Typography> */}

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
                onClick={(e) => setStep(2)}
                className="motionStatus"
                sx={{ background: "#FF4B33 !important" }}
              >
                Stop
              </Typography>
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

export default PerformMotionCapture;
