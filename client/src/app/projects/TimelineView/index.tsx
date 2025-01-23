import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, ViewMode } from "gantt-task-react";
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
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  //   Using useMemo to update only when its needed
  const ganttTask = useMemo(() => {
    return tasks?.map((task) => ({
      start: new Date(task.startDate as string),
      end: new Date(task.dueDate as string),
      name: task.title,
      id: `Task-${task.id}`,
      type: "task" as const, // Use "as const" to infer the literal type
      progress: task.points ? (task.points / 10) * 100 : 0,
      isDisabled: false,
    }));
  }, []); // Add dependencies array to ensure it updates when `tasks` changes
  return <div>Timeline</div>;
};

export default Timeline;
