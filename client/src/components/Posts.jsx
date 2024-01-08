import React, { useRef, useState } from "react";
import image from "../assets/images/prof.jpg";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
const Posts = () => {
  const [comments, setComments] = useState(["1"]);
  const [commentTextAreaRows, setCommentTextAreaRows] = useState(1);
  const [comment, setComment] = useState("");

  // This calculates the no. of rows in text area
  const handleCommentTextArea = (e) => {
    if (e.target.value !== "") {
      // This variable represents the height of a single line of text within the textarea
      const textAreaLineHeight = 24;
      // This expression calculates the number of rows needed to display the entire content of the textarea
      const newRow = Math.round(e.target.scrollHeight / textAreaLineHeight);
      // scrollHeight property provides the total height of the content within the textarea
      setCommentTextAreaRows(newRow);
      setComment(e.target.value);
    } else {
      setCommentTextAreaRows(1);
      setComment("");
    }
  };
  return (
    <div className="w-4/5 md:w-3/4 lg:w-3/6 p-2 mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full p-6">
              G
            </div>
            <span className="text-lg font-semibold">Geralt of Rivia</span>
          </div>
          <button>
            <BsThreeDots className="h-6 w-6" />
          </button>
        </div>
        <div className="xs:h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden rounded-md border-2">
          <img
            src={image}
            alt="post-image"
            className="object-contain h-full w-full"
          />
        </div>
        <div className="flex gap-6">
          <button>
            <AiOutlineLike className="h-8 w-8" />
          </button>
          <button>
            <FaRegCommentDots className="h-7 w-7" />
          </button>
        </div>
        <div>
          <span className="font-semibold mr-2">Geralt of Rivia</span>
          <span>
            Some fun evenings!! Happy birthday @vishnuraju1 on your big one!
            Many blessings🎂🥳🎉
          </span>
        </div>
        <div>
          {comments.length > 0 && (
            <div className="text-gray-400 mb-2">
              View all {comments.length} comments
            </div>
          )}
          <form className="flex gap-6 justify-center items-center pb-2 border-b-2">
            <textarea
              name="comment"
              placeholder="Add a comment here"
              className="w-full min-h-5 max-h-20 overflow-y-auto resize-none outline-none"
              rows={commentTextAreaRows}
              onChange={handleCommentTextArea}
            ></textarea>
            {comment.length > 0 && (
              <button className="text-blue-500 font-semibold hover:text-black">
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;
