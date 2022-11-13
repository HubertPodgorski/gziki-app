import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  adminPaths,
  adminRoutes,
  userPaths,
  userRoutes,
} from "./helpers/routesAndPaths";
import UserPanel from "./pages/userPanel/UserPanel";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Tasks from "./pages/userPanel/Tasks";
import AdminTasks from "./pages/adminPanel/Tasks";
import Calendar from "./pages/userPanel/Calendar";
import PickData from "./pages/adminPanel/PickData";
import People from "./pages/adminPanel/People";
import Dogs from "./pages/adminPanel/Dogs";
import Events from "./pages/adminPanel/Events";

const Router = () => (
  <Routes>
    <Route index element={<UserPanel />} />

    <Route path={"user-panel"} element={<UserPanel />}>
      <Route index element={<Tasks />} />

      <Route path={"tasks"} element={<Tasks />} />
      <Route path={"calendar"} element={<Calendar />} />
    </Route>

    <Route path={"admin-panel"} element={<AdminPanel />}>
      <Route index element={<PickData />} />

      <Route path={"pick-data"} element={<PickData />} />
      {/*TODO: new component for tasks here. Will be cleaner*/}
      <Route path={adminPaths.tasks} element={<AdminTasks />} />
      <Route path={adminPaths.people} element={<People />} />
      <Route path={adminPaths.dogs} element={<Dogs />} />
      <Route path={adminPaths.events} element={<Events />} />
    </Route>

    <Route path="*" element={<Navigate to={userRoutes.tasks} />} />
  </Routes>
);

export default Router;
