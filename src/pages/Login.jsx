import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { AuthContext } from "../context/Auth";


const Login = () => {
  const [err, setErr] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const { setLoginUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setLoading(true);
    try {
      e.preventDefault();

      const email = e.target[0].value;
      const password = e.target[1].value;
      await signInWithEmailAndPassword(auth, email, password);
      setLoginUsers((prevUsers) => [...prevUsers, email]);
      navigate("/");
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <form onSubmit={handleSubmit}>
          <input required type="email" name="email" placeholder="email" />
          <input
            required
            type="password"
            name="password"
            placeholder="password"
          />

          <button>Login</button>
          {err && <span>User not found, plz check your email or password</span>}
        </form>
        <p>
          Do you have an account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
