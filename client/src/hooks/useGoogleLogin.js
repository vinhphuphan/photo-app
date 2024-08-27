import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import UserContext from "../contexts/UserContext";

const useGoogleLoginHandler = (onSuccessCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/google`, userInfo);
        localStorage.setItem("ACCESS_TOKEN", result.data.data.token);
        setUser(result.data.data.user);
        toast.success("Successfully logged in");
        onSuccessCallback(); // Invoke the callback to close modal or perform additional actions
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      toast.error("Google login failed");
    }
  });

  return { googleLogin, isLoading };
};

export default useGoogleLoginHandler;
