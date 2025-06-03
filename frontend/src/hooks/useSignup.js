import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";
import { userPaths } from "../helpers/routesAndPaths";
import { useNavigate } from "react-router-dom";
import { apiSuffix } from "../helpers/apiCall";

export const useSignup = () => {
  const [error] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const signup = async (name, email, password, teamCode) => {
    setLoading(true);
    const data = {
      password,
      email,
      name,
      teamCode,
    };

    const { data: responseData } = await axios.post(
      `${apiSuffix}/users/signup`,
      data
    );

    localStorage.setItem("user", JSON.stringify(responseData));
    login(responseData.user);
    navigate(userPaths.root);

    // TODO: error handling
    setLoading(false);
  };

  return { signup, loading, error };
};
