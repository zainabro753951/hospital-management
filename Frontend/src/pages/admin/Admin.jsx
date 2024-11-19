import React from "react";
import Signup from "./pages/signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
const Admin = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/admin/signup" replace />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default Admin;
