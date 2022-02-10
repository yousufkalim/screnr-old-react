import React, { useState } from "react";
import AppBar from "../../components/common/AppBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import UploadImage from "../../assets/images/AddImage.svg";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Api from "../../api";
import { useNavigate } from "react-router-dom";

import EyeIcon from "../../assets/images/eye.svg";
import * as FormValidations from "../../validations";

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
  let [dateOfBirth, setDateOfBirth] = useState(null);
  let [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  // Calling create patient
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const isValidated = FormValidations.addPatient(data);

    if (!isValidated) {
      return;
    }

    if (dateOfBirth == null) {
      toast.error("Date of Birth can't be empty");
      return;
    }

    if (data.get("Password") != data.get("Confirm Password")) {
      toast.error("Password is not the same as Confirm Password.");
      return;
    }

    let response;

    try {
      const body = new FormData();

      body.append("first_name", data.get("First Name"));
      body.append("middle_name", data.get("Middle Name"));
      body.append("last_name", data.get("Last Name"));
      body.append("phone", data.get("Mobile Number"));
      body.append("email", data.get("Email Address"));
      body.append("password", data.get("Password"));
      body.append("confirmPassword", data.get("Confirm Password"));
      body.append("dob", dateOfBirth);
      body.append("patient_id", data.get("Patient ID"));
      body.append("address", data.get("Address"));
      body.append("problem_name", data.get("Problem Name"));
      body.append("problem_description", data.get("Problem Description"));
      body.append("image", profileImage);

      setLoading(true);

      response = await Api("post", "/patients", body);
    } catch (e) {
      console.trace(e);
    }

    setLoading(false);

    if (response) {
      toast.success("Patient created successfully!");
      navToDashboard();
    }
  };

  const navToDashboard = async () => {
    navigate("/doctor/dashboard");
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isConfrimPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);

  const handleConfirmPasswordVisible = () => {
    setIsConfirmPasswordVisible(!isConfrimPasswordVisible);
  };
  return (
    <>
      <AppBar className="Appbar_background" heading={"Add Patient"}></AppBar>
      <form noValidate onSubmit={handleSubmit}>
        <Grid className="Bottom_header" sx={{ position: "fixed" }}>
          <Typography className="Patient_heading"></Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: " #25C8B4" }}
            className="Patient_button"
            type="submit"
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
              mt: 15,
              mb: 6,
              width: "80%",
              height: "100%",
            },
            borderRadius: "20px",
            background: "#F6FAFB",
          }}
        >
          <Paper
            elevation={3}
            sx={{ borderRadius: "20px", background: "#F6FAFB" }}
          >
            <Grid className="uploadimg">
              <label>
                <input
                  style={{
                    display: "none",
                    cursor: "none",
                  }}
                  type="file"
                  accept="image/*"
                  placeholder="Ref."
                  onChange={handleImageSelect}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />

                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : UploadImage
                  }
                  className="imageContainer"
                />
              </label>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div
                className="flex-form"
                style={{ marginBottom: "3%", background: "#F6FAFB" }}
              >
                <input type="text" placeholder="Patient ID" disabled />
                <input type="number" name="Patient ID" placeholder="12345" />
              </div>

              <div className="flexform">
                <input type="text" placeholder="First Name" disabled />
                <input type="input" name="First Name" placeholder="Type here" />
              </div>
              <div className="profiles-div_">
                <input type="text" placeholder="Middle Name" disabled />
                <input
                  type="input"
                  name="Middle Name"
                  placeholder="Type here"
                />
              </div>
              <div className="flex_forminput" style={{ marginBottom: "2%" }}>
                <input type="text" placeholder="Last Name" disabled />
                <input type="input" name="Last Name" placeholder="Type here" />
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                <DesktopDatePicker
                  fulWidth
                  label="Date of Birth"
                  inputFormat="MM/dd/yyyy"
                  value={dateOfBirth}
                  onChange={(_) => setDateOfBirth(_)}
                  renderInput={(params) => <TextField {...params} />}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
              <div className="flexform" style={{ marginTop: "3%" }}>
                <input type="text" placeholder="Mobile Number" disabled />
                <input
                  type="number"
                  name="Mobile Number"
                  placeholder="Type here"
                />
              </div>
              <div className="addform">
                <input type="text" placeholder="Email Address" disabled />
                <input
                  type="input"
                  name="Email Address"
                  placeholder="Type here"
                />
              </div>
              <div
                className="flex-form"
                style={{ marginBottom: "3%", background: "#F6FAFB" }}
              >
                <input type="text" placeholder="Address" disabled />
                <input type="input" name="Address" placeholder="Type here" />
              </div>
              <div className="selectform">
                <input type="text" placeholder="Problem Name" disabled />
                <input
                  type="input"
                  name="Problem Name"
                  placeholder="Type here"
                />
              </div>
              <div className="addform">
                <input type="text" placeholder="Problem Description" disabled />
                <input
                  type="input"
                  name="Problem Description"
                  placeholder="Type here"
                />
              </div>
              <div className="flexform">
                <input type="text" placeholder="Password" disabled />
                <input
                  type={isConfrimPasswordVisible ? "password" : "txt"}
                  name="Password"
                  placeholder="Type here"
                />
                <img
                  src={EyeIcon}
                  className="eyeicon"
                  onClick={handleConfirmPasswordVisible}
                ></img>
              </div>
              <div className="flexforminput" style={{ marginBottom: "3%" }}>
                <input type="text" placeholder="Confirm Password" disabled />
                <input
                  // type="password"
                  type={isPasswordVisible ? "password" : "txt"}
                  name="Confirm Password"
                  placeholder="Type
                  here"
                  style={{ marginBottomRightRadisu: "10px" }}
                ></input>

                <img
                  src={EyeIcon}
                  className="eyeicon"
                  onClick={handlePasswordVisible}
                ></img>
              </div>
            </Grid>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default AddPatient;
