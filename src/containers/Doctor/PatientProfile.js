import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profile from "../../components/common/PatientProfile";

import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const PatientProfile = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [assessments, setAssessment] = useState([]);

  useEffect(() => {
    getPatient();
    getAssessments();
  }, []);

  // func to get current project
  const getPatient = async () => {
    let response;
    try {
      response = await Api("get", `/patients/${params.id}`);
      const patientData = response.data.patient;
      setPatient(patientData);
      setIsLoading(false);
    } catch (e) {
      console.trace(e);
    }
  };

  // func to get current project
  const getAssessments = async () => {
    let response;
    try {
      response = await Api("get", `/assessments/${params.id}`);
      const assessmentsData = response.data.Assessment;
      setAssessment(assessmentsData);
    } catch (e) {
      console.trace(e);
    }
  };

  const navToPrescribePatient = async (id) => {
    navigate(`/doctor/dashboard/prescribe_therapy/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <AppBar heading={"Patient Profile"}></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography
              className="Patient_heading"
              sx={{ fontSize: "20px !important" }}
            >
              {`Patient ID: ${patient.patient_id}`}
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: " #454238" }}
              className="Patient_button"
              onClick={() => navToPrescribePatient(patient._id)}
            >
              Prescribe Exercise
            </Button>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ background: "#F6FAFB", mt: 4, mb: 6 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="profilecontainer"
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "42%",
                  height: "640px !important",
                  mt: 6,
                  ml: 0,
                  mr: 3,
                  mb: 2,
                },
                borderRadius: "20px",
              }}
            >
              <Profile {...patient} />
            </Grid>
            <Grid
              item
              sx={12}
              sm={12}
              md={6}
              className="Exercise_detaill"
              xs={{ ml: 3 }}
            >
              <Typography className="Profileinfo">
                Virtual Physical Therapy
              </Typography>
              {assessments.length == 0 ? (
                <>
                  <Typography>No assessments</Typography>
                </>
              ) : (
                <>
                  {
                    assessments.map( item => <AssessmentListTile {...item} /> )
                  }
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

function AssessmentListTile(props) {
  const navigate = useNavigate();

  const navToReviewPatientResponse = () => {
    navigate(`/doctor/dashboard/review_patient_response/${props._id}`);
  };

  return (
    <>
      <div className="profileinput1">
        <input type="text" placeholder="Name" disabled />
        <input disabled type="input" placeholder={props.exercise} />
      </div>
      <div className="profileinput2">
        <input type="text" placeholder="Status" disabled />
        <input
          disabled
          type="input"
          placeholder={`${props.status
            .charAt(0)
            .toUpperCase()}${props.status.slice(1)}`}
        />
      </div>
      <div className="profileinput2">
        <input type="text" placeholder="Date" disabled />
        <input
          disabled
          type="input"
          placeholder={new Date(props.due_date).toLocaleDateString("en-US")}
        />
      </div>
      <div className="profileinput2">
        <input type="text" placeholder="Time start" disabled />
        <input disabled type="input" placeholder="N/A" />
      </div>
      <div className="profileinput2">
        <input type="text" placeholder="Time spent" disabled />
        <input type="input" placeholder="N/A" />
      </div>
      <div
        className={
          props.status == "requested" ? "profile_input" : "profileinput"
        }
        style={{ marginBottom: "4%" }}
        onClick={
          props.status == "requested"
            ? null
            : () => navToReviewPatientResponse()
        }
      >
        <input type="text" disabled />
        <input
          disabled
          className="profilefield"
          type="input"
          id="profileinput"
          placeholder={
            props.type == "simple"
            ? `Simple Exercise Details`
            : `Motion Capture Details`
          }
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
}

export default PatientProfile;
