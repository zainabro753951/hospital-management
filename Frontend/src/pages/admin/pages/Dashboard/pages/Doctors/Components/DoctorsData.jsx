import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const DoctorsData = () => {
  const [DoctorsDataFromDatabase, setDoctorsDataFromDatabase] = useState([]);
  const [result, setresult] = useState([]);
  const [search, setsearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    let doctorsData = async () => {
      let doctors = await axios.get("http://localhost:2000/get_doctors", {
        withCredentials: true,
      });
      setDoctorsDataFromDatabase(doctors.data);
      setresult(doctors.data);
    };
    doctorsData();
  }, []);

  useEffect(() => {
    let searchedData = async () => {
      if (search) {
        let Response = await axios.post(
          "http://localhost:2000/search",
          {
            search,
          },
          { withCredentials: true }
        );
        setresult(Response.data);
      } else {
        setresult(DoctorsDataFromDatabase);
      }
    };
    searchedData();
  }, [search, DoctorsDataFromDatabase]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const deletedRow = async () => {
    let resp = await axios.delete("http://localhost:2000/delete_doc", {
      data: { ids: selectedRows },
    });
    if (resp.data.Successmessage) {
      toast.success(resp.data.Successmessage, {
        theme: "light",
      });
      setresult((prevResult) =>
        prevResult.filter((data) => !selectedRows.includes(data._id))
      );
      setSelectedRows([]);
    }
  };

  return (
    <div className="w-full h-full pt-20">
      <div className="py-2 px-4 bg-[#666666] flex justify-between items-center w-full">
        <h3 className="text-2xl text-white">Doctors</h3>
        <Link
          to={"/admin/dashboard"}
          className="flex items-center gap-3 py-2 bg-themeBg px-4 rounded-full cursor-pointer"
        >
          <IoHomeOutline /> /<span>Dashboard</span>
        </Link>
      </div>
      <div className="p-5 w-full h-full bg-[#e7f2ed]">
        <h1 className=" text-themePink text-2xl py-2 font-medium">
          Doctors List
        </h1>
        <div className="w-full h-full flex justify-end">
          <div className="flex items-center gap-3">
            <label className="text-2xl" htmlFor="">
              Search
            </label>
            <input
              className=" py-2 px-4 border-2 rounded-md border-gray-400 outline-none transition-all duration-300 focus:border-blue-700"
              type="search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="type keyword"
            />
          </div>
        </div>
        <div className="bg-white p-5  mt-7 rounded-md">
          <table class="w-full border-2 border-gray-200 rounded-lg">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  <input
                    className="w-6 h-6"
                    type="checkbox"
                    disabled
                    name=""
                    id=""
                  />
                </th>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  Doctor Name
                </th>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  Experience
                </th>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  Specialization
                </th>
                <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              {result.map((data) => {
                return (
                  <tr>
                    <td class="w-1/3 py-5 px-4 text-center">
                      <input
                        className="w-6 h-6"
                        type="checkbox"
                        checked={selectedRows.includes(data._id)}
                        onChange={() => handleCheckboxChange(data._id)}
                        id={data._id}
                      />
                    </td>
                    <td class="w-1/3 py-5 px-4 text-center">
                      {data.doctor_name}
                    </td>
                    <td class="w-1/3 py-5 px-4 text-center">
                      {data.Experience}
                    </td>
                    <td class="w-1/3 py-5 px-4 text-center">
                      {data.phoneNumber}
                    </td>
                    <td class="w-1/3 py-5 px-4 text-center">
                      {data.Specialization}
                    </td>
                    <td class={`w-1/3 py-5 px-4 text-center`}>
                      <span
                        className={`px-5 ${
                          data.Status === "Active"
                            ? "bg-green-600 text-white"
                            : "" || data.Status === "Inactive"
                        }`}
                      >
                        {data.Status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center gap-9 py-10">
            <button
              onClick={deletedRow}
              className="flex items-center gap-2 py-2 mt-4 bg-red-600 text-white px-9 rounded-md text-xl"
            >
              <FaRegTrashAlt />
              Delete
            </button>
            <button className="flex items-center gap-2 py-2 mt-4 bg-green-600 text-white px-9 rounded-md text-xl">
              <FaRegEdit />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsData;
