import axios from "axios";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal.js";
import { useForm } from "react-hook-form";
import { useCallback, useState, useContext } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import Modal from "./Modal.jsx";
import Input from "../Input.jsx";
import { FcGoogle } from "react-icons/fc";
import UserContext from "../../contexts/UserContext.js";

const LoginModal = () => {
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
      email: "",
      password: "",
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/users/google`, userInfo)
        .then((result) => {
          localStorage.setItem("ACCESS_TOKEN", result.data.data.token);
          setUser(result.data.data.user);
          loginModal.onClose();
          toast.success("Logged in succesfully");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        })
        .finally(setIsLoading(false));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/login`, data)
      .then((result) => {
        localStorage.setItem("ACCESS_TOKEN", result.data.data.token);
        setUser(result.data.data.user);
        loginModal.onClose();
        toast.success("Logged in succesfully");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="w-full flex flex-col gap-4 mb-2">
      <Input
        id="email"
        label="Email"
        type="text"
        disabled={isLoading}
        placeholder="Email"
        register={register}
        errors={errors}
        required
        autocomplete
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        placeholder="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full text-center">OR</div>
      <Button
        variant=""
        size=""
        className="w-full relative flex justify-center transition text-sm font-light text-neutral-800 bg-white border-[1px] border-neutral-400 rounded-full hover:bg-neutral-200"
        onClick={googleLogin}
      >
        <FcGoogle size={22} className="absolute left-2 md:left-3 top-1.75" />
        Continue with Google
      </Button>
      <div className="text-neutral-500 text-center text-sm mb-2 mt-2 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Don't have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      disabled={isLoading}
      title="Log in"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Log in"
    />
  );
};

export default LoginModal;
