import React, { useEffect, useState } from "react";
import { getCreatedPhotoByUser } from "../../utils/fetchFromApi";
import UserPageMessage from "./UserPageMessage"
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PhotoCard from "../PhotoSection/PhotoCard";

const CreatedPhotos = ({ user_name }) => {
  const [createdPhotos, setCreatedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedPhotos = async () => {
      setLoading(true);
      try {
        const result = await getCreatedPhotoByUser(user_name);
        setCreatedPhotos(result.data);
      } catch (error) {
        console.log("Error when fetching created photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedPhotos();
  }, [user_name]);

  if (loading) {
    return (
      <div className="bg-white flex items-center justify-center w-full h-full pt-64">
        <ClipLoader color="#e60023" loading={loading} size={50} />
      </div>
    );
  }

  if (createdPhotos.length === 0) {
    return (
      <UserPageMessage
        message="Nothing to show yet! Pins you create will appear here."
        buttonLabel="Create Pin"
        buttonAction={() => navigate("/create")}
        buttonClassName="rounded-3xl px-4 py-3"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-10 lg:px-2 pt-10">
      {/* Photos Grid */}
      <div className="w-full md:w-4/6 lg:w-3/4 columns-2 md:columns-3 lg:columns-4 space-y-2 break-inside-avoid">
        {createdPhotos.map((photo) => (
          <PhotoCard key={photo.photo_id} data={photo} forRecommendSection/>
        ))}
      </div>
    </div>
  );
};

export default CreatedPhotos;
