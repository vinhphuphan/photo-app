import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../../utils/fetchFromApi";
import Avatar from "../Avatar";
import Input from "../Input";
import Button from "../Button/Button";
import ReactionSection from "../Reaction/ReactionSection";
import toast from "react-hot-toast";
import useLoginModal from "../../hooks/useLoginModal";
import { IoMdSend } from "react-icons/io";

const WriteComment = ({ photoId, user, handleNewComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const loginModal = useLoginModal();

  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const onSubmit = async (data) => {
    if (inputValue.trim() === "") return;
    setLoading(true);
    try {
      await createComment(photoId, data);
      toast.success("Create comment successfully!");
      handleNewComment();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      reset();
      setInputValue("");
    }
  };

  return (
    <div
      className={` ${
        user ? "pr-8" : "w-full h-auto py-2 pl-0 pr-8 mb-5 lg:mb-0"
      } flex flex-col`}
    >
      {user ? (
        <>
          <div className="flex flex-row h-full items-center justify-between">
            <div className="text-lg font-medium text-black">
              What do you think?
            </div>
            <ReactionSection photoId={photoId} user={user} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row items-center gap-2 relative pb-4"
          >
            <Avatar src={user ? user.avatar : null} width={40} height={40} />
            <Input
              id="content"
              type="text"
              placeholder="Write your comment..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              register={register}
              errors={errors}
              disabled={loading}
              required
              className="placeholder-[#cdcdcd] border-[#cdcdcd] rounded-full px-3 py-3 focus:border-none cursor-default flex-grow"
            />
            {inputValue.trim().length > 0 && (
              <Button
                type="submit"
                variant="primary"
                size="icon"
                className={`absolute rounded-full w-8 h-8 right-2 top-[0.875rem] ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                <IoMdSend />
              </Button>
            )}
          </form>
        </>
      ) : (
        <Button
          variant="secondary"
          className="rounded-full w-full"
          onClick={openLoginModal}
        >
          Add comment
        </Button>
      )}
    </div>
  );
};

export default WriteComment;
