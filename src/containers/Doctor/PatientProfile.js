import React from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profileimg from "../../assets/images/Profileimg.svg";
import EditButton from "../../assets/images/EditButton.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

const PatientProfile = () => {
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
          sx={12}
          sm={12}
          md={6}
          className="profilecontainer"
          sx={{
            display: "flex",
            justifyContent: "center",

            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,
              width: "60%",
              height: "70%",
            },
            borderRadius: "20px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: "20px",
              background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
            }}
          >
            <Grid className="eidtprofile">
              <img className="editbutton" src={EditButton}></img>
            </Grid>
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
            <div className="profilediv">
              <div className="profiles-input">
                <input type="text" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="0315 1234567"
                />
              </div>
              <div className="profiles-input1">
                <input type="text" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="2002/11/23"
                />
              </div>
              <div className="profiles-input2">
                <input type="text" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="33022-8328432-5"
                />
              </div>
              <div className="profiles-input3">
                <input type="text" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="farhanshakir"
                />
              </div>
              <div className="profiles-input4">
                <input type="text" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Johar Town, Lahore"
                />
              </div>
            </div>
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Date Joined" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="13-DEC-2021"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Check-ins" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="13"
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Account Created" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="29-July-2021"
                />
              </div>
            </div>
          </Paper>
          {/* </Box> */}
        </Grid>
        <Grid item sx={12} sm={12} md={6} className="Exercise_detail">
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
