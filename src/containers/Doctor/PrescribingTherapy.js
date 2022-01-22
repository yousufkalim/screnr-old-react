import React from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Profile from "../../components/common/PatientProfile";
import Paper from "@mui/material/Paper";
import EditIcon from "../../assets/images/mode.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import AddIcon from "../../assets/images/add.svg";

const PrescribingTherapy = () => {
  return (
    <>
      <AppBar heading={"Prescribing Therapy Exercise"}></AppBar>
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
          Send to patient
        </Button>
      </Grid>
      <Grid container spacing={1} sx={{ background: "#F6FAFB" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className="profilecontainer"
          sx={{
            display: "flex",
            justifyContent: "center",

            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,
              width: "80%",
              height: "85%",
            },
            borderRadius: "20px",
          }}
        >
          <Profile issue="Shoulder pain"></Profile>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className="Exercise_detaill"
          sx={{
            display: "flex",
            justifyContent: "center",

            flexWrap: "wrap",
            "& > :not(style)": {
              m: 10,
              width: "85%",
              height: "85%",
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
            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Exercise" disabled />
                <select name="cars" id="cars" type="input">
                  <option value="">Shoulder pain</option>
                  <option value="">Shoulder pain</option>
                  <option value="">Shoulder pain</option>
                  <option value="">Shoulder pain</option>
                  <option value="">Shoulder pain</option>
                </select>
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Sets" disabled />
                <select name="cars" id="cars" type="input">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                </select>
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Reps" disabled />
                <select name="cars" id="cars" type="input">
                  <option value="">10</option>
                  <option value="">11</option>
                  <option value="">12</option>
                  <option value="">13</option>
                </select>
              </div>
            </div>

            <div className="Profilediv2">
              <div className="profiles-div">
                <input type="text" placeholder="Question 1" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Answer Type" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="Short answer"
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Description" disabled />
                <textarea
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
            </div>
            <div className="iconsdiv">
              <img src={EditIcon} style={{ margin: "10px" }}></img>
              <img src={DeleteIcon} style={{ margin: "10px" }}></img>
              <img src={AddIcon} style={{ margin: "10px" }}></img>
            </div>
            {/* <Grid xs={1} sm={1} md={1} sx={{}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid black",
                    borderRadius: "30px",
                  }}
                >
                  <img src={EditIcon} style={{ padding: "20px" }}></img>
                  <img src={DeleteIcon} style={{ padding: "20px" }}></img>
                  <img src={AddIcon} style={{ padding: "20px" }}></img>
                </div>
              </Grid>
            </Grid> */}

            <div className="Profile-div2">
              <div className="profiles-div">
                <input type="text" placeholder="Question 1" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Answer Type" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="Short answer"
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Description" disabled />
                <textarea
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
            </div>
            <div className="iconsdiv">
              <img src={EditIcon} style={{ margin: "10px" }}></img>
              <img src={DeleteIcon} style={{ margin: "10px" }}></img>
              <img src={AddIcon} style={{ margin: "10px" }}></img>
            </div>
            {/* <Grid
                xs={1}
                sm={1}
                md={1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "space-between",
                  //   marginLeft: "86%",
                  //   marginTop: "-14%",
                  border: "1px solid black",
                  borderRadius: "30px",
                  height: "20% !important",
                }}
              >
                <img src={EditIcon}></img>
                <img src={DeleteIcon}></img>
                <img src={AddIcon}></img>
              </Grid>
            </Grid> */}
            <div className="Profile-div2">
              <div className="profiles-div">
                <input type="text" placeholder="Question 1" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
              <div className="profiles-div2">
                <input type="text" placeholder="Answer Type" disabled />
                <input
                  type="input"
                  
                  
                  placeholder="Short answer"
                />
              </div>
              <div className="profiles-div3">
                <input type="text" placeholder="Description" disabled />
                <textarea
                  type="input"
                  
                  
                  placeholder="What is the Lorem Ipsum?"
                />
              </div>
            </div>
            <div className="iconsdiv">
              <img src={EditIcon} style={{ margin: "10px" }}></img>
              <img src={DeleteIcon} style={{ margin: "10px" }}></img>
              <img src={AddIcon} style={{ margin: "10px" }}></img>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PrescribingTherapy;
