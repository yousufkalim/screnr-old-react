import React from "react";
import Typography from "@mui/material/Typography";

import AppBar from "../../components/common/AppBar";
import MobileBottomBar from "../../components/common/MobileBottomBar";
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
export default function AllTherapists() {
  return (
    <>
      <AppBar className="Appbar_background" />

      <Box
        className="userprofile"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "90% !Important",
            height: "100%",
            mb: 3,
            mt: 4,
          },
          borderRadius: "20px",
          background: "#F6FAFB",
        }}
      >
        <Paper
          elevation={3}
          className="Therapist"
          sx={{
            borderRadius: "20px",
            paddingBottom: "10%",
          }}
        >
          <Grid
            className="profileimg"
            sx={{ marginTop: "7%", marginBottom: "7% !important" }}
          >
            <img src={Doctor}></img>
          </Grid>
          <div style={{ marginBottom: "10%" }}>
            <Typography className="PatientName">Farhan shakir</Typography>
            <Typography className="PatientInfo">
              <Hospitalicon
                sx={{ marginRight: "10px" }}
                className="Profile-Icons"
              ></Hospitalicon>
              Physical Therapist
            </Typography>
          </div>
          <div className="profilediv">
            <div className="P_profiles-input">
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
            <div className="P_profiles-input1">
              <input type="text" id="name" disabled />
              <input
                disabled
                type="input"
                name="Type here"
                id="input"
                placeholder="2002/11/23"
              />
            </div>

            <div className="P_profiles-input4">
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
      <MobileBottomBar className="bottomnav" activeIndex={0} />
    </>
  );
}
