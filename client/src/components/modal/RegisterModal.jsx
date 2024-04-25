import axios from "axios";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Input from "../Input";
import useLoginModal from "../../hooks/useLoginModal";

const RegisterModal = () => {
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
    console.log(data);
    axios
      .post("http://localhost:8080/users/signup", data)
      .then((result) => {
        console.log(result);
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

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
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
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            placeholder="Password"
            register={register}
            errors={errors}
          />
          <Input
            id="full_name"
            label="Full Name"
            type="text"
            disabled={isLoading}
            placeholder="Full Name"
            register={register}
            errors={errors}
          />
          <Input
            id="birthdate"
            label="Birthdate"
            type="date"
            disabled={isLoading}
            register={register}
            errors={errors}
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
        onClick={() => {}}
      >
        <FcGoogle size={22} className="absolute left-2 md:left-3 top-1.75" />
        Continue with Google
      </Button>
      <div className="text-neutral-500 text-center mt-2 font-light text-sm mb-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
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
