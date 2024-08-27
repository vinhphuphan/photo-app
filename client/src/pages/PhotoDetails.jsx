import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";
import RegisterModal from "../components/Modal/RegisterModal.jsx";
import LoginModal from "../components/Modal/LoginModal.jsx";
import ToasterProvider from "../providers/ToasterProvider.jsx";
import PhotoDetailsBody from "../components/PhotoSection/PhotoDetailsBody.jsx";
import { ClipLoader } from "react-spinners";
import PhotoLayout from "../components/PhotoSection/PhotoLayout.jsx";
import PhotoContext from "../contexts/PhotoContext.js";
import { getPhotos } from "../utils/fetchFromApi.js";

const PhotoDetails = () => {
  const [photos, setPhotos] = useContext(PhotoContext);
  const [loading, setLoading] = useState(true);
  const [loadingRecommend, setLoadingRecommend] = useState(true);

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
        }, 500);
      }
    };
    fetchPhotos();
  }, [setPhotos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setLoadingRecommend(false);
    }, 4000);

    // Cleanup the timer
    return () => clearTimeout(timer2);
  }, []);

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
        <>
          <PhotoDetailsBody />
          {!loadingRecommend && <PhotoLayout photos={photos} forRecommendSection />}
        </>
      )}
    </div>
  );
};

export default PhotoDetails;
