import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  adminPaths,
  notAuthenticatedRoutes,
  userPaths,
} from "./helpers/routesAndPaths";
import UserPanel from "./pages/userPanel/UserPanel";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Tasks from "./pages/userPanel/Tasks";
import AdminTasks from "./pages/adminPanel/Tasks";
import Calendar from "./pages/userPanel/Calendar";
import Users from "./pages/adminPanel/Users";
import Dogs from "./pages/adminPanel/Dogs";
import Events from "./pages/adminPanel/Events";
import LoginForm from "./pages/forms/LoginForm";
import SignupForm from "./pages/forms/SignupForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { useIsAdmin } from "./hooks/useIsAdmin";

const Router = () => {
  const { user } = useAuthContext();

  const isAdmin = useIsAdmin();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("initial-location", JSON.stringify(location));
  }, []);

  return (
    <Routes>
      {!!user && (
        <>
          <Route path={userPaths.root} element={<UserPanel />}>
            <Route index element={<Navigate to={userPaths.tasks} />} />

            <Route path={userPaths.tasks} element={<Tasks />} />
            <Route path={userPaths.calendar} element={<Calendar />} />
          </Route>

          {isAdmin && (
            <Route path={adminPaths.root} element={<AdminPanel />}>
              <Route index element={<Navigate to={adminPaths.tasks} />} />

              <Route path={adminPaths.tasks} element={<AdminTasks />} />
              <Route path={adminPaths.users} element={<Users />} />
              <Route path={adminPaths.dogs} element={<Dogs />} />
              <Route path={adminPaths.events} element={<Events />} />
            </Route>
          )}
        </>
      )}

      <Route index element={<UserPanel />} />

      <Route path={"/login"} element={<LoginForm />} />
      <Route path={"/signup"} element={<SignupForm />} />

      <Route
        path="*"
        element={<Navigate to={notAuthenticatedRoutes.login} />}
      />
    </Routes>
  );
};

export default Router;
