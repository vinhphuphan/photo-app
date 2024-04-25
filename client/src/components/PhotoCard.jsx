import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "./Button";

const PhotoCard = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const navigate = useNavigate();
  const [savedStatus, setSavedStatus] = useState(false);
  
  const onSave = useCallback(() => {
    
  }, [])

  const handleCancle = useCallback(
    (event) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction(actionId);
    },
    [onAction, actionId, disabled]
  );

  useEffect(() => {

  }, [ ])

  return (
    <div
      onClick={() => navigate(`/photo/${data.photo_id}`)}
      className="break-inside-avoid cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" w-full relative overflow-hidden rounded-xl">
          <img
            alt=""
            src={data.photo_path}
            className="object-cover h-full w-full group-hover:opacity-70 transition"
          />
          <div className="absolute top-3 right-3">
            {savedStatus ? (
              <>
                <Button
                  variant={"primary"}
                  size="primary"
                  className="hidden group-hover:block text-sm bg-gray-900 hover:bg-gray-900 text-white cursor-not-allowed"
                  onClick={() => {}}
                >
                  Saved
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"primary"}
                  size="primary"
                  className="hidden group-hover:block text-sm"
                  onClick={() => {}}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Avatar src={data.users.avatar} />
          <div className="flex items-center text-sm font-normal">
            {data.users.full_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
