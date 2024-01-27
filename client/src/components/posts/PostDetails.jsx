import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostDetails = ({ post, setShowPostDetails, handleAddComment }) => {
  const handleClose = () => {
    console.log("closed")
    setShowPostDetails(false);
  };
  console.log(post.desc)
  return (
    <div className="fixed inset-0 flex justify-center items-center z-30">
      {/* Close button */}
      <div
        className="absolute top-5 right-5 z-10 cursor-pointer"
        onMouseDown={handleClose}
      >
        <RxCross2 style={{ height: "30px", width: "30px", color: "white" }} />
      </div>
      <div
        className="absolute h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
        onMouseDown={handleClose}
      ></div>
      {/* Modal Content */}
      <div
        className={`fixed flex flex-col sm:flex-row justify-between h-[500px]  sm:h-[380px] min-w-[270px] w-[60%] bg-white rounded-xl overflow-hidden`}
      >
        <div className="w-full sm:w-1/2  h-1/2 sm:h-full overflow-hidden ">
          <img
            src={post.img}
            alt="post-img"
            className=" bg-black w-full h-full object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full">
          <div className="hidden sm:flex justify-between items-center px-2 py-3">
            <Link
              to={`/Profile/${post.postedBy._id}`}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden flex-shrink-0">
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
          </div>
          <Comments post={post} handleAddComment={handleAddComment} />
          <AddCommentTextArea
            post={post}
            handleAddComment={handleAddComment}
            setShowPostDetails={setShowPostDetails}
          />
        </div>
      </div>
    </div>
  );
};

const Comments = ({ post }) => {
  return (
    <div className="h-[60%] px-2 py-1 overflow-auto border-y">
      <div className="flex gap-2 mb-2">
        <div className="h-8 w-8 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden flex-shrink-0">
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
        <div className="mt-1">
          <Link
            to={`/Profile/${post.postedBy._id}`}
            className="mr-2 font-semibold hover:underline"
          >
            {post?.postedBy.username}
          </Link>
          {post.desc}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {post.comments.map((comment) => (
          <div key={comment._id} className="flex gap-2">
            <div className="h-8 w-8 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full overflow-hidden flex-shrink-0">
              {comment?.postedBy.profilePic.length !== 0 ? (
                <img
                  src={comment?.postedBy.profilePic}
                  alt="Profile-Pic"
                  className="h-full w-full object-cover"
                />
              ) : (
                comment?.postedBy.username.substring(0, 1).toUpperCase()
              )}
            </div>
            <div className="mt-1">
              <Link
                to={`/Profile/${comment.postedBy._id}`}
                className="mr-2 font-semibold hover:underline"
              >
                {comment?.postedBy.username}
              </Link>
              {comment.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddCommentTextArea = ({ post, handleAddComment, setShowPostDetails }) => {
  const [commentTextAreaRows, setCommentTextAreaRows] = useState(1);
  const [currentUserComment, setCurrentUserComment] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(post._id, currentUserComment);
    setCommentTextAreaRows(1);
    setCurrentUserComment("");
    setShowPostDetails(false);
  };
  return (
    <form
      className="flex gap-6 justify-center items-center my-4 px-4"
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
  );
};

export default PostDetails;
