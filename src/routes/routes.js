import Dashboard from "../containers/Dashboard/index";
import Patients from "../containers/Doctor/patients";
import PatientSurveys from "../containers/Doctor/survey";
import PatientDashboard from "../containers/Doctor/patientDashboard";
import TherapyExercises from "../containers/Patient/TherapyExercises";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PollIcon from "@mui/icons-material/Poll";

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
