import { useMemo } from "react";
import { useAuthContext } from "./useAuthContext";

export const useIsAdmin = () => {
  const { user } = useAuthContext();

  return useMemo(
    () =>
      user &&
      user.roles &&
      user.roles.length > 0 &&
      user.roles.includes("ADMIN"),
    [user]
  );
};
