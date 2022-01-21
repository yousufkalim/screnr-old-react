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

import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/Auth";

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
  const handleSubmitLogout = () => {
    handleLogout(navigate);
  }
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
            <IconButton
              sx={{ p: 0, ml: 2 }}
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img src={Notificationicon} alt="" />
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
          <MenuItem onClick={handleSubmitLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
