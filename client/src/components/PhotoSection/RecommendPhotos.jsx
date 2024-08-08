import React, { useContext } from "react";
import PhotoContext from "../../contexts/PhotoContext";
import NoMatchesMessage from "../Button/NoMatchesMessage";
import PhotoCard from "./PhotoCard";

const RecommendPhotos = () => {
  const [photos] = useContext(PhotoContext);

  if (!photos) {
    return <NoMatchesMessage message="No exact matches" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-10 lg:px-2 pt-28">
      {/* Header */}
      <div className="text-2xl font-medium text-black mb-4">
        You may also like
      </div>

      {/* Photo Grid */}
      <div className="w-full md:w-4/6 lg:w-3/4 columns-2 sm:columns-3 lg:columns-4 space-y-2 break-inside-avoid">
        {photos.map((photo) => (
          <PhotoCard key={photo.photo_id} data={photo} forRecommendSection />
        ))}
      </div>
    </div>
  );
};

export default RecommendPhotos;
