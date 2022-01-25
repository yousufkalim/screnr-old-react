import React from "react";
import TherapistProfile from "../../components/common/TherapistProfile";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Therapist from "../../assets/images/Therapisti.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

const UserProfile = () => {
  return (
    <>
      <AppBar heading={"Change Password"}></AppBar>
      <Grid className="Bottom_header">
        <Typography
          className="Patient_heading"
          sx={{ fontSize: "20px !important" }}
        ></Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #25C8B4",
            padding: "10px 60px 10px 60px !Important",
          }}
          className="Patient_button"
        >
          Change Password
        </Button>
      </Grid>
      <Box
        className="box"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 10,
            width: "50%",
            height: "100%",
          },
          borderRadius: "20px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: "20px",
            background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
            width: "100%",
            height: "100%",
            paddingBottom: "5%",
            marginTop: "10px",
          }}
        >
          <Grid className="profileimg" sx={{ marginTop: "5%" }}>
            <img src={Therapist}></img>
          </Grid>
          <Typography className="PatientName">Farhan shakir</Typography>
          <Typography className="PatientInfo">
            <Hospitalicon
              sx={{ marginRight: "10px" }}
              className="Profile-Icons"
            ></Hospitalicon>
            Physical Therapist
          </Typography>

          <div className="Profilediv2">
            <div className="profiles-div">
              <input type="text" placeholder="Last Password Changed" disabled />
              <input
                type="input"
                name="Type here"
                id="inputplaceholder1"
                placeholder="13-DEC-2021"
              />
            </div>
            <div className="profiles-div2">
              <input type="text" placeholder="Old Password" disabled />
              <input
                type="input"
                name="Type here"
                id="inputplaceholder1"
                placeholder="**********"
              />
            </div>
            <div className="profiles-div2">
              <input type="text" placeholder="New Password" disabled />
              <input
                type="input"
                name="Type here"
                id="inputplaceholder1"
                placeholder="**********"
              />
            </div>
            <div className="profiles-div3">
              <input type="text" placeholder="Account Created" disabled />
              <input
                type="input"
                name="Type here"
                id="inputplaceholder1"
                placeholder="29-July-2021"
              />
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile;
