import React from 'react'
import { motion } from "framer-motion";
import { IoMdSearch } from 'react-icons/io';

const iconStyle = {
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };
const SearchModal = ({ open, handleSearchModal }) => {
  return (
    <div>
      {open && (
        <motion.div
          className="absolute top-0 left-0 z-10"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="fixed h-[100vh] w-full top-0 left-0"
            onClick={() => handleSearchModal(false)}
          ></div>
          <div className="fixed h-[100vh] w-[400px] bg-white z-10 shadow-2xl rounded-r-2xl">
            <div className="text-2xl font-bold my-5 ml-6">Search</div>
            <div className="flex justify-center items-center h-12 w-[90%] bg-white focus-within:border-gray-400 px-4 py-2 border-2 rounded-md mx-6">
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
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchModal