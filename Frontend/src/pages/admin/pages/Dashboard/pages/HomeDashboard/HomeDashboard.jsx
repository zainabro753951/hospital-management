import React from "react";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import DashboardHomeData from "./Components/DashboardHomeData";

const HomeDashboard = () => {
  return (
    <div className="flex">
      <Header />
      <Nav />
      <DashboardHomeData />
    </div>
  );
};

export default HomeDashboard;
