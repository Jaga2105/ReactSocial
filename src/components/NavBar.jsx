import React, { useState } from "react";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState("profile")
  
  const iconStyle = {
    color: "gray",
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
  const menuList = [
    {
      iconName: "home",
      icon: <IoMdHome style={{color:activeMenu==="home"? "hsl(210, 60%, 50%)":"gray", height:"30px", width:"30px", cursor:"pointer"}}/>,
    },
    {
      iconName: "people",
      icon: <BsPeopleFill style={{color:activeMenu==="people"? "hsl(210, 60%, 50%)":"gray", height:"30px", width:"30px", cursor:"pointer"}}/>,
    },
    {
      iconName: "search",
      icon: <IoMdSearch style={{color:activeMenu==="search"? "hsl(210, 60%, 50%)":"gray", height:"30px", width:"30px", cursor:"pointer"}}/>,
    },
    {
      iconName: "profile",
      icon: <IoMdPerson style={{color:activeMenu==="profile"? "hsl(210, 60%, 50%)":"gray", height:"30px", width:"30px", cursor:"pointer"}}/>,
    },
    {
      iconName: "logout",
      icon: <MdLogout style={{color:activeMenu==="logout"? "hsl(210, 60%, 50%)":"gray", height:"30px", width:"30px", cursor:"pointer"}}/>,
    },
  ];
  return (
    // <div className="sticky">
    <div className="sticky flex justify-between h-18 py-3 px-8 md:px-16 border-2 shadow-sm mb-6">
      <div className="text-3xl font-bold">ReactSocial</div>
      <div className="hidden md:flex justify-center items-center h-12 w-1/3 bg-white focus-within:border-gray-400 px-4 py-2 border-2 rounded-md">
        <IoMdSearch style={iconStyle} className="mr-4" />
        <input
          type="text"
          name="query"
          className="w-full outline-none"
          placeholder="Search people"
          //   onChange={(e) => handleSearchText(e)}
          autoComplete="off"
          //   value={searchQuery}
        />
      </div>
      <div className="flex justify-center items-center">
        {menuList.map((menu) => (
          <div className={`${menu.iconName==="search" && "block md:hidden"} ml-6`} onClick={()=>setActiveMenu(menu.iconName)}>{menu.icon}</div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default NavBar;
