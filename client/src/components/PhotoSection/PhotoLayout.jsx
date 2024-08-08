import PhotoCard from "./PhotoCard";

const PhotoLayout = ({ photos }) => {

  return (
    <div
      className="
    px-5
    lg:px-2
    pt-20
    w-full
    columns-1
    sm:columns-3
    lg:columns-4
    xl:columns-5
    2xl:columns-6
    space-y-2
    gap-4
    break-inside-avoid"
    >
      {photos.map((photo) => (
        <PhotoCard
          key={photo.photo_id}
          data={photo}
          forRecommendSection={false}
        />
      ))}
    </div>
  );
};

export default PhotoLayout;
