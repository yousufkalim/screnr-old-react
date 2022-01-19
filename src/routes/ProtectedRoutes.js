import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import DoctorLayout from "../layouts/doctor";
import PatientLayout from "../layouts/patient";

import api from "../api";

const Admin = () => {
  const updateStore = UpdateStore();
  const { authorization } = Store();
  useEffect(() => {
    // checkAuth();
  }, []);
  let checkAuth = async () => {
    let res = await api("get", `admin/auth/check-auth`);
    if (res.status === 200) {
      updateStore({ authorization: true });
    } else {
      localStorage.removeItem("token");
      updateStore({ authorization: null });
    }
  };

  return (
    <>
      {console.log(localStorage.user)}
      {localStorage.token ? (
        <>
          <Switch>
            {JSON.parse(localStorage.user.role == "patient") ? (
              <Route
                path="/patient"
                render={(props) => <PatientLayout {...props} />}
              />
            ) : (
              <Route
                path="/doctor"
                render={(props) => <DoctorLayout {...props} />}
              />
            )}

            {/* <Route exact path="/doctor" component={DoctorLayout} /> */}
          </Switch>
        </>
      ) : (
        <>{(window.location = "/login")}</>
      )}
    </>
  );
};

export default Admin;
