import React, { useContext, useState } from "react";
import Attach from "../images/attach.png";
import Add from "../images/img.png";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import Doc from "../images/attach.png"; // Import document icon image
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
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false); // Add uploading state

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      if (img) {
        setUploading(true); // Set uploading state to true
        const storageReference = storageRef(storage, uuid());
        const uploadTask = uploadBytesResumable(storageReference, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
            setUploading(false); // Set uploading state to false on error
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
                  setUploading(false); // Set uploading state to false on success
                  setImg(null); // Reset the img state after sending
                } catch (error) {
                  console.log(error);
                  setUploading(false); // Set uploading state to false on error
                }
              }
            );
          }
        );
      } else if (document) {
        setUploading(true); // Set uploading state to true
        const storageReference = storageRef(storage, uuid());
        const uploadTask = uploadBytesResumable(storageReference, document);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
            setUploading(false); // Set uploading state to false on error
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
                      document: downloadURL,
                    }),
                  });
                  setUploading(false); // Set uploading state to false on success
                  setDocument(null); // Reset the document state after sending
                } catch (error) {
                  console.log(error);
                  setUploading(false); // Set uploading state to false on error
                }
              }
            );
          }
        );
      } else {
        setText("");
        setImg(null);
        setDocument(null);
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

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), chatUpdate),
        updateDoc(doc(db, "userChats", data.user.uid), chatUpdate),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderThumbnail = () => {
    if (img) {
      return (
        <img
          style={{ width: "20px" }}
          src={URL.createObjectURL(img)}
          alt="Thumbnail"
        />
      );
    } else if (document) {
      return <span>📃</span>;
    } else {
      return null;
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={!img && !document ? text : ""}
      />
      {text && renderThumbnail()}
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <label htmlFor="file">
            <img src={!img ? Add : null} alt="" />
          </label>
          {img && renderThumbnail()}
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="filed"
          onChange={(e) => setDocument(e.target.files[0])}
        />
        <label htmlFor="filed">
          <label htmlFor="filed">
            <img src={!document ? Attach : null} alt="" />
          </label>
          {document && renderThumbnail()}
        </label>
        {uploading ? (
          <span>Uploading...</span>
        ) : (
          <button onClick={handleSend}>Send</button>
        )}
      </div>
    </div>
  );
};

export default Input;
