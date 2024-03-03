import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMsg((msg) => msg + event.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện mặc định của biểu mẫu
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="flex flex-row-[95% 5%] bg-gray-900 p-0 md:px-0 md:gap-4">
      <div className="flex items-center col-span-1 text-white">
        <BsEmojiSmileFill
          onClick={handleEmojiPickerHideShow}
          className="text-yellow-300 cursor-pointer ml-4"
        />
        {showEmojiPicker && (
          <Picker
            className="absolute top-[-180px]"
            height={300}
            theme="dark"
            onEmojiClick={handleEmojiClick}
          />
        )}
      </div>
      <form
        onSubmit={sendChat}
        className="fixed ml-10 flex flex-row w-[820px] items-center gap-8 bg-white bg-opacity-20 rounded-full"
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-5/6 h-5 bg-transparent text-white focus:outline-none px-4 text-lg"
        />
        <button
          type="submit" // Đặt type="submit" cho nút gửi
          className="w-1/6 h-12 flex justify-center items-center bg-blue-900 rounded-full"
        >
          <IoMdSend className="text-white text-2xl" />
        </button>
      </form>
    </div>
  );
}
