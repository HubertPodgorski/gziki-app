import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  adminPaths,
  adminRoutes,
  notAuthenticatedRoutes,
  userPaths,
  userRoutes,
} from "./helpers/routesAndPaths";
import UserPanel from "./pages/userPanel/UserPanel";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Tasks from "./pages/userPanel/Tasks";
import AdminTasks from "./pages/adminPanel/Tasks";
import Calendar from "./pages/userPanel/Calendar";
import PickData from "./pages/adminPanel/PickData";
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

  return (
    <Routes>
      <Route index element={<UserPanel />} />

      <Route path={"/login"} element={<LoginForm />} />
      <Route path={"/signup"} element={<SignupForm />} />

      {!!user && (
        <>
          <Route path={"user-panel"} element={<UserPanel />}>
            <Route index element={<Tasks />} />

            <Route path={"tasks"} element={<Tasks />} />
            <Route path={"calendar"} element={<Calendar />} />
          </Route>

          {isAdmin && (
            <Route path={"admin-panel"} element={<AdminPanel />}>
              <Route index element={<PickData />} />

              <Route path={"pick-data"} element={<PickData />} />

              <Route path={adminPaths.tasks} element={<AdminTasks />} />
              <Route path={adminPaths.users} element={<Users />} />
              <Route path={adminPaths.dogs} element={<Dogs />} />
              <Route path={adminPaths.events} element={<Events />} />
            </Route>
          )}
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={notAuthenticatedRoutes.login} />}
      />
    </Routes>
  );
};

export default Router;
