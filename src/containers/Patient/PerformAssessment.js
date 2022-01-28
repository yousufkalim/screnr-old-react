import React, { useState, useEffect } from "react";
import AppBar from "../../components/common/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";

import Checkbox from "@mui/material/Checkbox";
import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as Setting } from "../../assets/images/setting.svg";
import { ReactComponent as Exercise } from "../../assets/images/Exercise.svg";
import { ReactComponent as Scorecard } from "../../assets/images/Scorecard.svg";
import { ReactComponent as Physiotherapist } from "../../assets/images/Physiotherapist.svg";
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
    for (let i = 0; i < questions.length; i++) {
      questionRepliesArr.push({
        question_id: questions[i]._id,
        value: "",
      });
    }
    setQuestionReplies(questionRepliesArr);
  };

  function updateQuestionAnswer(index, text) {
    const obj = {
      question_id: questionReplies[index].question_id,
      value: text,
    };

    const questionsRepliesCopy = [...questionReplies];
    questionsRepliesCopy[index] = obj;
    setQuestionReplies(questionsRepliesCopy);
  }

  // func to get current project
  const getAssessment = async () => {
    let response;
    try {
      response = await Api("get", `/assessments/getassessment/${params.id}`);
      const assessmentData = response.data.assessment;
      setAssessment(assessmentData);
      fillQuestionReplies(assessmentData);
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
        status: "submitted",
        answer: questionReplies,
      };

      setIsProcessing(true);

      response = await Api(
        "put",
        `/assessments/endassessment/${params.id}`,
        body
      );
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);

    if (response) {
      toast.success("Assessment submitted successfully!");
      navToDashboard();
    }
  };

  const navToDashboard = async () => {
    navigate("/patient/dashboard");
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <AppBar heading={assessment.exercise}></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography
              className="Patient_heading"
              sx={{ fontSize: "20px !important" }}
            >
              Simple Exercise
            </Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh !important",
              marginTop: "12%",
              flexWrap: "wrap",
              "& > :not(style)": {},

              borderRadius: "20px",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "85%",
                borderRadius: "20px",
                marginTop: "5%",
                marginBottom: "12%",
                paddingBottom: "5%",
              }}
            >
              {assessment.questions.map((e, i) => (
                <QuestionListTile
                  {...e}
                  assessment={assessment}
                  index={i}
                  key={i}
                  // style={{ marginTop: "100px", color: "#f2f2f2" }}
                  updateQuestionAnswer={updateQuestionAnswer}
                />
              ))}
            </Paper>

            <div style={{ display: "flex" }}>
              <Checkbox
                defaultChecked
                variant="body1"
                className="checkbox"
                sx={{
                  color: "#FBA622",
                  "&.Mui-checked": {
                    color: "#FBA622",
                  },
                }}
              />
              <Typography className="checkboxtitle">
                Acknowledging the response
              </Typography>
            </div>
            <div className="AssessmentButton">
              <Button
                variant="contained"
                sx={{ backgroundColor: " #25C8B4" }}
                className="Patient_button"
                onClick={() => handleSubmit()}
                disabled={
                  assessment.status == "submitted" ||
                  assessment.status == "reviewed"
                    ? true
                    : false
                }
              >
                {assessment.status == "submitted"
                  ? "Already Submitted"
                  : assessment.status == "reviewed"
                  ? "Aleady Reviewed"
                  : "Send Assessment"}
              </Button>
            </div>
            <BottomNavigation sx={{ width: "100%", background: " #136773" }}>
              <BottomNavigationAction
                icon={<Physiotherapist />}
              ></BottomNavigationAction>
              <BottomNavigationAction
                icon={<Scorecard />}
              ></BottomNavigationAction>
              <BottomNavigationAction
                icon={<Exercise />}
              ></BottomNavigationAction>
              <BottomNavigationAction
                icon={<Setting />}
              ></BottomNavigationAction>
            </BottomNavigation>
          </Grid>
        </>
      )}
    </>
  );
};

function QuestionListTile(props) {
  const { updateQuestionAnswer } = props;

  return (
    <>
      <Grid
        item
        sx={12}
        sm={12}
        md={6}
        className="Exercise_detaill"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
          "& > :not(style)": {
            mt: 2,
          },

          borderRadius: "20px",
        }}
      >
        <div className="Profiledivs Questiondiv">
          <div className="profiles-div ">
            <input
              type="text"
              placeholder={`Question ${props.index + 1}`}
              disabled
              style={{ background: "#fff" }}
            />
            <input
              type="input"
              id="inputplaceholder1"
              placeholder="Question?"
              defaultValue={props.title}
              style={{ background: "#fff" }}
              disabled
            />
          </div>
          <div className="profiles-div2">
            <input
              type="text"
              placeholder="Description"
              style={{ background: "#fff", color: "black" }}
              disabled
            />
            <input
              disabled
              type="input"
              placeholder="Description"
              defaultValue={props.description}
              style={{ background: "#fff" }}
            />
          </div>
          <div className="profiles-div3">
            <input
              type="text"
              placeholder={`Your Answer`}
              style={{ background: "#fff" }}
              disabled
            />
            <textarea
              disabled={
                props.assessment.status == "submitted" ||
                props.assessment.status == "reviewed"
                  ? true
                  : false
              }
              type="input"
              style={{ background: "#fff" }}
              placeholder={
                props.assessment.status == "submitted" ||
                props.assessment.status == "reviewed"
                  ? props.value
                  : "Type your answer here..."
              }
              onChange={(event) =>
                updateQuestionAnswer(props.index, event.target.value)
              }
            />
          </div>
        </div>
      </Grid>
    </>
  );
}

export default PerformAssessment;
