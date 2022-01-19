import React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/common/AppBar";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Eclipse1 from "../../assets/images/Eclipse1.svg";
import Eclipse2 from "../../assets/images/Eclipse2.svg";
import Eclipse3 from "../../assets/images/Eclipse3.svg";
import Eclipse4 from "../../assets/images/Eclipse4.svg";
import Eclipse5 from "../../assets/images/Eclipse5.svg";
import { ReactComponent as Calendar } from "../../assets/images/Calendar.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import { ReactComponent as Emailicon } from "../../assets/images/email.svg";
import { ReactComponent as Callicon } from "../../assets/images/call.svg";

const PatientDashboard = () => {
  // const [filter, setFilter] = useState("All");
  // const FILTER_MAP = {
  //   All: () => true,
  //   Active: (task) => !task.completed,
  //   Completed: (task) => task.completed,
  // };
  // const FILTER_NAMES = Object.keys(FILTER_MAP);
  let data = [
    {
      img: Eclipse1,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "Active",
    },
    {
      img: Eclipse2,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse3,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse4,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "Active",
    },
    {
      img: Eclipse5,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse2,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse3,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "Active",
    },
    {
      img: Eclipse4,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse5,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
    {
      img: Eclipse2,
      name: "Farhan Shakir",
      id: "Patient ID: 12345",
      age: "19 years",
      issue: "Shoulder pain",
      phone: "+92 321 1234567",
      email: "abc@xyz.com",
      status: "nonActive",
    },
  ];
  return (
    <>
      <AppBar heading={"Dashboard"}></AppBar>
      <Grid className="Bottom_header">
        <Typography className="Patient_heading">Patients</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: " #25C8B4" }}
          className="Patient_button"
        >
          Add Patient
        </Button>
      </Grid>

      <Grid container spacing={1} className="patient_maindiv">
        {data.map((item) => (
          <>
            <Grid
              xs={10}
              sm={10}
              md={2}
              className={`${
                item.status == "nonActive" ? "nonActiveClas" : "Patient_details"
              }`}
            >
              <img className="Eclipse" src={item.img} alt="" />
              <Typography className="PatientName">{item.name}</Typography>
              <Typography className="Patientid">{item.id}</Typography>
              <Typography className="PatientAge">
                <Calendar className="Icons"></Calendar>
                {item.age}
              </Typography>
              <Typography className="PatientAge">
                <Hospitalicon className="Icons"></Hospitalicon>
                {item.issue}
              </Typography>
              <Typography className="PatientAge">
                <Callicon className="Icons"></Callicon>
                {item.phone}
              </Typography>
              <Typography className="PatientAge">
                <Emailicon className="Icons"></Emailicon>
                {item.email}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default PatientDashboard;
