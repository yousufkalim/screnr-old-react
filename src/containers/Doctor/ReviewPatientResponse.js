import React, { useState, useEffect, useRef } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Profile from "../../components/common/PatientProfile";
import Paper from "@mui/material/Paper";
import ContentEditable from "react-contenteditable";

import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

const ReviewPatientResponse = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [assessment, setAssessment] = useState(null);
  const [patient, setPatient] = useState(null);
  const [questionFeedbacks, setQuestionFeedbacks] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const fillQuestionFeedbacks = (assessmentData) => {
    const questions = assessmentData.questions;
    const questionFeedbacksArr = [];
    for (let i = 0; i < questions.length; i++) {
      questionFeedbacksArr.push({
        question_id: questions[i]._id,
        feedback: "",
      });
    }
    setQuestionFeedbacks(questionFeedbacksArr);
  };

  function updateQuestionFeedback(index, text) {
    const obj = {
      question_id: questionFeedbacks[index].question_id,
      feedback: text,
    };

    const questionsFeedbacksCopy = [...questionFeedbacks];
    questionsFeedbacksCopy[index] = obj;
    setQuestionFeedbacks(questionsFeedbacksCopy);
  }

  const loadData = async () => {
    const patientID = await getAssessment();
    await getPatient(patientID);
  };

  // func to get current project
  const getAssessment = async () => {
    let response;
    try {
      response = await Api("get", `/assessments/getassessment/${params.id}`);
      const assessmentData = response.data.assessment;
      setAssessment(assessmentData);
      fillQuestionFeedbacks(assessmentData);
      return assessmentData.patient._id;
    } catch (e) {
      console.trace(e);
    }
  };

  // func to get current project
  const getPatient = async (patientID) => {
    let response;
    try {
      response = await Api("get", `/patients/${patientID}`);
      const patientData = response.data.patient;
      setPatient(patientData);
      setIsLoading(false);
    } catch (e) {
      console.trace(e);
    }
  };

  // Calling create assessment
  const handleSubmit = async () => {
    if (isProcessing) {
      return;
    }

    let response;

    try {
      const body = {
        status: "reviewed",
        feedbacks: questionFeedbacks,
        note: noteText,
      };

      setIsProcessing(true);

      response = await Api(
        "put",
        `/assessments/reviewassessment/${params.id}`,
        body
      );
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);

    if (response) {
      toast.success("Assessment reviewed successfully!");
      navToDashboard();
    }
  };

  const navToDashboard = async () => {
    navigate("/doctor/dashboard");
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <AppBar
            className="Appbar_background"
            heading={"Review Patient Response"}
          ></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography className="Patient_heading">
              {`Patient ID: ${patient.patient_id}`}
            </Typography>
            <Button
              disabled={assessment.status == "reviewed" ? true : false}
              variant="contained"
              sx={{ backgroundColor: " #25C8B4" }}
              className="Patient_button"
              onClick={() => handleSubmit()}
            >
              {assessment.status == "reviewed"
                ? "Already Checked"
                : "Mark as Checked"}
            </Button>
          </Grid>
          <Grid container spacing={1} sx={{ background: "#F6FAFB", mt: 3 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="profilecontainer"
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "48.5%",
                  height: "75% !important",
                  mt: 10,
                  marginLeft: "3%",

                  mr: 0,
                  mb: 2,
                },
                borderRadius: "20px",
              }}
            >
              <Profile {...patient}></Profile>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="Exercise_detail"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "92%",
                  mt: 10,
                  mr: 0,
                },
                borderRadius: "20px",
                mb: 10,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  background:
                    "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
                  width: "85%",
                  height: "95%",
                }}
              >
                <div className="Profilediv2">
                  <div className="profiles-div">
                    <input type="txt" placeholder="Exercise" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder={assessment.exercise}
                    />
                  </div>
                  <div className="profiles-div2">
                    <input type="text" placeholder="Sets" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder={assessment.sets}
                    />
                  </div>
                  <div className="profiles-div3">
                    <input type="text" placeholder="Reps" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder={assessment.reps}
                    />
                  </div>
                </div>
                <Typography className="Caption">Theoretical</Typography>
                {assessment.questions.map((e, i) => (
                  <QuestionListTile
                    {...e}
                    assessment={assessment}
                    index={i}
                    key={i}
                    updateQuestionFeedback={updateQuestionFeedback}
                  />
                ))}
                <div className="Profilediv2">
                  <div className="textarea1">
                    <input type="text" placeholder="Note" disabled />

                    <textarea
                      className="pp"
                      disabled={assessment.status == "reviewed" ? true : false}
                      type="input"
                      id="feed"
                      placeholder="Write Note for Yourself....."
                      defaultValue={assessment.note}
                      onChange={(event) =>
                        setNoteText(event.currentTarget.value)
                      }
                    />
                  </div>
                </div>
                <div
                  className="Review_buttons"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "4%",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: " #25C8B4",
                        fontSize: "14px !important",
                      }}
                      className="Patient_review_button"
                      onClick={() => toast(`Response sent to patient.`)}
                    >
                      Send Response to Patient
                    </Button>
                  </div>
                  <div>
                    <Button
                      disabled={assessment.status == "reviewed" ? true : false}
                      variant="contained"
                      sx={{
                        backgroundColor: " #25C8B4",
                        fontSize: "14px !important",
                      }}
                      className="Patient_review_button"
                      onClick={() => handleSubmit()}
                    >
                      {assessment.status == "reviewed"
                        ? "Already Checked"
                        : "Mark as Checked"}
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

