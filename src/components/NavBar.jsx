import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { MdLogout, MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { handleActiveMenu } from "../store/reducers/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgSearchLoading } from "react-icons/cg";
import SearchModal from "./modals/SearchModal";
import CreatePostModal from "./modals/CreatePostModal";
import { Link } from "react-router-dom";

const iconStyle = {
  height: "30px",
  width: "30px",
  cursor: "pointer",
};

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const activeMenuTitle = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();

  const menuList = [
    {
      iconName: "Home",
      inActiveIcon: <MdOutlineHome style={iconStyle} />,
      activeIcon: <IoMdHome style={iconStyle} />,
    },

    {
      iconName: "Create",
      icon: <FiPlusSquare style={iconStyle} />,
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
      iconName: "Logout",
      icon: <MdLogout style={iconStyle} />,
    },
  ];

  const handleMenu = (menuTitle) => {
    if (menuTitle === "Search") {
      setShowSearchModal((prev) => !prev);
    } else if (menuTitle === "Create") {
      setShowCreatePostModal((prev) => !prev);
    }
    dispatch(handleActiveMenu(menuTitle));
    setActiveMenu(menuTitle);
  };
  const handleSearchModal = (flag) => {
    dispatch(handleActiveMenu("Home"));
    setShowSearchModal(flag);
  };

  const handleCreatePostModal = (flag) => {
    dispatch(handleActiveMenu("Home"));
    setShowCreatePostModal(flag);
  };
  useEffect(() => {
    setActiveMenu(activeMenuTitle);
  }, [activeMenuTitle]);
  return (
    <>
      <div className="fixed top-0 z-100 w-full  flex justify-between h-18 py-3 px-8 md:px-16 border-b-2 shadow-sm mb-6 bg-white">
        <div className="text-3xl font-bold">ReactSocial</div>
        <div className="flex justify-center items-center">
          {menuList.map((menu) => (
            <Link
            to={`/${menu.iconName}`}
              key={menu.iconName}
              className={`${
                menu.iconName === "Create" && "block md:hidden"
              } ml-6`}
              onClick={() => handleMenu(menu.iconName)}
            >
              {menu.iconName === "Create" || menu.iconName === "Logout"
                ? menu.icon
                : activeMenu === menu.iconName
                ? menu.activeIcon
                : menu.inActiveIcon}
            </Link>
          ))}
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


export default NavBar;
