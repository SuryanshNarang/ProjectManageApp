"use client"
// use client is added specifically here because this is not a child of a client component its a seperate page
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import { TaskType } from "gantt-task-react/dist/types/public-types";
import "gantt-task-react/dist/index.css";
import Header from "@/components/Header";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
type TaskTypeItems = "task" | "milestone" | "project";
const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  // Not doing any kind of propDrilling here we are using our state for the first time
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: project, isLoading, isError } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  //   Using useMemo to update only when its needed
  //It takes an array of tasks and transforms each task into a new object format suitable for rendering in a Gantt chart
  const ganttTask = useMemo(() => {
    if (!project) return [];
    return project.map((project) => ({
      start: new Date(project.startDate as string), // Ensures valid date conversion
      end: new Date(project.endDate as string),
      name: project.projectName,
      id: `Task-${project.id}`, // Unique identifier for each task
      type: "task" as TaskTypeItems, // Type-casting to ensure compatibility
      progress: 50,
      isDisabled: false, // Default value for disabling the task
    }));
  }, [project]);
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
  if (isError || !project)
    return <div>An error occurred while fetching Projects</div>;

  return (
    <div className="max w-full p-8 ">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
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
      </header>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline ">
          <Gantt
            tasks={ganttTask}
            viewMode={displayOptions.viewMode}
            locale={displayOptions.locale}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937" }
            projectProgressColor={isDarkMode ? "#1f2937": "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000": "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
