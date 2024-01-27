import { useState } from "react";
import { useSelector } from "react-redux";
import EditPostDropdown from "./EditPostDropdown";
import EditPostModal from "./EditPostModal";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import formattedTime from "../../helpers/formattedTime";

const SinglePost = ({
  post,
  handleAddComment,
  handleLikePost,
  updatePostDetails,
  deletePost,
}) => {
  const [commentTextAreaRows, setCommentTextAreaRows] = useState(1);
  const [currentUserComment, setCurrentUserComment] = useState("");
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);

  // const [isLiked, setIsLiked] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // This calculates the no. of rows in text area
  const handleCommentTextArea = (e) => {
    if (e.target.value !== "") {
      // This variable represents the height of a single line of text within the textarea
      const textAreaLineHeight = 24;
      // This expression calculates the number of rows needed to display the entire content of the textarea
      const newRow = Math.round(e.target.scrollHeight / textAreaLineHeight);
      // scrollHeight property provides the total height of the content within the textarea
      setCommentTextAreaRows(newRow);
      setCurrentUserComment(e.target.value);
    } else {
      setCommentTextAreaRows(1);
      setCurrentUserComment("");
    }
  };

  const handleLike = () => {
    handleLikePost(post._id);
  };

  const handleShowEditMenu = () => {
    setShowEditMenu((prev) => !prev);
  };
  const handleShowEditPostModal = () => {
    setShowEditPostModal(false);
    setShowEditMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(post._id, currentUserComment);
    setCommentTextAreaRows(1);
    setCurrentUserComment("");
  };

  // useEffect(() => {
  //   setIsLiked(post.likes.includes(user._id));
  // }, [post._id]);
  return (
    <div className="flex flex-col gap-2 min-w-[270px] w-full">
      <div className="flex justify-between items-center">
        <Link
          to={`/Profile/${post.postedBy._id}`}
          className="flex items-center gap-2"
        >
          <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden">
            {post?.postedBy.profilePic.length !== 0 ? (
              <img
                src={post?.postedBy.profilePic}
                alt="Profile-Pic"
                className="h-full w-full object-cover"
              />
            ) : (
              post?.postedBy.username.substring(0, 1).toUpperCase()
            )}
          </div>
          <span className="text-lg font-semibold hover:underline">
            {post?.postedBy.username}
          </span>
        </Link>
        <div className="relative">
          {post.postedBy._id === user._id && (
            <button onClick={handleShowEditMenu}>
              <BsThreeDots className="h-6 w-6" />
            </button>
          )}
          {showEditMenu && (
            <EditPostDropdown
              post={post}
              user={user}
              handleShowEditMenu={handleShowEditMenu}
              setShowEditPostModal={setShowEditPostModal}
              deletePost={deletePost}
            />
          )}
        </div>
        {showEditPostModal && (
          <EditPostModal
            post={post}
            handleShowEditPostModal={handleShowEditPostModal}
            updatePostDetails={updatePostDetails}
          />
        )}
      </div>
      <div
        className="xs:h-[350px] sm:h-[450px] md:h-[500px]  overflow-hidden rounded-md border-2 cursor-pointer"
        onDoubleClick={handleLike}
      >
        <img
          src={post?.img}
          alt="post-image"
          className="object-contain h-full w-full"
        />
      </div>
      <div className="flex gap-6">
        <button onClick={handleLike}>
          <AiOutlineLike
            className={`h-8 w-8 ${
              post.likes.includes(user._id) ? "text-red-600" : ""
            }`}
          />
        </button>
        <button onClick={() => setShowPostDetails(true)}>
          <FaRegCommentDots className="h-7 w-7" />
        </button>
        {showPostDetails && (
          <PostDetails
            post={post}
            setShowPostDetails={setShowPostDetails}
            handleAddComment={handleAddComment}
          />
        )}
      </div>
      {/* Like count */}
      {post.likes.length > 0 && (
        <div className="text-sm">
          {post.likes.length > 1
            ? `${post.likes.length} likes`
            : `${post.likes.length} like`}
        </div>
      )}

      {/* posted time */}
      <div className="text-sm">{formattedTime(post.createdAt)}</div>

      <div className=" break-words">
        <span className="font-semibold mr-2">{post?.postedBy.username}</span>
        <span className="">{post.desc}</span>
      </div>

      {/* Comments */}
      <div className="">
        {post.comments.length > 0 && (
          <div className=" mb-2">
            {post.comments.length === 1 ? (
              <div>
                {/* <div className="h-6 w-6 rounded-full "></div> */}
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-black flex items-center justify-center rounded-full overflow-hidden flex-shrink-0">
                    {post.comments[0].postedBy.profilePic.length !== 0 ? (
                      <img
                        src={post?.comments[0].postedBy.profilePic}
                        alt="Profile-Pic"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-2xl font-bold">
                      {post.comments[0].postedBy.username
                        .substring(0, 1)
                        .toUpperCase()}
                        </div>
                    )}
                  </div>
                  <div className="break-words break-all">
                    <span className="font-semibold mr-2">
                      {post.comments[0].postedBy.username}
                    </span>
                    <span className="">{post.comments[0].text}</span>
                  </div>
                </div>
              </div>
            ) : (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowPostDetails(true)}
              >
                View all {post.comments.length} comments
              </span>
            )}
          </div>
        )}
        <form
          className="flex gap-6 justify-center items-center pb-2 border-b-2"
          onSubmit={handleSubmit}
        >
          <textarea
            name="comment"
            placeholder="Add a comment here"
            className="w-full min-h-5 max-h-20 overflow-y-auto resize-none outline-none"
            rows={commentTextAreaRows}
            value={currentUserComment}
            onChange={handleCommentTextArea}
          ></textarea>
          {currentUserComment.length > 0 && (
            <button
              type="submit"
              className="text-blue-500 font-semibold hover:text-black"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SinglePost;
