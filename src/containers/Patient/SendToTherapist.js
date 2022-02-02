// import React, { useState, useEffect } from "react";
// import AppBar from "../../components/common/AppBar";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import MobileBottomBar from "../../components/common/MobileBottomBar";
// import Api from "../../api";
// import { useNavigate } from "react-router-dom";
// import { getUser } from "../../utils/Auth";
// const SendToTherapist = () => {
//   React.useEffect(() => {
//     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
//   }, [counter]);
//   return (
//     <>
//       <div>
//         <AppBar className="Appbar_background"></AppBar>
//         <Grid className="Bottom_header" sx={{ boxShadow: "none" }}>
//           <Typography className="Patient_heading">Motion Capture</Typography>
//         </Grid>
//         <Grid
//           container
//           spacing={1}
//           className="patient_maindiv"
//           sx={{ marginTop: "0px !important" }}
//         >
//           <Grid
//             xs={10}
//             sm={10}
//             md={2}
//             className={`Exercise_details ${
//               item.status == "nonActive" ? "non_ActiveClas" : ""
//             }`}
//             sx={{ marginBottom: "25px !important" }}
//           >
//             <>
//               <div>
//                 <Typography className="assessment_title">
//                   Shoulder exercise
//                 </Typography>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                 }}
//               >
//                 <Typography className="sets">Sets:3</Typography>
//                 <Typography className="sets">Repitition:12</Typography>
//               </div>
//             </>
//             <Typography
//               className={`${
//                 item.status == "requested"
//                   ? "motionStatus"
//                   : "nonActive_testStatus "
//               }`}
//             >
//               {item.status == "requested"
//                 ? "Lets start"
//                 : item.status == "reviewed"
//                 ? "Reviewed"
//                 : "Completed"}
//             </Typography>
//           </Grid>
//         </Grid>
//         <MobileBottomBar className="bottomnav" activeIndex={2} />
//       </div>
//     </>
//   );
// };

// export default SendToTherapist;
