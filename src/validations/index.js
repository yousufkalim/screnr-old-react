
import { toast } from "react-toastify";
import { Validators, formValidator } from "../utils/Validate";

function login(data){

  const valArr = [
    {
      name: "email",
      validationFunction: () => Validators.emailValidator("email", data.get("email"))
    },
    {
      name: "password",
      validationFunction: () => Validators.lengthValidator("password", data.get("password"), 8)
    }
  ];

  const validated = formValidator(data, valArr)

  return validated;

}
  
function register(data){

  let validated = false;

  let validationError;
  for( let prop in data ){

    if(prop == "first_name"){
      validationError = Validators.nullValidator("First Name", data[prop]);
    } else if(prop == "last_name"){
      validationError = Validators.nullValidator("Last Name", data[prop]);
    } else if(prop == "email"){
      validationError = Validators.emailValidator("Email", data[prop]);
    } else if(prop == "password"){
      validationError = Validators.passwordValidator("Password", data[prop]);
    } else if(prop == "confirm_password"){
      validationError = Validators.passwordValidator("Confirm Password", data[prop], 8);
    } else if(prop == "doc_specialization"){
      validationError = Validators.nullValidator("Specialization", data[prop]);
    } else if(prop == "phone"){
      validationError = Validators.phoneNoValidator("Phone No", data[prop]);
    } else {
      // Do nothing.
    }

    if(validationError){
      toast.error(validationError);
      return false;
    }
    
  }

  if(data["gender"] == null){
    toast.error("Gender must be selected.");
    validated = false;
  } else if(data["dob"] == null){
    toast.error("Date of Birth can't be empty");
    validated = false;
  } else {
    validated = true;
  }

  return validated;

}

function addPatient(data){

  const valArr = [
    {
      name: "Patient ID",
      validationFunction: () => Validators.lengthValidator("Patient ID", data.get("Patient ID"), 6)
    },
    {
      name: "First Name",
    },
    {
      name: "Middle Name",
    },
    {
      name: "Last Name",
    },
    {
      name: "Mobile Number",
      validationFunction: () => Validators.phoneNoValidator("Mobile Number", data.get("Mobile Number"))
    },
    {
      name: "Email Address",
      validationFunction: () => Validators.emailValidator("Email Address", data.get("Email Address"))
    },
    {
      name: "Address"
    },
    {
      name: "Problem Name"
    },
    {
      name: "Problem Description"
    },
    {
      name: "Password",
      validationFunction: () => Validators.passwordValidator("Password", data.get("Password"))
    },
    {
      name: "Confirm Password",
      validationFunction: () => Validators.passwordValidator("Confirm Password", data.get("Confirm Password"))
    },
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

function editPatient(data){

  const valArr = [
    {
      name: "First Name",
    },
    {
      name: "Middle Name",
    },
    {
      name: "Last Name",
    },
    {
      name: "Mobile Number",
      validationFunction: () => Validators.phoneNoValidator("Mobile Number", data.get("Mobile Number"))
    },
    {
      name: "Address"
    },
    {
      name: "Problem Name"
    },
    {
      name: "Problem Description"
    }
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

function editProfileDoctor(data){

  const valArr = [
    {
      name: "Phone",
      validationFunction: () => Validators.phoneNoValidator("Phone", data.get("Phone"))
    }
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

function editProfilePatient(data){

  const valArr = [
    {
      name: "Mobile Number",
      validationFunction: () => Validators.phoneNoValidator("Mobile Number", data.get("Mobile Number"))
    },
    {
      name: "Address"
    },
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

function assessmentQuestionsAssign(data){

  let validated = true;

  for( let i = 0; i < data.length; i++){

    const obj = data[i];

    if(obj.type == "text"){
      validated = _validateTextQuestionAssign(obj, i+1);
    } else {
      validated = _validateMultipleQuestionAssign(obj, i+1);
    }

    if(!validated){
      return false;
    }

  }

  return validated;

}

function _validateTextQuestionAssign(obj, index){

  let validated = false;
  let validationError;

  if(!obj.title){
    validationError = `Question ${index} title can't be empty`;
  } else if(!obj.description){
    validationError = `Question ${index} description can't be empty`;
  }

  if(validationError){
    toast.error(validationError);
    validated = false;
  } else {
    validated = true;
  }

  return validated;

}

function _validateMultipleQuestionAssign(obj, index){

  let validated = false;
  let validationError;

  if(!obj.title){
    validationError = `Question ${index} title can't be empty`;
  } else {
    obj.answers.forEach((e, i) => {
      if(!e){
        validationError = `Question ${index}, Answer ${i+1} can't be empty`;
      }
    });
  }

  if(validationError){
    toast.error(validationError);
    validated = false;
  } else {
    validated = true;
  }

  return validated;

}

function assessmentQuestionsPerform(data){

  let validated = true;

  for( let i = 0; i < data.length; i++){

    const obj = data[i];

    validated = _validateQuestionPerform(obj, i+1);

    if(!validated){
      return false;
    }

  }

  return validated;

}

function _validateQuestionPerform(obj, index){

  let validated = false;
  let validationError;

  if(!obj.value[0]){ // First answer is empty string.
    validationError = `Question ${index} must be answered`;
  }

  if(validationError){
    toast.error(validationError);
    validated = false;
  } else {
    validated = true;
  }

  return validated;

}

export {
  login,
  register,
  addPatient,
  editPatient,
  editProfileDoctor,
  editProfilePatient,
  assessmentQuestionsAssign,
  assessmentQuestionsPerform
}