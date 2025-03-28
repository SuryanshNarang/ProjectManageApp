import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  // API call to create a new project
  const [createProject, { isLoading }] = useCreateProjectMutation();

  // State for form inputs
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), { representation: "complete" });
    const formattedEndDate = formatISO(new Date(endDate), { representation: "complete" });

    console.log("Form data:", { projectName, description, formattedStartDate, formattedEndDate }); // Log the data

    try {
      // API call to create the project
      await createProject({
        projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }).unwrap(); // `unwrap()` helps catch errors more effectively
      console.log("Project created successfully!");
      onClose(); // Close the modal on successful project creation
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline-none";
   
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        action=""
        className="mt-4 space-y-6"
        onSubmit={handleSubmit} // Handle form submission
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
