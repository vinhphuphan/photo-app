import React, { useState, useContext } from "react";
import CommentCard from "./CommentCard";
import Button from "../Button/Button";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import UserContext from "../../contexts/UserContext";

const CommentSection = ({ comments }) => {
  const [showComments, setShowComments] = useState(true);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div className="w-full flex flex-row justify-between pr-8 items-center">
        <div className="text-black text-base font-medium">Comments</div>
        {/* Toggle comment section button */}
        <Button
          variant="normal"
          size="default"
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments ? (
            <IoChevronUpOutline size={23} />
          ) : (
            <IoChevronDownOutline size={23} />
          )}
        </Button>
      </div>
      {/* When comment section showed */}
      {showComments && (
        <div
          className={`${
            user ? "h-[22vh]" : "h-[32vh]"
          } flex flex-col gap-5 mt-2 overflow-y-auto`}
        >
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentSection;
