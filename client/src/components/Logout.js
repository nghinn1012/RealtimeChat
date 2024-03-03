import axios from "axios";
import React, { useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { logoutRoute } from "../utils/APIRoutes";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <button
      type="button"
      className="me-2 mb-2 ml-[650px] mt-2 text-white bg-gradient-to-r from-purple-900 to-blue-900 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-2 text-center "
      onClick={handleLogout}
    >
      <BiPowerOff />
    </button>
  );
};

export default Logout;
