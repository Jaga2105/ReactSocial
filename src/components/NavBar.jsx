import React from 'react'
import { IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
    const iconStyle = {
        color:"gray",
        height:"30px",
        width:"30px"
    }
  return (
    <div className='flex justify-between h-16 py-2 px-16 border-2'>
        <div className='text-3xl font-bold'>ReactSocial</div>
        <div className='flex justify-center items-center h-8'>
            <input type="text" name="search"/>
        </div>
        <div className='flex justify-center items-center'>
            <IoMdHome style={iconStyle} className='ml-4'/>
            <BsPeopleFill style={iconStyle} className='ml-4'/>
            <IoMdPerson style={iconStyle} className='ml-4'/>
            {/* <IoMdSearch /> */}
            <MdLogout style={iconStyle} className='ml-4'/>
        </div>
    </div>
  )
}

export default NavBar