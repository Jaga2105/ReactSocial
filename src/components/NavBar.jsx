import React, { useEffect, useState } from "react";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { MdLogout, MdOutlineHome, MdPersonOutline } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { handleActiveMenu } from "../store/reducers/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgSearchLoading } from "react-icons/cg";
import SearchModal from "./modals/SearchModal";

const iconStyle = {
  height: "30px",
  width: "30px",
  cursor: "pointer",
};

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
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
    }
    dispatch(handleActiveMenu(menuTitle));
    setActiveMenu(menuTitle);
  };
  const handleSearchModal = (flag) => {
    dispatch(handleActiveMenu("Home"));
    setShowSearchModal(flag);
  };
  useEffect(() => {
    setActiveMenu(activeMenuTitle);
  }, [activeMenuTitle]);
  return (
    <div className="sticky">
      <SearchModal
        open={showSearchModal}
        handleSearchModal={handleSearchModal}
      />
      <div className="sticky flex justify-between h-18 py-3 px-8 md:px-16 border-2 shadow-sm mb-6">
        <div className="text-3xl font-bold">ReactSocial</div>
        <div className="flex justify-center items-center">
          {menuList.map((menu) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default NavBar;
