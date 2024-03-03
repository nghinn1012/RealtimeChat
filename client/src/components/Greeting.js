import React, { useState, useEffect } from "react";
import Egg from "../assets/egg.gif";

export default function Greeting() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(data.username);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col text-white ml-60">
      <img src={Egg} alt="" className="h-80 item-center" />

      <h1 className="text-3xl">
        Welcome, <span className="text-purple-600">{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}
