import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";
import { userPaths } from "../helpers/routesAndPaths";
import { useNavigate } from "react-router-dom";
import { apiSuffix } from "../helpers/apiCall";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const innerLogin = async (email, password) => {
    setLoading(true);
    const data = {
      password,
      email,
    };

    const { data: responseData } = await axios.post(
      `${apiSuffix}/users/login`,
      data
    );

    localStorage.setItem("user", JSON.stringify(responseData));
    login(responseData.user);
    navigate(userPaths.root);

    // TODO: error handling
    setLoading(false);
  };

  return { login: innerLogin, loading, error };
};
