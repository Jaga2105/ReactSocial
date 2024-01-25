import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../profile/ImageUpload";
import ClipLoader from "react-spinners/ClipLoader";
import { handleFetch } from "../../store/reducers/authSlice";
import { updateUser } from "../../api/userAPI";

const EditProfileModal = ({
    open,
    setShowEditProfileModal,
    userDetails,
    user,
    setIsUserUpdated,
  }) => {
    const isFetching = useSelector((state) => state.auth.isFetching);
    const [userData, setUserData] = useState({
      username: userDetails?.username,
      email: userDetails?.email,
      password: "",
      profilePic: userDetails?.profilePic,
    });
    const dispatch = useDispatch();
    const handleClose = () => {
      setShowEditProfileModal(false);
      setUserData({
        username: userDetails?.username,
        email: userDetails?.email,
        password: "",
        profilePic: userDetails?.profilePic,
      });
    };
  
  
    const handleInputChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(handleFetch(true));
      await updateUser(user._id, user.token, userData);
      dispatch(handleFetch(false));
      setIsUserUpdated(true);
      handleClose();
    };
  
    return (
      <>
        {open && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            {/* Close button */}
            <div
              className="absolute top-5 right-5 z-10 cursor-pointer"
              onClick={handleClose}
            >
              <RxCross2
                style={{ height: "30px", width: "30px", color: "white" }}
              />
            </div>
            {/*Modal Backdrop */}
            <div
              className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
              onMouseDown={handleClose}
            ></div>
            <form
              className={`absolute flex flex-col gap-4 h-[480px] sm:h-[450px] w-[360px] sm:w-[450px] px-4 py-4 bg-white rounded-xl overflow-hidden`}
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between items-center">
                <div className="h-20 w-20 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden">
                  {userData.profilePic.length !== 0 ? (
                    <img
                      src={userData.profilePic}
                      alt="Profile-Pic"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userData.username.substring(0, 1).toUpperCase()
                  )}
                </div>
  
                <ImageUpload
                  onDone={({ base64 }) =>
                    setUserData({ ...userData, profilePic: base64 })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-lg font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData?.username}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-400 px-3 py-2 rounded-md outline-none font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData?.email}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-400 px-3 py-2 rounded-md outline-none font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg font-semibold">
                  Password{" "}
                  <span className="text-sm font-semibold ">
                    (leave empty if you don't want to change)
                  </span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="Enter new password"
                  className="w-full border-2 border-gray-400 px-3 py-2 rounded-md outline-none font-bold"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-10 justify-center">
                <button
                  className="px-4 py-2 w-[100px] bg-red-300 rounded-md"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 w-[100px] flex justify-center items-center bg-green-500 rounded-md"
                >
                  {isFetching ? (
                    <ClipLoader
                      color={"#ffffff"}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  };

  export default EditProfileModal;