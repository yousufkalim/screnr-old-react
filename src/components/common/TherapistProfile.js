import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Eclipse3 from "../../assets/images/Eclipse3.svg";
import Eclipse4 from "../../assets/images/Eclipse4.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

const TherapistProfile = (props) => {

  const { toEdit } = props;

  return (
    <>
      <Paper
        elevation={3}
        className="Therapist"
        sx={{
          borderRadius: "20px",
          background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
          paddingBottom: "5%",
          marginTop: "10px",
        }}
      >
        <Grid className="profileimg" sx={{ marginTop: "5%" }}>
          <img src={props.gender == "male" ? Eclipse3 : Eclipse4}></img>
        </Grid>
        <Typography className="PatientName">{`${props.first_name} ${props.last_name}`}</Typography>
        <Typography className="PatientInfo">
          <Hospitalicon
            sx={{ marginRight: "10px" }}
            className="Profile-Icons"
          ></Hospitalicon>
          {props.doc_specialization}
        </Typography>
        <div className="profilediv">
          <div className="profiles-input">
            <input type="text" disabled />
            <input
              disabled={!toEdit}
              type="input"
              name="First Name"
              placeholder="First Name"
              defaultValue={props.first_name}
            />
          </div>
          <div className="profiles-input5">
            <input type="text" disabled />
            <input
              disabled={!toEdit}
              type="input"
              name="Last Name"
              placeholder="Last Name"
              defaultValue={props.last_name}
            />
          </div>
          <div className="profiles-input5">
            <input type="text" disabled />
            <input
              disabled={!toEdit}
              type="input"
              name="Mobile Number"
              placeholder="Phone"
              defaultValue={props.phone}
            />
          </div>
          <div className="profiles-input1">
            <input type="text" disabled />
            <input
              disabled={true}
              type="input"
              defaultValue={new Date(props.dob).toLocaleDateString("en-US")}
            />
          </div>
          <div className="profiles-input6">
            <input type="text" disabled />
            <input
              disabled={!toEdit}
              type="input"
              name="Address"
              placeholder="Address"
              defaultValue={props.address}
            />
          </div>
        </div>
        <div className="Profilediv2">
          <div className="profiles-div" style={{ width: "100% !important" }}>
            <input type="text" placeholder="Last Password Changed" disabled />
            <input
              disabled
              type="input"
              defaultValue={
                props.last_password_changed
                ? (new Date(props.last_password_changed).toLocaleDateString("en-US"))
                : "N/A"
              }
            />
          </div>
          <div className="profiles-div2">
            <input type="text" placeholder="Password" disabled />
            <input
              disabled
              type="input"
              placeholder="**********"
            />
          </div>
          <div className="profiles-div3">
            <input type="text" placeholder="Account Created" disabled />
            <input
              disabled
              type="input"
              defaultValue={new Date(props.createdAt).toLocaleDateString("en-US")}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default TherapistProfile;
