import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import welcomeImg from "../assets/images/besocial-welcome.jpg"

const Welcome = () => {
  const navigate = useNavigate();
  // This is  to get the current router path
  const route = useLocation();
  const currentPath = route.pathname.split("/")[1];
  // console.log(currentPath)
  
  useEffect(()=>{
    if(currentPath!==""){
      navigate('/login')
    }
  },[])
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <div className="max-h-[300px] max-w-[300px] sm:h-[600px] sm:w-[600px]">
        <img src={welcomeImg} alt="welcome-img" className="w-full h-full" />
      </div>
      <div className="font-bold text-2xl">Welcome</div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={"/signup"} className="h-10 w-[240px] sm:w-36 flex justify-center items-center border-2 border-[#ffc0dd] rounded-sm hover:bg-[#ffc0dd] hover:border-none">
          Sign Up
        </Link>
        <Link to={"/login"} className="h-10 w-[240px] sm:w-36 flex justify-center items-center  rounded-sm bg-[#ffc0dd] hover:bg-[#ecb1cc] ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
