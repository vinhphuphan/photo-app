import React, { useEffect, useState } from "react";
import { getSavedPhotoByUser } from "../../utils/fetchFromApi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PhotoCard from "../PhotoSection/PhotoCard";
import UserPageMessage from "./UserPageMessage"

const SavedPhotos = ({ user_name }) => {
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPhotos = async () => {
      setLoading(true);
      try {
        const result = await getSavedPhotoByUser(user_name);
        setSavedPhotos(result.data);
      } catch (error) {
        console.log("Error when fetching saved photos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPhotos();
  }, [user_name]);

  if (loading) {
    return (
      <div className="bg-white flex items-center justify-center w-full h-full pt-64">
        <ClipLoader color="#e60023" loading={loading} size={50} />
      </div>
    );
  }

  if (savedPhotos.length === 0) {
    return (
      <UserPageMessage
        message="You have not saved any Pins yet."
        buttonLabel="Find ideas"
        buttonAction={() => navigate("/")}
        buttonClassName="rounded-3xl px-4 py-3"
        buttonVariant="secondary"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-10 lg:px-2 pt-10">
      {/* Photos Grid */}
      <div className="w-full md:w-4/6 lg:w-3/4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-2 break-inside-avoid">
        {savedPhotos.map((photo) => (
          <PhotoCard key={photo.photo_id} data={photo} forRecommendSection/>
        ))} 
      </div>
    </div>
  );
};

export default SavedPhotos;
