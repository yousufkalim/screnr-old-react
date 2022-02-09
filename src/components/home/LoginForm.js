import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import LoginVector from "../../assets/images/loginimg.svg";
import logo from "../../assets/images/Logo.svg";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import Api from "../../api/index";
import { handleLogin } from "../../utils/Auth";

import { useNavigate } from "react-router-dom";

import * as FormValidations from "../../validations";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [Confirmloginvalues, setConfirmloginValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const navToRegister = () => {
    navigate("/register");
  };
  const handleClickShowloginPassword = () => {
    setConfirmloginValues({
      ...Confirmloginvalues,
      showPassword: !Confirmloginvalues.showPassword,
    });
  };
  const handleMouseDownloginPassword = (event) => {
    event.preventDefault();
  };
  const handleChangelogin = (prop) => (event) => {
    setConfirmloginValues({
      ...Confirmloginvalues,
      [prop]: event.target.value,
    });
  };

  // Calling login api with login data
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const isValidated = FormValidations.login(data);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setLoading(true);

      response = await Api("post", "/auth/login", {
        email: data.get("email"),
        password: data.get("password"),
      });

      if (response.data) {
        toast.success("Login successful!");

        handleLogin(response.data.token, response.data.data);

        if (response.data.data.role === "patient") {
          window.location = "/patient/dashboard";
        } else if (response.data.data.role === "therapist") {
          window.location = "/doctor/dashboard";
        } else {
          toast.error("Invalid user role");
          return;
        }
      }
    } catch (e) {
      console.trace(e);
    }

    setLoading(false);
  };

  return (
    <div className="main_container">
      <Grid container spacing={1} className="Patient_login_maindiv">
        <Grid item xs={false} sm={4} md={6}>
          <img className="Login_img" src={logo} alt="" />
          <img className="Login_img1" src={LoginVector} alt="" />
        </Grid>
        <Grid item xs={false} sm={4} md={6}>
          <Box className="Login_Box">
            <Box
              component="form"
              noValidate
              onSubmit={handleLoginSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    className="inputlabel"
                  >
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    placeholder="abc@xyz.com"
                    className="inputfield"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    className="inputlabel"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    className="inputfield"
                    id="password"
                    name="password"
                    type={Confirmloginvalues.showPassword ? "text" : "password"}
                    value={Confirmloginvalues.password}
                    placeholder="Password"
                    onChange={handleChangelogin("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowloginPassword}
                          onMouseDown={handleMouseDownloginPassword}
                          edge="end"
                        >
                          {Confirmloginvalues.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                className="login_button"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#454238 !important",
                  boxShadow: "0px 0px 20px rgba(49, 36, 36, 0.29)",
                  textTransform: "Capitalize",
                }}
              >
                Login
              </Button>
              <Grid container spacing={1}>
                <Grid md={12}>
                  <Typography
                    component="h5"
                    variant="h5"
                    className="helpertext"
                  >
                    Don't have an account?
                  </Typography>
                </Grid>
                <Grid sm={12} xs={12} md={12}>
                  <Button
                    variant="text"
                    className="swtich_FormBtn"
                    sx={{ textTransform: "Capitalize" }}
                    onClick={navToRegister}
                  >
                    Register Now
                  </Button>
                </Grid>
                <img className="mobileviewpic" src={LoginVector} alt="" />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
