import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const PerformAssessment = () => {

  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [assessment, setAssessment] = useState(null);
  const [questionReplies, setQuestionReplies] = useState([]);

  useEffect(() => {
    getAssessment();
  }, []);

  const fillQuestionReplies = (assessmentData) => {
    const questions = assessmentData.questions;
    const questionRepliesArr = [];
    for( let i = 0; i < questions.length; i++ ){
      questionRepliesArr.push({
        question_id: questions[i]._id,
        value: ""
      });
    }
    setQuestionReplies(questionRepliesArr);
  }

  function updateQuestionAnswer(index, text){
    const obj = {
      "question_id": questionReplies[index].question_id,
      "value": text,
    }

    const questionsRepliesCopy = [...questionReplies];
    questionsRepliesCopy[index] = obj;
    setQuestionReplies(questionsRepliesCopy);
  };

  // func to get current project
  const getAssessment = async () => {
    let response;
    try{
      response = await Api("get", `/assessments/getassessment/${params.id}`);
      const assessmentData = response.data.assessment;
      setAssessment(assessmentData);
      fillQuestionReplies(assessmentData);
      setIsLoading(false);
    }catch(e){
      console.trace(e);
    }
  };

  // Calling create assessment
  const handleSubmit = async () => {

    if(isProcessing){
      return;
    }

    let response;

    try{

      const body = {
        status:"submitted",
        answer: questionReplies
      };

      setIsProcessing(true);

      response = await Api("put", `/assessments/endassessment/${params.id}`, body);

    }catch(e){
      console.trace(e);
    }

    setIsProcessing(false);

    if(response){
      toast.success("Assessment submitted successfully!");
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
          <AppBar heading={assessment.exercise}></AppBar>
          <Grid className="Bottom_header">
            <Button
              variant="contained"
              sx={{ backgroundColor: " #25C8B4" }}
              className="Patient_button"
              onClick={() => handleSubmit()}
              disabled={ (assessment.status == "submitted" || assessment.status == "reviewed")  ? true : false}
            >
              {
                assessment.status == "submitted"
                ? "Already Submitted"
                : assessment.status == "reviewed"
                ? "Aleady Reviewed"
                : "Send Assessment"
              }
            </Button>
          </Grid>
          <Grid container spacing={10} sx={{ background: "#F6FAFB", marginTop: "100px" }}>
            {
              assessment.questions.map(
                (e, i) => 
                <QuestionListTile
                  {...e}
                  assessment={assessment}
                  index={i}
                  key={i}
                  style={{marginTop: "100px", color: "#f2f2f2"}}
                  updateQuestionAnswer={updateQuestionAnswer}
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

  const { updateQuestionAnswer } = props;

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
              disabled={ (props.assessment.status == "submitted" || props.assessment.status == "reviewed") ? true : false }
              type="input"
              placeholder={ (props.assessment.status == "submitted" || props.assessment.status == "reviewed") ? props.value : "Type your answer here..." }
              onChange={ (event) => updateQuestionAnswer(props.index, event.target.value) }
            />
          </div>
          {
            !props.feedback
            ? <></>
            : <>
                <div className="profiles-div3">
                  <input type="text" placeholder={`Feedback`} disabled />
                  <input
                    disabled={true}
                    type="input"
                    placeholder={ props.feedback ? props.feedback : "Feedback..." }
                    onChange={ (event) => updateQuestionAnswer(props.index, event.target.value) }
                  />
                </div>
              </>
          }
        </div>
      </Grid>
    </>
  );

}

export default PerformAssessment;
