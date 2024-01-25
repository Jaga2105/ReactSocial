import { useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../api/userAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PeopleList = ({ currentUser, people }) => {
  const user = useSelector((state) => state.auth.user);
  const onFollow = async (id) => {
    try {
      await followUser(user._id, user.token, id);
    } catch (err) {
      console.log(err.response);
    }
  };
  const onUnFollow = async (id) => {
    try {
      await unFollowUser(user._id, user.token, id);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      {people.length>0 ? (
        <div className="flex flex-col gap-4">
        {people.map((p) => (
          <SinglePerson
            key={p._id}
            p={p}
            currentUser={currentUser}
            onFollow={onFollow}
            onUnFollow={onUnFollow}
          />
        ))}
      </div>
      ) : (
        <div className="text-xl text-center mt-8">No users found!</div>
      )}
    </>
  );
};

const SinglePerson = ({ p, currentUser, onFollow, onUnFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = (id) => {
    onFollow(id);
    setIsFollowing(true);
  };
  const handleUnFollow = (id) => {
    onUnFollow(id);
    setIsFollowing(false);
  };
  useEffect(() => {
    setIsFollowing(currentUser.following.some((u) => u._id === p._id));
  }, [p, currentUser]);
  return (
    <div className="flex justify-between items-center">
      {/* <div className="flex gap-2 items-center"> */}
      <Link to={`/Profile/${p._id}`} className="flex gap-2 items-center">
        <div className="h-14 w-14 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden">
          {p.profilePic.length !== 0 ? (
            <img
              src={p.profilePic}
              alt="Profile-Pic"
              className="w-full h-full object-cover"
            />
          ) : (
            p.username.substring(0, 1).toUpperCase()
          )}
        </div>
        <span className="text-lg font-semibold hover:underline">{p.username}</span>
      </Link>
      {/* </div> */}
      <button
        className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-500 w-[100px]"
        // onClick={(isFollowing)=>isFollowing ? handleUnFollow() : handleFollow()}
        onClick={
          !isFollowing ? () => handleFollow(p._id) : () => handleUnFollow(p._id)
        }
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default PeopleList;
