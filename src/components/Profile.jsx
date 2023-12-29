import React from "react";

const Profile = () => {
  return (
    <div className="px-10 w-1/2">
      <div className="flex gap-20 border-2">
        <div className="h-40 w-40 bg-black flex items-center justify-center text-white text-5xl font-bold rounded-full p-6">
          G
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold">Geralt of Rivia</span>
          <div className="flex gap-8">
            <span> <strong>1</strong> post</span>
            <span><strong>212</strong> followers</span>
            <span><strong>634</strong> following</span>
            
          </div>
          <div className="text-gray-600">geraltrivia23@gmail.com</div>
          <div className="text-gray-600">Joined on 21 Dec 2023</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
