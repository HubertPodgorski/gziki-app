import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({ user: null });

// TODO: start using reducers and actions
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const logout = () => {
    setUser(null);
  };

  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const userLocalstorage = localStorage.getItem("user");

    if (userLocalstorage) {
      // TODO:check if token didnt expire
      // const { user, jwt } = JSON.parse(userLocalstorage);
      setUser(JSON.parse(userLocalstorage).user);
    }
  }, []);

  console.log("user => ", user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
