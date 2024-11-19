import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const DashboardHomeData = () => {
  const [docName, setdocName] = useState("");
  const [dob, setdob] = useState("");
  const [Specialization, setSpecialization] = useState("");
  const [Experience, setExperience] = useState("");
  const [age, setage] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [doctorDetails, setdoctorDetails] = useState("");
  const [address, setaddress] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  let doctorData = async (e) => {
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      formData.append("doctor_name", docName);
      formData.append("DoB", dob);
      formData.append("Specialization", Specialization);
      formData.append("Experience", Experience);
      formData.append("age", age);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("doctorDetails", doctorDetails);
      formData.append("address", address);
      formData.append("doctorImage", file);
      try {
        let response = await axios.post(
          "http://localhost:2000/add_doctor",
          formData,
          { withCredentials: true }
        );
        if (response.data.doctorFound) {
          toast.warning(response.data.doctorFound, {
            theme: "dark",
          });
        } else if (response.data.err) {
          toast.error(response.data.err, {
            theme: "dark",
          });
        } else {
          toast.success(response.data.success, {
            theme: "dark",
          });
          setdocName("");
          setdob("");
          setSpecialization("");
          setExperience("");
          setage("");
          setphoneNumber("");
          setemail("");
          setgender("");
          setdoctorDetails("");
          setPreview("");
          setaddress("");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warn("please select your image"),
        {
          theme: "dark",
        };
    }
  };
  return (
    <div className="w-full h-full pt-20">
      <ToastContainer />
      <div className="py-2 px-4 bg-[#666666] flex justify-between items-center w-full">
        <h3 className="text-2xl text-white">Add Doctor</h3>
        <Link
          to={"/admin/dashboard"}
          className="flex items-center text-white gap-3 py-2 bg-themeBg px-4 rounded-full cursor-pointer"
        >
          <IoHomeOutline /> /<span>Dashboard</span>
        </Link>
      </div>
      <div className="p-5 w-full h-full bg-[#e7f2ed]">
        <form
          style={{ boxShadow: "0 0 10px #adadad" }}
          className="w-full h-full bg-white p-5 rounded-lg"
          method="post"
          onSubmit={doctorData}
        >
          <h1 className=" text-themePink text-2xl py-2 font-medium">
            Add Doctor
          </h1>
          <div className="w-full h-full flex flex-col gap-5">
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Doctor Name
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="text"
                  placeholder="Doctor name"
                  required
                  value={docName}
                  onChange={(e) => setdocName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Date of Birth
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Specialization
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="text"
                  placeholder="Specialization"
                  required
                  value={Specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Experience
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="number"
                  placeholder="Experience"
                  required
                  value={Experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Age
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="number"
                  placeholder="Age"
                  required
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Phone Number
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Email
                </label>
                <input
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Gender
                </label>
                <select
                  required
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Doctor Details
                </label>
                <textarea
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="number"
                  placeholder="Doctor Details"
                  rows={5}
                  required
                  value={doctorDetails}
                  onChange={(e) => setdoctorDetails(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium" htmlFor="">
                  Address
                </label>
                <textarea
                  className="w-full py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
                  type="number"
                  placeholder="Address"
                  rows={5}
                  required
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="image"
                  className="flex relative w-[100px] h-[100px] border-2 items-center justify-center border-gray-400 rounded-lg"
                >
                  <FaPlus className="text-3xl" />
                  <input
                    className="w-full h-full hidden"
                    type="file"
                    onChange={handleFileChange}
                    id="image"
                    required
                  />
                </label>
                <label htmlFor="image">Upload your image</label>
              </div>
              <div className="w-[200px] h-[200px] border-gray-400 border-2 rounded-lg overflow-hidden">
                {preview ? (
                  <img
                    className="w-full h-full object-cover"
                    src={preview}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <input
            className=" py-2 px-4 bg-themePink text-white rounded-md transition-all duration-200 hover:border-2  border-blue-800"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default DashboardHomeData;
