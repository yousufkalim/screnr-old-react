import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profile from "../../components/common/PatientProfile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const PatientProfile = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [assessments, setAssessment] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getPatient();
    getAssessments();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

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

  const navToPrescribePatient = async (id, type) => {
    navigate(`/doctor/dashboard/prescribe_therapy/${id}`, {
      state: { type: type },
    });
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <AppBar
            className="Appbar_background"
            heading={"Patient Profile"}
          ></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography
              className="Patient_heading"
              // sx={{ fontSize: "20px !important" }}
            >
              {`Patient ID: ${patient.patient_id}`}
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: " #454238" }}
              className="Patient_button"
              onClick={handleClick}
            >
              Prescribe Exercise
            </Button>
            <Menu
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(e) => navToPrescribePatient(patient._id, "simple")}
              >
                Simple Exercise
              </MenuItem>
              <MenuItem
                onClick={(e) => navToPrescribePatient(patient._id, "motion")}
              >
                Motion Capture
              </MenuItem>
            </Menu>
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
                // position: "sticky",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "46%",
                  height: "75% !important",
                  mt: 10,
                  marginLeft: "1%",
                  mr: 0,
                  // mb: 2,
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
                  <Typography sx={{ marginLeft: ".5%" }}>
                    No assessments
                  </Typography>
                </>
              ) : (
                <>
                  {assessments.map((item) => (
                    <AssessmentListTile {...item} />
                  ))}
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
        <input disabled type="input" placeholder={new Date(props.due_date)} />
      </div>
      {props.type === "motion" && (
        <>
          <div className="profileinput2">
            <input type="text" placeholder="Start Time" disabled />
            <input
              disabled
              type="input"
              value={
                props.time_start
                  ? moment(props.time_start).format("MM-DD-YYYY HH:mm:ss")
                  : "N/A"
              }
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="End Time" disabled />
            <input
              disabled
              type="input"
              value={
                props.time_end
                  ? moment(props.time_end).format("MM-DD-YYYY HH:mm:ss")
                  : "N/A"
              }
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time spent" disabled />
            <input
              disabled
              type="input"
              value={props.time_spent ? props.time_spent : "N/A"}
            />
          </div>
        </>
      )}
      <div
        className={
          props.status === "requested"
            ? "profile_input"
            : props.status === "reviewed"
            ? "profile_input2"
            : "profileinput"
        }
        style={{
          marginBottom: "4%",
        }}
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
