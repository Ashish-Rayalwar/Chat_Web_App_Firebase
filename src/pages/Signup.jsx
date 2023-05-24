import React from "react";
import { Link } from "react-router-dom";
import Add from "../images/add.png";
const Signup = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <form>
          <input required type="text" placeholder="name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
