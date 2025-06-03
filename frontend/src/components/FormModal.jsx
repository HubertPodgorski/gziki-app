import React from "react";
import Modal from "./modals/Modal";

const FormModal = ({ children, open, onClose, title }) => (
  <Modal open={open} onClose={onClose} title={title}>
    {children}
  </Modal>
);

export default FormModal;
