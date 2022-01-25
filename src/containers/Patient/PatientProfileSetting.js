import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profileimg from "../../assets/images/Profileimg.svg";
import EditButton from "../../assets/images/EditButton.svg";
import AppBar from "../../components/common/AppBar";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

const PatientProfileSetting = () => {
  return (
    <>
      <AppBar heading={"Prescribing Therapy Exercise"}></AppBar>
      <Grid className="Bottom_header">
        <Typography
          className="Patient_heading"
          sx={{ fontSize: "20px !important" }}
        >
          User Profile
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#454238" }}
          className="Patient_button"
        >
          Edit Profile
        </Button>
      </Grid>
      <Box
        className="userprofile"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            mt: 4,
            ml: 2,
            mr: 2,
            width: "50%",
          },
          borderRadius: "20px",
          background: "#F6FAFB",
        }}
      >
        <Paper
          elevation={3}
          className="patientprofile"
          sx={{
            borderRadius: "20px",
            paddingBottom: "10%",
            width: "50%",
          }}
        >
          <Grid className="profileimg">
            <img src={Profileimg}></img>
          </Grid>
          <Typography className="PatientName">Farhan shakir</Typography>
          <Typography className="PatientInfo">
            <Hospitalicon
              sx={{ marginRight: "10px" }}
              className="Profile-Icons"
            ></Hospitalicon>
            Shoulder pain
          </Typography>
          <div
            className="Patient_id"
            style={{
              marginBottom: "3%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90% !important",
            }}
          >
            <input type="text" placeholder="Patient ID" disabled />
            <input
              type="number"
              name="Patient ID"
              placeholder="12345"
              id="placeholder"
            />
          </div>

          <div className="profilediv">
            <div className="profiles-input">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="0315 1234567"
              />
            </div>
            <div className="profiles-input1">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="2002/11/23"
              />
            </div>
            <div className="profiles-input2">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="33022-8328432-5"
              />
            </div>
            <div className="profiles-input3">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="farhanshakir"
              />
            </div>
            <div className="profiles-input4">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="Johar Town, Lahore"
              />
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default PatientProfileSetting;
