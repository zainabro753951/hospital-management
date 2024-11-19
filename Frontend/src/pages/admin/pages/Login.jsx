import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const loginHandel = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:2000/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.notFound) {
      toast.warning(response.data.notFound, {
        theme: "dark",
      });
    } else if (response.data.wrongCred) {
      toast.error(response.data.wrongCred, {
        theme: "dark",
      });
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div>
      <div className="max-w-[1700px] mx-auto w-full min-h-screen flex justify-center items-center">
        <div className="w-[30%] bg-themeBg p-8 text-white rounded-md">
          <h1 className="text-4xl font-semibold text-center">Sign up</h1>
          <form
            onSubmit={loginHandel}
            method="post"
            className="py-8 flex flex-col gap-2"
          >
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
              />
            </div>
            <input
              className="py-2 px-5 bg-teal-500 rounded-full text-black text-xl transition-all duration-150 hover:bg-teal-600"
              type="submit"
              value="Submit"
            />
          </form>
          <p className="text-center">
            Create a new account{" "}
            <Link className="text-blue-900" to="/admin/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
