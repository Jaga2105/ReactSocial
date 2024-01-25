import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import joinedTime from "../helpers/joinedTime";
import GridLoader from "react-spinners/GridLoader";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/postAPI";
import EditProfileModal from "../components/modals/EditProfileModal";
import TabContainer from "../components/profile/TabContainer";

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

export default Profile;
