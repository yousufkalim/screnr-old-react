import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UploadImage from "../../assets/images/AddImage.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import assetsURL from "../../utils/Assets";

const TherapistProfile = (props) => {

  const { toEdit, handleImageSelect, profileImage } = props;

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
          <label>
            <input
              style={{
                display: "none",
                cursor: "none",
              }}
              disabled={!toEdit}
              type="file"
              accept="image/*"
              placeholder="Ref."
              onChange={handleImageSelect}
              onClick={(event)=> { 
                event.target.value = null
              }}
            />
            <img
              src={
                profileImage
                ? URL.createObjectURL(profileImage)
                : props.avatar
                ? assetsURL(props.avatar)
                : UploadImage
              }
              className="imageContainer"
            />
          </label>
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
              type="number"
              name="Phone"
              placeholder="Phone"
              defaultValue={props.phone}
            />
          </div>
          <div className="profiles-input5">
            <input type="text" disabled />
            <input
              disabled={true}
              type="input"
              name="Email"
              placeholder="Email"
              defaultValue={props.email}
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
          <div className="profiles-input5-2">
            <input type="text" disabled />
            <input
              disabled={!toEdit}
              type="input"
              name="Hospital"
              placeholder="Hospital"
              defaultValue={props.hospital}
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
