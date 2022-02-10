import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Eclipse3 from "../../assets/images/Eclipse3.svg";
import Eclipse4 from "../../assets/images/Eclipse4.svg";
import AppBar from "../../components/common/AppBar";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import MobileBottomBar from "../../components/common/MobileBottomBar";

import { toast } from "react-toastify";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

import * as FormValidations from "../../validations";

import assetsURL from "../../utils/Assets";
import { handleLogout, getUser } from "../../utils/Auth";

const PatientProfile = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [toEdit, setToEdit] = useState(false);
  let [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  // func to get current project
  const getProfile = async () => {
    let response;
    try {
      response = await Api("get", `/auth`);
      const profileData = response.data.user;
      setProfile(profileData);
      setIsLoading(false);
    } catch (e) {
      console.trace(e);
    }
  };

  const toEditCallback = (event) => {
    event.preventDefault();

    if (!toEdit) {
      setToEdit(true);
    } else {
      handleSubmit(event);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  // Calling profile-update api with profile data
  const handleSubmit = async (event) => {
    if (isLoading) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const isValidated = FormValidations.editProfilePatient(data);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      const body = new FormData();

      body.append("phone", data.get("Mobile Number"));
      body.append("address", data.get("Address"));
      body.append("image", profileImage);

      const user = getUser();

      setIsLoading(true);

      response = await Api("put", `/patients/${user._id}`, body);

      if (response.data) {
        toast.success("Profile updated successfully!");

        navigate("/patient/dashboard");
      }
    } catch (e) {
      console.trace(e);
    }

    setIsLoading(false);
    setToEdit(false);
  };

  const handleLogoutSubmit = () => {
    handleLogout(navigate);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <form noValidate onSubmit={toEditCallback}>
            <AppBar className="Appbar_background" heading={"Profile"}></AppBar>
            <Grid className="Bottom_header">
              <Typography
                className="Patient_heading"
                // sx={{ fontSize: "20px !important" }}
              >
                User Profile
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#454238 !important",
                  fontSize: "14px !important",
                }}
                className="Patient_button"
                type="submit"
              >
                {toEdit ? "Save" : "Edit Profile"}
              </Button>
            </Grid>
            <Box
              className="userprofile"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  mt: 4,
                  ml: 2,
                  mr: 2,
                  width: "50%",
                },
                borderRadius: "20px",
                background: "#F6FAFB",
              }}
            >
              <Paper
                elevation={3}
                className="patientprofile"
                sx={{
                  borderRadius: "20px",
                  paddingBottom: "10%",
                  width: "50%",
                }}
              >
                <Grid className="profileimg">
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
                          : profile.avatar
                          ? assetsURL(profile.avatar)
                          : // : profile.gender == "male" ? Eclipse3 : Eclipse4
                            Eclipse3
                      }
                      className="imageContainer"
                    />
                  </label>
                </Grid>
                <Typography className="PatientName">{`${profile.first_name} ${profile.last_name}`}</Typography>
                <Typography className="PatientInfo">
                  <Hospitalicon
                    sx={{ marginRight: "10px" }}
                    className="Profile-Icons"
                  />
                  {profile.problem_name}
                </Typography>
                <div
                  className="Patient_id"
                  style={{
                    marginBottom: "3%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90% !important",
                  }}
                >
                  <input type="text" placeholder="Patient ID" disabled />
                  <input
                    disabled={true}
                    type="number"
                    name="Patient ID"
                    placeholder="Patient ID"
                    defaultValue={profile.patient_id}
                  />
                </div>

                <div
                  className="profilediv"
                  style={{ background: "#fff important" }}
                >
                  <div className="P_profiles-input">
                    <input type="text" disabled />
                    <input
                      disabled={!toEdit}
                      type="number"
                      name="Mobile Number"
                      placeholder="Phone"
                      defaultValue={profile.phone}
                    />
                  </div>
                  <div className="P_profiles-input1">
                    <input type="text" disabled />
                    <input
                      disabled
                      type="input"
                      name="Date of Birth"
                      placeholder="01/18/1990"
                      defaultValue={new Date(profile.dob).toLocaleDateString(
                        "en-US"
                      )}
                    />
                  </div>
                  <div className="P_profiles-input3">
                    <input type="text" disabled />
                    <input
                      disabled={true}
                      type="input"
                      name="Email"
                      placeholder="Email"
                      defaultValue={profile.email}
                    />
                  </div>
                  <div className="P_profiles-input4">
                    <input type="text" disabled />
                    <input
                      disabled={!toEdit}
                      type="input"
                      name="Address"
                      placeholder="Address"
                      defaultValue={profile.address}
                    />
                  </div>
                </div>
              </Paper>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#454238",
                  fontSize: "16px !important",
                  margin: "20px 0px !important",
                }}
                className="Patient_button"
                onClick={handleLogoutSubmit}
              >
                Logout
              </Button>
            </Box>
          </form>
          <MobileBottomBar className="bottomnav" activeIndex={3} />
        </>
      )}
    </>
  );
};

export default PatientProfile;
