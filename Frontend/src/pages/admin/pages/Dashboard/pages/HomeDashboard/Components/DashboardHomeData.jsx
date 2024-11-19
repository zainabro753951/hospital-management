import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const DashboardHomeData = () => {
  return (
    <div className="w-full h-full pt-20">
      <div className="py-2 px-4 bg-[#666666] flex justify-between items-center w-full">
        <h3 className="text-2xl text-white">Quick Statistics</h3>
        <Link
          to={"/admin/dashboard"}
          className="flex items-center gap-3 py-2 bg-themeBg px-4 rounded-full cursor-pointer"
        >
          <IoHomeOutline /> /<span>Dashboard</span>
        </Link>
      </div>
      <div className="p-7"></div>
    </div>
  );
};

export default DashboardHomeData;
