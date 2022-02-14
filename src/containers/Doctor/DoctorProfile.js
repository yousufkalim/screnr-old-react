import React, { useState, useEffect } from "react";
import TherapistProfile from "../../components/common/TherapistProfile";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

import * as FormValidations from "../../validations";

const DoctorProfile = (props) => {
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

    const isValidated = FormValidations.editProfileDoctor(data);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsLoading(true);

      const body = new FormData();

      body.append("phone", data.get("Phone"));
      body.append("address", data.get("Address"));
      body.append("image", profileImage);

      response = await Api("put", "/therapists", body);

      if (response.data) {
        toast.success("Profile updated successfully!");

        navigate("/doctor/dashboard");
      }
    } catch (e) {
      console.trace(e);
    }

    setIsLoading(false);
    setToEdit(false);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <form noValidate onSubmit={toEditCallback}>
            <AppBar
              className="Appbar_background"
              heading={"User Profile"}
            ></AppBar>
            <Grid className="Bottom_header">
              <Typography
                className="Patient_heading"
                sx={{ fontSize: "20px !important" }}
              ></Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: " #25C8B4",
                  // padding: "10px 60px 10px 60px !Important",
                }}
                className="Patient_button"
                type="submit"
              >
                {toEdit ? "Save" : "Edit"}
              </Button>
            </Grid>
            <Box
              className="userprofile"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  mt: 5,
                  width: "50%",
                  height: "100%",
                },
                borderRadius: "20px",
                background: "#F6FAFB",
                paddingBottom: "5%",
              }}
            >
              <TherapistProfile
                {...profile}
                toEdit={toEdit}
                profileImage={profileImage}
                handleImageSelect={handleImageSelect}
              />
            </Box>
          </form>
        </>
      )}
    </>
  );
};

export default DoctorProfile;
