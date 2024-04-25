import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button';
import PhotoContext from '../contexts/PhotoContext';
import { getPhotos } from '../utils/fetchFromApi';
import PhotoCard from './PhotoCard';

const PhotoLayout = () => {
  const navigate = useNavigate();  
  const [photos , setPhotos] = useContext(PhotoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getPhotos("photos")
        .then((result) => {
            setPhotos(result.data)
        })
        .catch((error) => {
            console.log("Error when fetching photos : ",error)
        })
        .finally(
            setLoading(false)
        )
  }, [setPhotos])

  if (!photos) {
    return (
        <div className='h-[90vh] flex flex-col gap-2 justify-center items-center'>
            <div className="text-center">
                <div className='text-xl font-semibold'>No exact matches</div>
                <div className="text-sm font-light text-gray-500">Try changing your search key</div>
            </div>
            <Button variant="secondary" size="secondary" className="w-48 mt-4 rounded-xl p-2" onClick={() => navigate("/")}>
                Remove the search key
            </Button>
        </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <div className="
    px-5
    pt-24
    w-full
    columns-1
    sm:columns-2
    md:columns-3
    lg:columns-4
    xl:columns-5
    2xl:columns-6
    space-y-3
    gap-5">
       {photos.map((photo) => (
        <PhotoCard 
            key={photo.photo_id}
            data={photo}
        />
      ))}
    </div>
  )
}

export default PhotoLayout
