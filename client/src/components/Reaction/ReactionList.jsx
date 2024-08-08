import React from "react";

const ReactionList = ({ onReaction }) => {
  return (
    <div className="
      absolute top-[-5rem] right-0 lg:right-[-7.5rem] mt-2 overflow-visible
      hidden group-hover:flex flex-row gap-3 px-6 py-4 group-hover:animate-slideUp
      bg-white rounded-full custom-box-shadow border-none transition duration-500
    ">
      <div className={`icon-base bg-goodIdea-animated`} onClick={() => onReaction("goodIdea")}></div>
      <div className={`icon-base bg-love-animated`} onClick={() => onReaction("love")}></div>
      <div className={`icon-base bg-thanks-animated`} onClick={() => onReaction("thanks")}></div>
      <div className={`icon-base bg-wow-animated`} onClick={() => onReaction("wow")}></div>
      <div className={`icon-base bg-haha-animated`} onClick={() => onReaction("haha")}></div>
    </div>
  );
};

export default ReactionList;
