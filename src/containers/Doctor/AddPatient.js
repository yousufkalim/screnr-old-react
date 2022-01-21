import React, { useState } from "react";
import AppBar from "../../components/common/AppBar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import UploadImage from "../../assets/images/AddImage.svg";
import { makeStyles } from "@mui/styles";
// import "react-datepicker/dist/react-datepicker.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

import { Validators, formValidator } from "../../utils/Validate";
import { borderRadius } from "@mui/system";

const useFormFieldStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-root:focused": {
      borderColor: "green",
    },
  },
}));

const AddPatient = () => {
  const classess = useFormFieldStyles();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  let [dateOfBirth, setDateOfBirth] = useState(null);

  const vaildateInput = (data) => {
    const validationArr = [
      {
        name: "Patient ID",
        validationFunction: () =>
          Validators.lengthValidator("Patient ID", data.get("Patient ID"), 6),
      },
      {
        name: "First Name",
        // validationFunction: () => Validators.userNameValidator("First Name", data.get("First Name"))
      },
      {
        name: "Middle Name",
        // validationFunction: () => Validators.userNameValidator("Middle Name", data.get("Middle Name"))
      },
      {
        name: "Last Name",
        // validationFunction: () => Validators.userNameValidator("Last Name", data.get("Last Name"))
      },
      {
        name: "Mobile Number",
        validationFunction: () =>
          Validators.phoneNoValidator(
            "Mobile Number",
            data.get("Mobile Number")
          ),
      },
      {
        name: "Email Address",
        validationFunction: () =>
          Validators.emailValidator("Email Address", data.get("Email Address")),
      },
      {
        name: "Address",
      },
      {
        name: "Problem Name",
      },
      {
        name: "Problem Description",
      },
      {
        name: "Password",
        validationFunction: () =>
          Validators.lengthValidator("Password", data.get("Password"), 8),
      },
      {
        name: "Confirm Password",
        validationFunction: () =>
          Validators.lengthValidator(
            "Confirm Password",
            data.get("Confirm Password"),
            8
          ),
      },
    ];

    const validated = formValidator(data, validationArr);

    return validated;
  };

  // Calling create patient
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const isValidated = vaildateInput(data);

    if (!isValidated) {
      return;
    }

    if (dateOfBirth == null) {
      toast.error("Date of Birth can't be empty");
    }

    if (data.get("Password") != data.get("Confirm Password")) {
      toast.error("Password is not the same as Confirm Password.");
    }

    await Api("post", "/patients", {
      first_name: data.get("First Name"),
      middle_name: data.get("Middle Name"),
      last_name: data.get("Last Name"),
      phone: data.get("Mobile Number"),
      email: data.get("Email Address"),
      password: data.get("Password"),
      confirmPassword: data.get("Confirm Password"),
      gender: "male", // TODO: Fake
      dob: dateOfBirth,
      national_id: "1234",
      patient_id: data.get("Patient ID"),
      address: data.get("Address"),
      problem_name: data.get("Problem Name"),
      problem_description: data.get("Problem Description"),
    }).then((response) => {
      toast.success("Patient created successfully!");
      navToDashboard();
    });
  };

  const navToDashboard = async () => {
    navigate("/doctor/dashboard");
  };

  return (
    <>
      <AppBar heading={"Add to list"}></AppBar>
      <form noValidate onSubmit={handleSubmit}>
        <Grid className="Bottom_header">
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
              m: 10,
              width: "80%",
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
              <div className="flex-form" style={{ marginBottom: "3%" }}>
                <input type="text" placeholder="Patient ID" disabled />
                <input
                  type="number"
                  name="Patient ID"
                  placeholder="12345"
                  id="placeholder"
                />
              </div>

              <div className="flexform">
                <input type="text" placeholder="First Name" disabled />
                <input
                  type="input"
                  name="First Name"
                  id="placeholder"
                  placeholder="Type here"
                />
              </div>
              <div className="flexforminput">
                <input type="text" placeholder="Middle Name" disabled />
                <input
                  type="input"
                  name="Middle Name"
                  placeholder="Type here"
                  id="placeholder"
                />
              </div>
              <div className="flex_forminput">
                <input type="text" placeholder="last Name" disabled />
                <input
                  type="input"
                  name="Middle Name"
                  id="placeholder"
                  placeholder="Type here"
                />
              </div>
              <div className="selectform">
                <input type="text" placeholder="Gender" disabled />
                <select name="cars" id="cars" id="placeholder" type="input">
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Others</option>
                </select>
              </div>
              <div className="addform">
                <input type="text" placeholder="Address" disabled />

                <input
                  type="input"
                  name="Address"
                  id="placeholder"
                  placeholder="12345"
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                <DesktopDatePicker
                  fulWidth
                  className={classess.input}
                  // label="Date of Birth"
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
                  id="placeholder"
                />
              </div>
              <div className="addform">
                <input type="text" placeholder="Email Address" disabled />
                <input
                  type="input"
                  name="Email Address"
                  placeholder="Type here"
                  id="placeholder"
                />
              </div>
              <div className="flex-form">
                <input type="text" placeholder="Address" disabled />
                <input
                  type="input"
                  name="Address"
                  id="placeholder"
                  placeholder="12345"
                />
              </div>
              <div className="selectform">
                <input type="text" placeholder="Problem Name" disabled />
                <input
                  id="placeholder"
                  type="input"
                  name="Problem Name"
                  placeholder="Type here"
                />
              </div>
              <div className="addform">
                <input type="text" placeholder="Problem Description" disabled />
                <input
                  id="placeholder"
                  type="input"
                  name="Problem Description"
                  placeholder="Type here"
                />
              </div>
              <div className="flexform">
                <input type="text" placeholder="Password" disabled />
                <input
                  id="placeholder"
                  type="password"
                  name="Password"
                  placeholder="Type here"
                />
              </div>
              <div className="flexforminput" style={{ marginBottom: "3%" }}>
                <input type="text" placeholder="Confirm Password" disabled />
                <input
                  id="placeholder"
                  type="password"
                  name="Confirm Password"
                  placeholder="Type here"
                  style={{ marginBottomRightRadisu: "10px" }}
                />
              </div>
            </Grid>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default AddPatient;
