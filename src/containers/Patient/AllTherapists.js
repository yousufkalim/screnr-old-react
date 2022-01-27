import React from "react";
import Typography from "@mui/material/Typography";

import AppBar from "../../components/common/AppBar";
import MobileBottomBar from "../../components/common/MobileBottomBar";

export default function AllTherapists(){
    return (
        <>
            <AppBar />
            <Typography>
                Coming Soon
            </Typography>
            <MobileBottomBar activeIndex={0} />
        </>
    );
}

