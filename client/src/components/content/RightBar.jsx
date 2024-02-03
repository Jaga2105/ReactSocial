import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedPeople, getUserDetails } from "../../api/userAPI";
import { handleFetch } from "../../store/reducers/authSlice";
import GridLoader from "react-spinners/GridLoader";
import PeopleList from "../peoplelist/PeopleList";
import { Link } from "react-router-dom";

const RightBar = () => {
  const [people, setPeople] = useState(null);
  const [showedPeople, setShowedPeople] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const user = useSelector((state) => state.auth.user);
  // const isFetching = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();

  const getPeople = async () => {
    const response = await getSuggestedPeople(user._id, user.token);
    setPeople(response);
    setShowedPeople(response.slice(0, 5));
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
        {currentUser && people ? (
          <>
            {people.length > 0 ? (
              <div className="flex flex-col gap-4">
                <PeopleList currentUser={currentUser} people={showedPeople} />
                {people.length > 5 && (
                  <Link
                    to={"/People"}
                    className="ml-2 text-blue-500 hover:underline hover:text-blue-600"
                  >
                    View all
                  </Link>
                )}
              </div>
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
