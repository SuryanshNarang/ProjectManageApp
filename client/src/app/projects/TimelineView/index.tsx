import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React, { useState } from "react";
import { DisplayOption } from "gantt-task-react";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
type TaskTypeItems = "task" | "milestone" | "project";
const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  // Not doing any kind of propDrilling here we are using our state for the first time
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({});
  return <div>Timeline</div>;
};

export default Timeline;
