export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    let url = process.env.PUBLIC_URL + "/serviceWorker.js";
    return await navigator.serviceWorker.register(url, { scope: "/" });
  }

  throw Error("serviceworker not supported");
};

export const subscribe = async (socket) => {
  const serviceWorker = await navigator.serviceWorker.ready;

  const push = await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      "BMvqn2yS-nL3Z5J6DeiHGCnP3nw72L21vyftP2YePMTnXIVMiBggqxkPFYpMYXKuKinLPE8IRRCYhiwbJMgHTh8",
  });

  console.log("push => ", JSON.stringify(push));

  socket.emit("save_subscription", push);
};
