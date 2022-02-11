import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

import * as FormValidations from "../../validations";

import assetsURL from "../../utils/Assets";

const EditPatient = (props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  let [gender, setGender] = useState("");
  let [dateOfBirth, setDateOfBirth] = useState(null);
  let [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatient();
  }, []);

  // func to get current project
  const getPatient = async () => {
    let response;
    try {
      response = await Api("get", `/patients/${params.id}`);
      const patientData = response.data.patient;
      setPatient(patientData);
      setGender(patientData.gender);
      setDateOfBirth(patientData.dob);
      setIsLoading(false);
    } catch (e) {
      console.trace(e);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  // Calling create patient
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const isValidated = FormValidations.editPatient(data);

    if (!isValidated) {
      return;
    }

    if (dateOfBirth == null) {
      toast.error("Date of Birth can't be empty");
      return;
    }

    let response;

    try {
      const body = new FormData();

      body.append("first_name",  data.get("First Name"));
      body.append("middle_name",  data.get("Middle Name"));
      body.append("last_name",  data.get("Last Name"));
      body.append("phone",  data.get("Mobile Number"));
      body.append("email",  data.get("Email Address"));
      body.append("gender",  gender);
      body.append("dob",  dateOfBirth);
      body.append("patient_id",  data.get("Patient ID"));
      body.append("address",  data.get("Address"));
      body.append("problem_name",  data.get("Problem Name"));
      body.append("problem_description",  data.get("Problem Description"));
      body.append("image",  profileImage);

      setIsProcessing(true);

      response = await Api("put", `/patients/${params.id}`, body);
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);

    if (response) {
      toast.success("Patient updated successfully!");
      navToDashboard();
    }
  };

  const navToDashboard = async () => {
    navigate("/doctor/dashboard");
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <AppBar
            className="Appbar_background"
            heading={"Edit Patient Details"}
          ></AppBar>
          <form noValidate onSubmit={handleSubmit}>
            <Grid className="Bottom_header">
              <Typography className="Patient_heading"></Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: " #25C8B4" }}
                className="Patient_button"
                type="submit"
              >
                Save
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
                      style={{
                        display: "none",
                        cursor: "none",
                      }}
                      type="file"
                      placeholder="Ref."
                      accept="image/*"
                      onChange={handleImageSelect}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                    />
                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : patient.avatar
                          ? assetsURL(patient.avatar)
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
                    //   margin: 10,
                  }}
                >
                  <div className="flex-form" style={{ marginBottom: "3%" }}>
                    <input type="text" placeholder="Patient ID" disabled />
                    <input
                      type="number"
                      name="Patient ID"
                      placeholder="12345"
                      defaultValue={patient.patient_id}
                    />
                  </div>

                    <div className="flexform">
                      <input type="text" placeholder="First Name" disabled />
                      <input
                        type="input"
                        name="First Name"
                        placeholder="Type here"
                        defaultValue={patient.first_name}
                      />
                    </div>
                    <div className="profiles-div_">
                      <input type="text" placeholder="Middle Name" disabled />
                      <input
                        type="input"
                        name="Middle Name"
                        placeholder="Type here"
                        defaultValue={patient.middle_name}
                      />
                    </div>
                    <div className="flex_forminput">
                      <input type="text" placeholder="Last Name" disabled />
                      <input
                        type="input"
                        name="Last Name"
                        placeholder="Type here"
                        defaultValue={patient.last_name}
                      />
                    </div>
                    <div className="selectform" style={{ marginTop: "3%" }}>
                      <input type="text" placeholder="Gender" disabled />
                      <select name="gender" id="gender" type="input" value={gender} onChange={ (event) => setGender(event.target.value) }>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <div className="addform">
                      <input type="text" placeholder="Address" disabled />
                      <input
                        type="input"
                        name="Address"
                        placeholder="12345"
                        defaultValue={patient.address}
                      />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                      <DesktopDatePicker
                        fulWidth
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
                      defaultValue={patient.phone}
                    />
                  </div>
                  <div className="addform">
                    <input type="text" placeholder="Email Address" disabled />
                    <input
                      type="input"
                      name="Email Address"
                      placeholder="Type here"
                      defaultValue={patient.email}
                    />
                  </div>
                  <div className="selectform">
                    <input type="text" placeholder="Problem Name" disabled />
                    <input
                      type="input"
                      name="Problem Name"
                      placeholder="Type here"
                      defaultValue={patient.problem_name}
                    />
                  </div>
                  <div className="addform">
                    <input
                      type="text"
                      placeholder="Problem Description"
                      disabled
                    />
                    <input
                      type="input"
                      name="Problem Description"
                      placeholder="Type here"
                      defaultValue={patient.problem_description}
                    />
                  </div>
                </Grid>
              </Paper>
            </Box>
          </form>
        </>
      )}
    </>
  );
};

export default EditPatient;
