import { useCallback, useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Avatar from "../components/Avatar";
import UserContext from "../contexts/UserContext";
import { useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import Input from "../components/Input";
import UploadWidget from "../components/CreatePage/UploadWidget";
import { ClipLoader } from "react-spinners";
import { updateUserInfo } from "../utils/fetchFromApi";
import toast from "react-hot-toast";
import ToasterProvider from "../providers/ToasterProvider";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/Modal/RegisterModal";
import LoginModal from "../components/Modal/LoginModal";

const Profile = () => {
  const [user] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [userNameValue, setUserNameValue] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      full_name: "",
      introduce: "",
      website: "",
      user_name: "",
      photo_path: "",
    },
  });

  const handleOnUpload = useCallback((error, result, widget) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setPhotoUrl(result?.info?.secure_url);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.photo_path = photoUrl;
    await updateUserInfo(data)
      .then((result) => {
        navigate("/profile");
        toast.success("Update profile successfully!");
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    reset();
    setPhotoUrl("");
    setValue("full_name", user.full_name);
    setValue("user_name", user.user_name);
    setUserNameValue(user.user_name);
  };

  useEffect(() => {
    if (user) {
      setLoadingUser(false);
      setValue("full_name", user.full_name);
      setValue("user_name", user.user_name);
      setUserNameValue(user.user_name);
      setValue("introduce", user.introduce);
    }
  }, [user, setValue]);

  if (loadingUser) {
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="profile-main-container px-5 mt-5 "
        >
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col gap-2 w-2/3 md:w-1/2 lg:w-[35%]">
              <div className="text-2xl font-medium">Profile</div>
              <div className="text-base font-normal mb-8">
                Please keep your personal information private. Information you
                add here is visible to anyone who can view your profile.
              </div>
              <div className="flex flex-row gap-4 relative mb-4">
                <div className="absolute top-[-1.4rem] left-3 text-sm">
                  Image
                </div>
                <Avatar
                  src={photoUrl ? photoUrl : user.avatar}
                  className="w-16 h-16"
                />
                <div className="flex justify-start items-center">
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => (
                      <Button
                        variant="secondary"
                        size="secondary"
                        className={`rounded-full px-3 py-2 font-normal ${
                          isLoading
                            ? "text-neutral-400 bg-opacity-70 cursor-not-allowed hover:bg-neutral-200 hover:bg-opacity-70"
                            : ""
                        }`}
                        onClick={open}
                      >
                        Change
                      </Button>
                    )}
                  </UploadWidget>
                </div>
              </div>

              <Input
                id="full_name"
                label="Full name"
                type="text"
                disabled={isLoading}
                placeholder="Full name"
                className="w-1/2 mb-2"
                register={register}
                errors={errors}
              />
              <Input
                id="introduce"
                label="Introduce"
                type="textarea"
                className="mb-2 min-h-20"
                disabled={isLoading}
                placeholder="Tell your story"
                register={register}
                errors={errors}
              />

              <Input
                id="website"
                label="Webpage"
                type="text"
                className="mb-2"
                disabled={isLoading}
                placeholder="Add links to your website"
                register={register}
                errors={errors}
              />
              <div className="">
                <Input
                  id="user_name"
                  label="User name"
                  type="text"
                  disabled={isLoading}
                  placeholder="Choose wisely so others can find you"
                  className="mb-2"
                  register={register}
                  errors={errors}
                  value={userNameValue}
                  onChange={(e) => setUserNameValue(e.target.value)}
                />
                {userNameValue && userNameValue.trim().length > 0 && (
                  <div className="text-sm font-light">{`http://photosharing.com/${userNameValue}`}</div>
                )}
              </div>
            </div>
          </div>

          <div className="z-1 left-0 bottom-0 fixed py-4 px-5 border-t-2 bg-white shadow-profile-submit w-full flex items-center justify-center">
            <div className="flex flex-row gap-2 w-2/3 md:w-1/2 lg:w-[35%] items-center justify-end">
              <Button
                variant="secondary"
                size="secondary"
                className={`rounded-full px-4 py-3 font-medium ${
                  isLoading
                    ? "text-neutral-400 bg-opacity-70 cursor-not-allowed hover:bg-neutral-200 hover:bg-opacity-70"
                    : ""
                }`}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="secondary"
                className={`rounded-full px-4 py-3 font-medium ${
                  isLoading
                    ? "bg-neutral-200 text-neutral-400 bg-opacity-70 cursor-not-allowed hover:bg-neutral-200 hover:bg-opacity-70"
                    : ""
                }`}
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
