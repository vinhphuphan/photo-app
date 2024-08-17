import React from "react";

const LoadingCard = ({ heightClass }) => {
  return (
    <div 
        className={`relative overflow-hidden rounded-2xl`}
        style={{ gridRow: `span ${heightClass}` }}
    >
      <div className="w-full h-full bg-neutral-400 animate-pulse"></div>
    </div>
  );
};

export default LoadingCard;
