import LoginForm from "../components/home/LoginForm";
import RegisterForm from "../components/home/RegisterForm";

import Dashboard from "../containers/Dashboard/index";
import Patients from "../containers/Doctor/patients";
import PatientSurveys from "../containers/Doctor/survey";
import DoctorDashboard from "../containers/Doctor/DoctorDashboard";
import AddPatient from "../containers/Doctor/AddPatient";
import EditPatient from "../containers/Doctor/EditPatient";
import PatientProfile from "../containers/Doctor/PatientProfile";

import PatientDashboard from "../containers/Patient/PatientDashboard";
import PerformAssessment from "../containers/Patient/PerformAssessment";
import AllTherapists from "../containers/Patient/AllTherapists";
import PerformMotionCapture from "../containers/Patient/PerformMotionCapture";

import PrescribeTherapy from "../containers/Doctor/PrescribeTherapy";
import ChangePassword from "../containers/Doctor/ChangePassword";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PatientProfileEdit from "../containers/Patient/PatientProfile";
import Therapist from "../containers/Patient/Therapist";
import PersonIcon from "@mui/icons-material/Person";
import PollIcon from "@mui/icons-material/Poll";
import ReviewPatientResponse from "../containers/Doctor/ReviewPatientResponse";
import DoctorProfile from "../containers/Doctor/DoctorProfile";
import LoginIcon from "@mui/icons-material/Login";
import RegisterationIcon from "@mui/icons-material/AccountBox";
import Motion_captureCam from "../containers/Patient/Motion_captureCam";
import Motion_captureRecording from "../containers/Patient/Motion_captureRecording";
import Recording_ended from "../containers/Patient/Recording_ended";

// Routes for login
const AuthRoutes = [
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
const DoctorRoutes = [
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
    name: "PatientSurveys",
    icon: <PersonIcon />,
    element: PatientSurveys,
  },
  {
    path: "/doctor/dashboard",
    name: "DoctorDashboard",
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
    path: "/doctor/dashboard/prescribe_therapy/:id",
    name: "PrescribingTherapy",
    icon: <PollIcon />,
    element: PrescribeTherapy,
  },
  {
    path: "/doctor/dashboard/review_patient_response/:id",
    name: "ReviewPatientResponse",
    icon: <PollIcon />,
    element: ReviewPatientResponse,
  },
  {
    path: "/doctor/dashboard/profile",
    name: "DoctorProfile",
    icon: <PollIcon />,
    element: DoctorProfile,
  },
  {
    path: "/doctor/dashboard/ChangePassword",
    name: "ChangePassword",
    icon: <PollIcon />,
    element: ChangePassword,
  },
  {
    path: "/doctor/dashboard/Therapist",
    name: "Therapist",
    icon: <PollIcon />,
    element: Therapist,
  },
  {
    path: "/doctor/dashboard/PatientProfileSetting",
    name: "PatientProfileSetting",
    icon: <PollIcon />,
    element: PatientProfile,
  },
];

// Routes for patient
const PatientRoutes = [
  {
    path: "*",
    name: "PatientDashboard",
    icon: <PollIcon />,
    element: PatientDashboard,
  },
  {
    path: "/patient/dashboard",
    name: "PatientDashboard",
    icon: <PollIcon />,
    element: PatientDashboard,
  },
  {
    path: "/patient/assessment/:id",
    name: "TherapyExercises",
    icon: <PollIcon />,
    element: PerformAssessment,
  },
  {
    path: "/patient/dashboard/Therapist",
    name: "Therapist",
    icon: <PollIcon />,
    element: Therapist,
  },
  {
    path: "/patient/dashboard/profile",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: PatientProfileEdit,
  },
  {
    path: "/patient/all_therapists",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: AllTherapists,
  },
  {
    path: "/patient/motion_capture_assessments",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: PerformMotionCapture,
  },
  {
    path: "/patient/motion_capture_assessment_1",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: Motion_captureCam,
  },
  {
    path: "/patient/motion_capture_assessment_2",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: Motion_captureRecording,
  },
  {
    path: "/patient/motion_capture_assessment_3",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: Recording_ended,
  },
  {
    path: "/patient/motion_capture_assessment_3",
    name: "PatientProfile",
    icon: <PollIcon />,
    element: Recording_ended,
  },
];

// Getting all routes
const RoutesObj = {
  AuthRoutes,
  DoctorRoutes,
  PatientRoutes,
};

export default RoutesObj;
