import React from "react";
import Button from "./Button";
import { IoChevronDownOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateButton = ({ user, action }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/create");
    } else {
      toast.error("You have to log in to create a new pin!!");
    }
  };

  return (
    <Button
      variant="normal"
      size="default"
      className={`flex-shrink-0 gap-2 
      ${action === "create" ? "bg-gray-900 text-white rounded-full p-3" : ""}
      `}
      onClick={handleClick}
    >
      Create <IoChevronDownOutline />
    </Button>
  );
};

export default CreateButton;
