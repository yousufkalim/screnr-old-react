import React, { useState, useEffect, useRef } from "react";
import AppBar from "../../components/common/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import MobileBottomBar from "../../components/common/MobileBottomBar";
import ContentEditable from "react-contenteditable";

import Api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import * as FormValidations from "../../validations";

const PerformAssessment = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [assessment, setAssessment] = useState(null);
  const [questionReplies, setQuestionReplies] = useState([]);

  const [isResponseAcknowledged, setIsResponseAcknowledged] = useState(true);

  useEffect(() => {
    getAssessment();
  }, []);

  const fillQuestionReplies = (assessmentData) => {
    const questions = assessmentData.questions;
    const questionRepliesArr = [];
    for (let i = 0; i < questions.length; i++) {
      questionRepliesArr.push({
        question_id: questions[i]._id,
        value: [],
      });
    }
    setQuestionReplies(questionRepliesArr);
  };

  function updateQuestionAnswer(index, textArr) {
    const obj = {
      question_id: questionReplies[index].question_id,
      value: textArr,
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

    if(!isResponseAcknowledged){
      toast.error("Please check the acknowledge response box.");
      return;
    }

    const validated = FormValidations.assessmentQuestionsPerform(questionReplies);

    if(!validated){
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
          <AppBar
            className="Appbar_background"
            heading={assessment.exercise}
          ></AppBar>
          <Grid className="Bottom_header" sx={{ boxShadow: "none" }}>
            <Typography
              className="Patient_heading"
              sx={{
                marginLeft: "25px !important",
              }}
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
              alignContent: "center",
              width: "100%",

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
                marginLeft: "4%",
                marginTop: "4%",
                marginBottom: "20%",
                paddingBottom: "5%",
              }}
            >
              {assessment.questions.map((e, i) => (
                <QuestionListTile
                  {...e}
                  assessment={assessment}
                  index={i}
                  key={i}
                  updateQuestionAnswer={updateQuestionAnswer}
                />
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px !important",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={isResponseAcknowledged}
                  className="checkbox"
                  sx={{
                    color: "#FBA622",
                    "&.Mui-checked": {
                      color: "#FBA622",
                    },
                  }}
                  onClick={() => setIsResponseAcknowledged(!isResponseAcknowledged)}
                />
                <Typography className="checkboxtitle">
                  Acknowledging the response
                </Typography>
              </div>
              <div className="AssessmentButton">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: " #25C8B4",
                    fontSize: "16px !important",
                  }}
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
            </Paper>

            <MobileBottomBar className="bottomnav" />
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
          <div className="profiles-div" style={{}}>
            <input
              type="txt"
              placeholder={`Question ${props.index + 1}`}
              disabled
              style={{
                background: "#fff",
              }}
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
              placeholder={
                props.type == "text"
                  ? "Description"
                  : props.type == "mcqs"
                  ? "Multiple Options"
                  : props.type == "checkboxes"
                  ? "Please check all the right one's"
                  : ""
              }
              defaultValue={props.description}
              style={{ background: "#fff" }}
            />
          </div>
          <div className="profiles-div4">
            <input
              type="text"
              placeholder={`${props.type == "text" ? "Answer" : "Options"}`}
              disabled
              style={{ background: "#fff", color: "black" }}
            />
            {props.type == "text" ? (
              <textarea
                disabled={
                  props.assessment.status == "submitted" ||
                  props.assessment.status == "reviewed"
                    ? true
                    : false
                }
                type="input"
                style={{ background: "#fff", color: "black" }}
                placeholder={
                  props.assessment.status == "submitted" ||
                  props.assessment.status == "reviewed"
                    ? props.value
                    : "Type your answer here..."
                }
                onChange={(event) =>
                  updateQuestionAnswer(props.index, [event.target.value])
                }
              />
            ) : props.type == "mcqs" ? (
              <MCQSAnswers
                assessment={props.assessment}
                question={props}
                answers={props.answers}
                questionIndex={props.index}
                updateQuestionAnswer={updateQuestionAnswer}
                style={{ background: "#fff !important", color: "black" }}
              />
            ) : props.type == "checkboxes" ? (
              <ChecklistAnswers
                assessment={props.assessment}
                question={props}
                answers={props.answers}
                questionIndex={props.index}
                updateQuestionAnswer={updateQuestionAnswer}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </Grid>
    </>
  );
}

function MCQSAnswers(props) {
  const { answers, questionIndex, updateQuestionAnswer } = props;

  const [checkedMCQIndex, setCheckedMCQIndex] = useState(null);

  useEffect(() => {
    fillExistingResponse();
  }, []);

  const fillExistingResponse = () => {
    if (
      props.assessment.status == "submitted" ||
      props.assessment.status == "reviewed"
    ) {
      const indexOfChecked = answers.findIndex(
        (v) => v == props.question.value
      );
      setCheckedMCQIndex(indexOfChecked);
    }
  };

  const updateCheckedMCQIndex = (value) => {
    if (
      props.assessment.status == "submitted" ||
      props.assessment.status == "reviewed"
    ) {
      // Do nothing.
      return;
    }

    setCheckedMCQIndex(value);
    updateQuestionAnswer(questionIndex, [answers[value]]);
  };

  return (
    <div>
      {answers.map((v, i) => (
        <MCQSAnswersListTile
          index={i}
          value={v}
          isChecked={i == checkedMCQIndex}
          updateCheckedMCQIndex={updateCheckedMCQIndex}
          questionIndex={questionIndex}
          key={i}
        />
      ))}
    </div>
  );
}

function MCQSAnswersListTile(props) {
  const { updateCheckedMCQIndex } = props;

  const text = useRef(props.value);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "start",
        marginTop: "5px",
        marginBottom: "-10px",
        background: "#fff !important",
      }}
    >
      <input
        type="radio"
        name={`option_${props.index}`}
        checked={props.isChecked}
        onChange={(e) => updateCheckedMCQIndex(props.index)}
        style={{
          height: "15px",
          width: "15px",
          marginRight: "20px",
          marginTop: "12px",
          background: "#fff !important",
          accentColor: "#454238",
        }}
        key={`input_${props.index}`}
      />
      <ContentEditable
        disabled
        html={text.current}
        key={`label_${props.index}`}
      />
    </div>
  );
}

