import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import HomeCheck from "./Pages/Home/HomeCheck";
import HomeBox from "./Pages/Home/HomeBox";
import Welcome from "./Pages/Login/Welcome";
import ContextState from "./Context/ContextState";

function App() {
  return (
    <ContextState>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chatbot" exact element={<HomeCheck />} />
            <Route path="/homebox" exact element={<HomeBox />} />
          </Routes>
        </Router>
      </div>
    </ContextState>
  );
}

export default App;
