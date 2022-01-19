import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/Logo.svg";

const Splash = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/login/patient");
    }, 3000);
  }, []);

  return (
    <div className="Splashimg">
      <img className="img" src={logo} alt="" />
    </div>
  );
};

export default Splash;
