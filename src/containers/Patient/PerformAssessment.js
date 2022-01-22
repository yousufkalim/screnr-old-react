import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const PerformAssessment = () => {

  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    getAssessment();
  }, []);

  // func to get current project
  const getAssessment = async () => {
    let response;
    try{
      response = await Api("get", `/assessments/getassessment/${params.id}`);
      const assessmentData = response.data.assessment;
      setAssessment(assessmentData);
      setIsLoading(false);
    }catch(e){
      // Do nothing
    }
  };

  // Calling create assessment
  const handleSubmit = async () => {

    if(isProcessing){
      return;
    }

    setIsProcessing(true);

    let response;

    try{

      // const body = {
      //   patient_id: params.id,
      //   exercise: exercise,
      //   sets: noOfSets,
      //   reps: noOfReps,
      //   due_date: "2022/01/19", // TODO: Fake
      //   type: "simple", // TODO: Fake
      //   questions_array: questions,
      // };

      // response = await Api("post", `/assessments`, body);

    }catch(e){
      // Do nothing
    }

    setIsProcessing(false);

    if(response){
      toast.success("Assessment created successfully!");
      navToDashboard();
    }

  };

  const navToDashboard = async () => {
    navigate("/patient/dashboard");
  };

  return (
    <>
      {isLoading
      ? <></>
      : <>
          <AppBar heading={"Prescribing Therapy Exercise"}></AppBar>
          <Grid className="Bottom_header">
            <Button
              variant="contained"
              sx={{ backgroundColor: " #25C8B4" }}
              className="Patient_button"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>
          <Grid container spacing={10} sx={{ background: "#F6FAFB", marginTop: "100px" }}>
            {
              assessment.questions.map(
                (e, i) => 
                <QuestionListTile
                  {...e}
                  index={i}
                  key={i}
                  style={{marginTop: "100px", color: "#f2f2f2"}}
                />
              )
            }
          </Grid>
        </>
      }
    </>
  );
};

function QuestionListTile(props){

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        className="Exercise_detaill"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 10,
            width: "85%",
            height: "85%",
          },
          borderRadius: "20px",
        }}
      >
        <div className="Profile-div2">
          <div className="profiles-div">
            <input type="text" placeholder={`Question ${props.index + 1}`} disabled />
            <input
              disabled
              type="input"
              placeholder="Question?"
              defaultValue={props.title}
            />
          </div>
          <div className="profiles-div3">
            <input type="text" placeholder="Description" disabled />
            <textarea
              disabled
              type="input"
              placeholder="Description"
              defaultValue={props.description}
            />
          </div>
          <div className="profiles-div3">
            <input type="text" placeholder={`Your Answer`} disabled />
            <input
              type="input"
              placeholder="Type your answer here..."
            />
          </div>
        </div>
      </Grid>
    </>
  );

}

export default PerformAssessment;
