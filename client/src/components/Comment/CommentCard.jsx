import React, { useContext, useState } from "react";
import Avatar from "../Avatar.jsx";
import Button from "../Button/Button.jsx";
import Input from "../Input.jsx";
import { useForm } from "react-hook-form";
import UserContext from "../../contexts/UserContext.js";
import { createReply } from "../../utils/fetchFromApi.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define the date formatter
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const CommentCard = ({ comment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      photo_id: comment.photo_id,
    },
  });

  // Format the date using the date formatter
  const formattedDate = dateFormatter.format(new Date(comment.comment_date));
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (inputValue.trim() === "") return;
    setLoading(true);

    try {
      await createReply(comment.comment_id, data);
      toast.success("Reply created successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error when creating the reply comment", error);
    } finally {
      setLoading(false);
      reset();
      setInputValue("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 pr-8">
      <div className="flex flex-row gap-2">
        {/* Avatar */}
        <Avatar
          className="object-cover w-6 md:w-10 h-6 md:h-10"
          width={30}
          height={30}
          src={comment.users.avatar}
          onClick={() => navigate(`/${comment.users.user_name}`)}
        />

        <div className="flex flex-col w-full gap-1">
          {/* User name and comment content */}
          <div className="flex gap-2">
            <div className="text-black text-sm font-normal text-left text-wrap">
              <span className="font-medium text-left text-sm md:text-base cursor-pointer mr-2">
                {comment.users.full_name}
              </span>
              {comment.content}
            </div>
          </div>

          {/* Comment date */}
          <div className="flex gap-4">
            <div className="text-xs md:text-sm text-neutral-800 font-light">
              {formattedDate}
            </div>

            {/* Answer button */}
            {user && (
              <div
                className="text-xs md:text-sm text-[#767676] font-semibold cursor-pointer"
                onClick={() => setShowAnswerInput(true)}
              >
                Answer
              </div>
            )}
          </div>
        </div>
      </div>
      {showAnswerInput && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="content"
            type="text"
            disabled={loading}
            placeholder={"Answer"}
            register={register}
            errors={errors}
            required
            commentInput
            className="placeholder-[#cdcdcd] border-[#cdcdcd] rounded-xl ml-1 px-3 py-2 focus:border-none cursor-default"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              variant="secondary"
              size="secondary"
              className="p-3 rounded-full text-sm font-medium"
              onClick={() => setShowAnswerInput(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="secondary"
              className={`px-4 py-3 rounded-full text-sm font-medium ${
                inputValue.trim().length > 0
                  ? "bg-primary text-white hover:bg-red-800"
                  : "opacity-70 hover:bg-neutral-200 hover:opacity-70 cursor-not-allowed"
              }`}
            >
              Save
            </Button>
          </div>
        </form>
      )}
      {/* Child Comment */}
      <div className="pl-8">
        {comment.children &&
          comment.children.map((child) => (
            <CommentCard key={child.comment_id} comment={child} />
          ))}
      </div>
    </div>
  );
};

export default CommentCard;
