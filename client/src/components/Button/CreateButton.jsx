import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateButton = ({ user, action, showSearch }) => {
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
      ${showSearch ? "hidden" : "flex"}
      ${action === "create" ? "bg-gray-900 text-white rounded-full p-3" : ""}
      `}
      onClick={handleClick}
    >
      Create
    </Button>
  );
};

export default CreateButton;
