import { useGetTasksQuery } from "@/state/api";
import React from "react";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const taskStatus = [
  //tab column headers
  "To Do",
  "Work in Progress",
  "Completed",
  "Under Review",
  "Completed",
];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  //Allows toggling a modal for creating a new task.
  // First thing is Grabbing the tasks
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) }); //got useGetTasksQuery from api.ts in the API we saw that we required projectID so that we know which project's task is the one.
  
  return <div>BoardView</div>;
};

export default BoardView;
