import React, { useState } from "react";

const profileTabMenu = ["Posts", "Followers", "Following"];
const Profile = () => {
  const [activeTabMenu, setActiveTabMenu] = useState("Posts");
  const HandleActiveTabMenu = (menuText) =>{
    setActiveTabMenu(menuText)
  }
  return (
    <div className="px-10 w-full">
      <div className="flex gap-4 sm:gap-20 border-b-2 py-8">
        <div className="h-20 w-20 sm:h-40 sm:w-40 bg-black flex items-center justify-center text-white text-5xl font-bold rounded-full p-6">
          G
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold">Geralt of Rivia</span>
          <div className="flex gap-2 sm:gap-8">
            <span>
              {" "}
              <strong>1</strong> post
            </span>
            <span>
              <strong>212</strong> followers
            </span>
            <span>
              <strong>634</strong> following
            </span>
          </div>
          <div className="text-gray-600">geraltrivia23@gmail.com</div>
          <div className="text-gray-600">Joined on 21 Dec 2023</div>
        </div>
      </div>
      <div>
        <div className="flex gap-8 justify-center p-2">
          {profileTabMenu.map((tab) => (
            <div
              key={tab}
              className={`text-xl p-2 cursor-pointer ${
                activeTabMenu === tab
                  ? "font-bold border-b-2 border-b-black"
                  : ""
              }`}
              onClick={()=>HandleActiveTabMenu(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
