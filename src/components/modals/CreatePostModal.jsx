import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa6";
import uploadPlaceholder from "../../assets/images/upload_img_placeholder.jpg";

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const CreatePostModal = ({ open, handleCreatePostModal }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [showPostCaption, setShowPostCaption] = useState(false);
  const inputRef = useRef(null);

  const handleClose = () => {
    handleCreatePostModal(false);
    setFile(null);
    setFileDataURL(null);
    setShowPostCaption(false)
  };
  const handleUpload = () => {
      inputRef.current.click();
    // else {
    //   setFile(null);
    //   setFileDataURL(null);
    //   setShowPostCaption(false);
    // }
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      // console.log("not found")
      return;
    }

    setFile(file);
    console.log(file.size);
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
          <div
            className="absolute top-5 right-5 z-10 cursor-pointer"
            onClick={handleClose}
          >
            <RxCross2
              style={{ height: "30px", width: "30px", color: "white" }}
            />
          </div>
          <div
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            onMouseDown={handleClose}
          ></div>
          <div
            className={`absolute flex flex-col h-[450px] ${
              showPostCaption ? "w-[700px]" : "w-[400px]"
            } bg-white rounded-xl overflow-hidden`}
          >
            <div className="text-lg text-center font-semibold py-2 border-b-2 w-full h-[10%]">
              <span>Create New Post</span>
              {fileDataURL && (
                <button onClick={() => setShowPostCaption(true)}>
                  {" "}
                  <FaArrowRight
                    style={{ height: "24px", width: "24px", color: "blue" }}
                    className="absolute right-4 top-4"
                  />
                </button>
              )}
            </div>
            <div className={`flex ${fileDataURL ? "h-[90%]" : "h-[60%]"}`}>
              <div className={`${showPostCaption ? "w-1/2 bg-black" : "w-full"} flex justify-center items-center`}>
                <img
                  src={fileDataURL || uploadPlaceholder}
                  alt="Upload Image"
                  className={`${fileDataURL ? "w-full h-full object-contain" : "h-full w-2/3"} `}
                //   style={{ width: '100%', height: '100%' }}
                />
              </div>
              {showPostCaption && (
                <div className="w-1/2 px-2">
                  <textarea
                  className="w-full outline-none"
                    name="caption"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Enter caption here"
                  ></textarea>
                </div>
              )}
            </div>
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
                <button
                  className="bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500"
                  onClick={handleUpload}
                >
                  Select Post
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostModal;
