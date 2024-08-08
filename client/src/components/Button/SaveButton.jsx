import React, { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";
import Button from "./Button";
import { savePhoto } from "../../utils/fetchFromApi";
import UserContext from "../../contexts/UserContext";
import toast from "react-hot-toast";

const SaveButton = ({ photoId, initialSavedStatus }) => {
  const [savedStatus, setSavedStatus] = useState(initialSavedStatus);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Update saved status based on initialSavedStatus
    setSavedStatus(initialSavedStatus);
  }, [initialSavedStatus]);

  useEffect(() => {
    // Reset savedStatus if user changes to null
    if (!user) {
      setSavedStatus(false);
    }
  }, [user]);

  const onSave = async (event) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Log in to save photo!!");
      return;
    }
    try {
      setSaving(true);
      if (!savedStatus) {
        await savePhoto({ photo_id: photoId });
        setSavedStatus(true);
        console.log("Photo saved successfully");
      } else {
        console.log("Photo already saved");
      }
    } catch (error) {
      console.error("Error saving photo:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button
      variant="primary"
      size="primary"
      className={`px-6 z-20 ${
        savedStatus ? "bg-gray-900 cursor-not-allowed" : ""
      }`}
      onClick={!savedStatus ? onSave : undefined}
      disabled={savedStatus || saving}
    >
      {saving ? (
        <ClipLoader color="#ffffff" loading={saving} size={20} />
      ) : savedStatus ? (
        "Saved"
      ) : (
        "Save"
      )}
    </Button>
  );
};

export default SaveButton;
