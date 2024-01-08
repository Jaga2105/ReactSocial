import React, { useEffect, useState } from "react";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { MdLogout, MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { CgSearchLoading } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveMenu } from "../store/reducers/menuSlice";
import SearchModal from "./modals/SearchModal";
import CreatePostModal from "./modals/CreatePostModal";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const iconStyle = {
  height: "100%",
  width: "100%",
};
const SideBar = () => {
  // const [activeMenu, setActiveMenu] = useState("");
  // const [showSearchModal, setShowSearchModal] = useState(false);
  // const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  // const activeMenuTitle = useSelector((state) => state.menu.activeMenu);
  // const dispatch = useDispatch();

  // This is  to get the current router path
  const route = useLocation();
  const currentPath = route.pathname.split("/")[1];

  // This retrives the active menu from the global store
  const activeMenuTitle = useSelector((state) => state.menu.activeMenu);

  // This stores the active menu
  const [activeMenu, setActiveMenu] = useState(currentPath);

  // This is to handle the visibility of search modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // This is to handle the visibility of create post modal
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const dispatch = useDispatch();

  const menuList = [
    {
      iconName: "Home",
      inActiveIcon: <MdOutlineHome style={iconStyle} />,
      activeIcon: <IoMdHome style={iconStyle} />,
    },
    {
      iconName: "Search",
      inActiveIcon: <IoMdSearch style={iconStyle} />,
      activeIcon: <CgSearchLoading style={iconStyle} />,
    },
    {
      iconName: "People",
      inActiveIcon: <BsPeople style={iconStyle} />,
      activeIcon: <BsPeopleFill style={iconStyle} />,
    },
    {
      iconName: "Profile",
      inActiveIcon: <MdPersonOutline style={iconStyle} />,
      activeIcon: <IoMdPerson style={iconStyle} />,
    },
    {
      iconName: "Create",
      icon: <FiPlusSquare style={iconStyle} />,
    },
    {
      iconName: "Logout",
      icon: <MdLogout style={iconStyle} />,
    },
  ];

  const handleMenu = (menuTitle) => {
    // if (menuTitle === "Search") {
    //   setShowSearchModal((prev) => !prev);
    // } else if (menuTitle === "Create") {
    //   setShowCreatePostModal((prev) => !prev);
    // }
    dispatch(handleActiveMenu(menuTitle));
    setActiveMenu(menuTitle);
  };

  const handleSearchModal = (flag) => {
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowSearchModal(flag);
  };

  const handleCreatePostModal = (flag) => {
    console.log(activeMenu);
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowCreatePostModal(flag);
  };

  useEffect(() => {
    // setActiveMenu(activeMenuTitle);
    setActiveMenu(currentPath || activeMenuTitle);
  }, [activeMenuTitle]);

  return (
    <>
      {/* <div className="fixed hidden md:block md:w-1/4 lg:w-1/6">
        {menuList.map((menu) => (
          <Link
          to={`/${(menu.iconName==="Profile" || menu.iconName==="People") ? menu.iconName
            //  : (activeMenu!="Home" && menu.iconName==="Search" ? activeMenu : "" )
            : (menu.iconName==="Home" ? "" : currentPath )
            }`}
            key={menu.iconName}
            className={`flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-full hover:bg-gray-100`}
            onClick={() => handleMenu(menu.iconName)}
          >
            <div className="h-8 w-8">
              {menu.iconName === "Create" || menu.iconName === "Logout"
                ? menu.icon
                : activeMenu === menu.iconName
                ? menu.activeIcon
                : menu.inActiveIcon}
            </div>
            <span
              className={`${
                activeMenu === menu.iconName ? "font-bold" : "font-normal"
              } text-xl ml-4`}
            >
              {menu.iconName}
            </span>
          </Link>
        ))}
    </div> */}

      <div className="sidebar fixed hidden md:block md:w-1/4 lg:w-1/6">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={()=>handleMenu("Home")}
        >
          { activeMenu === "Home" ? (
            <IoMdHome className="icon" />
          ) : (
            <MdOutlineHome className="icon"/>
          )}        
          <span className=" text-xl font-bold menu-text">Home</span>
        </NavLink>
        <div
          className={`icon-container flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-full hover:bg-gray-100`}
          onClick={()=>setShowSearchModal((prev)=>!prev)}
        >
          <IoMdSearch className="icon" />
          <span className=" text-xl font-bold menu-text">Search</span>
        </div>
        <NavLink
          to={"/People"}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={()=>handleMenu("People")}
        >
          { activeMenu === "People" ? (
            <BsPeopleFill className="icon" />
          ) : (
            <BsPeople className="icon"/>
          )}
          <span className=" text-xl font-bold menu-text">People</span>
        </NavLink>
        <NavLink
          to={"/Profile"}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={()=>handleMenu("Profile")}
        >
          { activeMenu === "Profile" ? (
            <IoMdPerson className="icon" />
          ) : (
            <MdPersonOutline className="icon"/>
          )}
          <span className=" text-xl font-bold menu-text">Profile</span>
        </NavLink>
        <div
          className={`icon-container flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-full hover:bg-gray-100`}
          onClick={()=>setShowCreatePostModal((prev)=>!prev)}
        >
          <FiPlusSquare className="icon" />
          <span className=" text-xl font-bold menu-text">Create</span>
        </div>
        <div
          className={`icon-container flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-full hover:bg-gray-100`}
        >
          <MdLogout className="icon" />
          <span className=" text-xl font-bold menu-text">Logout</span>
        </div>
      </div>
      <SearchModal
        open={showSearchModal}
        handleSearchModal={handleSearchModal}
      />
      <CreatePostModal
        open={showCreatePostModal}
        handleCreatePostModal={handleCreatePostModal}
      />
    </>
  );
};

export default SideBar;
