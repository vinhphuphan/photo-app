import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import toast from "react-hot-toast";
import { checkSave, savePhoto } from "../../utils/fetchFromApi.js";
import { ClipLoader } from "react-spinners";
import UserContext from "../../contexts/UserContext.js";

const PhotoCard = ({ data, forRecommendSection }) => {
  const navigate = useNavigate();
  const [savedStatus, setSavedStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user] = useContext(UserContext);

  // Define height classes
  const heights = [
    "h-[15rem]",
    "h-[16rem]",
    "h-[18rem]",
    "h-[20rem]",
    "h-[22rem]",
    "h-[24rem]",
    "h-[26rem]",
    "h-[28rem]",
    "h-[30rem]",
    "h-[32rem]",
  ];
  const recommendSectionHeights = [
    "h-[15rem]",
    "h-[16rem]",
    "h-[18rem]",
    "h-[20rem]",
    "h-[22rem]",
    "h-[24rem]",
    "h-[26rem]",
  ];

  // Determine the height class based on the prop
  const getHeightClass = () => {
    if (forRecommendSection) {
      return recommendSectionHeights[
        Math.floor(Math.random() * recommendSectionHeights.length)
      ];
    }
    return heights[Math.floor(Math.random() * heights.length)];
  };

  useEffect(() => {
    // Function to check if the photo is already saved
    const checkIfSaved = async () => {
      // Ensure the user is logged in
      if (user) {
        try {
          await checkSave(data.photo_id)
            .then((result) => {
              setSavedStatus(result);
            })
            .catch((error) => {
              console.log(error?.message);
              toast.error("Something went wrong!");
            });
        } catch (error) {
          console.error("Error checking save status:", error);
        }
      }
    };

    checkIfSaved();
  }, [data.photo_id, user]);

  // Function to handle saving the photo
  const onSave = useCallback(
    (event) => {
      event.stopPropagation();

      if (user) {
        if (!savedStatus) {
          // Check if photo is not already saved
          setSaving(true);
          const photo_id = data.photo_id;
          savePhoto({ photo_id: photo_id })
            .then((result) => {
              setSavedStatus(true);
              toast.success("Save photo successfully");
            })
            .catch((error) => {
              console.error("Error saving photo:", error);
              toast.error("Failed to save photo");
            })
            .finally(() => {
              setSaving(false);
            });
        } else {
          toast.info("Photo is already saved");
        }
      } else {
        toast.error("You need to log in to save photos!!!");
      }
    },
    [data, user, savedStatus]
  );

  return (
    <div
      onClick={() => navigate(`/photo/${data.photo_id}`)}
      className="break-inside-avoid cursor-pointer group pb-4"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className={`relative overflow-hidden rounded-2xl ${getHeightClass()}`}
        >
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
                  className="hidden group-hover:block text-sm bg-gray-900 hover:bg-gray-900 text-white cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {saving ? (
                    <ClipLoader color={"#fffff"} loading={saving} size={30} />
                  ) : (
                    <>Saved</>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"primary"}
                  size="primary"
                  className="hidden group-hover:block text-sm"
                  onClick={onSave}
                >
                  {saving ? (
                    <ClipLoader color={"#ffffff"} loading={saving} size={30} />
                  ) : (
                    <>Save</>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
