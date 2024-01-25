const ImageUpload = ({ onDone }) => {
    const handleFileChange = async (e) => {
      let imgFile = e.target.files[0];
  
      // const options = {
      //   maxSizeMB: 1,
      //   maxWidthOrHeight: 1920,
      //   useWebWorker: true,
      // };
  
      try {
        // const compressedImg = await imageCompression(imgFile, options);
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(imgFile);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: imgFile.name,
            type: imgFile.type,
            size: Math.round(imgFile.size / 1000) + " kB",
            base64: reader.result,
            file: imgFile,
          };
          onDone(fileInfo);
        };
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        <label
          htmlFor="profilePic"
          className="bg-blue-500 px-4 py-2 text-white rounded-md cursor-pointer"
        >
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            className="hidden"
            accept=".png, .jpg, .jpeg"
            // ref={imgRef}
            onChange={handleFileChange}
          />
          {/* <button
          className="bg-blue-500 px-4 py-2 text-white rounded-md"
          onClick={handleEditPhoto}
        > */}
          Edit Photo
          {/* </button> */}
        </label>
      </>
    );
  };

  export default ImageUpload;