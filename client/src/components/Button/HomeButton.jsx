import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ showSearch, action }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="home"
      size="default"
      className={`flex-shrink-0 rounded-full p-3 
      ${showSearch ? "hidden" : "flex"}
      ${action === "create" ? "bg-transparent text-gray-900" : ""}
      `}
      onClick={() => navigate("/")}
    >
      Home
    </Button>
  );
};

export default HomeButton;
