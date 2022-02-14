import React, { useEffect, useState } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Therapist from "../../assets/images/Therapisti.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import assetsURL from "../../utils/Assets";
import { toast } from "react-toastify";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

import * as FormValidations from "../../validations";

import { handleLogout } from "../../utils/Auth";

const ChangePassword = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

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

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (isLoading) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const isValidated = FormValidations.editPasswordDoctor(data);

    if (!isValidated) {
      return;
    }

    let response;

    try {

      const body = {
        "oldPassword": data.get("Old Password"),
        "newPassword": data.get("New Password")
      };

      setIsLoading(true);

      response = await Api("put", `/auth/password/${profile._id}`, body);

      if (response.data) {
        toast.success("Password changed successfully!");

        handleLogout(navigate);
      }
    } catch (e) {
      console.trace(e);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <form noValidate onSubmit={handleSubmit}>
            <AppBar
              className="Appbar_background"
              heading={"Change Password"}
            />
            <Grid className="Bottom_header">
              <Typography
                className="Patient_heading"
                sx={{ fontSize: "20px !important" }}
              ></Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: " #25C8B4",
                }}
                className="Patient_button"
              >
                Change Password
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
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  background: "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
                  width: "100%",
                  height: "100%",
                  paddingBottom: "5%",
                  marginTop: "10px",
                }}
              >
                <Grid className="profileimg" sx={{ marginTop: "5%" }}>
                  <img
                  className="imageContainer"
                    src={
                      profile.avatar
                        ? assetsURL(profile.avatar)
                        : // : props.gender == "male" ? Eclipse3 : Eclipse4
                        Therapist
                    }
                  />
                </Grid>
                <Typography className="PatientName">{`${profile.first_name} ${profile.last_name}`}</Typography>
                <Typography className="PatientInfo">
                  <Hospitalicon
                    sx={{ marginRight: "10px" }}
                    className="Profile-Icons"
                  ></Hospitalicon>
                  {profile.doc_specialization}
                </Typography>
                <div className="Profilediv2">
                  <div className="profiles-div">
                    <input type="text" placeholder="Last Password Changed" disabled />
                    <input
                      disabled
                      type="input"
                      name="Last Password Change"
                      placeholder="N/A"
                      defaultValue={
                        profile.last_password_changed
                          ? new Date(profile.last_password_changed).toLocaleDateString(
                              "en-US"
                            )
                          : "N/A"
                      }
                    />
                  </div>
                  <div className="profiles-div2">
                    <input type="text" placeholder="Old Password" disabled />
                    <input
                      type="input"
                      name="Old Password"
                      placeholder="**********"
                    />
                  </div>
                  <div className="profiles-div2">
                    <input type="text" placeholder="New Password" disabled />
                    <input
                      type="input"
                      name="New Password"
                      placeholder="**********"
                    />
                  </div>
                  <div className="profiles-div3">
                    <input type="text" placeholder="Account Created" disabled />
                    <input
                      disabled
                      type="input"
                      name="Account Created"
                      defaultValue={new Date(profile.createdAt).toLocaleDateString("en-US")}
                    />
                  </div>
                </div>
              </Paper>
            </Box>
          </form>
        </>
      )}
    </>
  );
}

export default ChangePassword;
