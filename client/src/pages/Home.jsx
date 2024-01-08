import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex mt-20">
        <SideBar />
        {/* <Content /> */}
        <div className=" md:ml-[25%] lg:ml-[16.666%] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
