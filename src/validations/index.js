
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
      validationError = Validators.lengthValidator("Password", data[prop], 8);
    } else if(prop == "confirm_password"){
      validationError = Validators.lengthValidator("Confirm Password", data[prop], 8);
    } else if(prop == "doc_specailization"){
      validationError = Validators.nullValidator("Specialization", data[prop]);
    } else if(prop == "phone"){
      validationError = Validators.phoneNoValidator("Phone No", data[prop]);
    } else {
      // Do nothing.
    }

    if(validationError){
      toast.error(validationError);
      return;
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
      // validationFunction: () => Validators.userNameValidator("First Name", data.get("First Name"))
    },
    {
      name: "Middle Name",
      // validationFunction: () => Validators.userNameValidator("Middle Name", data.get("Middle Name"))
    },
    {
      name: "Last Name",
      // validationFunction: () => Validators.userNameValidator("Last Name", data.get("Last Name"))
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
      validationFunction: () => Validators.lengthValidator("Password", data.get("Password"), 8)
    },
    {
      name: "Confirm Password",
      validationFunction: () => Validators.lengthValidator("Confirm Password", data.get("Confirm Password"), 8)
    },
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

function editPatient(data){

  const valArr = [
    {
      name: "Patient ID",
      validationFunction: () => Validators.lengthValidator("Patient ID", data.get("Patient ID"), 6)
    },
    {
      name: "First Name",
      // validationFunction: () => Validators.userNameValidator("First Name", data.get("First Name"))
    },
    {
      name: "Middle Name",
      // validationFunction: () => Validators.userNameValidator("Middle Name", data.get("Middle Name"))
    },
    {
      name: "Last Name",
      // validationFunction: () => Validators.userNameValidator("Last Name", data.get("Last Name"))
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
    },
    {
      name: "Address"
    },
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
      name: "National ID",
    },
    {
      name: "Address"
    },
  ];

  const validated = formValidator(data, valArr)

  return validated;

}

export {
  login,
  register,
  addPatient,
  editPatient,
  editProfileDoctor,
  editProfilePatient
}