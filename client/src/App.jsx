import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import NavBar from "./components/navbar";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const isLoggedInContext = createContext();
export const setIsLoggedInContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }).catch(()=>{setIsLoggedIn(false)});
  }, []);
  return (
    <>
      <isLoggedInContext.Provider value={isLoggedIn}>
        <setIsLoggedInContext.Provider value={setIsLoggedIn}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/login" element={isLoggedIn?<Navigate to="/"/>:<Login />} />
              <Route path="/signup" element={isLoggedIn?<Navigate to="/"/>:<Signup />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </setIsLoggedInContext.Provider>
      </isLoggedInContext.Provider>
    </>
  );
}

export default App;
