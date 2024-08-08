import React, { useCallback, useEffect, useRef } from "react";

let cloudinary;

const UploadWidget = ({ children, onUpload }) => {
  const widget = useRef();

  const createWidget = useCallback(() => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    const options = {
      cloudName,
      uploadPreset,
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      if (
        (error || result.event === "success") &&
        typeof onUpload === "function"
      ) {
        onUpload(error, result, widget);
      }
    });
  }, [onUpload]);

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }
    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
  }, [createWidget]);
  return <>{children({ cloudinary, widget, open })}</>;
};

export default UploadWidget;
