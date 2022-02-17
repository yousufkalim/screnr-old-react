import React from "react";
import Typography from "@mui/material/Typography";

import AppBar from "../../components/common/AppBar";
import MobileBottomBar from "../../components/common/MobileBottomBar";

export default function AllTherapists() {
  return (
    <>
      <AppBar className="Appbar_background" />
      <Typography>Coming Soon</Typography>
      <MobileBottomBar className="bottomnav" activeIndex={0} />
    </>
  );
}
