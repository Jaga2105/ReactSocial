import React, { useState } from "react";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoMdHome, IoMdPerson } from "react-icons/io";
import { MdLogout, MdOutlineHome } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState("Profile");
  const iconStyle = {
    color: "gray",
    height: "30px",
    width: "30px",
  }
  const menuList = [
    {
      iconName: "Home",
      inActiveIcon: (
        <MdOutlineHome
          style={iconStyle}
        />
      ),
      activeIcon: (
        <IoMdHome
          style={iconStyle}
        />
      ),
    },
    {
      iconName: "Friends",
      inActiveIcon: (
        <BsPeople
          style={iconStyle}
        />
      ),
      activeIcon: (
        <BsPeopleFill
          style={iconStyle}
        />
      ),
    },
    {
      iconName: "Profile",
      inActiveIcon: (
        <IoPersonOutline
          style={iconStyle}
        />
      ),
      activeIcon: (
        <IoMdPerson
          style={iconStyle}
        />
      ),
    },
    {
      iconName: "Logout",
      icon: (
        <MdLogout
          style={iconStyle}
        />
      ),
    },
  ];
  return (
    <div className="w-1/6">
      <div>
        {menuList.map((menu) => (
          <div
            className={`flex items-center ml-6 px-2 py-3 mb-2 cursor-pointer`}
            onClick={() => setActiveMenu(menu.iconName)}
          >
            {/* {menu.icon} */}
            {menu.iconName==="Logout" ? menu.icon : activeMenu===menu.iconName ? menu.activeIcon : menu.inActiveIcon}
            <span className="text-lg ml-4">{menu.iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
