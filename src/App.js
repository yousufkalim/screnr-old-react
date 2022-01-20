// Init
import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./routes/main";

// Files
import "./css/index.css";

// Component

function App() {
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
      <Main />
    </div>
  );
}

// Export
export default App;
