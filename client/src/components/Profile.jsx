import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { getUserDetails, updateUser } from "../api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import joinedTime from "../helpers/joinedTime";
import GridLoader from "react-spinners/GridLoader";
import ClipLoader from "react-spinners/ClipLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { handleFetch } from "../store/reducers/authSlice";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/postAPI";
import PeopleList from "./peoplelist/PeopleList";

const Profile = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user);

  const user = useParams();
  // const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserUpdated) {
      setUserDetails(null);
    }
    const fetchUserDetails = async () => {
      const userResponse = await getUserDetails(user.id, loggedInUser.token);
      const postResponse = await getPosts(user.id, loggedInUser.token);
      setUserDetails(userResponse);
      setPosts(postResponse);
    };
    fetchUserDetails();
  }, [loggedInUser._id, user.id, isUserUpdated]);
  return (
    <>
      {userDetails ? (
        <div className="px-2 sm:px-10 w-full">
          <div className="flex gap-4 sm:gap-20 md:gap-6 lg:gap-20 border-b-2 py-8">
            <div className="h-24 w-24 lg:h-32 lg:w-32  bg-black flex items-center justify-center text-white text-5xl font-bold rounded-full overflow-hidden">
              {userDetails?.profilePic.length !== 0 ? (
                <img
                  src={userDetails?.profilePic}
                  alt="Profile-Pic"
                  className="h-full w-full object-cover"
                />
              ) : (
                userDetails?.username.substring(0, 1).toUpperCase()
              )}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xl font-bold">{userDetails?.username}</span>
              <div className="flex  flex-col sm:flex-row gap-2 sm:gap-8">
                <span>
                  {" "}
                  <strong>1</strong> post
                </span>
                <span>
                  <strong>212</strong> followers
                </span>
                <span>
                  <strong>634</strong> following
                </span>
              </div>
              <div className="text-gray-600">{userDetails?.email}</div>
              <div className="text-gray-600">
                Joined {joinedTime(userDetails?.createdAt)}
              </div>
            </div>
            {user.id === loggedInUser._id && (
              <button
                className="h-10 w-20 flex items-center justify-center px-4 py-2 bg-gray-300 rounded-md font-semibold ml-24 sm:ml-0"
                onClick={() => setShowEditProfileModal(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div>
            <TabContainer userDetails={userDetails} posts={posts} />
          </div>
          <EditProfileModal
            open={showEditProfileModal}
            setShowEditProfileModal={setShowEditProfileModal}
            userDetails={userDetails}
            user={loggedInUser}
            setIsUserUpdated={setIsUserUpdated}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[500px]">
          <GridLoader
            color={"#0096FF"}
            size={15}
            margin={6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

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
        <div className="absolute inset-0 flex items-center justify-center z-10">
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

const ImageUpload = ({ onDone }) => {
  const handleFileChange = async (e) => {
    let imgFile = e.target.files[0];

    // const options = {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 1920,
    //   useWebWorker: true,
    // };

    try {
      // const compressedImg = await imageCompression(imgFile, options);
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(imgFile);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: imgFile.name,
          type: imgFile.type,
          size: Math.round(imgFile.size / 1000) + " kB",
          base64: reader.result,
          file: imgFile,
        };
        onDone(fileInfo);
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <label
        htmlFor="profilePic"
        className="bg-blue-500 px-4 py-2 text-white rounded-md cursor-pointer"
      >
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          className="hidden"
          accept=".png, .jpg, .jpeg"
          // ref={imgRef}
          onChange={handleFileChange}
        />
        {/* <button
        className="bg-blue-500 px-4 py-2 text-white rounded-md"
        onClick={handleEditPhoto}
      > */}
        Edit Photo
        {/* </button> */}
      </label>
    </>
  );
};

const ProfileContent = ({ posts, userDetails, activeTabMenu }) => {
  switch (activeTabMenu) {
    case "Posts":
      return <ProfilePosts posts={posts} />;
    case "Followers":
      return (
        <div className="mx-10 sm:mx-20 lg:mx-32">
          <PeopleList
            currentUser={userDetails}
            people={userDetails.followers}
          />
        </div>
      );
    case "Following":
      return (
        <div className="mx-10 sm:mx-20 lg:mx-32">
          <PeopleList
            currentUser={userDetails}
            people={userDetails.following}
          />
        </div>
      );
    default:
      return <div>No post found!</div>;
  }
};
const ProfilePosts = ({posts}) => {
  return (
    <>
      {posts ? (
        <div className="mt-8">
          {posts.length>0 ? (
            <div className="flex flex-wrap gap-4">
            {posts.map((post) => (
              <div key={post._id} className="h-[300px] w-[300px] overflow-hidden bg-black rounded-sm">
                <img
                  src={post.img}
                  alt="post-img"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          ) : (
            <div className="text-xl">No posts found!</div>
          )}
        </div>
      ) : (
        <MoonLoader
            color={"#0096FF"}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      )}
    </>
  );
};

const TabContainer = ({ ...props }) => {
  const profileTabMenu = ["Posts", "Followers", "Following"];
  const [activeTabMenu, setActiveTabMenu] = useState("Posts");
  const HandleActiveTabMenu = (menuText) => {
    setActiveTabMenu(menuText);
  };
  return (
    <>
      <div className="flex gap-8 justify-center p-2">
        {profileTabMenu.map((tab) => (
          <div
            key={tab}
            className={`text-xl p-2 cursor-pointer ${
              activeTabMenu === tab ? "font-bold border-b-2 border-b-black" : ""
            }`}
            onClick={() => HandleActiveTabMenu(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="min-h-[50vh]">
        <ProfileContent activeTabMenu={activeTabMenu} {...props} />
      </div>
    </>
  );
};

export default Profile;
