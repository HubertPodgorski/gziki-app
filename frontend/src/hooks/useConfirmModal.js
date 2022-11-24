import { useConfirm } from "material-ui-confirm";

export const useConfirmModal = () => {
  const confirm = useConfirm();
  return () =>
    confirm({
      description: "This action is permanent!",
      confirmationButtonProps: { color: "error", variant: "contained" },
      confirmationText: "Delete forever",
      cancellationText: "No thanks",
    });
};
