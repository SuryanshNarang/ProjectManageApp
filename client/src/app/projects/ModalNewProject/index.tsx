import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/components/Model";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  //   API call to creat a new project
  const [createProject, { isLoading }] = useCreateProjectMutation();
  // we want each of these inputs in a different state check createNewprojectController we are taking inputs from there in the form of state
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;
    // below is the API CALL
    await createProject({
      projectName: projectName,
      description,
      startDate,
      endDate,
    });
  };
  const idFormValid = () => {
    return projectName && description && startDate && endDate;
  };
  const inputStyles =
    "w-full rounded border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:vg-dark-tertiary dark:text-white dark:focus-outline-none";
  // Import our Modal Component
  // see the usecase we now don't have to rewrite everything like styles and all etc.
  return <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
    
  </Modal>;
};

export default ModalNewProject;
