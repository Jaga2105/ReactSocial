import React, { useEffect, useState } from "react";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IoMdHome, IoMdPerson, IoMdSearch, IoMdLogOut } from "react-icons/io";
import { MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveMenu } from "../../store/reducers/menuSlice";
import SearchModal from "../modals/SearchModal";
import CreatePostModal from "../modals/CreatePostModal";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutuser } from "../../store/reducers/authSlice";

const SideBar = () => {
  // const dispatch = useDispatch();

  // This is  to get the current router path
  const route = useLocation();
  const currentPath = route.pathname.split("/")[1];

  // Loggedin user
  const user = useSelector((state) => state.auth.user);

  // This retrives the active menu from the global store
  const activeMenuTitle = useSelector((state) => state.menu.activeMenu);

  // This stores the active menu
  const [activeMenu, setActiveMenu] = useState(currentPath);

  // This is to handle the visibility of search modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // This is to handle the visibility of create post modal
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (menuTitle) => {
    dispatch(handleActiveMenu(menuTitle));
    setActiveMenu(menuTitle);
  };

  const handleSearchModal = (flag) => {
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowSearchModal(flag);
  };

  const handleCreatePostModal = (flag) => {
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowCreatePostModal(flag);
  };

  const handleLogout = () => {
    dispatch(logoutuser());
    navigate("/login");
  };

  useEffect(() => {
    setActiveMenu(currentPath || activeMenuTitle);
  }, [activeMenuTitle, currentPath]);

  return (
    <>
      <div className="sidebar fixed hidden md:block md:w-1/4 lg:w-1/6 min-h-[100vh] border-r-2 mt-16 pr-2">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            } flex items-center py-3 pl-12 mb-2 cursor-pointer rounded-r-md`
          }
          onClick={() => handleMenu("Home")}
        >
          {activeMenu === "Home" ? (
            <div className="flex items-center">
              <IoMdHome className="h-8 w-8" />
              <span className=" text-lg font-bold ml-4">Home</span>
            </div>
          ) : (
            <div className="flex items-center">
              <MdOutlineHome className="h-8 w-8" />
              <span className=" text-lg ml-4">Home</span>
            </div>
          )}
        </NavLink>
        <div
          className={`flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-md hover:bg-gray-200`}
          onClick={() => setShowSearchModal((prev) => !prev)}
        >
          <IoMdSearch className="h-8 w-8" />
          <span className=" text-lg ml-4">Search</span>
        </div>
        <NavLink
          to={"/People"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            } flex items-center py-3 pl-12 mb-2 cursor-pointer rounded-r-md`
          }
          onClick={() => handleMenu("People")}
        >
          {activeMenu === "People" ? (
            <div className="flex items-center">
              <BsPeopleFill className="h-8 w-8" />
              <span className=" text-lg font-bold ml-4">People</span>
            </div>
          ) : (
            <div className="flex items-center">
              <BsPeople className="h-8 w-8" />
              <span className=" text-lg ml-4">People</span>
            </div>
          )}
        </NavLink>
        <NavLink
          to={`Profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-200" : "hover:bg-gray-200"
            } flex items-center py-3 pl-12 mb-2 cursor-pointer rounded-r-md`
          }
          onClick={() => handleMenu("Profile")}
        >
          {activeMenu === "Profile" ? (
            <div className="flex items-center">
              <IoMdPerson className="h-8 w-8" />
              <span className=" text-lg font-bold ml-4">Profile</span>
            </div>
          ) : (
            <div className="flex items-center">
              <MdPersonOutline className="h-8 w-8" />
              <span className=" text-lg ml-4">Profile</span>
            </div>
          )}
        </NavLink>
        <div
          className={`flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-md hover:bg-gray-200`}
          onClick={() => setShowCreatePostModal((prev) => !prev)}
        >
          <FiPlusSquare className="h-8 w-8" />
          <span className=" text-lg ml-4">Create</span>
        </div>
        <div
          className={`flex items-center pl-12 py-3 mb-2 cursor-pointer rounded-r-md hover:bg-gray-200`}
          onClick={handleLogout}
        >
          <IoMdLogOut className="h-8 w-8" />
          <span className=" text-lg ml-4">Logout</span>
        </div>
      </div>
      <div className="hidden sm:block">
        <SearchModal
          open={showSearchModal}
          handleSearchModal={handleSearchModal}
        />
      </div>
      <CreatePostModal
        open={showCreatePostModal}
        handleCreatePostModal={handleCreatePostModal}
      />
    </>
  );
};

export default SideBar;
