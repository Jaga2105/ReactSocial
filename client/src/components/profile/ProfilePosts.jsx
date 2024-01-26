import MoonLoader from "react-spinners/MoonLoader";

const ProfilePosts = ({posts}) => {
    return (
      <>
        {posts ? (
          <div className="mt-8">
            {posts.length>0 ? (
              <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <div key={post._id} className="h-[22%] w-[22%] overflow-hidden bg-black rounded-sm">
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

  export default ProfilePosts