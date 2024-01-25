import PeopleList from "../peoplelist/PeopleList";
import ProfilePosts from "./ProfilePosts";

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

  export default ProfileContent;