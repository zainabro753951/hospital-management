import axios from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  let navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:2000/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.conPassword) {
        toast.warning(response.data.conPassword, {
          theme: "dark",
        });
      } else if (response.data.errorMessage) {
        toast.error(response.data.errorMessage, {
          theme: "dark",
        });
      } else {
        toast.success("Successfully registered!", {
          theme: "dark",
        });
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred during submission", {
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <div className="max-w-[1700px] mx-auto w-full min-h-screen flex justify-center">
        <div className="w-[40%] bg-themeBg p-8 text-white">
          <h1 className="text-4xl font-semibold text-center">Sign up</h1>
          <form
            onSubmit={handleSignup}
            className="py-8 flex flex-col gap-2"
            encType="multipart/form-data"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-2xl" htmlFor="">
                  First Name
                </label>
                <input
                  className="p-2 rounded-md w-full outline-none border-2 border-black bg-transparent placeholder:text-gray-100"
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-2xl" htmlFor="">
                  Last Name
                </label>
                <input
                  className=" p-2 rounded-md w-full outline-none border-2 border-black bg-transparent placeholder:text-gray-100"
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-2xl" htmlFor="">
                Email
              </label>
              <input
                className=" p-2 rounded-md w-full outline-none border-2 border-black bg-transparent placeholder:text-gray-100"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-2xl" htmlFor="">
                Password
              </label>
              <input
                className=" p-2 rounded-md w-full outline-none border-2 border-black bg-transparent placeholder:text-gray-100"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-2xl" htmlFor="">
                Confirm Password
              </label>
              <input
                className=" p-2 rounded-md w-full outline-none border-2 border-black bg-transparent placeholder:text-gray-100"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                placeholder="Retype password"
                required
              />
            </div>
            <div className="w-full h-full flex justify-between items-center">
              <label
                htmlFor="image"
                className="flex relative w-[100px] h-[100px] border-2 items-center justify-center border-black rounded-lg"
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
              <div className="w-[200px] h-[200px] border-black border-2 rounded-lg overflow-hidden">
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
            <input
              className="py-2 px-5 bg-teal-500 rounded-full text-black text-xl transition-all duration-150 hover:bg-teal-600"
              type="submit"
              value="Submit"
            />
          </form>
          <p className="text-center">
            Already have an account{" "}
            <span className="text-blue-800">
              <Link to="/admin/login">here</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
