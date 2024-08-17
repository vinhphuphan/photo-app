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
      className={`relative break-inside-avoid cursor-pointer group`}
      style={{ gridRow: `span ${heightClass}` }}
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
