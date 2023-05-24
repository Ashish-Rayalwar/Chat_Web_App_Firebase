import React from "react";
import User from "../images/addAvatar.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={User} alt="" />
        <span>name</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
