import { useRef } from "react";
import PhotoCard from "./PhotoCard";
import clsx from "clsx";
import useLazyLoad from "../../hooks/useLazyLoad";
import LoadingCard from "./LoadingCard";

const PhotoLayout = ({ photos }) => {
  const triggerRef = useRef(null);
  const numPerPage = 20;

  // Function to simulate fetching data for the current page
  const onGrabData = (currentPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (currentPage - 1) * numPerPage;
        const endIndex = Math.min(startIndex + numPerPage, photos.length);
        const data = photos.slice(startIndex, endIndex);
        const hasMore = endIndex < photos.length;
        resolve({ data, hasMore });
      }, 2000);
    });
  };
  // eslint-disable-next-line
  const { data, loading, hasMore } = useLazyLoad({ triggerRef, onGrabData });

  const heights = [
    "10",
    "11",
    "12",
    "13",
    "14",
    "16",
    "18",
    "20",
  ];

  // Generate random height classes for loading cards
  const getRandomHeight = () => {
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <>
      <div
        className="
    masonry
    px-5
    lg:px-2
    pt-20
    w-full
    gap-4
    break-inside-avoid"
      >
        {data.map((photo) => (
          <PhotoCard
            key={photo.photo_id}
            data={photo}
            forRecommendSection={false}
            heightClass={getRandomHeight()}
          />
        ))}
        {loading &&
          Array.from({ length: numPerPage }).map((_, index) => (
            <LoadingCard key={index} heightClass={getRandomHeight()} />
          ))}
      </div>
      <div
        ref={triggerRef}
        className={clsx(("trigger", { visible: loading }))}
      ></div>
    </>
  );
};

export default PhotoLayout;
