import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Profile from "../../components/common/PatientProfile";
import Paper from "@mui/material/Paper";

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
        feedbacks: questionFeedbacks
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
          <AppBar heading={"Review Patient Response"}></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography
              className="Patient_heading"
              sx={{ fontSize: "20px !important" }}
            >
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
                  width: "42%",
                  height: "640px !important",
                  mt: 7,
                  ml: 0,
                  mr: 3,
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
                  mt: 10,
                  mr: 4,
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
                  height: "92%",
                }}
              >
                <div className="Profilediv2">
                  <div className="profiles-div">
                    <input type="text" placeholder="Exercise" disabled />
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
                {/* <Typography className="Caption">Motion Capture Sessions</Typography>
                <div className="profilediv">
                  <div className="profiles-div">
                    <input type="text" placeholder="Details" disabled />
                    <input
                      disabled
                      type="input"
                      id="details"
                      placeholder="To check all details expand this tab please"
                    />
                  </div>
                  <div className="profiles-div2">
                    <input type="text" placeholder="Start Time" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder="10:30 am"
                    />
                  </div>
                  <div className="Patientresponse">
                    <input type="text" placeholder="Spent Time" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder="45 minutes"
                    />
                  </div>
                  <div className="Patientresponse">
                    <input
                      id="feedback"
                      type="text"
                      placeholder="Feedback"
                      disabled
                    />
                    <input
                      id="feed"
                      type="input"
                      placeholder="Write feedback to send to patient..."
                      disabled
                    />
                  </div>
                  <div className="profiles-div3">
                    <input type="text" placeholder="Screenshots" disabled />
                    <input
                      disabled
                      type="input"
                      placeholder=""
                    />
                  </div>
                </div> */}
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
                      disabled={assessment.status == "reviewed" ? true : false}
                      type="input"
                      id="feed"
                      placeholder="Write Note for Yourself....."
                      defaultValue={ assessment.note }
                      onChange={(event) => setNoteText(event.currentTarget.value)}
                    />
                  </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "4%"}}>
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: " #25C8B4",
                        fontSize: "14px !important",
                      }}
                      className="Patient_review_button"
                      onClick={ () => toast(`Response sent to patient.`) }
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
            type="text"
            placeholder={`Question ${props.index + 1}`}
            disabled
          />
          <input disabled type="input" placeholder={props.title} />
        </div>
        <div className="textarea">
          <input
            type="text"
            placeholder={`Answer ${props.index + 1}`}
            disabled
          />
          <textarea disabled type="input" placeholder={props.value} />
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

export default ReviewPatientResponse;
