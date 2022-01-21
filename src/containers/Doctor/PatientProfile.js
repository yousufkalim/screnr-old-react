import React from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profile from "../../components/common/PatientProfileComponent";

const PatientProfile = (props) => {
  return (
    <>
      <AppBar heading={"Patient Profile"}></AppBar>
      <Grid className="Bottom_header">
        <Typography
          className="Patient_heading"
          sx={{ fontSize: "20px !important" }}
        >
          Patient ID: 12345
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: " #25C8B4" }}
          className="Patient_button"
        >
          Prescribe Exercise
        </Button>
      </Grid>
      <Grid container spacing={1} sx={{ background: "#F6FAFB" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          className="profilecontainer"
          sx={{
            display: "flex",
            justifyContent: "center",

            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,
              width: "100%",
              height: "80%",
            },
            borderRadius: "20px",
          }}
        >
          <Profile issue="Shoulder pain"></Profile>
        </Grid>
        <Grid
          item
          sx={12}
          sm={12}
          md={5}
          className="Exercise_detaill"
          xs={{ width: "100%" }}
        >
          <Typography className="Profileinfo">
            Virtual Physical Therapy
          </Typography>
          <div className="profileinput1">
            <input type="text" placeholder="Name" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Shoulder pain"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Status" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Completed"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Date" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="17-jan-2022"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time start" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="9:45 am"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time spent" disabled />
            <input
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="30 Minutes"
            />
          </div>
          <div className="profileinput3" style={{ marginBottom: "4%" }}>
            <input type="text" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="profileinput"
              placeholder="Motion Details"
            />
          </div>

          <div className="profileinput1">
            <input type="text" placeholder="Name" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Shoulder pain"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Status" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Completed"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Date" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="17-jan-2022"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time start" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="9:45 am"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time spent" disabled />
            <input
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="30 Minutes"
            />
          </div>
          <div className="profileinput" style={{ marginBottom: "4%" }}>
            <input type="text" disabled />
            <input
              disabled
              className="profilefield"
              type="input"
              name="Type here"
              id="profileinput"
              placeholder="Motion Details"
            />
          </div>

          <div className="profileinput1">
            <input type="text" placeholder="Name" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Shoulder pain"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Status" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="Completed"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Date" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="17-jan-2022"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time start" disabled />
            <input
              disabled
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="9:45 am"
            />
          </div>
          <div className="profileinput2">
            <input type="text" placeholder="Time spent" disabled />
            <input
              type="input"
              name="Type here"
              id="inputplaceholder1"
              placeholder="30 Minutes"
            />
          </div>
          <div className="profile_input">
            <input type="text" disabled />
            <input
              disabled
              className="profilefield"
              type="input"
              name="Type here"
              id="profileinput"
              placeholder="Motion Details"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientProfile;
