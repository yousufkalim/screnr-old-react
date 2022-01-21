import React from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Profile from "../../components/common/PatientProfileComponent";
import Paper from "@mui/material/Paper";

const RespondedPatientReview = () => {
  return (
    <>
      <AppBar heading={"Review Patient Response"}></AppBar>
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
          Completed
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
            width: "100%",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,

              height: "60%",
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
          md={6}
          className="Exercise_detail"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,
            },
            borderRadius: "20px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: "20px",
              background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
              width: "85%",
              height: "92%",
            }}
          >
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Exercise" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Shoulder pain"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Sets" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="3"
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Reps" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="10"
                />
              </div>
            </div>
            <Typography className="Caption">Motion Capture Sessions</Typography>
            <div className="profilediv">
              <div className="profiles-div">
                <input type="text" placeholder="Details" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="details"
                  placeholder="To check all details expand this tab please"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Start Time" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="10:30 am"
                />
              </div>
              <div className="Patientresponse">
                <input type="text" placeholder="Spent Time" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="45 minutes"
                />
              </div>
              <div className="Patientresponse">
                <input
                  id="feedback"
                  type="text"
                  placeholder="Feedback"
                  disabled
                />
                <input
                  id="feed"
                  type="input"
                  name="Type here"
                  placeholder="Write feedback to send to patient..."
                  disabled
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Screenshots" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder=""
                />
              </div>
            </div>
            <Typography className="Caption">Theoretical</Typography>
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Exercise" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Shoulder pain"
                />
              </div>
              <div className="textarea">
                <input type="text" placeholder="Sets" disabled />
                <textarea
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Feedback"
                  id="feedback"
                  disabled
                />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="feed"
                  placeholder="Write feedback to send to patient..."
                />
              </div>
            </div>
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Exercise" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Shoulder pain"
                />
              </div>
              <div className="textarea">
                <input type="text" placeholder="Sets" disabled />
                <textarea
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Feedback"
                  id="feedback"
                  disabled
                />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="feed"
                  placeholder="Write feedback to send to patient..."
                />
              </div>
            </div>
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Exercise" disabled />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Shoulder pain"
                />
              </div>
              <div className="textarea">
                <input type="text" placeholder="Sets" disabled />
                <textarea
                  disabled
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Feedback"
                  id="feedback"
                  disabled
                />
                <input
                  disabled
                  type="input"
                  name="Type here"
                  id="feed"
                  placeholder="Write feedback to send to patient..."
                />
              </div>
            </div>
            <div className="Profilediv2">
              <div className="textarea1">
                <input type="text" placeholder="Note" disabled />
                <textarea
                  type="input"
                  name="Type here"
                  id="feed"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default RespondedPatientReview;
