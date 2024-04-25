import React from "react";


const Avatar = ({ src }) => {
  return (
    <img
      alt="avatar"
      height={30}
      width={30}
      className="rounded-full"
      src={src || "./assets/placeholder.jpg"}
    />
  );
};

export default Avatar;