function ChecklistAnswers(props) {
  const { answers, questionIndex, updateQuestionAnswer } = props;

  const [checkedAnswers, setCheckedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    fillExistingResponse();
  }, []);

  const fillExistingResponse = () => {
    if (
      props.assessment.status == "submitted" ||
      props.assessment.status == "reviewed"
    ) {
      const checkedAnswersRepliesArr = [];
      for (let i = 0; i < checkedAnswers.length; i++) {
        if (props.question.value.includes(answers[i])) {
          checkedAnswersRepliesArr.push(true);
        } else {
          checkedAnswersRepliesArr.push(false);
        }
      }
      setCheckedAnswers(checkedAnswersRepliesArr);
    }
  };

  const updateIsChecked = (index, value) => {
    if (
      props.assessment.status == "submitted" ||
      props.assessment.status == "reviewed"
    ) {
      // Do nothing.
      return;
    }

    const objCopy = [...checkedAnswers];
    objCopy[index] = value;
    setCheckedAnswers(objCopy);

    const checkedAnswersTextArr = [];
    for (let i = 0; i < objCopy.length; i++) {
      if (objCopy[i]) {
        checkedAnswersTextArr.push(answers[i]);
      } else {
        const index = checkedAnswersTextArr.indexOf(answers[i]);
        if (index !== -1) {
          checkedAnswersTextArr.splice(index, 1);
        }
      }
    }

    updateQuestionAnswer(questionIndex, checkedAnswersTextArr);
  };

  return (
    <div>
      {answers.map((v, i) => (
        <ChecklistAnswersListTile
          index={i}
          value={v}
          isChecked={checkedAnswers[i]}
          updateIsChecked={updateIsChecked}
          questionIndex={questionIndex}
          updateQuestionAnswer={updateQuestionAnswer}
          key={i}
        />
      ))}
    </div>
  );
}

function ChecklistAnswersListTile(props) {
  const { updateIsChecked, updateQuestionAnswer } = props;

  const text = useRef(props.value);

  const handleChange = (e) => {
    text.current = e.target.value;
    updateQuestionAnswer(
      props.questionIndex, // Question index
      props.index, // Answer index
      e.target.value // Answer text
    );
  };

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
        name={`option_${props.index}`}
        checked={props.isChecked}
        onChange={(e) => updateIsChecked(props.index, !props.isChecked)}
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
        disabled
        html={text.current}
        onChange={handleChange}
        key={`label_${props.index}`}
      />
    </div>
  );
}

export default PerformAssessment;
