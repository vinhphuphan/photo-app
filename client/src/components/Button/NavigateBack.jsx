import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";

const NavigateBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="icon"
      size="icon"
      className="text-black w-12 h-12 p-4"
      onClick={() => navigate("/")}
    >
      <FaArrowLeft size={23} />
    </Button>
  );
};

export default NavigateBack;
