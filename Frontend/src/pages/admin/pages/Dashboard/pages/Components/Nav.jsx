import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
const Nav = () => {
  const [adminData, setadminData] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const adminPanel = useRef("");
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const res = await axios.get("http://localhost:2000/admin-data", {
          withCredentials: true,
        });
        const data = res.data;
        setadminData(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchingData();
  }, []);

  const toggleDiv = () => setisOpen(!isOpen);
  useEffect(() => {
    if (isOpen) {
      gsap.from(adminPanel.current, {
        rotateY: 40,
        opacity: 0,
        duration: 1,
        ease: "power4",
      });
    }
  }, [isOpen]);

  return (
    <div className="w-full flex justify-end py-2 px-5 fixed ">
      <div className="flex h-full items-center gap-3 ">
        <div className="p-2 w-[50px] h-[50px] text-2xl text-white flex items-center justify-center rounded-full transition-all duration-200 hover:bg-slate-500 bg-[#555555]">
          <IoMdMenu />
        </div>
        <div
          onClick={toggleDiv}
          className="w-[50px] h-[50px] text-2xl text-white flex items-center justify-center rounded-full"
        >
          {adminData.profileImage ? (
            <img
              src={`http://localhost:2000/${adminData.profileImage}`}
              alt="Admin Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        ref={adminPanel}
        style={{ boxShadow: "0 0 10px gray" }}
        className={`fixed w-[250px] top-16 ${isOpen ? "block" : "hidden"}`}
      >
        <h4 className="text-2xl text-white bg-[#555555] p-5">
          {adminData.firstName + " " + adminData.lastName}
        </h4>
        <div className="flex items-center gap-3 p-5 cursor-pointer">
          <AiOutlineLogin className="text-red-600" />
          <h4>Logout</h4>
        </div>
      </div>
    </div>
  );
};

export default Nav;
