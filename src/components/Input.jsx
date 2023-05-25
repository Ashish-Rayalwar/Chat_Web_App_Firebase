import React, { useContext, useState } from "react";
import Attach from "../images/attach.png";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import Img from "../images/img.png";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/ChatContext";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      if (img) {
        const storageReference = storageRef(storage, uuid());

        const uploadTask = uploadBytesResumable(storageReference, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                try {
                  await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            );
          }
        );
      } else {
        setText("");
        setImg(null);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      const chatUpdate = {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      };

      // Promise.allSettled([setText(""), setImg(null)]);

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), chatUpdate),
        updateDoc(doc(db, "userChats", data.user.uid), chatUpdate),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {
          // <img src={Attach} alt="" />
        }
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
