import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </>
  );
};

export default App;
