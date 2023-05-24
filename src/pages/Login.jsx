import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <form>
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <button>Login</button>
        </form>
        <p>
          Do you have an account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
