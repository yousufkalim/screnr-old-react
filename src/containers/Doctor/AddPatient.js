import React from "react";
import AppBar from "../../components/common/AppBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { ReactComponent as Calendar } from "../../assets/images/date_range.svg";
import UploadImage from "../../assets/images/AddImage.svg";
const addPatient = () => {
  return (
    <>
      <AppBar heading={"Add to list"}></AppBar>
      <Grid className="Bottom_header">
        <Typography className="Patient_heading"></Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: " #25C8B4" }}
          className="Patient_button"
        >
          Add To List
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
        <Paper elevation={3} sx={{ borderRadius: "20px" }}>
          <Grid className="uploadimg">
            <label>
              <input
                style={{ display: "none", cursor: "none" }}
                type="file"
                placeholder="Ref."
              />
              <img src={UploadImage}></img>
            </label>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              //   margin: 10,
            }}
          >
            <div className="flex-form">
              <input type="text" placeholder="Patient ID" disabled />
              <input type="input" placeholder="12345" name="refNum" />
            </div>
            <div className="flexform">
              <input type="text" placeholder="First Name" disabled />
              <input type="input" name="Type here" placeholder="Type here" />
            </div>
            <div className="flexforminput">
              <input type="text" placeholder="Last Name" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flexform">
              <input type="text" placeholder="Date of Birth" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flexforminput">
              <input type="text" placeholder="ID" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flexform">
              <input type="text" placeholder="Mobile Number" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flexforminput">
              <input type="text" placeholder="Email Address" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flex-form">
              <input type="text" placeholder="Address" disabled />
              <input type="input" placeholder="12345" name="Type here" />
            </div>
            <div className="flexform">
              <input type="text" placeholder="Problem Name" disabled />
              <input type="input" name="refNum" placeholder="Type here" />
            </div>
            <div className="flexforminput">
              <input type="text" placeholder="Description" disabled />
              <input type="input" placeholder="Type here" />
            </div>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default addPatient;
