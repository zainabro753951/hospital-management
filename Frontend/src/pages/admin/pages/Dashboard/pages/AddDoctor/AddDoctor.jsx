import React from "react";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import AddDoctorData from "./Components/AddDoctorData";
const AddDoctor = () => {
  return (
    <div className="flex">
      <Header />
      <Nav />
      <AddDoctorData />
    </div>
  );
};

export default AddDoctor;
