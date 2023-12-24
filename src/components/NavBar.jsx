import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { handleActiveMenu } from "../store/reducers/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false)
  const activeMenuTitle = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();

  const iconStyle = {
    color: "gray",
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
  const menuList = [
    {
      iconName: "Home",
      icon: (
        <IoMdHome
          style={{
            color: activeMenu === "Home" ? "hsl(210, 60%, 50%)" : "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      iconName: "Create",
      icon: (
        <FiPlusSquare
          style={{
            color: "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      iconName: "People",
      icon: (
        <BsPeopleFill
          style={{
            color: activeMenu === "People" ? "hsl(210, 60%, 50%)" : "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      iconName: "Search",
      icon: (
        <IoMdSearch
          style={{
            color: activeMenu === "Search" ? "hsl(210, 60%, 50%)" : "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      iconName: "Profile",
      icon: (
        <IoMdPerson
          style={{
            color: activeMenu === "Profile" ? "hsl(210, 60%, 50%)" : "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      iconName: "Logout",
      icon: (
        <MdLogout
          style={{
            color: activeMenu === "Logout" ? "hsl(210, 60%, 50%)" : "gray",
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      ),
    },
  ];

  const handleMenu = (menuTitle) => {
    if(menuTitle==="Search"){
      setShowSearchModal((prev)=>!prev)
    }
    dispatch(handleActiveMenu(menuTitle));
    setActiveMenu(menuTitle);
  };
  const handleSearchModal = (flag) =>{
    setShowSearchModal(flag)
  }
  useEffect(()=>{
    setActiveMenu(activeMenuTitle)
  },[activeMenuTitle])
  return (
    <div className="sticky">
      <SearchModal open={showSearchModal} handleSearchModal={handleSearchModal}/>
    <div className="sticky flex justify-between h-18 py-3 px-8 md:px-16 border-2 shadow-sm mb-6">
      {/* <SearchModal open={showSearchModal} handleSearchModal={handleSearchModal}/> */}
      <div className="text-3xl font-bold">ReactSocial</div>
      {/* <div className="hidden md:flex justify-center items-center h-12 w-1/3 bg-white focus-within:border-gray-400 px-4 py-2 border-2 rounded-md">
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
      </div> */}
      <div className="flex justify-center items-center">
        {menuList.map((menu) => (
          <div
            className={`${
              (menu.iconName === "Create") && "block md:hidden"
            } ml-6`}
            onClick={() => handleMenu(menu.iconName)}
          >
            {menu.icon}
          </div>
        ))}
      </div>
      {/* <SearchModal open={showSearchModal} handleSearchModal={handleSearchModal}/> */}
    </div>
    </div>
  );
};

const SearchModal = ({open, handleSearchModal}) =>{
  return (
    <div>
      {open && (
        // <div className="transition delay-700 duration-700 ease-in-out">
        //   <div className="fixed h-[100vh] w-full top-0 left-0" onClick={()=>handleSearchModal(false)}></div>
        // <div className="fixed top-0 left-0 h-[100vh] w-[300px] bg-white z-10 shadow-xl ">SearchBar</div>
        // </div>
        <motion.div
        className="absolute z-10"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="fixed h-[100vh] w-full top-0 left-0" onClick={()=>handleSearchModal(false)}></div>
        <div className="fixed top-0 left-0 h-[100vh] w-[300px] bg-white z-10 shadow-xl rounded-r-2xl">SearchBar</div>
      </motion.div>
      )}
    </div>
  );
}

export default NavBar;