function QuestionListTile(props) {
  const { updateQuestionFeedback } = props;

  return (
    <>
      <div className="Profilediv2">
        <div className="profiles-div">
          <input
            type="txt"
            placeholder={`Question ${props.index + 1}`}
            disabled
          />
          <input
            disabled
            type="input"
            placeholder="Questions"
            defaultValue={props.title}
          />
        </div>
        <div className="textarea">
          <input
            type="text"
            placeholder={
              props.type == "text"
                ? "Answer"
                : props.type == "mcqs"
                ? "Options"
                : props.type == "checkboxes"
                ? "Options"
                : ""
            }
            disabled
          />
          {props.type == "text" ? (
            <textarea disabled type="input" placeholder={props.value} />
          ) : props.type == "mcqs" ? (
            <MCQSAnswers
              assessment={props.assessment}
              question={props}
              answers={props.answers}
              questionIndex={props.index}
            />
          ) : props.type == "checkboxes" ? (
            <ChecklistAnswers
              assessment={props.assessment}
              question={props}
              answers={props.answers}
              questionIndex={props.index}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="profiles-div3">
          <input type="text" placeholder="Feedback" id="feedback" disabled />
          <input
            disabled={props.assessment.status == "reviewed" ? true : false}
            type="input"
            id="feed"
            placeholder={
              props.assessment.status == "reviewed"
                ? props.feedback
                : "Write feedback to send to patient..."
            }
            onChange={(event) =>
              updateQuestionFeedback(props.index, event.target.value)
            }
          />
        </div>
      </div>
    </>
  );
}

function MCQSAnswers(props) {
  const { answers } = props;
  return (
    <div>
      {answers
        .filter((v) => props.question.value.includes(v))
        .map((v, i) => (
          <MCQSAnswersListTile index={i} value={v} key={i} />
        ))}
    </div>
  );
}

function MCQSAnswersListTile(props) {
  const text = useRef(props.value);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "start",
        marginTop: "5px",
        marginBottom: "-10px",
        color: "#25C8B4",
      }}
    >
      <input
        type="radio"
        name={`option_${props.index}_${Math.floor(
          Math.random() * 1000000 + 1
        )}`}
        checked={true}
        onChange={(e) => {
          console.log(`HERE.`);
        }}
        style={{
          height: "15px",
          width: "15px",
          marginRight: "20px",
          marginTop: "12px",
          accentColor: "#454238",
        }}
        key={`input_${props.index}`}
      />
      <ContentEditable
        html={text.current}
        disabled
        key={`label_${props.index}`}
      />
    </div>
  );
}

function ChecklistAnswers(props) {
  const { answers, questionIndex, updateQuestionAnswer } = props;

  return (
    <div>
      {answers
        .filter((v) => props.question.value.includes(v))
        .map((v, i) => (
          <ChecklistAnswersListTile
            index={i}
            value={v}
            questionIndex={questionIndex}
            updateQuestionAnswer={updateQuestionAnswer}
            key={i}
          />
        ))}
    </div>
  );
}

function ChecklistAnswersListTile(props) {
  const text = useRef(props.value);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "start",
        marginTop: "5px",
        marginBottom: "-10px",
      }}
    >
      <input
        type="checkbox"
        name={`option_${props.index}_${Math.floor(
          Math.random() * 1000000 + 1
        )}`}
        checked={true}
        onChange={(e) => {}}
        style={{
          height: "15px",
          width: "15px",
          marginRight: "20px",
          marginTop: "12px",
          accentColor: "#454238",
        }}
        key={`input_${props.index}`}
      />
      <ContentEditable
        html={text.current}
        disabled
        key={`label_${props.index}`}
      />
    </div>
  );
}

export default ReviewPatientResponse;
