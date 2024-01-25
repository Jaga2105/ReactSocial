import { useState } from "react";
import ProfileContent from "./ProfileContent";

const TabContainer = ({ ...props }) => {
    const profileTabMenu = ["Posts", "Followers", "Following"];
    const [activeTabMenu, setActiveTabMenu] = useState("Posts");
    const HandleActiveTabMenu = (menuText) => {
      setActiveTabMenu(menuText);
    };
    return (
      <>
        <div className="flex gap-8 justify-center p-2">
          {profileTabMenu.map((tab) => (
            <div
              key={tab}
              className={`text-xl p-2 cursor-pointer ${
                activeTabMenu === tab ? "font-bold border-b-2 border-b-black" : ""
              }`}
              onClick={() => HandleActiveTabMenu(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="min-h-[50vh]">
          <ProfileContent activeTabMenu={activeTabMenu} {...props} />
        </div>
      </>
    );
  };

  export default TabContainer;