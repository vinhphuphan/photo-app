import React from "react";

const ReactionList = ({ onReaction }) => {
  return (
    <div className={`
       absolute top-[-3.5rem] md:top-[-5rem] right-0 lg:right-[-7.5rem] mt-2 overflow-visible animate-slideUp
      flex flex-row gap-3 px-6 py-4 bg-white rounded-full custom-box-shadow border-none transition duration-500
      `}
    >
      <div className={`icon-base w-5 z-10 md:w-10 h-5 md:h-10 cursor-pointer bg-cover bg-no-repeat bg-goodIdea-animated`} onClick={() => onReaction("goodIdea")}></div>
      <div className={`icon-base w-5 z-10 md:w-10 h-5 md:h-10 cursor-pointer bg-cover bg-no-repeat bg-love-animated`} onClick={() => onReaction("love")}></div>
      <div className={`icon-base w-5 z-10 md:w-10 h-5 md:h-10 cursor-pointer bg-cover bg-no-repeat bg-thanks-animated`} onClick={() => onReaction("thanks")}></div>
      <div className={`icon-base w-5 z-10 md:w-10 h-5 md:h-10 cursor-pointer bg-cover bg-no-repeat bg-wow-animated`} onClick={() => onReaction("wow")}></div>
      <div className={`icon-base w-5 z-10 md:w-10 h-5 md:h-10 cursor-pointer bg-cover bg-no-repeat bg-haha-animated`} onClick={() => onReaction("haha")}></div>
    </div>
  );
};

export default ReactionList;
