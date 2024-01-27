import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import PostDetails from "../posts/PostDetails";
import { addCommentToPost } from "../../api/postAPI";
import { useSelector } from "react-redux";

const ProfilePosts = ({posts}) => {
  const [showPostDetails, setShowPostDetails] = useState(null);
  const user = useSelector((state)=>state.auth.user);

  const handleAddComment = async (id, commentText) => {
    try {
      await addCommentToPost(id, user._id, user.token, commentText);
    } catch (error) {
      console.log(error);
    }
    // setCommentAdded(true);
  };
    return (
      <>
        {posts ? (
          <div className="mt-8">
            {posts.length>0 ? (
              <div className="flex flex-wrap gap-2">
              {posts.map((post, index) => (
                <div key={post._id} className="h-[22%] w-[22%] overflow-hidden bg-black rounded-sm" onClick={()=>setShowPostDetails(post._id)}>
                {/* <div  className=" overflow-hidden bg-black rounded-sm" onClick={()=>setShowPostDetails(true)}> */}
                  <img
                    src={post.img}
                    alt="post-img"
                    className=" object-cover cursor-pointer"
                  />
                {/* </div> */}
                 {showPostDetails=== post._id && (
                  <PostDetails post={post} setShowPostDetails={setShowPostDetails} handleAddComment={handleAddComment}/>
                )}
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