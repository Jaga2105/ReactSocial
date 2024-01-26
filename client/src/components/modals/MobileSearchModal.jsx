import { IoMdSearch } from "react-icons/io";

const iconStyle = {
  height: "30px",
  width: "30px",
  cursor: "pointer",
};
const MobileSearchModal = ({ handleSearchModal }) => {
    return (
      <div className="flex">
        <div
          className="absolute z-30 h-[100vh] w-full top-0 left-0"
          onClick={() => handleSearchModal(false)}
        ></div>
        <div className="fixed left-0 top-2 z-40 flex justify-center items-center h-12 w-[58%] bg-white focus-within:border-gray-400 px-4 py-2 border-2 rounded-md mx-6">
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
        <div className="fixed min-h-[100px] w-[354px] top-16 left-6 bg-white z-40 border shadow-md rounded-md">
          <div className="text-2xl font-bold my-5 ml-6">Search</div>
        </div>
      </div>
    );
  };

  export default MobileSearchModal;