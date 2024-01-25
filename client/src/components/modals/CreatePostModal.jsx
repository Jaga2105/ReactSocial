import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import uploadPlaceholder from "../../assets/images/upload_img_placeholder.jpg";
import { useSelector } from "react-redux";

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const CreatePostModal = ({ open, handleCreatePostModal }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [showPostCaption, setShowPostCaption] = useState(false);
  const [enteredCaption, setEnteredCaption] = useState("");
  const inputRef = useRef(null);
  const user = useSelector((state)=>state.auth.user);

  // This removes the uploaded file
  const fileReset = () => {
    setFile(null);
    setFileDataURL(null);
    setShowPostCaption(false);
  };

  // This handles the action onclicking the close button
  const handleClose = () => {
    handleCreatePostModal(false);
    fileReset();
  };

  // This handles the action onclicking the back button
  const handleBack = () => {
    if (showPostCaption) {
      setShowPostCaption(false);
    } else {
      fileReset();
    }
  };

  // This fires the click event on the file input on clicking the select post button
  const handleUpload = () => {
    inputRef.current.click();
  };

  // This handles the file upload and file read and creates the file url using FileReader API
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      // console.log("not found")
      return;
    }

    setFile(file);
  };

  // This calulates the no. of letters entered in caption
  const handleCaption = (e) => {
    setEnteredCaption(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted")
    const newPost = {
      img: fileDataURL,
      desc: enteredCaption,
      postedBy: user._id,
    };
    console.log(newPost);
    const apiUrl = `http://localhost:5000/api/post/${user._id}`;

    fetch(apiUrl, {
      method: "POST", // or 'GET', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${user.token}`
        // Add any other headers if needed
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
      handleClose()
  };

  useEffect(() => {
    console.log("test");
    // isCancel is used to handle the effect
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      //   This processes the read data to get the result i.e the image url
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      //   This read the uploaded file
      fileReader.readAsDataURL(file);
    }

    // It aborts the file reading when the component is unmounted
    //  but reading is still loading to avoid memory leak
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      {open && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Close button */}
          <div
            className="absolute top-5 right-5 z-10 cursor-pointer"
            onClick={handleClose}
          >
            <RxCross2
              style={{ height: "30px", width: "30px", color: "white" }}
            />
          </div>
          {/*Modal Backdrop */}
          <div
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            onMouseDown={handleClose}
          ></div>
          {/* Modal Content */}
          <form
            className={`absolute flex flex-col h-[450px] ${
              showPostCaption ? "w-[700px]" : "w-[400px]"
            } bg-white rounded-xl overflow-hidden`}
            onSubmit={handleSubmit}
          >
            {/* Modal Heading */}
            <div className="text-lg text-center font-semibold py-2 border-b-2 w-full h-[10%]">
              <span>Create new post</span>
              {fileDataURL && (
                <div>
                  {/* Back button */}
                  <div
                    className="absolute left-4 top-2 cursor-pointer"
                    onClick={handleBack}
                  >
                    {" "}
                    <FaArrowLeft style={{ height: "24px", width: "24px" }} />
                  </div>
                  {/* Next/Post button */}
                  <div className="absolute right-4 top-2">
                    {showPostCaption ? (
                      <button
                        className="text-blue-500 hover:text-black"
                        type="submit"
                      >
                        Post
                      </button>
                    ) : (
                      <div
                      className="cursor-pointer"
                        onClick={() => setShowPostCaption(true)}
                      >
                        {" "}
                        <FaArrowRight
                          style={{ height: "24px", width: "24px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Post content (Image and Caption) */}
            <div className={`flex ${fileDataURL ? "h-[90%]" : "h-[60%]"}`}>
              {/* Image */}
              <div
                className={`${
                  showPostCaption ? "w-1/2 bg-black" : "w-full"
                } flex justify-center items-center`}
              >
                <img
                  src={fileDataURL || uploadPlaceholder}
                  alt="Upload Image"
                  className={`${
                    fileDataURL
                      ? "w-full h-full object-contain"
                      : "h-full w-2/3"
                  } `}
                />
              </div>
              {/* Caption */}
              {showPostCaption && (
                <div className="w-1/2 px-2">
                  <textarea
                    className="w-full outline-none resize-none"
                    name="caption"
                    id=""
                    cols="30"
                    rows="12"
                    maxLength={2500}
                    placeholder="Enter caption here"
                    onChange={handleCaption}
                  ></textarea>
                  <div className="text-right mt-4 mr-2">
                    <span className="text-sm text-gray-400">
                      {enteredCaption.length}/2500
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Select post button which will hide after file selected */}
            {!fileDataURL && (
              <div className="mx-auto h-[30%]">
                <input
                  type="file"
                  name="post-upload"
                  className="hidden"
                  ref={inputRef}
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileInput}
                />
                <div
                  className="bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
                  onClick={handleUpload}
                >
                  Select Post
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default CreatePostModal;
