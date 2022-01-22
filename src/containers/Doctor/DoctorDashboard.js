import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/common/AppBar";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Eclipse3 from "../../assets/images/Eclipse3.svg";
import Eclipse4 from "../../assets/images/Eclipse4.svg";
import { ReactComponent as Calendar } from "../../assets/images/Calendar.svg";
import { ReactComponent as Hospitalicon } from "../../assets/images/Hospital.svg";
import { ReactComponent as Emailicon } from "../../assets/images/email.svg";
import { ReactComponent as Callicon } from "../../assets/images/call.svg";

import Api from "../../api";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  // func to get current project
  const getPatients = async () => {
    let response;
    try{
      response = await Api("get", `/patients/`);
      const patientsData = response.data.data;
      setPatients(patientsData);
    }catch(e){
      // Do nothing
    }
  };

  const navToAddPatient = async () => {
    navigate("/doctor/dashboard/add_patient");
  }

  const navToPatientProfile = async (id) => {
    navigate(`/doctor/dashboard/patient_profile/${id}`);
  }

  return (
    <>
      <AppBar heading={"Dashboard"}></AppBar>
      <Grid className="Bottom_header">
        <Typography className="Patient_heading">Patients</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: " #25C8B4" }}
          className="Patient_button"
          onClick={navToAddPatient}
        >
          Add Patient
        </Button>
      </Grid>

      <Grid container spacing={1} className="patient_maindiv">
        {patients.map((item) => (
          <>
            <Grid
              xs={10}
              sm={10}
              md={2}
              className={`${
                item.status == "nonActive" ? "nonActiveClas" : "Patient_details"
              }`}
              onClick={() => navToPatientProfile(`${item._id}`)}
            >
              <img className="Eclipse" src={item.gender == "male" ? Eclipse3 : Eclipse4} alt="" />
              <Typography className="PatientName">{`${item.first_name} ${item.last_name}`}</Typography>
              <Typography className="Patientid">{`Patient ID: ${item.patient_id}`}</Typography>
              <Typography className="PatientAge">
                <Calendar className="Icons"></Calendar>
                {20}
              </Typography>
              <Typography className="PatientAge">
                <Hospitalicon className="Icons"></Hospitalicon>
                {item.problem_name}
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

export default DoctorDashboard;
