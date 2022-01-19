import React from "react";
import AppBar from "../../components/common/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as Calendar } from "../../assets/images/date_range.svg";
import { ReactComponent as Medicalicon } from "../../assets/images/medical.svg";
const therapyExercises = () => {
  let data = [
    {
      exercise: "Leg Exercise",
      date: "14-Dec-2022",
      issue: "Therapist  Maria",
      tastStatus: "Virtual Physical Therapy",
      status: "Active",
    },
    {
      exercise: "Leg Exercise",
      date: "14-Dec-2022",
      issue: "Therapist  Maria",
      tastStatus: "Completed",
      status: "nonActive",
    },
    {
      exercise: "Leg Exercise",
      date: "14-Dec-2022",
      issue: "Therapist  Maria",
      tastStatus: "Virtual Physical Therapy",
      status: "Active",
    },
    {
      exercise: "Leg Exercise",
      date: "14-Dec-2022",
      issue: "Therapist  Maria",
      tastStatus: "Completed",
      status: "nonActive",
    },
    {
      exercise: "Leg Exercise",
      date: "14-Dec-2022",
      issue: "Therapist  Maria",
      tastStatus: "Virtual Physical Therapy",
      status: "Active",
    },
  ];
  return (
    <>
      <AppBar></AppBar>
      <Grid className="Bottom_header">
        <Typography className="Patient_heading">Therapy Exercises</Typography>
      </Grid>
      <Grid container spacing={1} className="patient_maindiv">
        {data.map((item) => (
          <>
            <Grid
              xs={10}
              sm={10}
              md={2}
              className={`Exercise_details ${
                item.status == "nonActive" ? "non_ActiveClas" : ""
              }`}
            >
              <>
                <Typography className="ExerciseName">
                  {item.exercise}
                </Typography>
                <Typography className="PatientAge">
                  <Calendar className="Icons"></Calendar>
                  {item.date}
                </Typography>
                <Typography className="PatientAge">
                  <Medicalicon className="Icons"></Medicalicon>
                  {item.issue}
                </Typography>
              </>

              <Typography
                className={`${
                  item.tastStatus == "Completed"
                    ? "nonActive_testStatus "
                    : "testStatus"
                }`}
              >
                {item.tastStatus}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default therapyExercises;
