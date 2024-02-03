import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { searchUser } from "../../api/userAPI";
import { Link, useNavigate } from "react-router-dom";

const iconStyle = {
  height: "30px",
  width: "30px",
  cursor: "pointer",
};
const MobileSearchModal = ({ handleSearchModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);

  const navigate = useNavigate();

  const getUsers = async (searchTerm) => {
    try {
      const response = await searchUser(searchTerm);
      console.log(response);
      setSearchedUsers(response);
    } catch (error) {
      console.log(response);
    }
  };

  const handleSearchText = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      getUsers(e.target.value);
    } else {
      setSearchedUsers(null);
    }
  };
  const onClose = () => {
    handleSearchModal(false);
    setSearchQuery("");
    setSearchedUsers([]);
    console.log("close");
  };

  return (
    <div className="flex">
      <div
        className="absolute z-30 h-[100vh] w-full top-0 left-0"
        onClick={onClose}
      ></div>
      <div className="fixed left-0 top-2 z-40 flex justify-center items-center h-12 w-[58%] bg-white focus-within:border-gray-400 px-4 py-2 border-2 rounded-md mx-6">
        <IoMdSearch style={iconStyle} className="mr-4" />
        <input
          type="text"
          name="query"
          className="w-full outline-none"
          placeholder="Search people"
          onChange={handleSearchText}
          autoComplete="off"
          value={searchQuery}
        />
      </div>
      {searchedUsers && (
        <div className="fixed min-h-[200px] max-h-[400px] w-[354px] top-16 left-6 bg-white z-40 border shadow-md rounded-md overflow-y-auto">
          <div className="text-xl font-bold my-5 ml-6">Search</div>
          <div className="mt-6 flex w-[80%] mx-auto">
            {searchedUsers.length !== 0 ? (
              <div className="w-full flex flex-col justify-center gap-2">
                {searchedUsers.map((user) => (
                  <Link
                    key={user._id}
                    to={`/Profile/${user._id}`}
                    onClick={onClose}
                    className="flex gap-2 items-center"
                  >
                    <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-xl font-bold rounded-full overflow-hidden">
                      {user.profilePic.length !== 0 ? (
                        <img
                          src={user.profilePic}
                          alt="Profile-Pic"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.username.substring(0, 1).toUpperCase()
                      )}
                    </div>
                    <span className="text-lg font-semibold hover:underline">
                      {user.username}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className=" text-xl mt-10">No users found!!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearchModal;
