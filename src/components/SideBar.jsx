import React, { useEffect, useState } from "react";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { MdLogout, MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { CgSearchLoading } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveMenu } from "../store/reducers/menuSlice";

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuTitle = useSelector((state)=>state.menu.activeMenu)
  const dispatch = useDispatch()
  const iconStyle = {
    height: "100%",
    width: "100%"
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
      iconName: "Search",
      inActiveIcon: (
        <IoMdSearch
          style={iconStyle}
        />
      ),
      activeIcon: (
        <CgSearchLoading
          style={iconStyle}
        />
      ),
    },
    {
      iconName: "People",
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
        <MdPersonOutline
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
        iconName: "Create",
        icon: (
          <FiPlusSquare
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

  const handleMenu = (menuTitle) =>{
    dispatch(handleActiveMenu(menuTitle))
    setActiveMenu(menuTitle)
  }

  useEffect(()=>{
    setActiveMenu(activeMenuTitle)
  },[activeMenuTitle])
  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/6">
      <div>
        {menuList.map((menu) => (
          <div
            className={`flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-full hover:bg-gray-100`}
            onClick={() => handleMenu(menu.iconName)}
          >
            {/* {menu.icon} */}
            <div className="h-8 w-8">
            {menu.iconName==="Create" || menu.iconName==="Logout" ? menu.icon : activeMenu===menu.iconName ? menu.activeIcon : menu.inActiveIcon}
            </div>
            <span className={`${activeMenu===menu.iconName ? "font-bold": "font-normal"} text-xl ml-4`}>{menu.iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
