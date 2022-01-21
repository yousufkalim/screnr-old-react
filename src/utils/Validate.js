
import { toast } from "react-toastify";
import { kRegExpEmail, kRegExpPhone, kRegExpUserName } from "./Constants";

function isEmpty(str) {
  return (!str || str.length === 0 );
}

class Validators{

  static noValidator(){
    return null;
  }

  static nullValidator(name, value){
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }
    return null;
  }

  static lengthValidator(name, value, length){

    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    if (String(value).length < length) {
      return `${name} can't be less than ${length} characters`;
    }

    return null;

  }

  static emailValidator(name, value){

    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = String(value).match(kRegExpEmail);

    if(!regexMatch){
      return `${name} is invalid`;
    }

    return null;
  }

  static phoneNoValidator(name, value){

    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = String(value).match(kRegExpPhone);

    if(!regexMatch){
      return `${name} is invalid`;
    }

    return null;

  }

  static userNameValidator(name, value){

    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = String(value).match(kRegExpUserName);

    if(!regexMatch){
      return `${name} can only contain alphabets, numbers or underscore`;
    }

    return null;
  }

}

function formValidator(data, objsArr){

  for( let i = 0; i < objsArr.length; i++ ){

    const name = objsArr[i].name;
    const objData = data.get(name);

    const objDataValidationError =
    objsArr[i].validationFunction
    ? objsArr[i].validationFunction()
    : Validators.nullValidator(name, objData);

    if(objDataValidationError){
      toast.error(objDataValidationError);
      return false;
    }

  }

  return true;

}

export {
  Validators,
  formValidator
}