import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import { TaskType } from "gantt-task-react/dist/types/public-types";
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
  //It takes an array of tasks and transforms each task into a new object format suitable for rendering in a Gantt chart
  const ganttTask = useMemo(() => {
    if (!tasks) return [];
    return tasks.map((task) => ({
      start: new Date(task.startDate as string), // Ensures valid date conversion
      end: new Date(task.dueDate as string),
      name: task.title,
      id: `Task-${task.id}`, // Unique identifier for each task
      type: "task" as TaskTypeItems, // Type-casting to ensure compatibility
      progress: task.points ? Math.min((task.points / 10) * 100, 100) : 0, // Capping progress at 100%
      isDisabled: false, // Default value for disabling the task
    }));
  }, [tasks]);
  // Add dependencies array to ensure it updates when `tasks` changes
  // An event handler that will change according to our month week and year
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white  ">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64 ">
          <select
            name=""
            id=""
            className="focus:shadow-outline block w-full  appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline ">
          <Gantt
            tasks={ganttTask}
            viewMode={displayOptions.viewMode}
            locale={displayOptions.locale}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1e6"}
          />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
