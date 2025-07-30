import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";
import Dashboard3 from "./components/Dashboard3";
import Adminlogin from "./components/Adminlogin";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />
      </Routes>
    </Router>
  );
};

export default App;
