import {
  Priority,
  Status,
  useCreateProjectMutation,
  useCreateTaskMutation,
} from "@/state/api";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
// Made changes to ModalNew Project
const ModalNewTask = ({ isOpen, onClose }: Props) => {
  //
  const [createTask, { isLoading }] = useCreateTaskMutation();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    // check the api export interface Task alot of things are optional there.
    if (!title) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    console.log("Form data:", {
      title,
      description,
      formattedStartDate,
      formattedDueDate,
    }); // Log the data

    try {
      // API call to create the project
      await createTask({
        title,
        description,
        status, //change the useState we can do this dynamically that is the use of enum: we can set the status bydefault to : TODO as there was error coming here.
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
      }).unwrap(); // `unwrap()` helps catch errors more effectively
      console.log("Project created successfully!");
      onClose(); // Close the modal on successful project creation
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const isFormValid = () => {
    return title;
  };
  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus-outline-none";
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
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 gap-2">
          <select
            name=""
            id=""
            className={selectStyles}
            value={priority}
            onChange={
              (e) => setStatus(Status[e.target.value as keyof typeof Status]) //onchange we are passing in the status of the value that we selected.
            }
          >
            <option value="">Select Status</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
          <select
            name=""
            id=""
            className={selectStyles}
            value={status}
            onChange={
              (e) => setStatus(Status[e.target.value as keyof typeof Status]) //onchange we are passing in the status of the value that we selected.
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkinProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </div>
        <input
          type="date"
          className={inputStyles}
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className={inputStyles}
          placeholder="End Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Author UserID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User Id"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />

        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
