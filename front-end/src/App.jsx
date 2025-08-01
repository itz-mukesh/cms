// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/Navbar";

// import Login from "./components/Login";

// import Adminlogin from "./components/Adminlogin";
// import Register from "./components/Register";
// import Getcomplent from "./components/Getcomplent";
// import Createcomplent from "./components/Createcomplent";
// import Showcomplent from "./components/Showcomplent";
// import VerifyOTP from "./components/VerifyOtp";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/verify" element={<VerifyOTP />} />

//         <Route path="/Login" element={<Login />} />
//         <Route path="/Adminlogin" element={<Adminlogin />} />
//         <Route path="/getcomplent" element={<Getcomplent />} />
//         <Route path="/createcomplent" element={<Createcomplent />} />
//         <Route path="/showcomplent" element={<Showcomplent />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";

import Login from "./components/Login";
import Adminlogin from "./components/Adminlogin";
import Register from "./components/Register";
import Getcomplent from "./components/Getcomplent";
import Createcomplent from "./components/Createcomplent";
import Showcomplent from "./components/Showcomplent";
import VerifyOTP from "./components/VerifyOtp";

const AppContent = () => {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== "/verify";

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/getcomplent" element={<Getcomplent />} />
        <Route path="/createcomplent" element={<Createcomplent />} />
        <Route path="/showcomplent" element={<Showcomplent />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
