import React from "react";
import Typography from "@mui/material/Typography";

import AppBar from "../../components/common/AppBar";
import MobileBottomBar from "../../components/common/MobileBottomBar";

export default function PerformMotionCapture(){
    return (
        <>
            <AppBar />
            <Typography>
                Coming Soon
            </Typography>
            <MobileBottomBar activeIndex={2} />
        </>
    );
}

