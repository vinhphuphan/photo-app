import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header.jsx";
import RegisterModal from "../components/Modal/RegisterModal.jsx";
import LoginModal from "../components/Modal/LoginModal.jsx";
import ToasterProvider from "../providers/ToasterProvider.jsx";
import PhotoDetailsBody from "../components/PhotoSection/PhotoDetailsBody.jsx";
import RecommendPhotos from "../components/PhotoSection/RecommendPhotos.jsx"

const PhotoDetails = () => {
  const [isPhotoDetailsLoaded, setIsPhotoDetailsLoaded] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const element = triggerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPhotoDetailsLoaded(true);
        }
      },
      // Trigger when 100% of the trigger element is visible
      { threshold: 1.0 } 
    );

    if (element) {
      observer.observe(element);
    }

    // Cleanup function
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Header />
      <PhotoDetailsBody />
      <div ref={triggerRef} style={{ height: "1px" }} />
      {isPhotoDetailsLoaded && <RecommendPhotos />}
    </div>
  );
};

export default PhotoDetails;
