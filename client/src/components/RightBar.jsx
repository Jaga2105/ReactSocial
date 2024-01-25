import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedPeople, getUserDetails } from "../api/userAPI";
import { handleFetch } from "../store/reducers/authSlice";
import GridLoader from "react-spinners/GridLoader";
import PeopleList from "./peoplelist/PeopleList";

const RightBar = () => {
  const [people, setPeople] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const user = useSelector((state) => state.auth.user);
  // const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();

  const getPeople = async () => {
    const response = await getSuggestedPeople(user._id, user.token);
    setPeople(response);
  };
  const getCurrentUser = async () => {
    const response = await getUserDetails(user._id, user.token);
    setCurrentUser(response);
  };
  useEffect(() => {
    getPeople();
    getCurrentUser();
  }, [user]);
  return (
    <div className="hidden lg:flex flex-col w-2/6 px-4">
      <div className="">
        <div className="text-2xl font-bold my-4">Suggested for you</div>
        {/* {people.map((user) => (
          <div
            key={user.username}
            className="flex w-[300px] justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden">
              {user.profilePic.length!==0 ? (
                  <img src={user.profilePic} alt="Profile-Pic"
                  className="w-full h-full object-cover" />
                ) : (
                  user.username.substring(0, 1).toUpperCase()
                )}
              </div>
              <span className="text-lg font-semibold">{user.username}</span>
            </div>
            <button className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-500">
              Follow
            </button>
          </div>
        ))} */}
        {currentUser && people ? (
          <>
            {people.length > 0 ? (
              <PeopleList currentUser={currentUser} people={people} />
            ) : (
              <div className="mt-20 text-xl">No users found!</div>
            )}
          </>
        ) : (
          <div className="mt-28">
            <GridLoader
              color={"#0096FF"}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBar;
