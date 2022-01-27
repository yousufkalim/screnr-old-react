import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { ReactComponent as Setting } from "../../assets/images/setting.svg";
import { ReactComponent as Exercise } from "../../assets/images/Exercise.svg";
import { ReactComponent as Scorecard } from "../../assets/images/Scorecard.svg";
import { ReactComponent as Physiotherapist } from "../../assets/images/Physiotherapist.svg";

import { ReactComponent as SettingActive } from "../../assets/images/settingsActive.svg";
import { ReactComponent as ExerciseActive } from "../../assets/images/ExerciseActive.svg";
import { ReactComponent as ScorecardActive } from "../../assets/images/ScorecardActive.svg";
import { ReactComponent as PhysiotherapistActive } from "../../assets/images/PhysiotherapistActive.svg";

import { useNavigate } from "react-router-dom";

export default function MobileBottomBar(props){

    const { activeIndex } = props;

    const navigate = useNavigate();

    const navToAllTherapists = () => {
        navigate("/patient/all_therapists");
    }

    const navToPerformMotionCaptureAssessment = () => {
        navigate("/patient/motion_capture_assessment");
    }

    const navToDashboard = () => {
        navigate("/patient/dashboard");
    }

    const navToProfile = () => {
        navigate("/patient/dashboard/profile");
    }

    return (
      <>
        <BottomNavigation sx={{
            width: "100%",
            background: " #136773",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "60px",
            zIndex: "20"
        }}>
          <BottomNavigationAction
            onClick={navToAllTherapists}
            icon={activeIndex == 0 ? <PhysiotherapistActive /> : <Physiotherapist />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={navToDashboard}
            icon={activeIndex == 1 ? <ScorecardActive /> : <Scorecard />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={navToPerformMotionCaptureAssessment}
            icon={activeIndex == 2 ? <ExerciseActive /> : <Exercise />}
          ></BottomNavigationAction>
          <BottomNavigationAction
            onClick={navToProfile}
            icon={activeIndex == 3 ? <SettingActive /> : <Setting /> }
          ></BottomNavigationAction>
        </BottomNavigation>
      </>
    );
  }