import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import LoginVector from "../../assets/images/loginimg.svg";
import logo from "../../assets/images/Logo.svg";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Link } from "react-router-dom";
import DatePicker from "@mui/lab/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api/index";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    doc_specailization: "",
  });
  const { first_name, last_name, email, phone, doc_specailization } = formData;
  const [Confirmvalues, setConfirmValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [Confirmloginvalues, setConfirmloginValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [gender, setGender] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [date, setDate] = React.useState(null);

  const handleGenderSelect = (event) => {
    setGender(event.target.value);
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowconfirmPassword = () => {
    setConfirmValues({
      ...Confirmvalues,
      showPassword: !Confirmvalues.showPassword,
    });
  };
  const handleMouseDownconfrimPassword = (event) => {
    event.preventDefault();
  };
  const handleChangepassword = (prop) => (event) => {
    setConfirmValues({ ...Confirmvalues, [prop]: event.target.value });
  };

  // onChange Function for Input Field
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    setLoading(true);
    let newData = { ...formData, dob: date, password: values.password, gender };
    console.log("newdaat", newData);
    let res = await api("post", `/therapists`, newData);
    if (res.data) {
      setLoading(false);
      toast.success("User Register Successfully");
    }
  };

  return (
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
            // onSubmit={handleLoginSubmit}
            sx={{ mt: 1 }}
          >
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
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
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
                        {values.showPassword ? (
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
                  type={Confirmvalues.showPassword ? "text" : "password"}
                  value={Confirmvalues.password}
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
                        {Confirmvalues.showPassword ? (
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
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    id="dob"
                    name="dob"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
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
                  id="doc_specailization"
                  name="doc_specailization"
                  value={doc_specailization}
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
              }}
              onClick={handleSignUp}
            >
              Sign up
            </Button>

            <Link to="/login">Login</Link>

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
