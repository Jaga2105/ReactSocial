import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      <div className="text-6xl font-semibold">Welcome</div>
      <div className="flex gap-8">
        <Link to={"/signup"} className="h-10 w-32 flex justify-center items-center border-2 border-blue-400  rounded-sm hover:bg-blue-600 hover:text-white hover:border-none">
          Sign Up
        </Link>
        <Link to={"/login"} className="h-10 w-32 flex justify-center items-center text-white  rounded-sm bg-blue-500 hover:bg-blue-600 ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
