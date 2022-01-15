import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Headerlogo from "../../assets/images/Headerlogo.svg";
import Grid from "@mui/material/Grid";
import Notificationicon from "../../assets/images/circle_notifications.svg";
import Settingicon from "../../assets/images/settings.svg";

const ResponsiveAppBar = (props) => {
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: " #136773",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
        }}
      >
        <Grid className="Headerlogo_div">
          <img className="Headerlogo" src={Headerlogo} alt="" />
          <Typography className="HeaderHeading">{props.heading}</Typography>
        </Grid>
        <Box className="Headerlogodiv">
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <img src={Notificationicon} alt="" />
              <img src={Settingicon} alt="" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
