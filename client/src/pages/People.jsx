import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { followUser, getSuggestedPeople, getUserDetails, unFollowUser } from "../api/userAPI";
import GridLoader from "react-spinners/GridLoader";
import PeopleList from "../components/peoplelist/PeopleList";

const People = () => {
  const [people, setPeople] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const user = useSelector((state) => state.auth.user);

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
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[70%] md:w-[60%] ">
        <span className="text-2xl font-bold my-6">Suggested for you</span>
        {currentUser && people ? (
          <>
          {people.length>0 ? (
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



export default People;
