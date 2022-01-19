import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginVector from "../../assets/images/loginimg.svg";
import logo from "../../assets/images/Logo.svg";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { toast } from "react-toastify";
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
import DatePicker from "@mui/lab/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Api from "../../api/index";

const PatientLogin = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
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

  // Calling login api with login data
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("email") === "") {
      toast.error("email not found");
      return;
    } else if (data.get("password") === "") {
      toast.error("password not found");
      return;
    }

    await Api("post", "/auth/login", {
      email: data.get("email"),
      password: data.get("password"),
    }).then((response) => {
      toast.success("Login Successful!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user",  JSON.stringify(response.data.data));
      if (response.data.data.role === "patient") {
        window.location = "/patient/dashboard";
      } else if (response.data.data.role === "therapist") {
        window.location = "/doctor/dashboard";
      } else {
        toast.error("Invalid user role");
        return;
      }
    });
  };

  return (
    <Grid container spacing={1} className="Patient_login_maindiv">
      <Grid item xs={false} sm={4} md={6}>
        <img className="Login_img" src={logo} alt="" />
        <img className="Login_img1" src={LoginVector} alt="" />
      </Grid>
      {step === 1 ? (
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
                  background: "#454238",
                  boxShadow: "0px 15px 45px rgba(49, 36, 36, 0.29)",
                }}
              >
                Sign In
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
                    onClick={(e) => setStep(2)}
                  >
                    Register Now
                  </Button>
                </Grid>
                <img className="mobileviewpic" src={LoginVector} alt="" />
              </Grid>
            </Box>
          </Box>
        </Grid>
      ) : step === 2 ? (
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
                    // labelId="genderLabel"
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
                    placeholder="Enter phone no"
                    className="register_input_field"
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
                  background: "#454238",
                  boxShadow: "0px 15px 45px rgba(49, 36, 36, 0.29)",
                }}
              >
                Sign up
              </Button>
              <Grid container spacing={1}>
                <img className="mobileviewpic" src={LoginVector} alt="" />
              </Grid>
            </Box>
          </Box>
        </Grid>
      ) : (
        " "
      )}
    </Grid>
  );
};

export default PatientLogin;
