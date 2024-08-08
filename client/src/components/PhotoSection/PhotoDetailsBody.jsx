import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button/Button";
import { ClipLoader } from "react-spinners";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import CommentSection from "../Comment/CommentSection";
import WriteComment from "../Comment/WriteComment";
import UserContext from "../../contexts/UserContext";
import {
  checkSave,
  getCommentsByPhotoId,
  getPhotoDetails,
} from "../../utils/fetchFromApi";
import NavigateBack from "../Button/NavigateBack";
import SaveButton from "../Button/SaveButton";
import UserInfoCap from "./UserInfoCap";

const PhotoDetailsBody = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const [comments, setComments] = useState([]);

  // Check whether user saved this photo (only when user logged in)
  const checkIfSaved = useCallback(async () => {
    if (user) {
      try {
        const response = await checkSave(id);
        setSavedStatus(response);
      } catch (error) {
        console.error("Error checking save status:", error);
      }
    }
  }, [user, id]);

  // Function to build nested comments
  const buildNestedComments = (comments) => {
    const map = new Map();
    const roots = [];

    comments.forEach((comment) => {
      map.set(comment.comment_id, { ...comment, children: [] });
    });

    comments.forEach((comment) => {
      if (comment.parent_comment_id === null) {
        roots.push(map.get(comment.comment_id));
      } else {
        const parent = map.get(comment.parent_comment_id);
        if (parent) {
          parent.children.push(map.get(comment.comment_id));
        }
      }
    });
    return roots;
  };

  // Fetch comments from API
  const fetchComments = useCallback(async () => {
    try {
      const response = await getCommentsByPhotoId(id);
      const nestedComments = buildNestedComments(response);
      setComments(nestedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [id]);

  // Handle new comment by refetching comments
  const handleNewComment = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

  // Fetch photo details and check save status
  useEffect(() => {
    setLoading(true);
    getPhotoDetails(id)
      .then((result) => {
        setPhoto(result.data);
        checkIfSaved();
      })
      .catch((error) => {
        console.log("Error fetching photo details:", error);
      })
      .finally(() => setLoading(false));
  }, [id, user, checkIfSaved]);

  // Fetch comments when photo ID changes
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ClipLoader color="#000000" loading={loading} size={50} />
      </div>
    );
  }

  if (!photo) {
    return <div>Photo not found!</div>;
  }

  return (
    <div className="relative w-full h-auto py-10 xl:h-[90vh] top-20 z-0 pt-2 flex flex-col md:flex-row items-center justify-center">
      {/* Navigate back button */}
      <div className=" hidden sm:block absolute top-5 left-5">
        <NavigateBack />
      </div>

      <div className="relative w-[90%] h-auto xl:h-[85vh] md:w-[60%] lg:w-1/2 xl:w-4/6 flex flex-col xl:flex-row justify-center bg-white rounded-[32px] overflow-visible custom-box-shadow">
        {/* Image */}
        <div className="h-full w-full xl:w-1/2 rounded-l-none rounded-t-[32px] rounded-tl-[32px] xl:rounded-tr-none xl:rounded-l-[32px] overflow-hidden">
          <img
            alt={photo.title}
            src={photo.photo_path}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Photo details */}
        <div className="h-full w-full xl:w-1/2 flex flex-col">
          <div className="flex flex-col gap-2 pl-8">
            {/* Photo details header */}
            <div className="sticky z-10 w-full h-auto flex flex-row justify-between pt-8 pr-8 mb-2">
              <div className="flex flex-row gap-2">
                <Button variant="icon" size="icon" className="text-black">
                  <FiShare size={30} />
                </Button>
                <Button variant="icon" size="icon" className="text-black">
                  <BsThreeDots size={30} />
                </Button>
              </div>
              <SaveButton photoId={id} initialSavedStatus={savedStatus} />
            </div>

            {/* Photo title and description */}
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-black text-2xl font-medium">{photo.title}</h1>
              <p className="text-black text-sm font-light mb-5">
                {photo.photo_description}
              </p>

              {/* User info section */}
              <UserInfoCap userPostingPhoto={photo.users} />

              {/* Comment Section */}
              <CommentSection comments={comments} />

              {/* Write Comment Section */}
              <WriteComment
                photoId={id}
                user={user}
                handleNewComment={handleNewComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsBody;
