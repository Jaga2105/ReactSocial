import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSuggestedPeople } from "../api/userAPI";
import GridLoader from "react-spinners/GridLoader";

const People = () => {
  const [people, setPeople] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const getPeople = async () => {
    // dispatch(handleFetch(true));
    const response = await getSuggestedPeople(user._id, user.token);
    setPeople(response);
    // dispatch(handleFetch(false));
  };
  useEffect(() => {
    getPeople();
  }, [user]);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[70%] md:w-[60%] ">
        <span className="text-2xl font-bold my-6">Suggested for you</span>
        {people ? (
          <div className="flex flex-col gap-4">
            {people.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center"
              >
                <div className="flex gap-2 items-center">
                  <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden">
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
                  <span className="text-lg font-semibold">{user.username}</span>
                </div>
                <button className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-500">
                  Follow
                </button>
              </div>
            ))}
          </div>
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
