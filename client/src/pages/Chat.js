import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contact from "../components/Contact";
import Greeting from "../components/Greeting";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          JSON.parse(localStorage.getItem("chat-app-current-user"))
        );
      }
    };
    fetchData();
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getContact = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log(data);

          setContacts(data.data.message);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    getContact();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-gray-800">
      <div className="container bg-gray-900 h-5/6 w-5/6 flex flex-row">
        <Contact contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Greeting />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
