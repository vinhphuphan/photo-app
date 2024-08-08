import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchPhotos } from "../../utils/fetchFromApi";
import PhotoCard from "./PhotoCard";
import NoMatchesMessage from "../Button/NoMatchesMessage";

const SearchResults = () => {
  const { query } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    searchPhotos(query)
      .then((result) => {
        setPhotos(result.data);
      })
      .catch((error) => {
        console.log("Error when fetching photos : ", error);
      })
      .finally(setLoading(false));
  }, [query]);

  // Display NoMatchesMessage if no photos found
  if (!photos.length) {
    return (
      <NoMatchesMessage
        message="No exact matches"
        suggestion="Try changing your search key"
        buttonLabel="Remove the search key"
        buttonAction={() => navigate("/")}
      />
    );
  }

  // Display loading spinner if still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display photos if found
  return (
    <div
      className="
    px-5
    lg:px-2
    pt-24
    w-full
    columns-1
    sm:columns-2
    md:columns-3
    lg:columns-4
    xl:columns-5
    2xl:columns-6
    space-y-4
    gap-4
    break-inside-avoid"
    >
      {photos.map((photo) => (
        <PhotoCard key={photo.photo_id} data={photo} />
      ))}
    </div>
  );
};

export default SearchResults;
