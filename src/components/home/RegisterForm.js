import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { handleLogin } from "../../utils/Auth";
import Api from "../../api/index";

import * as FormValidations from "../../validations";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = React.useState({
    password: "",
    showPassword: false,
  });
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState({
    password: "",
    showPassword: false,
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    doc_specialization: "",
    phone: "",
  });
  const { first_name, last_name, email, doc_specialization, phone } = formData;
  const [gender, setGender] = React.useState("");
  const [date, setDate] = React.useState(null);

  const navigate = useNavigate();

  const handleGenderSelect = (event) => {
    setGender(event.target.value);
  };

  const handleClickShowPassword = () => {
    setPasswordValue({
      ...passwordValue,
      showPassword: !passwordValue.showPassword,
    });
  };
  const handleClickShowconfirmPassword = () => {
    setConfirmPasswordValue({
      ...confirmPasswordValue,
      showPassword: !confirmPasswordValue.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setPasswordValue({ ...passwordValue, [prop]: event.target.value });
  };

  const handleMouseDownconfrimPassword = (event) => {
    event.preventDefault();
  };
  const handleChangepassword = (prop) => (event) => {
    setConfirmPasswordValue({
      ...confirmPasswordValue,
      [prop]: event.target.value,
    });
  };

  // onChange Function for Input Field
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navToSignIn = async () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    if (loading) {
      return;
    }

    let newData = {
      ...formData,
      dob: date,
      password: passwordValue.password,
      confirm_password: confirmPasswordValue.password,
      gender,
    };

    const isValidated = FormValidations.register(newData);

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setLoading(true);

      response = await Api("post", `/therapists`, newData);

      if (response.data) {
        toast.success("User registered successfully");

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
    <Grid container spacing={1} className="Patient_login_maindiv">
      <Grid item xs={false} sm={4} md={6}>
        <img className="Login_img" src={logo} alt="" />
        <img className="Login_img1" src={LoginVector} alt="" />
      </Grid>
      <Grid item xs={false} sm={4} md={6}>
        <Box className="Login_Box">
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="first_name"
                  name="first_name"
                  value={first_name}
                  onChange={onChange}
                  placeholder="Enter first name"
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="last_name"
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  placeholder="Enter last name"
                  className="register_input_field"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
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
                  value={email}
                  onChange={onChange}
                  placeholder="abc@xyz.com"
                  className="register_input_field"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  className="register_input_field"
                  id="password"
                  name="password"
                  type={passwordValue.showPassword ? "text" : "password"}
                  value={passwordValue.password}
                  placeholder="Password"
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordValue.showPassword ? (
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  className="register_input_field"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordValue.showPassword ? "text" : "password"}
                  value={confirmPasswordValue.password}
                  placeholder="Confirm Password"
                  onChange={handleChangepassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowconfirmPassword}
                        onMouseDown={handleMouseDownconfrimPassword}
                        edge="end"
                      >
                        {confirmPasswordValue.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Gender
                </InputLabel>
                <Select
                  displayEmpty
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleGenderSelect}
                  className="register_input_field"
                  renderValue={(value) =>
                    value.length > 0 ? value : "Enter Gender"
                  }
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Date of birth
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={(_) => setDate(_)}
                    renderInput={(params) => <TextField {...params} />}
                    maxDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Specialization
                </InputLabel>
                <OutlinedInput
                  id="doc_specialization"
                  name="doc_specialization"
                  value={doc_specialization}
                  onChange={onChange}
                  placeholder="Enter specialization"
                  className="register_input_field"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className="inputlabel"
                >
                  Phone no
                </InputLabel>
                <OutlinedInput
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="Enter phone no"
                  className="register_input_field"
                  type="number"
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className="login_button"
              sx={{
                mt: 3,
                mb: 2,
                background: "#454238",
                boxShadow: "0px 15px 45px rgba(49, 36, 36, 0.29)",
                textTransform: "capitalize",
              }}
              onClick={handleSignUp}
            >
              Signup
            </Button>

            <Button
              variant="contained"
              className="back_button"
              sx={{
                mt: 3,
                mb: 2,
                ml: 2,
                background: "#454238",
                boxShadow: "0px 15px 45px rgba(49, 36, 36, 0.29)",
                textTransform: "capitalize",
              }}
              onClick={navToSignIn}
            >
              Back To Login
            </Button>

            <Grid container spacing={1}>
              <img className="mobileviewpic" src={LoginVector} alt="" />
            </Grid>
          </Box>
        </Box>
      </Grid>
      )
    </Grid>
  );
};

export default RegisterForm;
