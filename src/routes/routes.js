import LoginForm from "../components/home/LoginForm";
import RegisterForm from "../components/home/RegisterForm";

import Dashboard from "../containers/Dashboard/index";
import Patients from "../containers/Doctor/patients";
import PatientSurveys from "../containers/Doctor/survey";
import DoctorDashboard from "../containers/Doctor/DoctorDashboard";
import AddPatient from "../containers/Doctor/AddPatient";
import EditPatient from "../containers/Doctor/EditPatient";
import PatientProfile from "../containers/Doctor/PatientProfile";

import TherapyExercises from "../containers/Patient/TherapyExercises";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PrescribingTherapy from "../containers/Doctor/PrescribingTherapy";
import PersonIcon from "@mui/icons-material/Person";
import PollIcon from "@mui/icons-material/Poll";
import ReviewPatientResponse from "../containers/Doctor/ReviewPatientResponse";
import RespondedPatientReview from "../containers/Doctor/RespondedPatientReview";
import UserProfile from "../containers/Doctor/UserProfile";
import LoginIcon from "@mui/icons-material/Login";
import RegisterationIcon from "@mui/icons-material/AccountBox";

// Routes for login
var AuthRoutes = [
  {
    path: "*",
    name: "Login",
    icon: <LoginIcon />,
    element: LoginForm,
  },
  {
    path: "/login",
    name: "Login",
    icon: <LoginIcon />,
    element: LoginForm,
  },
  {
    path: "/register",
    name: "Register",
    icon: <RegisterationIcon />,
    element: RegisterForm,
  },
];

// Routes for doctor
var DoctorRoutes = [
  {
    path: "*",
    name: "Dashboard",
    icon: <DashboardIcon />,
    element: DoctorDashboard,
  },
  {
    path: "/doctor/profile",
    name: "Dashboard",
    icon: <DashboardIcon />,
    element: Dashboard,
  },
  {
    path: "/doctor/patients",
    name: "Patients",
    icon: <PersonIcon />,
    element: Patients,
  },
  {
    path: "/doctor/survey",
    name: "Surveys",
    icon: <PersonIcon />,
    element: PatientSurveys,
  },
  {
    path: "/doctor/dashboard",
    name: "PatientDashboard",
    icon: <PollIcon />,
    element: DoctorDashboard,
  },
  {
    path: "/doctor/dashboard/add_patient",
    name: "AddPatient",
    icon: <PollIcon />,
    element: AddPatient,
  },
  {
    path: "/doctor/dashboard/edit_patient/:id",
    name: "EditPatient",
    icon: <PollIcon />,
    element: EditPatient,
  },
  {
    path: "/doctor/dashboard/patient_profile/:id",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: PatientProfile,
  },
  {
    path: "/doctor/dashboard/PrescribingTherapy",
    name: "PrescribingTherapy",
    icon: <PollIcon />,
    element: PrescribingTherapy,
  },
  {
    path: "/doctor/dashboard/ReviewPatientResponse",
    name: "ReviewPatientResponse",
    icon: <PollIcon />,
    element: ReviewPatientResponse,
  },
  {
    path: "/doctor/dashboard/RespondedPatientReview",
    name: "RespondedPatientReview",
    icon: <PollIcon />,
    element: RespondedPatientReview,
  },
  {
    path: "/doctor/dashboard/UserProfile",
    name: "UserProfile",
    icon: <PollIcon />,
    element: UserProfile,
  },
];

// Routes for patient
var PatientRoutes = [
  {
    path: "*",
    name: "TherapyExercises",
    icon: <PollIcon />,
    element: TherapyExercises,
  },
  {
    path: "/patient/dashboard",
    name: "TherapyExercises",
    icon: <PollIcon />,
    element: TherapyExercises,
  },
];

// Getting all routes
const RoutesObj = {
  AuthRoutes,
  DoctorRoutes,
  PatientRoutes,
};

export default RoutesObj;
