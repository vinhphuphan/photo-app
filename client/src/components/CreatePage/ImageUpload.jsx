import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import UploadWidget from "./UploadWidget";
import { ClipLoader } from "react-spinners";

const ImageUpload = ({ sendUrl, disabled, clearUrl }) => {
  const [url, updateUrl] = useState();

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  useEffect(() => {
    if (url) {
      sendUrl(url);
    }
  }, [url, sendUrl]);

  useEffect(() => {
    if (clearUrl) {
      updateUrl("");
    }
  }, [clearUrl]);

  return (
    <UploadWidget onUpload={handleOnUpload}>
      {({ open }) => {
        return (
          <div
            onClick={disabled ? null : open}
            className={`
                relative w-full h-full 
                flex flex-col items-center justify-center gap-4
                hover:opacity-70 transition  rounded-xl
                border-dashed border-2 border-neutral-300
                 p-20 text-gray-900
                  ${
                    disabled
                      ? "bg-transparent bg-opacity-70 cursor-not-allowed"
                      : "bg-white cursor-pointer"
                  }
            
                 `}
          >
            {disabled ? (
              <>
                <div className="absolute inset-0 z-50 bg-transparent flex items-center justify-center">
                  <ClipLoader
                    color={"#fffff"}
                    loading={disabled}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </>
            ) : (
              <>
                <FaArrowCircleUp
                  size={30}
                  className={url ? "hidden" : "block"}
                />
                <p
                  className={
                    url
                      ? "hidden"
                      : "text-xs text-center md:text-sm font-normal text-gray-900"
                  }
                >
                  Upload a photo
                </p>
                <p
                  className={
                    url
                      ? "hidden"
                      : "absolute bottom-3 p-1 text-xs md:text-sm text-center w-full font-normal text-gray-900"
                  }
                >
                  You should use high-quality .jpg files under 20MB or
                  high-quality .mp4 files under 200MB in size.
                </p>
              </>
            )}
            {url && (
              <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                <img
                  id="photo_path"
                  alt="Upload"
                  src={url}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />

                {disabled && (
                  <div className="absolute inset-0 bg-transparent z-50 flex items-center justify-center">
                    <ClipLoader
                      color={"#fffff"}
                      loading={disabled}
                      size={35}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }}
    </UploadWidget>
  );
};

export default ImageUpload;
