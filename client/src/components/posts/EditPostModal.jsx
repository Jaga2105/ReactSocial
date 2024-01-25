import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { handleFetch } from "../../store/reducers/authSlice";

const EditPostModal = ({
    post,
    handleShowEditPostModal,
    updatePostDetails,
  }) => {
    const [postDesc, setPostDesc] = useState(post.desc);
    const isFetching = useSelector((state) => state.auth.isFetching);
    const dispatch = useDispatch();
    const handleClose = () => {
      handleShowEditPostModal();
    };
    const handlePostDesc = (e) => {
      setPostDesc(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(handleFetch(true));
      const response = updatePostDetails(post._id, postDesc);
      if (response) {
        dispatch(handleFetch(false));
        handleClose();
      }
    };
    return (
      <>
        <div className="absolute inset-0 flex justify-center items-center z-30">
          <div
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            onMouseDown={handleClose}
          ></div>
          {/* Modal Content */}
          <form
            className={`fixed flex flex-col justify-between h-[250px] w-[400px] bg-white rounded-xl px-6 py-4`}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div className="text-xl">Update</div>
              <textarea
                name="editPostText"
                cols="10"
                rows="4"
                onChange={handlePostDesc}
                value={postDesc}
                className="w-full border-2 border-gray-400 resize-none outline-none rounded-md px-2 py-1"
              ></textarea>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-1 w-[100px] flex justify-center items-center bg-red-300 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 w-[100px] flex justify-center items-center bg-green-500 rounded-md"
              >
                {!isFetching ? (
                  "Update"
                ) : (
                  <ClipLoader
                    color={"#ffffff"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  export default EditPostModal;