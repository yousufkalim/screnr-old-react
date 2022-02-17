import React, { useEffect, useState } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import Doctor from "../../assets/images/Therapisti.svg";
import MobileBottomBar from "../../components/common/MobileBottomBar";

import Api from "../../api";
import assetsURL from "../../utils/Assets";

const AllTherapists = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    getTherapists();
  }, []);

  // func to get patient assigned therapists
  const getTherapists = async () => {
    let response;
    try {
      response = await Api("get", `/therapists/`);
      const therapistsData = response.data.Therapists;
      setTherapists(therapistsData);
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <>
      <AppBar className="Appbar_background" />
      <Box
        className="userprofile"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            width: "87% !Important",
            height: "100%",
            mb: 3,
            mt: 4,
          },
          borderRadius: "20px",
          background: "#F6FAFB",
        }}
      >
        {therapists?.map((e, i) => (
          <TherapistListTile {...e} index={i} />
        ))}
      </Box>
      <MobileBottomBar className="bottomnav" activeIndex={0} />
    </>
  );
};

function TherapistListTile(props) {
  return (
    <>
      <Paper
        elevation={3}
        className="Therapist"
        sx={{
          borderRadius: "20px",
          paddingBottom: "5%",
        }}
      >
        <Grid className="profileimg" sx={{ marginTop: "5%" }}>
          <img
            src={props.avatar ? assetsURL(props.avatar) : Doctor}
            className="imageContainer"
          />
        </Grid>
        <div style={{ marginBottom: "10%", marginTop: "6%" }}>
          <Typography className="PatientName">{`${props.first_name} ${props.last_name}`}</Typography>
          <Typography className="PatientInfo">
            <Hospitalicon
              sx={{ marginRight: "10px" }}
              className="Profile-Icons"
            />
            {props.doc_specialization}
          </Typography>
        </div>
        <div className="profilediv">
          <div className="P_profiles-input">
            <input type="text" disabled id="name" />
            <input
              disabled
              type="input"
              name="Phone"
              placeholder="Phone"
              defaultValue={props.phone}
            />
          </div>
          <div className="P_profiles-input3">
            <input type="text" id="name" disabled />
            <input
              disabled
              type="input"
              name="Email"
              placeholder="Email"
              defaultValue={props.email}
            />
          </div>
          <div className="P_profiles-input1">
            <input type="text" id="name" disabled />
            <input
              disabled
              type="input"
              name="Hospital"
              placeholder="Hospital"
              defaultValue={props.hospital}
            />
          </div>
          <div className="P_profiles-input4">
            <input type="text" id="name" disabled />
            <input
              disabled
              type="input"
              name="Address"
              placeholder="Address"
              defaultValue={props.address}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default AllTherapists;
