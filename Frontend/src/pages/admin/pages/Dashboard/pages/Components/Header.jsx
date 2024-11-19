import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrWheelchair } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEditCalendar } from "react-icons/md";
import { IoKeySharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [isOpen3, setisOpen3] = useState(false);
  const [isOpen4, setisOpen4] = useState(false);
  let toggleOpen1 = () => setisOpen1(!isOpen1);
  let toggleOpen2 = () => setisOpen2(!isOpen2);
  let toggleOpen3 = () => setisOpen3(!isOpen3);
  let toggleOpen4 = () => setisOpen4(!isOpen4);
  return (
    <div className="w-[20%] bg-themeBg min-h-screen flex flex-col justify-center gap-7 items-center relative z-30">
      <Link
        to="/admin/dashboard/home_dashboard"
        className="w-full flex justify-center p-2"
      >
        <img src="/imgs/admin/dashboard/logo.png" alt="" />
      </Link>
      <div className="w-full h-full flex flex-col gap-1 text-white">
        <div className="flex items-center justify-between p-2 bg-[#555555]">
          <div className="flex items-center gap-2">
            <IoHomeOutline />
            <h4>Dashboard</h4>
          </div>
          <RiArrowDropDownLine />
        </div>
        <div onClick={toggleOpen1} className="flex flex-col">
          <div
            className={`flex items-center justify-between p-2 ${
              isOpen1 ? "bg-[#555555]" : ""
            } transition-all duration-300`}
          >
            <div className="flex items-center gap-2">
              <GrWheelchair />
              <h4>Patients</h4>
            </div>
            <RiArrowDropDownLine
              className={`${
                isOpen1 ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease`}
            />
          </div>
          <div
            className={`w-full overflow-hidden ${
              isOpen1 ? "h-full" : "h-0"
            } transition-all duration-300 ease`}
          >
            <div className="flex flex-col gap-4 w-full overflow-hidden h-full pl-7 bg-[#666666] py-3 text-gray-300 tracking-wide">
              {[
                "Add Patient",
                "All Patient",
                "Patient Details",
                "Edit Patient",
              ].map((links, idx) => {
                return <Link>{links}</Link>;
              })}
            </div>
          </div>
        </div>
        <div onClick={toggleOpen2} className="flex flex-col">
          <div
            className={`flex items-center justify-between p-2 ${
              isOpen2 ? "bg-[#555555]" : ""
            } transition-all duration-300`}
          >
            <div className="flex items-center gap-2">
              <FaUserDoctor />
              <h4>Doctors</h4>
            </div>
            <RiArrowDropDownLine
              className={`${
                isOpen2 ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease`}
            />
          </div>
          <div
            className={`w-full overflow-hidden ${
              isOpen2 ? "h-full" : "h-0"
            } transition-all duration-300 ease`}
          >
            <div className="flex flex-col gap-4 w-full overflow-hidden h-full pl-7 bg-[#666666] py-3 text-gray-300 tracking-wide">
              {[
                "Add Doctors",
                "All Doctors",
                "Doctors Details",
                "Edit Doctors",
              ].map((links, idx) => {
                return (
                  <Link
                    to={`${
                      idx === 0
                        ? "/admin/dashboard/add_doctor"
                        : "#" || idx === 1
                        ? "/admin/dashboard/doctors"
                        : "#"
                    }`}
                  >
                    {links}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div onClick={toggleOpen3} className="flex flex-col">
          <div
            className={`flex items-center justify-between p-2 ${
              isOpen3 ? "bg-[#555555]" : ""
            } transition-all duration-300`}
          >
            <div className="flex items-center gap-2">
              <MdEditCalendar />
              <h4>Appointments</h4>
            </div>
            <RiArrowDropDownLine
              className={`${
                isOpen3 ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease`}
            />
          </div>
          <div
            className={`w-full overflow-hidden ${
              isOpen3 ? "h-full" : "h-0"
            } transition-all duration-300 ease`}
          >
            <div className="flex flex-col gap-4 w-full overflow-hidden h-full pl-7 bg-[#666666] py-3 text-gray-300 tracking-wide">
              {[
                "Add Appointments",
                "All Appointments",
                "Appointments Details",
                "Edit Appointments",
              ].map((links, idx) => {
                return <Link>{links}</Link>;
              })}
            </div>
          </div>
        </div>
        <div onClick={toggleOpen4} className="flex flex-col">
          <div
            className={`flex items-center justify-between p-2 ${
              isOpen4 ? "bg-[#555555]" : ""
            } transition-all duration-300`}
          >
            <div className="flex items-center gap-2">
              <IoKeySharp />
              <h4>Room Allotments</h4>
            </div>
            <RiArrowDropDownLine
              className={`${
                isOpen4 ? "rotate-180" : "rotate-0"
              } transition-all duration-300 ease`}
            />
          </div>
          <div
            className={`w-full overflow-hidden ${
              isOpen4 ? "h-full" : "h-0"
            } transition-all duration-300 ease`}
          >
            <div className="flex flex-col gap-4 w-full overflow-hidden h-full pl-7 bg-[#666666] py-3 text-gray-300 tracking-wide">
              {["Add Room Allotment", "All Rooms", "Edit Room Allotment"].map(
                (links, idx) => {
                  return <Link>{links}</Link>;
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
