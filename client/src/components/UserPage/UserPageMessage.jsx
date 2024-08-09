import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const NoMatchesMessage = ({
  message,
  buttonLabel,
  buttonAction,
  buttonClassName,
  buttonVariant,
  buttonSize,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="text-center p-4">
        <div className="text-base font-normal">{message}</div>
      </div>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={buttonClassName}
        onClick={buttonAction ? buttonAction : () => navigate("/")}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default NoMatchesMessage;
