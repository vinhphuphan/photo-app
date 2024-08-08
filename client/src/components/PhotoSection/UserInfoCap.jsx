// UserInfoCap.jsx
import React, { useCallback, useContext, useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button/Button";
import { checkFollow, followUser, getFollowersByUserName, unFollowUser } from "../../utils/fetchFromApi";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserInfoCap = ({ userPostingPhoto }) => {
  const [followStatus, setFollowStatus] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate()
  const [userPostingFollowers, setUserPostingFollowers] = useState([])
  const checkFollowStatus = useCallback(async () => {
    if (user && user.user_id !== userPostingPhoto.user_id) {
      try {
        const response = await checkFollow(userPostingPhoto.user_id);
        setFollowStatus(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    }
  }, [user, userPostingPhoto]);

  const handleFollowClick = async () => {
    if (user && userPostingPhoto && user.user_id !== userPostingPhoto.user_id) {
      try {
        if (followStatus) {
          // Unfollow the user
          await unFollowUser(userPostingPhoto.user_id);
          setFollowStatus(false);
        } else {
          // Follow the user
          await followUser(userPostingPhoto.user_id);
          setFollowStatus(true);
        }
      } catch (error) {
        console.error("Error updating follow status:", error);
      }
    }
  };

  const getUserPostingFollower = useCallback( async () => {
    try {
      const response = await getFollowersByUserName(userPostingPhoto.user_name)
      setUserPostingFollowers(response.data)
     
    }
    catch (error) {
      console.log("Error when fetching followers of user who post the photo : ", error)
    }
  }, [setUserPostingFollowers, userPostingPhoto])

  useEffect(() => {
    checkFollowStatus();
    getUserPostingFollower();
  }, [checkFollowStatus, getUserPostingFollower]);

  return (
    <div className="w-full flex flex-row justify-between items-center mb-2">
      <div className="w-full flex flex-row gap-2 mb-2 justify-between pr-8">
        <div className="flex items-center gap-4">
          <Avatar src={userPostingPhoto.avatar} onClick={() => navigate(`/${userPostingPhoto.user_name}`)}/>
          <div className="flex flex-col items-start justify-center">
            <div className="text-sm font-medium text-left cursor-pointer">
              {userPostingPhoto.full_name}
            </div>
            <div className="text-sm font-light text-left">{userPostingFollowers.length} followers</div>
          </div>
        </div>
        {user && (user.user_id !== userPostingPhoto.user_id) && (
          <Button
            variant="secondary"
            size="secondary"
            className={`px-4 py-1 rounded-full
            ${followStatus
              ? "bg-gray-900 text-white border-none hover:bg-red-800"
              : "bg-white border-2 border-neutral-200 hover:bg-[#0000000f]"
            }`}
            onClick={handleFollowClick}
          >
            {followStatus ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserInfoCap;
