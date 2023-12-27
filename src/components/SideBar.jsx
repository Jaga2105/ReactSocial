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

const iconStyle = {
  height: "100%",
  width: "100%",
};
const SideBar = () => {
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
    <div className="fixed hidden md:block md:w-1/4 lg:w-1/6">
        {menuList.map((menu) => (
          <div
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
          </div>
        ))}
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
