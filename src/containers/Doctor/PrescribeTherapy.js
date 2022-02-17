import React, { useState, useEffect, useRef } from "react";
import AppBar from "../../components/common/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Profile from "../../components/common/PatientProfile";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import EditIcon from "../../assets/images/mode.svg";
import DeleteIcon from "../../assets/images/delete.svg";
import AddIcon from "../../assets/images/add.svg";
import ContentEditable from "react-contenteditable";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Api from "../../api";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { toast } from "react-toastify";

import * as FormValidations from "../../validations";

const PrescribeTherapy = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);

  const [exercise, setExercise] = useState("Overhead Squat");
  const [noOfSets, setNoOfSets] = useState(1);
  const [noOfReps, setNoOfReps] = useState(10);
  const [dueDate, setDueDate] = useState(new Date());
  const [type, setType] = useState(state.type);

  const [questions, setQuestions] = useState([
    {
      title: "",
      description: "",
      type: "text",
      answers: [],
    },
  ]);

  useEffect(() => {
    getPatient();
  }, []);

  // func to get current project
  const getPatient = async () => {
    let response;
    try {
      response = await Api("get", `/patients/${params.id}`);
      const patientData = response.data.patient;
      setPatient(patientData);
      setIsLoading(false);
    } catch (e) {
      console.trace(e);
    }
  };

  // Calling create assessment
  const handleSubmit = async () => {
    try {
      let response;
      if (type === "simple") {
        const validated = FormValidations.assessmentQuestionsAssign(questions);

        if (!validated) {
          return;
        }

        const body = {
          patient_id: params.id,
          exercise: "",
          sets: 0,
          reps: 0,
          due_date: new Date().toLocaleDateString("en-US"),
          type: "simple",
          questions_array: questions,
        };
        response = await Api("post", `/assessments`, body);
        if (response) {
          toast.success("Assessment created successfully!");
          navToDashboard();
        }
      } else if (type === "motion") {
        if (dueDate === null) {
          toast.warning("Due date cannot be empty!");
          return;
        } else {
          const body = {
            patient_id: params.id,
            exercise: exercise,
            sets: noOfSets,
            reps: noOfReps,
            due_date: dueDate.toLocaleDateString("en-US"),
            type: "motion",
            questions_array: [],
          };
          response = await Api("post", `/assessments`, body);
          if (response) {
            toast.success("Assessment created successfully!");
            navToDashboard();
          }
        }
      }
    } catch (e) {
      console.trace(e);
    }
  };

  const navToDashboard = async () => {
    navigate("/doctor/dashboard");
  };

  function addQuestion() {
    const obj = {
      title: "",
      description: "",
      type: "text",
      answers: [],
    };
    const questionsCopy = [...questions];
    questionsCopy.push(obj);
    setQuestions(questionsCopy);
  }

  function removeQuestion(index) {
    const questionsCopy = [...questions];
    questionsCopy.splice(index, 1);
    setQuestions(questionsCopy);
  }

  function updateQuestionTitle(index, text) {
    const obj = {
      ...questions[index],
      title: text,
    };

    const questionsCopy = [...questions];
    questionsCopy[index] = obj;
    setQuestions(questionsCopy);
  }

  function updateQuestionDescription(index, text) {
    const obj = {
      ...questions[index],
      description: text,
      answers: [],
    };

    const questionsCopy = [...questions];
    questionsCopy[index] = obj;
    setQuestions(questionsCopy);
  }

  function updateQuestionType(index, type) {
    const obj = {
      ...questions[index],
      type: type,
      answers: [],
    };

    if (type == "mcqs" || type == "checkboxes") {
      obj.description = "";
      obj.answers = ["Option 1", "Option 2", "Option 3", "Option 4"];
    }

    const questionsCopy = [...questions];
    questionsCopy[index] = obj;
    setQuestions(questionsCopy);
  }

  function updateAnswerText(questionIndex, answerIndex, answerText) {
    const question = questions[questionIndex];

    const answersCopy = question.answers;
    answersCopy[answerIndex] = answerText;

    const questionsCopy = [...questions];
    questionsCopy[questionIndex].answers = answersCopy;

    setQuestions(questionsCopy);
  }

  function updateQuestion(questionIndex, obj) {
    const questionsCopy = [...questions];
    questionsCopy[questionIndex] = obj;

    setQuestions(questionsCopy);
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div style={{ paddingBottom: "8%" }}>
          <AppBar
            className="Appbar_background"
            heading={"Prescribing Therapy Exercise"}
          ></AppBar>
          <Grid className="Bottom_header" sx={{ position: "fixed" }}>
            <Typography className="Patient_heading">
              {`Patient ID: ${patient.patient_id}`}
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: " #25C8B4" }}
              className="Patient_button"
              onClick={(e) => handleSubmit()}
            >
              Send to patient
            </Button>
          </Grid>
          <Grid container spacing={1} sx={{ background: "#F6FAFB", mt: 5 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="profilecontainer"
              sx={{
                display: "flex",
                justifyContent: "center",
                // position: "fixed",
                flexWrap: "wrap",
                "& > :not(style)": {
                  paddingTop: "1%",
                  width: "48%",
                  height: "75% !important",
                  mt: 6.5,
                  mr: 0,
                  marginLeft: "3%",
                  mb: 2,
                  paddingBottom: "10%",
                },
                borderRadius: "20px",
              }}
            >
              <Profile {...patient} noEdit={true}></Profile>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="Exercise_detaill"
              sx={{
                display: "flex",
                justifyContent: "center",
                // overflowX: "scroll",
                flexWrap: "wrap",
                "& > :not(style)": {
                  width: "90%",
                  height: "100%",

                  paddingBottom: "18%",
                  marginTop: "6.5%",
                  marginBottom: "6.5%",
                },
                borderRadius: "20px",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: "20px",
                  background:
                    "linear-gradient(0deg, #f6fafb, #f6fafb), #f6fafb",
                }}
              >
                {type === "motion" ? (
                  <div className="Profilediv2" style={{ marginBottom: "6%" }}>
                    <div className="profiles-div">
                      <input type="text" placeholder="Exercise" disabled />
                      <select
                        name="exercise"
                        id="exercise"
                        type="exercise"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        disabled={true}
                      >
                        <option value="Shoulder">Overhead Squat</option>
                        <option value="Shoulder">Shoulder</option>
                        <option value="Neck">Neck</option>
                        <option value="Joints">Joints</option>
                        <option value="Elbow">Elbow</option>
                        <option value="Hips">Hips</option>
                      </select>
                    </div>
                    <div className="profiles_div2">
                      <input type="text" placeholder="Sets" disabled />
                      <select
                        name="sets"
                        id="sets"
                        type="sets"
                        value={noOfSets}
                        onChange={(e) => setNoOfSets(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div
                      className="profiles-div3"
                      style={{ border: "1px solid #454238" }}
                    >
                      <input type="text" placeholder="Reps" disabled />
                      <select
                        name="reps"
                        id="reps"
                        type="reps"
                        value={noOfReps}
                        onChange={(e) => setNoOfReps(e.target.value)}
                      >
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                      </select>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        fullWidth
                      >
                        <DesktopDatePicker
                          fulWidth
                          label="Due Date"
                          inputFormat="MM/dd/yyyy"
                          value={dueDate}
                          onChange={(e) => setDueDate(e)}
                          renderInput={(params) => (
                            <TextField
                              // variant="standrd"
                              className="due_datePicker"
                              {...params}
                            />
                          )}
                          minDate={new Date()}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                ) : type === "simple" ? (
                  questions.map((e, i) => (
                    <QuestionListTile
                      {...e}
                      index={i}
                      isLast={i == questions.length - 1} // lastIndex
                      renderDeleteBtn={questions.length >= 2} // More than one questions
                      addQuestion={addQuestion}
                      removeQuestion={removeQuestion}
                      updateQuestionTitle={updateQuestionTitle}
                      updateQuestionDescription={updateQuestionDescription}
                      updateQuestionType={updateQuestionType}
                      updateAnswerText={updateAnswerText}
                      updateQuestion={updateQuestion}
                      key={i}
                    />
                  ))
                ) : (
                  ""
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

function QuestionListTile(props) {
  const {
    addQuestion,
    removeQuestion,
    updateQuestionTitle,
    updateQuestionDescription,
    updateQuestionType,
    updateAnswerText,
    updateQuestion,
  } = props;

  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [answerType, setAnswerType] = useState("text");

  const updateType = (type) => {
    setAnswerType(type);
    updateQuestionType(props.index, type);
  };

  // func to get suggestions
  const getSuggestions = async (query) => {
    let response;
    try {
      const body = {
        query: query,
      };
      response = await Api("post", `/existing_questions/query`, body);
      const _suggestedQuestions = response.data.data;
      if (_suggestedQuestions) {
        setSuggestedQuestions(_suggestedQuestions);
      }
    } catch (e) {
      console.trace(e);
    }
  };

  const questionInputCallback = (event) => {
    const text = event.target.value;
    updateQuestionTitle(props.index, text);
    getSuggestions(text);
  };

  const questionSelectCallback = async (questionTitle) => {
    let objX = suggestedQuestions.filter((obj) => {
      return obj.title == questionTitle;
    });
    objX = objX[0];

    setAnswerType(objX.type); // Local

    const obj = {
      title: objX.title,
      description: objX.description,
      type: objX.type,
      answers: objX.answers,
    };

    updateQuestion(props.index, obj); // Global
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "-14%",
          alignItems: "flex-end",
          justitfyContent: "center",
          marginTop: "20px",
        }}
        className="box-container"
      >
        <div className="Profiledivs">
          <div className="Autocomplete-div">
            <Autocomplete
              freeSolo={true}
              options={suggestedQuestions}
              PaperComponent={({ children }) => (
                <Paper style={{ background: "#fff" }}>{children}</Paper>
              )}
              onChange={(event) =>
                questionSelectCallback(event.target.textContent)
              }
              getOptionLabel={(obj) => obj.title}
              style={{
                width: "99.3%",
                margin: "auto",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Question?"
                  style={{ color: "black" }}
                  variant="outlined"
                  onChange={(event) => questionInputCallback(event)}
                  value={props.title}
                />
              )}
            />
          </div>
          <div className="profiles-div2">
            <input type="text" placeholder="Answer Type" disabled />
            <select
              name="answer_type"
              id="answer_type"
              type="answer_type"
              value={answerType}
              onChange={(e) => updateType(e.target.value)}
            >
              <option value="text">Short Answer</option>
              <option value="mcqs">Multiple Options</option>
              <option value="checkboxes">Checkbox</option>
            </select>
          </div>
          {answerType == "text" ? (
            <div className="profiles-div3">
              <input type="text" placeholder="Description" disabled />
              <textarea
                type="input"
                placeholder="Description"
                defaultValue={props.description}
                onChange={(event) =>
                  updateQuestionDescription(props.index, event.target.value)
                }
              />
            </div>
          ) : answerType == "mcqs" ? (
            <div className="options_div">
              <input type="text" placeholder="Options" disabled />
              <MCQSAnswers
                answers={props.answers}
                questionIndex={props.index}
                updateAnswerText={updateAnswerText}
              />
            </div>
          ) : answerType == "checkboxes" ? (
            <div className="options_div">
              <input type="text" placeholder="Options" disabled />
              <ChecklistAnswers
                answers={props.answers}
                questionIndex={props.index}
                updateAnswerText={updateAnswerText}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={props.isLast ? `iconsdiv` : `iconnewdiv`}>
          <img src={EditIcon} style={{ margin: "10px" }}></img>
          {props.renderDeleteBtn ? (
            <img
              src={DeleteIcon}
              style={{ margin: "10px" }}
              onClick={() => removeQuestion(props.index)}
            ></img>
          ) : (
            <></>
          )}

          {props.isLast ? (
            <img
              src={AddIcon}
              style={{ margin: "10px" }}
              onClick={() => addQuestion()}
            ></img>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

function MCQSAnswers(props) {
  const { answers, questionIndex, updateAnswerText } = props;

  const [checkedMCQIndex, setCheckedMCQIndex] = useState(null);

  const updateCheckedMCQIndex = (value) => {
    setCheckedMCQIndex(value);
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
          updateAnswerText={updateAnswerText}
          key={i}
        />
      ))}
    </div>
  );
}

function MCQSAnswersListTile(props) {
  const { updateCheckedMCQIndex, updateAnswerText } = props;

  const text = useRef(props.value);

  const handleChange = (e) => {
    text.current = e.target.value;
    updateAnswerText(
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
        type="radio"
        name={`option_${props.index}`}
        checked={props.isChecked}
        onChange={(e) => updateCheckedMCQIndex(props.index)}
        style={{
          height: "15px",
          width: "15px",
          marginRight: "20px",
          marginTop: "12px",
          accentColor: " #454238",
        }}
        key={`input_${props.index}`}
      />
      <ContentEditable
        html={text.current}
        onChange={handleChange}
        key={`label_${props.index}`}
      />
    </div>
  );
}

function ChecklistAnswers(props) {
  const { answers, questionIndex, updateAnswerText } = props;

  const [checkedAnswers, setCheckedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  const updateIsChecked = (index, value) => {
    const objCopy = [...checkedAnswers];
    objCopy[index] = value;
    setCheckedAnswers(objCopy);
  };

  return (
    <div>
      {answers.map((v, i) => (
        <div>
          <ChecklistAnswersListTile
            index={i}
            value={v}
            isChecked={checkedAnswers[i]}
            updateIsChecked={updateIsChecked}
            questionIndex={questionIndex}
            updateAnswerText={updateAnswerText}
            key={i}
          />
        </div>
      ))}
    </div>
  );
}

function ChecklistAnswersListTile(props) {
  const { updateIsChecked, updateAnswerText } = props;

  const text = useRef(props.value);

  const handleChange = (e) => {
    text.current = e.target.value;
    updateAnswerText(
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
          accentColor: " #454238",
        }}
        key={`input_${props.index}`}
      />
      <ContentEditable
        html={text.current}
        onChange={handleChange}
        key={`label_${props.index}`}
      />
    </div>
  );
}

export default PrescribeTherapy;
