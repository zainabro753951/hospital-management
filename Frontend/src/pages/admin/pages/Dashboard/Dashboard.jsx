import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import Doctors from "./pages/Doctors/Doctors";

const Dashboard = () => {
  const [isAdminAuthenticate, setisAdminAuthenticate] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:2000/dashboard", {
          withCredentials: true,
        });
        setisAdminAuthenticate(true);
      } catch (err) {
        navigate("/admin/login");
        setisAdminAuthenticate(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (isAdminAuthenticate) {
    return (
      <Routes>
        <Route path="/home_dashboard" element={<HomeDashboard />} />
        <Route path="/add_doctor" element={<AddDoctor />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard/home_dashboard" replace />}
        />
      </Routes>
    );
  }
};

export default Dashboard;
