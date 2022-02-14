import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Notificationicon from "../../assets/images/circle_notifications.svg";
import Settingicon from "../../assets/images/settings.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Screnr from "../../assets/images/screnr.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
// import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/Auth";
import { getUser } from "../../utils/Auth";
import { ReactComponent as MenuIcon } from "../../assets/images/menuicon.svg";
const ResponsiveAppBar = (props) => {
  const navigate = useNavigate();

  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const openNotification = Boolean(anchorElNotification);

  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const [anchorElSetting, setAnchorElSetting] = React.useState(null);
  const openSetting = Boolean(anchorElSetting);

  const handleClickSetting = (event) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorElSetting(null);
  };

  // Nav functions for setting
  const handleLogoutSubmit = () => {
    handleLogout(navigate);
  };
  const navToProfileScreen = () => {
    const user = getUser();

    if (user.role == "therapist") {
      navigate("/doctor/dashboard/profile");
    } else {
      navigate("/patient/dashboard/profile");
    }
  };
  const navToDashboardScreen = (props) => {
    const user = getUser();

    if (user.role == "therapist") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };
  return (
    <AppBar
      className={props.className}
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px !important",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          //   alignItems: "center",
        }}
      >
        <Grid
          className="Headerlogo_div"
          sx={{ marginBottom: "-6px" }}
          onClick={navToDashboardScreen}
        >
          <img
            className="Headerlogo"
            src={Screnr}
            alt=""
            style={{ width: "55%", marginBottom: "-5px" }}
          />
          <div className="logo"></div>
          <p className="healthlogo">Health</p>
        </Grid>
        <div className="header">
          <Typography className="HeaderHeading">{props.heading}</Typography>
        </div>
        <Box className="Headerlogodiv">
          <Tooltip title="Open notifications">
            <IconButton
              onClick={handleClickNotification}
              size="small"
              aria-controls={openSetting ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSetting ? "true" : undefined}
            >
              <img
                src={Notificationicon}
                alt=""
                style={{ width: "80%", marginLeft: "30%" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleClickSetting}
              size="small"
              aria-controls={openSetting ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSetting ? "true" : undefined}
            >
              <img src={Settingicon} alt="" style={{ width: "80%" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorElNotification}
          id="account-menu"
          open={openNotification}
          onClose={handleCloseNotification}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#F6FAFB",
              boxShadow: "0px 15px 45px rgba(28, 160, 244, 0.28)",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            {/* <img src={NotificationArrow}></img> */}
            <div style={{ marginLeft: "10px" }}>
              <MenuItem>
                <ListItemIcon>
                  <MenuIcon fontSize="small" />
                </ListItemIcon>
              </MenuItem>
            </div>
            <div style={{ margin: "10px 25px 10px 10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center",
                }}
              >
                <Typography className="NotificationName">Farhan</Typography>
                <Typography className="NotificationMsg">
                  {
                    "Just completed the exercise!".length > 25
                    ? "Just completed the exercise!".substring(0, 24) + "..."
                    : "Just completed the exercise!"
                  }
                </Typography>
              </div>

              <Typography className="NotificationId">
                Patient ID: 12345
              </Typography>
              <Typography className="NotificationTIme">1 min ago</Typography>
            </div>
            <div>
              <Typography
                className="NotificatonStatus"
                sx={{
                  background: "#136773",
                  borderRadius: "0px 20px 20px 0px",
                  padding: "35px",
                  color: "#F6FAFB !important",
                }}
              >
                Review
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#F6FAFB",
              boxShadow: "0px 15px 45px rgba(28, 160, 244, 0.28)",
              borderRadius: "20px",
              margin: "20px",
            }}
          >
            <div style={{ marginLeft: "10px" }}>
              <MenuItem>
                <ListItemIcon>
                  <MenuIcon fontSize="small" />
                </ListItemIcon>
              </MenuItem>
            </div>
            <div style={{ margin: "10px 25px 10px 10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center",
                }}
              >
                <Typography className="NotificationName">Farhan</Typography>
                <Typography className="NotificationMsg">
                  {
                    "Just completed the exercise!".length > 25
                    ? "Just completed the exercise!".substring(0, 24) + "..."
                    : "Just completed the exercise!"
                  }
                </Typography>
              </div>

              <Typography className="NotificationId">
                Patient ID: 12345
              </Typography>
              <Typography className="NotificationTIme">1 min ago</Typography>
            </div>
            <div>
              <Typography
                className="NotificatonStatus"
                sx={{
                  background: "#136773",
                  borderRadius: "0px 20px 20px 0px",
                  padding: "35px",
                  color: "#F6FAFB !important",
                }}
              >
                Review
              </Typography>
            </div>
          </div>
        </Menu>
        <Menu
          anchorEl={anchorElSetting}
          id="account-menu"
          open={openSetting}
          onClose={handleCloseSetting}
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
