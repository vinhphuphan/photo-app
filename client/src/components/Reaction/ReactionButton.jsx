import React from "react";

const ReactionButton = ({ reaction, onClick }) => {
  const renderReactionButton = () => {
    switch (reaction) {
      case "goodIdea":
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-[#fffebb]`}>
            <div className="h-7 w-7 bg-goodIdea-static"></div>
          </div>
        );
      case "love":
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-[#ffe0e0]`}>
            <div className="h-7 w-7 bg-love-static"></div>
          </div>
        );
      case "thanks":
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-[#ccf6ee]`}>
            <div className="h-7 w-7 bg-thanks-static"></div>
          </div>
        );
      case "wow":
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-[#fff0db]`}>
            <div className="h-7 w-7 bg-wow-static"></div>
          </div>
        );
      case "haha":
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-[#e9e4ff]`}>
            <div className="h-7 w-7 bg-haha-static"></div>
          </div>
        );
      default:
        return (
          <div className={`min-w-12 cursor-pointer transition-all min-h-12 flex items-center justify-center rounded-full bg-neutral-200"`}>
            <div className="h-7 w-7 bg-cover bg-no-repeat bg-heartOutline"></div>
          </div>
        );
    }
  };

  return (
    <button
      className={`${reaction === "" ? "bg-neutral-200" : ""} 
      w-12 h-12 rounded-full transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      {renderReactionButton()}
    </button>
  );
};

export default ReactionButton;
