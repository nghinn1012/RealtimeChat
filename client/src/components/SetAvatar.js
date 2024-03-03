/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
import Toast from "./Toast";
import load from "../assets/load.gif";
const SetAvatar = () => {
  const api = `https://api.multiavatar.com/ewLXyJfZQArp4B`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    // console.log(selectedAvatar);
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      let user = JSON.parse(localStorage.getItem("chat-app-current-user"));
      user = user.userFind[0][0];
      try {
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-current-user", JSON.stringify(user));
          toast.success("Avatar was changed");
          console.log(user);
          setTimeout(() => navigate("/chat"), 1000);
        } else {
          toast.error("Error setting avatar. Please try again.");
        }
      } catch (error) {
        console.error("Error setting avatar:", error);
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
      setAvatars(data);
      setTimeout(() => setIsLoading(false), 1000);
    };
    fetchAvatars();
  }, []);

  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 bg-black h-[100vh] w-[100vw]">
      {isLoading ? (
        <img src={load} alt="loader" className="mt-[10%] h-screen" />
      ) : (
        <div className="title-container">
          <h1 className="text-white font-bold text-[30px]">
            Pick an Avatar as your profile picture
          </h1>
        </div>
      )}
      <div className="flex gap-8">
        {avatars.map((avatar, index) => (
          <div
            className={`rounded-md border-solid border-transparent p-2 flex items-center ease-in-out cursor-pointer ${
              selectedAvatar === index ? "border-white border-8" : ""
            }`}
            onClick={() => handleAvatarClick(index)}
            key={avatar}
          >
            <img
              className="h-24 ease-in-out"
              src={`data:image/svg+xml;base64,${avatar}`}
              alt="avatar"
            />
          </div>
        ))}
      </div>
      <button
        className="bg-[#9b8fbb] text-white px-2 py-4 border-none font-bold transform hover:bg-[#4e0eff]"
        onClick={setProfilePicture}
      >
        Set as Profile Picture
      </button>
      <Toast />
    </div>
  );
};

export default SetAvatar;
