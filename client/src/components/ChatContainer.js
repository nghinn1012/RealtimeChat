import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import defaultAvatar from "../assets/default.svg";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      // console.log(data);
      // console.log(currentChat);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      // console.log(response);
      setMessages(response.data);
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("chat-app-current-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    console.log(msgs);
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-[10%,80%,10%] gap-0.1rem overflow-hidden">
      <div className="flex items-center justify-between px-8 ">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10">
            <img
              src={
                currentChat.avatarImage
                  ? `data:image/svg+xml;base64,${currentChat.avatarImage}`
                  : defaultAvatar
              }
              alt=""
              className="w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-white">{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-auto scrollbar-thumb-white">
        {messages &&
          Array.isArray(messages) &&
          messages.map((message) => (
            <div key={uuidv4()}>
              <div
                className={`flex ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-40 overflow-wrap break-words p-4 rounded-lg ${
                    message.fromSelf
                      ? "bg-blue-900 text-white"
                      : "bg-purple-600 text-white"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
