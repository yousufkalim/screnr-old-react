import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Profileimg from "../../assets/images/Profileimg.svg";
import EditButton from "../../assets/images/EditButton.svg";

import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

import { useNavigate, useParams } from "react-router-dom";

const PatientProfile = (props) => {
  const navigate = useNavigate();

  const navToPatientEdit = async (id) => {
    navigate(`/doctor/dashboard/edit_patient/${id}`);
  };

  return (
    <>
      <Paper
        elevation={3}
        className="patientprofile"
        sx={{
          borderRadius: "20px",
          background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
          position: "fixed",
        }}
      >
        {props.noEdit ? (
          <></>
        ) : (
          <Grid
            className="eidtprofile"
            onClick={() => navToPatientEdit(`${props._id}`)}
          >
            <img className="editbutton" src={EditButton}></img>
          </Grid>
        )}
        <Grid className="profileimg">
          <img src={Profileimg}></img>
        </Grid>
        <Typography className="PatientName">{`${props.first_name} ${props.last_name}`}</Typography>
        <Typography className="PatientInfo">
          <Hospitalicon
            sx={{ marginRight: "10px" }}
            className="Profile-Icons"
          ></Hospitalicon>
          {props.problem_name}
        </Typography>
        <div className="profilediv">
          <div className="profiles-input">
            <input type="text" disabled />
            <input disabled type="input" placeholder={props.phone} />
          </div>
          <div className="profiles-input1">
            <input type="text" disabled />
            <input
              disabled
              type="input"
              placeholder={new Date(props.dob).toLocaleDateString("en-US")}
            />
          </div>
          <div className="profiles-input2">
            <input type="text" disabled />
            <input disabled type="input" placeholder={props.national_id} />
          </div>
          <div className="profiles-input3">
            <input type="text" disabled />
            <input disabled type="input" placeholder={props.email} />
          </div>
          <div className="profiles-input4">
            <input type="text" disabled />
            <input disabled type="input" placeholder={props.address} />
          </div>
        </div>
        <div className="Profilediv2">
          <div className="Date_joined">
            <input type="text" placeholder="Date joined" disabled />
            <input
              disabled
              type="input"
              placeholder={new Date(props.createdAt).toLocaleDateString(
                "en-US"
              )}
            />
          </div>
          <div className="profiles-div2">
            <input type="text" placeholder="Check-ins" disabled />
            <input disabled type="input" placeholder={props.check_ins} />
          </div>
          <div className="profiles-div3">
            <input type="text" placeholder="Account Created" disabled />
            <input
              disabled
              type="input"
              placeholder={new Date(props.createdAt).toLocaleDateString(
                "en-US"
              )}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default PatientProfile;
