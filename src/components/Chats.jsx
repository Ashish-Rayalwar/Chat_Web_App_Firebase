import React from "react";

const Chats = () => {
  return (
    <div className="chats">
      <div
        className="userChat"
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
      >
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-as-batman-bruce-wayne-in-the-batman-1645186686.jpeg?crop=0.505xw:0.757xh;0.385xw,0.0144xh&resize=1200:*"
          alt=""
        />
        <div className="userChatInfo">
          <span>sadf</span>
          <p>dsfs</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
