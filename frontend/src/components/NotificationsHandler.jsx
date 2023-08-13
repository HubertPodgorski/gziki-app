import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { useSocketContext } from "../hooks/useSocketContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { subscribe } from "../helpers/serviceWorkerHelpers";

const NotificationsHandler = () => {
  const { socket } = useSocketContext();
  const { setSubscriptionDetails } = useContext(AppContext);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    subscribe(socket, setSubscriptionDetails);
  }, [user]);
  return <></>;
};

export default NotificationsHandler;
