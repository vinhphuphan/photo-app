import React, { useState, useEffect } from "react";
import {
  createReaction,
  deleteReaction,
  updateReaction,
  getReactionType,
  getReactionCount,
  getReactionForUser,
} from "../../utils/fetchFromApi";
import ReactionButton from "./ReactionButton";
import ReactionList from "./ReactionList";
import toast from "react-hot-toast";
import ReactionGrid from "./ReactGrid";

const ReactionSection = ({ photoId, user }) => {
  const [userReaction, setUserReaction] = useState("");
  const [reactionCount, setReactionCount] = useState(0);
  const [reactionTypes, setReactionTypes] = useState([]);
  const [reactionListVisible, setReactionListVisible] = useState(false);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const reaction_count = await getReactionCount(photoId);
        const react_types = await getReactionType(photoId);
        setReactionCount(reaction_count.data);
        setReactionTypes(react_types.data);
        if (user) {
          const user_reaction = await getReactionForUser(photoId);
          setUserReaction(user_reaction.data.reactionType);
        }
      } catch (error) {
        console.error("Failed to fetch reactions", error);
      }
    };
    fetchReactions();
  }, [photoId, user]);

  const handleReaction = async (reaction) => {
    if (!user) {
      return;
    }
    try {
      if (userReaction !== "" && reaction === "") {
        await deleteReaction(photoId);
        setUserReaction("");
        toast.success("Reaction removed");
      } else if (userReaction !== reaction && reaction !== "") {
        if (userReaction === "") {
          await createReaction(photoId, { reactionType: reaction });
          toast.success("Reaction added");
        } else {
          await updateReaction(photoId, { reactionType: reaction });
          toast.success("Reaction updated");
        }
        setUserReaction(reaction);
      }

      // Refresh reaction count and list
      const reaction_count = await getReactionCount(photoId);
      const react_types = await getReactionType(photoId);
      setReactionCount(reaction_count.data);
      setReactionTypes(react_types.data);
      setReactionListVisible(false)
    } catch (error) {
      toast.error("Failed to handle reaction");
    }
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <ReactionGrid reactions={reactionTypes} />
      <div className="text-black text-xs md:text-sm font-semibold mr-1 md:mr-2">
        {reactionCount}
      </div>
      <div 
      className="relative" 
      onMouseEnter={() => setReactionListVisible(true)}
      onMouseLeave={() => setReactionListVisible(false)}>
        <ReactionButton
          reaction={userReaction}
          onClick={() => handleReaction(userReaction ? "" : userReaction)}
        />
        {reactionListVisible && <ReactionList onReaction={handleReaction} />}
      </div>
    </div>
  );
};

export default ReactionSection;
