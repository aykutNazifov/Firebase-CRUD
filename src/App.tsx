import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { login } from "./redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./components/loading/Loading";
import { auth } from "./firebase";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [user]);

  return (
    <Router>
      {loading ? (
        <div className="loading">
          <Loading type="spinningBubbles" color="#fff" />
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>{" "}
        </>
      )}
    </Router>
  );
}

export default App;
