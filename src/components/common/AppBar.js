import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Headerlogo from "../../assets/images/Headerlogo.svg";
import Grid from "@mui/material/Grid";
import Notificationicon from "../../assets/images/circle_notifications.svg";
import Settingicon from "../../assets/images/settings.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Screnr from "../../assets/images/screnr.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/Auth";

import { getUser } from "../../utils/Auth"

const ResponsiveAppBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutSubmit = () => {
    handleLogout(navigate);
  }
  const navToProfileScreen = () => {
    const user = getUser();

    if(user.role == "therapist"){
      navigate("/doctor/dashboard/profile");
    } else {
      navigate("/patient/dashboard/profile");
    }
  }
  const navToDashboardScreen = () => {
    const user = getUser();

    if(user.role == "therapist"){
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  }
  return (
    <AppBar
      position="sticky"
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
        <Grid className="Headerlogo_div" onClick={navToDashboardScreen}>
          <img className="Headerlogo" src={Screnr} alt="" />
          <div className="logo"></div>
          <p className="healthlogo">Health</p>
        </Grid>
        <div className="header">
          <Typography className="HeaderHeading">{props.heading}</Typography>
        </div>
        <Box className="Headerlogodiv">
          <Tooltip title="Open settings">
            <IconButton
              // sx={{ p: 0, ml: 2 }}

              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img src={Notificationicon} alt="" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open settings">
            <IconButton
              // sx={{ p: 0, ml: 2 }}
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img src={Settingicon} alt="" />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={navToProfileScreen}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogoutSubmit}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
