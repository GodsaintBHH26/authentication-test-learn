import React from "react"
import { useLocation } from "react-router-dom";

function Home(){

    const location = useLocation();
    const user = location.state?.user;

    return(
        <>
        <h1>This is the home page</h1>
        <h2>Welcome back {user && user.name}</h2>      
        </>
    );
}

export default Home