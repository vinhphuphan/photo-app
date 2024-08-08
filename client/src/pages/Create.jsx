import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button/Button.jsx";
import { BsThreeDots } from "react-icons/bs";
import ImageUpload from "../components/CreatePage/ImageUpload";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadPhotoApi } from "../utils/fetchFromApi";
import UserContext from "../contexts/UserContext.js";
import Avatar from "../components/Avatar";
import ToasterProvider from "../providers/ToasterProvider.jsx";

const Create = () => {
  const [user] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [clearPhotoUrl, setClearPhotoUrl] = useState(false);
  function handleUrl(data) {
    setPhotoUrl(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      photo_description: "",
      photo_path: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.photo_path = photoUrl;
    await uploadPhotoApi(data, "photos/upload")
      .then((result) => {
        reset();
        setPhotoUrl("");
        setClearPhotoUrl(!clearPhotoUrl);
        toast.success("Create pin successfully!", {
          duration: 800,
        });
        setTimeout(() => {
          window.location.reload();
        }, 800)
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Reset overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <ToasterProvider />
      <Header action="create" />
      <ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          {/* Content header */}
          <div className="w-full h-auto flex flex-row justify-between mb-5">
            <Button variant="icon" size="icon" className="">
              <BsThreeDots size={30} />
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="primary"
              className="px-6"
            >
              Save
            </Button>
          </div>

          {/* Main content */}
          <div className="w-full h-5/6 flex flex-row justify-between">
            {/* Photo Upload */}
            <div className="flex w-2/5 ">
              <ImageUpload
                sendUrl={handleUrl}
                disabled={isLoading}
                clearUrl={clearPhotoUrl}
              />
            </div>
            {/* Photo Details */}
            <div className="flex flex-col gap-4 w-[55%]">
              <Input
                id="title"
                label="Title"
                type="text"
                disabled={isLoading}
                placeholder={"Add your title"}
                register={register}
                errors={errors}
                required
                className="placeholder:gray-400"
              />

              <div className="flex flex-row gap-2 mb-5">
                <Avatar src={user.avatar} />
                <div className="flex items-center text-sm md:text-base font-medium">
                  {user.full_name}
                </div>
              </div>

              <Input
                id="photo_description"
                label="Description"
                type="textarea"
                disabled={isLoading}
                placeholder={"Description"}
                register={register}
                errors={errors}
                required
                className="min-h-[15vh] text-sm text-wrap items-start resize-y "
              />
            </div>
          </div>
        </form>
      </ContentContainer>
    </div>
  );
};
export default Create;
