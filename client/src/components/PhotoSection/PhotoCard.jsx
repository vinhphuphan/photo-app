import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import toast from "react-hot-toast";
import { checkSave, savePhoto } from "../../utils/fetchFromApi.js";
import { ClipLoader } from "react-spinners";
import UserContext from "../../contexts/UserContext.js";

const PhotoCard = ({ data, heightClass }) => {
  const navigate = useNavigate();
  const [savedStatus, setSavedStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user] = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (user) {
        try {
          const result = await checkSave(data.photo_id);
          setSavedStatus(result);
        } catch (error) {
          console.log(error?.message);
          toast.error("Something went wrong!");
        }
      }
    };

    checkIfSaved();
  }, [data.photo_id, user]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAdjustedHeightClass = (heightClass) => {
    const height = parseInt(heightClass, 10);
    if (height > 18) return height - 8;
    if (height >= 13 && height <= 18) return height - 6;
    return height - 5;
  };

  const adjustedHeightClass = windowWidth < 640 ? getAdjustedHeightClass(heightClass) : heightClass;

  const onSave = useCallback(
    async (event) => {
      event.stopPropagation();

      if (user) {
        if (!savedStatus) {
          setSaving(true);
          try {
            await savePhoto({ photo_id: data.photo_id });
            setSavedStatus(true);
            toast.success("Save photo successfully");
          } catch (error) {
            console.error("Error saving photo:", error);
            toast.error("Failed to save photo");
          } finally {
            setSaving(false);
          }
        } else {
          toast.info("Photo is already saved");
        }
      } else {
        toast.error("You need to log in to save photos!!!");
      }
    },
    [data.photo_id, user, savedStatus]
  );

  return (
    <div
      onClick={() => navigate(`/photo/${data.photo_id}`)}
      className={`relative break-inside-avoid cursor-pointer group overflow-hidden`}
      style={{ gridRow: `span ${adjustedHeightClass}` }}
    >
      <img
        alt=""
        src={data.photo_path}
        className="object-cover h-full w-full rounded-2xl group-hover:opacity-70 transition"
      />
      <div className="absolute top-3 right-3">
        <Button
          variant={"primary"}
          size="primary"
          className="hidden group-hover:block text-sm"
          onClick={onSave}
        >
          {saving ? (
            <ClipLoader color={"#ffffff"} loading={saving} size={30} />
          ) : savedStatus ? (
            <>Saved</>
          ) : (
            <>Save</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PhotoCard;
