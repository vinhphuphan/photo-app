import React from "react";

const ContentContainer = ({ children }) => {
  return (
    <div
      className="
            fixed w-full h-full top-20 z-0 pt-2
            flex items-start justify-center overflow-auto
            bg-neutral-200"
    >
      <div
        className="
        w-full h-[85vh] md:w-4/6 xl:w-[60%] 
        flex flex-col gap-2 justify-center 
        bg-white rounded-xl py-10 px-14 overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
