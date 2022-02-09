import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

  const navToPerformMotionCapture = async (id) => {
    navigate(`/patient/motion_capture_assessment_1`);
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, []);

  return (
    <>
      <div>
        <AppBar className="Appbar_background"></AppBar>
        <Grid className="Bottom_header" sx={{ boxShadow: "none" }}>
          <Typography
            className="Patient_heading"
            sx={{
              marginLeft: "25px !important",
            }}
          >
            Motion Capture
          </Typography>
        </Grid>
        <Grid
          container
          spacing={1}
          className="patient_mo_capture"
          sx={{ marginTop: "0px !important" }}
        >
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
                  sx={{ marginBottom: "25px !important" }}
                  onClick={() => navToPerformMotionCapture(item._id)}
                >
                  <>
                    <div
                      style={{
                        marginLeft: "8%",
                        marginTop: "10%",
                        paddingBottom: "5%",
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
                    className={`${
                      item.status == "requested"
                        ? "motionStatus"
                        : "nonActive_testStatus "
                    }`}
                  >
                    {item.status == "requested"
                      ? "Let's start"
                      : item.status == "reviewed"
                      ? "Reviewed"
                      : "Completed"}
                  </Typography>
                </Grid>
              </>
            ))
          )}
        </Grid>
        <MobileBottomBar className="bottomnav" activeIndex={2} />
      </div>
    </>
  );
};

export default PerformMotionCapture;
