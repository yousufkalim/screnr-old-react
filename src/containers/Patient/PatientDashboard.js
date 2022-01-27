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

const PatientDashboard = () => {

  const navigate = useNavigate();

  const [assessments, setAssessment] = useState([]);

  useEffect(() => {
    getAssessments();
  }, []);

  // func to get current project
  const getAssessments = async () => {
    const user = getUser();
    let response;
    try{
      response = await Api("get", `/assessments/${user._id}`);
      const assessmentsData = response.data.Assessment;
      setAssessment(assessmentsData);
    }catch(e){
      console.trace(e);
    }
  };

  const navToPerformAssessment = async (id) => {
    navigate(`/patient/assessment/${id}`);
  }

  return (
    <>
      <AppBar></AppBar>
      <Grid className="Bottom_header">
        <Typography className="Patient_heading">Therapy Exercises</Typography>
      </Grid>
      <Grid container spacing={1} className="patient_maindiv">
        {
          assessments.length == 0
          ?
          <Typography> No Assessments </Typography>
          :
          assessments.map((item) => (
          <>
            <Grid
              xs={10}
              sm={10}
              md={2}
              className={`Exercise_details ${
                item.status == "nonActive" ? "non_ActiveClas" : ""
              }`}
              onClick={() => navToPerformAssessment(item._id)}
            >
              <>
                <Typography className="ExerciseName">
                  {`${item.exercise} Exercise`}
                </Typography>
                <Typography className="PatientAge">
                  <Calendar className="Icons"></Calendar>
                  {new Date(item.due_date).toLocaleDateString("en-US")}
                </Typography>
                <Typography className="PatientAge">
                  <Medicalicon className="Icons"></Medicalicon>
                  {`Therapist ${item.therapist.first_name}`}
                </Typography>
              </>
              <Typography
                className={`${
                  item.status == "requested"
                    ? "testStatus"
                    : "nonActive_testStatus "
                }`}
              >
                {
                  item.status == "requested"
                  ? "Virutal Physical Therapy"
                  : item.status == "reviewed"
                  ? "Reviewed"
                  : "Completed"
                }
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
      <MobileBottomBar activeIndex={1} />
    </>
  );
};

export default PatientDashboard;
