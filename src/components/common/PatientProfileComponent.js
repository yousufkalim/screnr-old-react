import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Profileimg from "../../assets/images/Profileimg.svg";
import EditButton from "../../assets/images/EditButton.svg";

import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";

const PatientProfileComponent = (props) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "20px",
          background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
          width: "100%",
          height: "92%",
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
          {props.issue}
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
    </>
  );
};

export default PatientProfileComponent;
