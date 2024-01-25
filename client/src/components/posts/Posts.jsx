import React, { useEffect, useState } from "react";
import {
  addCommentToPost,
  deletePostById,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../../api/postAPI";
import { useSelector } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import SinglePost from "./SinglePost";
const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [commentAdded, setCommentAdded] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [updatedPostDesc, setUpdatedPostDesc] = useState("");
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleAddComment = async (id, commentText) => {
    try {
      await addCommentToPost(id, user._id, user.token, commentText);
    } catch (error) {
      console.log(error);
    }
    setCommentAdded(true);
  };

  const handleLikePost = async (id) => {
    try {
      await likePost(id, user._id, user.token);
    } catch (error) {
      console.log(error);
    }
    setPostLiked((prev) => !prev);
  };

  const updatePostDetails = async (postId, postDesc) => {
    try {
      const response = await updatePost(postId, user._id, user.token, postDesc);
      setUpdatedPostDesc(postDesc);
      return response;
    } catch (error) {
      console.log();
    }
  };

  const deletePost = async (postId) => {
    const response = await deletePostById(postId, user._id, user.token);
    setIsPostDeleted(true);
    if (response) {
      return true;
    }
  };

  const getPosts = async () => {
    const response = await getTimelinePosts(user._id, user.token);
    setPosts(response);
  };
  useEffect(() => {
    getPosts();
  }, [user, commentAdded, postLiked, updatedPostDesc, isPostDeleted]);
  return (
    <div className="w-4/5 md:w-3/4 lg:w-3/6 p-2 mx-auto mt-4">
      {posts ? (
        <>
          {posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <SinglePost
                  key={post._id}
                  post={post}
                  handleAddComment={handleAddComment}
                  handleLikePost={handleLikePost}
                  updatePostDetails={updatePostDetails}
                  deletePost={deletePost}
                />
              ))}
            </div>
          ) : (
            <div className=" text-xl mt-20 flex justify-center">
              No posts found!
            </div>
          )}
        </>
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
    </div>
  );
};

export default Posts;
