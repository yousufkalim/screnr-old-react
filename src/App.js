// Init
import React, { useEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PatientLayout from "./layouts/patient";
import DoctorLayout from "./layouts/doctor";
import LandingLayout from "./layouts/landing";
import { StoreProvider } from "./StoreContext";
import Login from "./components/home/login";
import LoginForm from "./components/home/LoginForm";
import RegisterForm from "./components/home/RegisterForm";
import ProteectedRoute from "./routes/ProtectedRoutes";
import { useHistory } from "react-router-dom";

// Files
import "./css/index.css";
import patientLogin from "./components/home/LoginForm";

// Component

function App() {
  const history = useHistory();
  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    if (user && token) {
      user = JSON.parse(user);
      if (user.role == "therapist") {
        history.push("/doctor/dashboard");
      } else if (user.role == "patient") {
        history.push("/doctor/dashboard");
      } else {
        // do nothing
      }
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
        limit={3}
      />

      {/* setting up main routing container and store container */}
      <BrowserRouter>
        <StoreProvider>
          <Switch>
            <Route
              path="/home"
              render={(props) => <LandingLayout {...props} />}
            />
            <Route path="/login" render={(props) => <LoginForm {...props} />} />
            <Route
              path="/register"
              render={(props) => <RegisterForm {...props} />}
            />
            {/* <>{JSON.parse(localStorage.user.role) == "therapist"}</> */}
            {/* {JSON.parse(localStorage.user.role) == "therapist" ? (
              <Route
                path="/doctor"
                render={(props) => <DoctorLayout {...props} />}
              />
            ) : (
              <>
                {JSON.parse(localStorage.user.role) == "patient" ? (
                  <Route
                    path="/patient"
                    render={(props) => <PatientLayout {...props} />}
                  />
                ) : (
                  <Redirect from="/" to="/home" />
                )}
              </> */}
            )}
            {/* <Route exact path="/*" render={() => <ProteectedRoute />} /> */}
            {/* <Redirect from="/" to="/home" /> */}
          </Switch>
        </StoreProvider>
      </BrowserRouter>
    </div>
  );
}

// Export
export default App;
