import React from "react";

const ReactionButton = ({ reaction, onClick }) => {
  const renderReactionButton = () => {
    switch (reaction) {
      case "goodIdea":
        return (
          <div className={`min-w-10 md:min-w-12 min-h-10 md:min-h-12 cursor-pointer transition-all flex items-center justify-center rounded-full bg-[#fffebb]`}>
            <div className="h-7 w-7 bg-goodIdea-static"></div>
          </div>
        );
      case "love":
        return (
          <div className={`min-w-10 md:min-w-12 min-h-10 md:min-h-12 cursor-pointer transition-all flex items-center justify-center rounded-full bg-[#ffe0e0]`}>
            <div className="h-7 w-7 bg-love-static"></div>
          </div>
        );
      case "thanks":
        return (
          <div className={`min-w-10 md:min-w-12 min-h-10 md:min-h-12 cursor-pointer transition-all flex items-center justify-center rounded-full bg-[#ccf6ee]`}>
            <div className="h-7 w-7 bg-thanks-static"></div>
          </div>
        );
      case "wow":
        return (
          <div className={`min-w-10 md:min-w-12 min-h-10 md:min-h-12 cursor-pointer transition-all flex items-center justify-center rounded-full bg-[#fff0db]`}>
            <div className="h-7 w-7 bg-wow-static"></div>
          </div>
        );
      case "haha":
        return (
          <div className={`min-w-10 md:min-w-12 min-h-10 md:min-h-12 cursor-pointer transition-all flex items-center justify-center rounded-full bg-[#e9e4ff]`}>
            <div className="h-7 w-7 bg-haha-static"></div>
          </div>
        );
      default:
        return (
          <div className={`min-w-10 md:min-w-10 min-h-10 md:min-h-12 cursor-pointer transition-all  flex items-center justify-center rounded-full bg-neutral-200"`}>
            <div className="h-5 md:h-7 w-5 md:w-7 bg-cover bg-no-repeat bg-heartOutline"></div>
          </div>
        );
    }
  };

  return (
    <button
      className={`${reaction === "" ? "bg-neutral-200" : ""} 
      w-10 md:w-12 h-10 md:h-12 rounded-full transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      {renderReactionButton()}
    </button>
  );
};

export default ReactionButton;
