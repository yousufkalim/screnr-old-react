// Init
import React from "react";
import Splash from "../containers/Splash";
// Importing Components
import Login from "../components/home/login";

// Home Component
export default function Home() {
  return (
    <div>
      {/* Show login page */}
      <Splash></Splash>
      {/* <PatientDashboard></PatientDashboard> */}
      {/* <Login /> */}
    </div>
  );
}
