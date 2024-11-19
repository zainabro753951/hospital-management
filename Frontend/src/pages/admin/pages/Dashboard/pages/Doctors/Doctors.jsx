import React from "react";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import DoctorsData from "./Components/DoctorsData";

const Doctors = () => {
  return (
    <div className="flex">
      <Header />
      <Nav />
      <DoctorsData />
    </div>
  );
};

export default Doctors;
