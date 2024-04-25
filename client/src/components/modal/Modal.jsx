import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleOverlayClick = useCallback(
    (event) => {
      const targetClassList = event.target.classList;
      if (
        targetClassList.contains("modal-overlay") ||
        targetClassList.contains("modal-container")
      ) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Overlay */}
      <div
        onClick={handleOverlayClick}
        className="
            modal-overlay 
            flex items-center justify-center
            fixed w-full inset-0 z-50 overflow-hidden bg-neutral-800/70
            "
      >
        <div
          className={`
                modal-container
                flex flex-col items-center justify-center
                w-full p-10 h-full transition
                ${
                  showModal
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }
                `}
        >
          {/* Modal header */}
          <header
            className="
                    relative w-full h-auto md:w-4/6 xl:w-2/6
                    flex flex-row items-center justify-center
                    bg-white rounded-t-3xl py-4
                    "
          >
            <Button
              variant={"icon"}
              size={"icon"}
              className="absolute right-4 hover:bg-neutral-200"
              onClick={handleClose}
            >
              <IoMdClose size={30} className="text-black" />
            </Button>
            <div className="text-2xl font-medium mt-2">{title}</div>
          </header>

          {/* Modal Main Content */}
          <div className="flex justify-center gap-4 w-full md:w-4/6 xl:w-2/6 h-auto bg-white rounded-b-3xl px-6 py-4">
            <div className="flex flex-col gap-4 w-[60%] h-auto">
              {body}
              {/* Button */}
              <Button
                variant={"primary"}
                size={"primary"}
                className={"py-2"}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <ClipLoader
                    color={"#fffff"}
                    loading={isLoading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  actionLabel
                )}
              </Button>
              {/* Modal Footer */}
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
