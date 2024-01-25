const EditPostDropdown = ({
    post,
    user,
    handleShowEditMenu,
    setShowEditPostModal,
    deletePost,
  }) => {
  
    const closeDropdown = () => {
      handleShowEditMenu();
    };
    const handleDeletePost = () => {
      const isDeleted = deletePost(post._id);
      if (isDeleted) {
        closeDropdown();
      }
    };
    return (
      <div>
        <div
          className="fixed z-10 h-[100vh] w-full top-0 left-0"
          onMouseDown={closeDropdown}
        ></div>
        <div className="absolute z-20 right-6 top-0 border bg-white rounded-md w-20 shadow-md">
          {/* {post.postedBy._id === user._id ? ( */}
          <div className="flex flex-col">
            <button
              className="hover:bg-gray-200"
              onClick={() => setShowEditPostModal(true)}
            >
              Update
            </button>
            <button className="hover:bg-gray-200" onClick={handleDeletePost}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default EditPostDropdown;