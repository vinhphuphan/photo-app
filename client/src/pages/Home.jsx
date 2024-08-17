import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";
import RegisterModal from "../components/Modal/RegisterModal";
import LoginModal from "../components/Modal/LoginModal";
import ToasterProvider from "../providers/ToasterProvider.jsx";
import PhotoLayout from "../components/PhotoSection/PhotoLayout.jsx";
import PhotoContext from "../contexts/PhotoContext.js";
import { ClipLoader } from "react-spinners";
import { getPhotos } from "../utils/fetchFromApi.js";

const Home = () => {
  const [photos, setPhotos] = useContext(PhotoContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await getPhotos(`photos`);
        setPhotos(response.data);
      } catch (error) {
        console.log("Error when fetching photos: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500)
      }
    };
    fetchPhotos();
  }, [setPhotos]);

  return (
    <div>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Header />
      {loading ? (
        <div className="bg-white flex items-center justify-center w-full h-full pt-72">
          <ClipLoader color="#e60023" loading={loading} size={50} />
        </div>
      ) : (
        <PhotoLayout photos={photos} />
      )}
    </div>
  );
};

export default Home;
