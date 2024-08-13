import axios from "axios";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Input from "../Input";
import useLoginModal from "../../hooks/useLoginModal";
import { useGoogleLogin } from "@react-oauth/google";
import UserContext from "../../contexts/UserContext";

const RegisterModal = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8080/users/signup", data)
      .then((result) => {
        registerModal.onClose();
        toast.success("Sign up successfully!");
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const googleLogin2 = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      await axios.post("http://localhost:8080/users/google", userInfo)
        .then((result) => {
            localStorage.setItem("ACCESS_TOKEN", result.data.data.token);
            setUser(result.data.data.user)
            console.log(result.data.data.user)
            registerModal.onClose();
            toast.success("Registered and Logged in succesfully");
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message);
        })
        .finally(
            setIsLoading(false)
        )
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="w-full flex flex-col gap-2 md:gap-4 mb-1 md:mb-2">
          <Input
            id="email"
            label="Email"
            type="text"
            disabled={isLoading}
            placeholder="Email"
            register={register}
            errors={errors}
            className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            placeholder="Password"
            register={register}
            errors={errors}
            className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm"
          />
          <Input
            id="full_name"
            label="Full Name"
            type="text"
            disabled={isLoading}
            placeholder="Full Name"
            register={register}
            errors={errors}
            className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm"
          />
          <Input
            id="birthdate"
            label="Birthdate"
            type="date"
            disabled={isLoading}
            register={register}
            errors={errors}
            className="text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm"
          />
    </div>
  );

  const footerContent = (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      <div className="w-full text-center text-xs md:text-sm ">OR</div>
      <Button
        variant=""
        size=""
       className="w-full relative flex pl-5 md:pl-0 justify-center transition text-xs md:text-sm font-light text-neutral-800 bg-white border-[1px] border-neutral-400 rounded-full hover:bg-neutral-200"
        onClick={googleLogin2}
      >
        <FcGoogle className="w-3 h-3 md:w-6 md:h-6 absolute left-2 md:left-3 top-1.75" />
        Continue with Google
      </Button>
      <div className="text-neutral-500 text-center mt-2 font-light text-sm mb-2">
        <div className="flex flex-row items-center justify-center gap-2 text-xs md:text-sm">
          <div>Already have an account?</div>
          <div  
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline text-xs md:text-sm"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      disabled={isLoading}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default RegisterModal;
