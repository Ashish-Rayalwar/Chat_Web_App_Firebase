import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import "./styles.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import Room from "./components/Room";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return navigate("/login");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={currentUser ? <Home /> : <Login />} />
        <Route
          path="/room/:roomId"
          element={currentUser ? <Room /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
