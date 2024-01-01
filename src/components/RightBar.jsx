import React from "react";

const people = [
  "Geralt of Rivia",
  "John Snow",
  "Danerys Targaryan",
  "Tyrion Lannister",
  "Arya Stark",
];

const RightBar = () => {
  return (
    <div className="hidden lg:flex flex-col w-2/6 p-2 items-center ">
      <div className="flex flex-col gap-6">
        <span className="text-2xl font-bold">Suggested for you</span>
        {/* <div className="mt-4"> */}
        {people.map((name) => (
          <div
            key={name}
            className="flex w-[300px] justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full p-6">
                {name.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-lg font-semibold">{name}</span>
            </div>
            <button className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-500">
              Follow
            </button>
          </div>
        ))}
        {/* <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 bg-black flex items-center justify-center text-white text-2xl font-bold rounded-full p-6">
              G
            </div>
            <span className="text-lg font-semibold">Geralt of Rivia</span>
          </div>
          <button className="bg-blue-400 px-2 py-1 rounded-md text-white hover:bg-blue-500">
            Follow
          </button>
        </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RightBar;
