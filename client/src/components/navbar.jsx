import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./logout";
import { useContext } from "react";
import { isLoggedInContext } from "../App";

function NavBar() {
  const isLoggedIn = useContext(isLoggedInContext);
  return (
    <>
      <AppBar className="!bg-transparent !shadow-none">
        <Toolbar className="flex justify-between">
          <Typography variant="h4">
            <img src="/vite.svg" alt="" />
          </Typography>
          <div className="flex gap-6">
            {isLoggedIn ? (
              <Logout />
            ) : (
              <>
                <Button
                  variant="contained"
                  to="/login"
                  className="!bg-yellow-500 !font-bold"
                  component={Link}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  to="/signup"
                  className="!bg-yellow-500 !font-semibold"
                  component={Link}
                >
                  Sign-Up
                </Button>
              </>
            )}

            <Button
              variant="contained"
              to="/"
              className="!bg-yellow-500 !font-semibold"
              component={Link}
            >
              Home
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
