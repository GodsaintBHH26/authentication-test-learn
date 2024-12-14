import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { setIsLoggedInContext } from "../App";

function Logout() {
  const setIsLoggedIn = useContext(setIsLoggedInContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error loggining out", error);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        className="!bg-red-500 hover:!text-yellow-400 !font-bold"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}

export default Logout;
