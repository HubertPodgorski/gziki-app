import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { logout } = useAuthContext();

  const innerLogout = () => {
    logout();
    localStorage.removeItem("user");
  };

  return { logout: innerLogout };
};
