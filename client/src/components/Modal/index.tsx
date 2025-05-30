import { Button } from "@mui/material";
import { X } from "lucide-react";
import React from "react";
import ReactDom from "react-dom";
import Header from "../Header";
// // Why Use children Here?
// Shared Modal Layout: The Modal component provides a common layout (like the backdrop, close button, and general styling) that you don't want to rewrite for every use case.
// Custom Content: The content inside the modal changes depending on whether you're creating a task or a project. For example:
// For creating a task, the modal might have fields for task name, description, and due date.
// For creating a project, it might have fields for project name, team members, and deadlines.
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;
  //   this is when we want to create a modal
  return ReactDom.createPortal(
    <div
      className="fixed inset-0 flex h-full
     w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4"
    >
      {/* Inside part of the pop-up container */}
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary ">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
