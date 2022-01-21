import Dashboard from "../containers/Dashboard/index";
import Patients from "../containers/Doctor/patients";
import PatientSurveys from "../containers/Doctor/survey";
import PatientDashboard from "../containers/Doctor/patientDashboard";
import TherapyExercises from "../containers/Patient/TherapyExercises";
import AddPatient from "../containers/Doctor/AddPatient";
import PatientProfile from "../containers/Doctor/PatientProfile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PrescribingTherapy from "../containers/Doctor/PrescribingTherapy";
import PersonIcon from "@mui/icons-material/Person";
import PollIcon from "@mui/icons-material/Poll";
import ReviewPatientResponse from "../containers/Doctor/ReviewPatientResponse";
import RespondedPatientReview from "../containers/Doctor/RespondedPatientReview";
import UserProfile from "../containers/Doctor/UserProfile";

// Routes for doctor
var DoctorRoutes = [
  {
    path: "/profile",
    name: "Dashboard",
    icon: <DashboardIcon />,
    component: Dashboard,
    layout: "/doctor",
  },
  {
    path: "/patients",
    name: "Patients",
    icon: <PersonIcon />,
    component: Patients,
    layout: "/doctor",
  },
  {
    path: "/survey",
    name: "Surveys",
    icon: <PersonIcon />,
    component: PatientSurveys,
    layout: "/doctor",
  },
  {
    path: "/dashboard",
    name: "PatientDashboard",
    icon: <PollIcon />,
    component: PatientDashboard,
    layout: "/doctor",
  },
  {
    path: "/dashboard/AddPatient",
    name: "AddPatient",
    icon: <PollIcon />,
    component: AddPatient,
    layout: "/doctor",
  },
  {
    path: "/dashboard/PatientProfile",
    name: "PatientProfile",
    icon: <PollIcon />,
    component: PatientProfile,
    layout: "/doctor",
  },
  {
    path: "/dashboard/PrescribingTherapy",
    name: "PrescribingTherapy",
    icon: <PollIcon />,
    component: PrescribingTherapy,
    layout: "/doctor",
  },
  {
    path: "/dashboard/ReviewPatientResponse",
    name: "ReviewPatientResponse",
    icon: <PollIcon />,
    component: ReviewPatientResponse,
    layout: "/doctor",
  },
  {
    path: "/dashboard/RespondedPatientReview",
    name: "RespondedPatientReview",
    icon: <PollIcon />,
    component: RespondedPatientReview,
    layout: "/doctor",
  },
  {
    path: "/dashboard/UserProfile",
    name: "UserProfile",
    icon: <PollIcon />,
    component: UserProfile,
    layout: "/doctor",
  },
];

// Routes for patient
var PatientRoutes = [
  {
    path: "/dashboard",
    name: "TherapyExercises",
    icon: <PollIcon />,
    component: TherapyExercises,
    layout: "/patient",
  },
];

// Getting all routes
const Routes = {
  DoctorRoutes,
  PatientRoutes,
};

export default Routes;
