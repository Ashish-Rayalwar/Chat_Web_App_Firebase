import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Add from "../images/add.png";
import DefaultImage from "../images/nerd.jpg";
import { auth, db, storage } from "../Firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      let photoURL = DefaultImage; // Default image if no file is selected

      if (file) {
        const storageReference = storageRef(
          storage,
          `${displayName + Date.now()}`
        );
        const uploadTask = uploadBytesResumable(storageReference, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.log(error);
            setError("Error uploading profile image. Please try again.");
            setLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                try {
                  await updateProfile(user, {
                    displayName,
                    photoURL: downloadURL,
                  });

                  const userDocRef = doc(db, "users", user.uid);
                  await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });

                  const userChatsDocRef = doc(db, "userChats", user.uid);
                  await setDoc(userChatsDocRef, {});

                  setLoading(false);
                  navigate("/");
                } catch (error) {
                  console.log(error);
                  setError("Error creating user profile. Please try again.");
                  setLoading(false);
                }
              }
            );
          }
        );
      } else {
        await updateProfile(user, {
          displayName,
          photoURL,
        });

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName,
          email,
          photoURL,
        });

        const userChatsDocRef = doc(db, "userChats", user.uid);
        await setDoc(userChatsDocRef, {});

        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Error signing up. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input
            // required
            style={{ display: "none" }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          {error && <span className="error">{error}</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
