import { Route, Routes, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import "./styles.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
