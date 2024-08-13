import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ToasterProvider from "../providers/ToasterProvider";
import RegisterModal from "../components/Modal/RegisterModal";
import LoginModal from "../components/Modal/LoginModal";
import Button from "../components/Button/Button";
import Avatar from "../components/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkFollow,
  followUser,
  getFollowersByUserName,
  getUserInfoByUserName,
  unFollowUser,
} from "../utils/fetchFromApi";
import { ClipLoader } from "react-spinners";
import SavedPhotos from "../components/UserPage/SavedPhotos";
import CreatedPhotos from "../components/UserPage/CreatedPhotos";
import UserContext from "../contexts/UserContext";

const UserPage = () => {
  const { user_name } = useParams();
  const [user] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [selectSavedButton, setSelectSavedButton] = useState(true);
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUserInfoByUserName(user_name);
      const getFollower = await getFollowersByUserName(user_name);
      setUserInfo(response.data);
      setFollowers(getFollower.data);
      if (user && response.data.user_id) {
        const getFollowStatus = await checkFollow(response.data.user_id);
        setFollowStatus(getFollowStatus.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user_name, user]);

  const handleFollowClick = useCallback(async () => {
    if (user && userInfo && user.user_name !== userInfo.user_name) {
      try {
        if (followStatus) {
          await unFollowUser(userInfo.user_id);
          setFollowStatus(false);
        } else {
          await followUser(userInfo.user_id);
          setFollowStatus(true);
        }
      } catch (error) {
        console.log("Error updating follow status:", error);
      } finally {
        const getFollower = await getFollowersByUserName(user_name);
        setFollowers(getFollower.data);
      }
    }
  }, [followStatus, user, userInfo, user_name]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Header />
        <div className="bg-white flex items-center justify-center w-full h-full pt-64">
          <ClipLoader color="#e60023" loading={isLoading} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Header />
      <div className="pt-20 w-full h-auto pb-36">
        <div className="w-full h-auto flex items-center justify-center mb-8">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Avatar src={userInfo.avatar} className="w-24 md:w-36 h-24 md:h-36" />
            <div className="text-xl md:text-2xl lg:text-4xl font-medium">{userInfo.full_name}</div>
            <div className="flex flex-row gap-2">
              <img
                src="/assets/android-chrome-512x512.png"
                className="w-4 h-4"
                alt="website icon"
              />
              <div className="text-sm font-light text-neutral-700">
                {userInfo.user_name}
              </div>
            </div>
            <div className="text-sm md:text-base font-normal">
              {followers.length} people are following
            </div>

            {/* Share and Update profile button */}
            <div className="flex flex-row gap-2 mb-10">
              <Button
                variant="secondary"
                size="secondary"
                className="px-3 md:px-4 py-2 md:py-3 rounded-full text-neutral-800 font-medium"
              >
                Share
              </Button>
              {user.user_name !== user_name ? (
                <Button
                  variant="secondary"
                  size="secondary"
                  className={`px-3 md:px-4 py-1 rounded-full ${
                    followStatus
                      ? "bg-gray-900 text-white border-none hover:bg-gray-900"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                  onClick={handleFollowClick}
                >
                  {followStatus ? "Unfollow" : "Follow"}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="secondary"
                  className="px-3 md:px-4 py-2 md:py-3 rounded-full text-neutral-800 font-medium"
                  onClick={() => navigate("/profile")}
                >
                  Update profile
                </Button>
              )}
            </div>

            {/* Created and Saved buttons */}
            <div className="flex flex-row gap-2 px-4 pb-0 md:pb-4">
              <Button
                variant="secondary"
                size="secondary"
                className={`p-2 bg-white text-neutral-800 font-medium transition
                  ${
                    selectSavedButton
                      ? "bg-white hover:bg-neutral-300 rounded-md"
                      : "border-b-[3px] border-neutral-800 px-0 mr-4 hover:bg-white"
                  } 
                  `}
                onClick={() => {
                  setSelectSavedButton(false);
                }}
              >
                Created
              </Button>
              <Button
                variant="secondary"
                size="secondary"
                className={`p-2 bg-white text-neutral-800 font-medium transition
                  ${
                    selectSavedButton
                      ? "border-b-[3px] border-neutral-800 px-0 ml-4 hover:bg-white"
                      : " bg-white hover:bg-neutral-300 rounded-md"
                  } 
                  `}
                onClick={() => {
                  setSelectSavedButton(true);
                }}
              >
                Saved
              </Button>
            </div>
            {selectSavedButton ? (
              <SavedPhotos user_name={user_name} />
            ) : (
              <CreatedPhotos user_name={user_name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
