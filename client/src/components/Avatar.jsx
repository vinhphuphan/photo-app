import React from "react";
import cn from "../utils/cn";

const Avatar = ({ src, onClick, height, width, className }) => {
  return (
    <img
      alt="avatar"
      height={height || 35}
      width={width || 35}
      className={cn(
        "break-inside-avoid", // Static classes
        "rounded-full cursor-pointer", // Static classes
        className // External classes passed through props
      )}
      src={src ? src : "/assets/placeholder.jpg"}
      onClick={onClick}
    />
  );
};

export default Avatar;
