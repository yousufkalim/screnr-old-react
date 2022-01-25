import React from "react";
import TherapistProfile from "../../components/common/TherapistProfile";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

const UserProfile = () => {
  return (
    <>
      <AppBar heading={"User Profile"}></AppBar>
      <Grid className="Bottom_header">
        <Typography
          className="Patient_heading"
          sx={{ fontSize: "20px !important" }}
        ></Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #25C8B4",
            padding: "10px 60px 10px 60px !Important",
          }}
          className="Patient_button"
        >
          Edit
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
        }}
      >
        <TherapistProfile issue={"Physical Therapist"}></TherapistProfile>
      </Box>
    </>
  );
};

export default UserProfile;
