import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";
import { userPaths } from "../helpers/routesAndPaths";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    const data = {
      password,
      email,
      name,
    };

    const { data: responseData } = await axios.post("/users/signup", data);

    localStorage.setItem("user", JSON.stringify(responseData));
    login(responseData.user);
    navigate(userPaths.root);

    // TODO: error handling
    setLoading(false);
  };

  return { signup, loading, error };
};
