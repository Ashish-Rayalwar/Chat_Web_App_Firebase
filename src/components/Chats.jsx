import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // setNewUser(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .slice(0, 4) // Limit the number of chats to 4
        .map((chat) => {
          const userInfo = chat[1].userInfo;
          const lastMessage = chat[1].lastMessage;

          // Check if userInfo and photoURL exist before rendering
          if (userInfo && userInfo.photoURL) {
            return (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(userInfo)}
              >
                <img src={userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{userInfo.displayName}</span>
                  <p>{lastMessage?.text}</p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default Chats;
