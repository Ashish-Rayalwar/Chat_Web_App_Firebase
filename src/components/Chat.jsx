import React, { useCallback, useContext } from "react";
import Cam from "../images/cam.png";

import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Chat = () => {
  const navigate = useNavigate();
  const { data } = useContext(ChatContext);
  const {  setNewUser} =
    useContext(AuthContext);

  const handleJoinRoom = useCallback(() => {
    // console.log(value);
    setNewUser(data.user.displayName);
    navigate(`/room/${data.chatId}`);
  }, [navigate,data.chatId]);

  // console.log(data);
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="title">
          <span>{data.user?.displayName}</span>
          <img src={data.user?.photoURL} />
        </div>

        <div className="chatIcons">
          <img onClick={handleJoinRoom} src={Cam} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
