import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        {/* <Content /> */}
        <div className=" md:ml-[25%] lg:ml-[16.666%] w-full mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
