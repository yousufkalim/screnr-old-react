import React, { useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { UpdateStore, Store } from "../StoreContext";
import Api from "../api/index";
import SideBar from "../components/SideBar/sidebar";
import Routes from "../routes/routes";
import FullLoader from "../components/common/FullScreenLoader";

const Doctor = (props) => {
  const updateStore = UpdateStore();
  const { user, loggedIn } = Store();

  // Get all the routes related to the doctor
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          exact
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  return (
    <>
      <div className="main-container">
        <Switch>{getRoutes(Routes.DoctorRoutes)}</Switch>
      </div>
    </>
  );
};

export default Doctor;
