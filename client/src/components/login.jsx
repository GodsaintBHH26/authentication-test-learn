import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setIsLoggedInContext } from "../App";

const Login = () => {

  const setIsLoggedIn = useContext(setIsLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e)=>{
    e.preventDefault();
    console.log({email, password});
    axios.post("http://localhost:3001/login", {email, password}, {withCredentials:true})
    .then(result=>{
      if(result.data ==="Success!"){
        axios.get("http://localhost:3001/user", {withCredentials:true})
        .then(response=>{
          if(response.data.user){
            setIsLoggedIn(true);
            navigate('/', {state: { user: response.data.user }});
          }
        })
      }else{
        alert("Login failed! User does not exist.");
      }
    })
    .catch(err=>{console.log(err)});
  }

  return (
    <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white ">
      <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Welcome back to <span className="text-[#7747ff]">App</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Log in to your account
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <div className="block relative">
          <label
            htmlFor="email"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-white tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label
            htmlFor="password"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-white tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div>
          <a className="text-sm text-[#7747ff]" href="#">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
        >
          Submit
        </button>
      </form>
      <div className="text-sm text-center mt-[1.6rem]">
        Don’t have an account yet?{" "}
        <a className="text-sm text-[#7747ff]" href="/signup">
          Sign up for free!
        </a>
      </div>
    </div>
  );
};

export default Login;
