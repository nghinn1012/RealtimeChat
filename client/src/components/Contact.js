import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/default.svg";

export default function Contact({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <div className="grid grid-rows-[10%,75%,15%] overflow-hidden bg-[#080420]">
          <div className="flex items-center justify-center space-x-4">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              className="h-8"
            />
            <h3 className="text-white uppercase font-extrabold">smuppy</h3>
          </div>
          <div className="w-[200px] flex flex-col items-center overflow-auto gap-2 scrollbar ">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`pl-8 h-full w-full contact bg-gray-700 rounded p-2 cursor-pointer transition duration-500 ${
                  index === currentSelected ? "bg-purple-800" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <img
                      src={
                        contact.avatarImage
                          ? `data:image/svg+xml;base64,${contact.avatarImage}`
                          : defaultAvatar
                      }
                      alt=""
                      className="h-12"
                      onClick={changeCurrentChat}
                    />
                  </div>
                  <div className="username">
                    <h3 className="text-white font-bold text-base">
                      {contact.username}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-6 bg-gradient-to-r from-purple-900 to-blue-900">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-14"
              />
            </div>
            <div className="username">
              <h2 className="text-white">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
