import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [newUser, setNewUser] = useState({});
  const [loginUsers, setLoginUsers] = useState([]);
  useEffect(() => {
    const storedLoginUsers = JSON.parse(localStorage.getItem("loginUsers"));
    if (storedLoginUsers) {
      setLoginUsers(storedLoginUsers);
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
  }, [loginUsers]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        newUser,
        setNewUser,
        loginUsers,
        setLoginUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
