import React from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import Doctor from "../../assets/images/Therapisti.svg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as Setting } from "../../assets/images/setting.svg";
import { ReactComponent as Exercise } from "../../assets/images/Exercise.svg";
import { ReactComponent as Scorecard } from "../../assets/images/Scorecard.svg";
import { ReactComponent as Physiotherapist } from "../../assets/images/Physiotherapist.svg";
const Therapist = () => {
  return (
    <>
      <AppBar></AppBar>

      <Box
        className="userprofile"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "50%",
            height: "100%",
            mb: 3,
          },
          borderRadius: "20px",
          background: "#F6FAFB",
        }}
      >
        <Typography className="patientHeading">Therapist ID: 12345</Typography>
        <Paper
          elevation={3}
          className="Therapist"
          sx={{
            borderRadius: "20px",
            paddingBottom: "5%",
          }}
        >
          <Grid className="profileimg" sx={{ marginTop: "5%" }}>
            <img src={Doctor}></img>
          </Grid>
          <Typography className="PatientName">Farhan shakir</Typography>
          <Typography className="PatientInfo">
            <Hospitalicon
              sx={{ marginRight: "10px" }}
              className="Profile-Icons"
            ></Hospitalicon>
            Physical Therapist
          </Typography>
          <div className="profilediv">
            <div className="profiles-input">
              <input type="text" disabled id="name" />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="0315 1234567"
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

            <div className="profiles-input6">
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
        <Typography className="patientHeading">Therapist ID: 12345</Typography>

        <Paper
          elevation={3}
          className="Therapist"
          sx={{
            borderRadius: "20px",
            paddingBottom: "5%",
            marginTop: "10px",
          }}
        >
          <Grid className="profileimg" sx={{ marginTop: "5%" }}>
            <img src={Doctor}></img>
          </Grid>
          <Typography className="PatientName">Farhan shakir</Typography>
          <Typography className="PatientInfo">
            <Hospitalicon
              sx={{ marginRight: "10px" }}
              className="Profile-Icons"
            ></Hospitalicon>
            Physical Therapist
          </Typography>
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

            <div className="profiles-input6">
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
      <BottomNavigation sx={{ width: "100%", background: " #136773" }}>
        <BottomNavigationAction
          icon={<Physiotherapist />}
        ></BottomNavigationAction>
        <BottomNavigationAction icon={<Scorecard />}></BottomNavigationAction>
        <BottomNavigationAction icon={<Exercise />}></BottomNavigationAction>
        <BottomNavigationAction icon={<Setting />}></BottomNavigationAction>
      </BottomNavigation>
    </>
  );
};

export default Therapist;
