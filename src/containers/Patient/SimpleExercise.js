import React from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as Setting } from "../../assets/images/setting.svg";
import { ReactComponent as Exercise } from "../../assets/images/Exercise.svg";
import { ReactComponent as Scorecard } from "../../assets/images/Scorecard.svg";
import { ReactComponent as Physiotherapist } from "../../assets/images/Physiotherapist.svg";

const SimpleExercise = () => {
  const [step, setStep] = React.useState(1);

  return (
    <>
      <AppBar></AppBar>
      <Grid className="Bottom_header">
        <Typography
          className="Patient_heading"
          sx={{ fontSize: "20px !important" }}
        >
          Simple Exercise
        </Typography>
      </Grid>

      <Grid
        item
        sx={12}
        sm={12}
        md={6}
        className="Exercise_detaill"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          "& > :not(style)": {
            mt: 2,
          },

          borderRadius: "20px",
        }}
      >
        {step === 1 ? (
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              borderRadius: "20px",
            }}
          >
            <div className="Profiledivs Questiondiv">
              <div className="profiles-div ">
                <input
                  type="text"
                  placeholder="Question 1"
                  disabled
                  style={{ background: "#fff" }}
                />
                <input
                  type="input"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div2">
                <input
                  type="text"
                  placeholder="Answer Type"
                  disabled
                  style={{ background: "#fff" }}
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Short answer"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Description"
                  style={{ background: "#fff" }}
                  disabled
                />
                <textarea
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                />
              </div>
            </div>
            <div className="Profile-div2 Profiledivs Questiondiv">
              <div className="profiles-div">
                <input
                  type="text"
                  placeholder="Question 1"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div2">
                <input
                  type="text"
                  placeholder="Answer Type"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Short answer"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Description"
                  style={{ background: "#fff" }}
                  disabled
                />
                <textarea
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                />
              </div>
            </div>
            <div className="Profile-div2 Profiledivs Questiondiv">
              <div className="profiles-div">
                <input
                  type="text"
                  placeholder="Question 1"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div2">
                <input
                  type="text"
                  placeholder="Answer Type"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Short answer"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div3">
                <input
                  type="text"
                  placeholder="Description"
                  style={{ background: "#fff" }}
                  disabled
                />
                <textarea
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                />
              </div>
            </div>
            <div className="Profile-div2 Profiledivs Questiondiv">
              <div className="profiles-div">
                <input
                  type="text"
                  placeholder="Question 1"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div className="profiles-div2">
                <input
                  type="text"
                  placeholder="Answer Type"
                  style={{ background: "#fff" }}
                  disabled
                />
                <input
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="Short answer"
                  style={{ background: "#fff" }}
                  disabled
                />
              </div>
              <div
                className="profiles-div3"
                style={{ marginBottom: "0px !important" }}
              >
                <input
                  type="text"
                  placeholder="Description"
                  style={{ background: "#fff" }}
                  disabled
                />
                <textarea
                  type="input"
                  name="Type here"
                  id="inputplaceholder1"
                  placeholder="What is the Lorem Ipsum?"
                  style={{ background: "#fff" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", margin: "-10% 0 0 13%" }}>
              <Checkbox
                defaultChecked
                variant="body1"
                className="checkbox"
                sx={{
                  color: "#FBA622",
                  "&.Mui-checked": {
                    color: "#FBA622",
                  },
                }}
              />
              <Typography className="checkboxtitle">
                Acknowledging the response
              </Typography>
            </div>
            <div className="AssessmentButton">
              <Button
                variant="contained"
                onClick={(e) => setStep(2)}
                sx={{
                  backgroundColor: " #25C8B4",
                }}
              >
                Send Assessment
              </Button>
            </div>
          </Paper>
        ) : step == 2 ? (
          <>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                borderRadius: "20px",
              }}
            >
              <div className="Profiledivs Questiondiv">
                <div className="profiles-div ">
                  <input
                    type="text"
                    placeholder="Question 1"
                    disabled
                    style={{ background: "#fff" }}
                  />
                  <input
                    type="input"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div2">
                  <input
                    type="text"
                    placeholder="Answer Type"
                    disabled
                    style={{ background: "#fff" }}
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="Short answer"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div3">
                  <input
                    type="text"
                    placeholder="Description"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <textarea
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                  />
                </div>
              </div>
              <div className="Profile-div2 Profiledivs Questiondiv">
                <div className="profiles-div">
                  <input
                    type="text"
                    placeholder="Question 1"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div2">
                  <input
                    type="text"
                    placeholder="Answer Type"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="Short answer"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div3">
                  <input
                    type="text"
                    placeholder="Description"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <textarea
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                  />
                </div>
              </div>
              <div className="Profile-div2 Profiledivs Questiondiv">
                <div className="profiles-div">
                  <input
                    type="text"
                    placeholder="Question 1"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div2">
                  <input
                    type="text"
                    placeholder="Answer Type"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="Short answer"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div3">
                  <input
                    type="text"
                    placeholder="Description"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <textarea
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                  />
                </div>
              </div>
              <div className="Profile-div2 Profiledivs Questiondiv">
                <div className="profiles-div">
                  <input
                    type="text"
                    placeholder="Question 1"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div className="profiles-div2">
                  <input
                    type="text"
                    placeholder="Answer Type"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <input
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="Short answer"
                    style={{ background: "#fff" }}
                    disabled
                  />
                </div>
                <div
                  className="profiles-div3"
                  style={{ marginBottom: "0px !important" }}
                >
                  <input
                    type="text"
                    placeholder="Description"
                    style={{ background: "#fff" }}
                    disabled
                  />
                  <textarea
                    type="input"
                    name="Type here"
                    id="inputplaceholder1"
                    placeholder="What is the Lorem Ipsum?"
                    style={{ background: "#fff" }}
                  />
                </div>
              </div>

              <div className="AssessmentButton">
                <Button
                  variant="contained"
                  onClick={(e) => setStep(2)}
                  sx={{
                    background: "#919B9B",
                    mb: 2,
                    mt: "-10%",
                  }}
                >
                  Already submitted
                </Button>
              </div>
            </Paper>
          </>
        ) : (
          ""
        )}
        <BottomNavigation sx={{ width: "100%", background: " #136773" }}>
          <BottomNavigationAction
            icon={<Physiotherapist />}
          ></BottomNavigationAction>
          <BottomNavigationAction icon={<Scorecard />}></BottomNavigationAction>
          <BottomNavigationAction icon={<Exercise />}></BottomNavigationAction>
          <BottomNavigationAction icon={<Setting />}></BottomNavigationAction>
        </BottomNavigation>
      </Grid>
    </>
  );
};

export default SimpleExercise;
