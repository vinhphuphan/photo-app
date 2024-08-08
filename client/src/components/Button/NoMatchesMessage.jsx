import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NoMatchesMessage = ({
  message,
  suggestion,
  buttonLabel,
  buttonAction,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <div className="text-xl font-semibold">{message}</div>
        <div className="text-sm font-light text-gray-500">{suggestion}</div>
      </div>
      <Button
        variant="secondary"
        size="secondary"
        className="w-48 mt-4 rounded-xl p-2"
        onClick={buttonAction ? buttonAction : () => navigate("/")}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default NoMatchesMessage;
