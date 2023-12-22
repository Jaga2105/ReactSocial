import React from "react";
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
    const navMenu = []
  const iconStyle = {
    color: "gray",
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
  return (
    // <div className="sticky">
    <div className="sticky flex justify-between h-18 py-3 px-8 md:px-16 border-2">
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
        <IoMdHome style={iconStyle} className="ml-6 text-blue" />
        <BsPeopleFill style={iconStyle} className="ml-6" />
        <IoMdSearch style={iconStyle} className="ml-6 block md:hidden" />
        <IoMdPerson style={iconStyle} className="ml-6" />
        <MdLogout style={iconStyle} className="ml-6" />
      </div>
    </div>
    // </div>
  );
};

export default NavBar;
