import React from "react";

const reactionClasses = {
  goodIdea: "bg-goodIdea-grid",
  love: "bg-love-grid",
  thanks: "bg-thanks-grid",
  wow: "bg-wow-grid",
  haha: "bg-haha-grid",
};

const ReactionGrid = ({ reactions }) => {
  return (
    <div className="flex flex-row">
      {reactions.map((reaction) => (
        <div
          key={reaction}
          className={`h-5 w-5 mr-[2px] bg-no-repeat bg-cover ${reactionClasses[reaction]}`}
        ></div>
      ))}
    </div>
  );
};

export default ReactionGrid;
