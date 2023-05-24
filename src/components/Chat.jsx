import React from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Message from "./Message";
import Input from "./Input";
import Messages from "./Messages";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Ashish</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
