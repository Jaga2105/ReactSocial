import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdPerson, IoMdSearch, IoMdLogOut } from "react-icons/io";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { handleActiveMenu } from "../store/reducers/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "./modals/SearchModal";
import CreatePostModal from "./modals/CreatePostModal";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutuser } from "../store/reducers/authSlice";


const NavBar = () => {
  // This is  to get the current router path
  const route = useLocation();
  const currentPath = route.pathname.split("/")[1];

  // Logged in user
  const loggedInUser = useSelector((state)=>state.auth.user);

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
    console.log(currentPath)
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowSearchModal(flag);
  };

  const handleCreatePostModal = (flag) => {
    dispatch(handleActiveMenu(currentPath || "Home"));
    setShowCreatePostModal(flag);
  };

  const handleLogout = () =>{
    dispatch(logoutuser())
    navigate('/login')
  }
  useEffect(() => {
    setActiveMenu(currentPath || activeMenuTitle);
  }, [activeMenuTitle]);
  return (
    <>
      <nav className="fixed top-0 z-100 w-full  flex justify-between h-18 py-3 px-8 md:px-16 border-b-2 shadow-sm mb-6 bg-white">
        <div className="text-3xl font-bold">ReactSocial</div>
        <div className="flex justify-center items-center">
          
          <NavLink
          to={"/"}
          className={"ml-6"}
          onClick={()=>handleMenu("Home")}
        >
          { activeMenu === "Home" ? (
            <IoMdHome className="h-8 w-8" />
          ) : (
            <MdOutlineHome className="h-8 w-8"/>
          )}        
        </NavLink>
        <div
          className={`ml-6 md:hidden cursor-pointer`}
          onClick={()=>setShowCreatePostModal((prev)=>!prev)}
        >
          <FiPlusSquare className="h-8 w-8" />
        </div>
        <div
          className={`ml-6 cursor-pointer`}
          onClick={()=>setShowSearchModal((prev)=>!prev)}
        >
          <IoMdSearch className="h-8 w-8" />
        </div>
        <NavLink
          to={"/People"}
          className={"ml-6"}
          onClick={()=>handleMenu("People")}
        >
          { activeMenu === "People" ? (
            <BsPeopleFill className="h-8 w-8" />
          ) : (
            <BsPeople className="h-8 w-8"/>
          )}
        </NavLink>
        <NavLink
          to={`/Profile/${loggedInUser._id}`}
          className={"ml-6"}
          onClick={()=>handleMenu("Profile")}
        >
          { activeMenu === "Profile" ? (
            <IoMdPerson className="h-8 w-8" />
          ) : (
            <MdPersonOutline className="h-8 w-8"/>
          )}
        </NavLink>
        <div
          className={`ml-6 cursor-pointer`}
          onClick={handleLogout}
        >
          <IoMdLogOut className="h-8 w-8" />
        </div>
        </div>
      </nav>
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


export default NavBar;
