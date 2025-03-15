"use client";

import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import Header from "@/components/Header";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const Timeline: React.FC<Props> = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: project, isLoading, isError } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTask: Task[] = useMemo(() => {
    if (!project) return [];
    return project.map((proj) => ({
      start: new Date(proj.startDate as string),
      end: new Date(proj.endDate as string),
      name: proj.projectName,
      id: `Task-${proj.id}`,
      type: "task",
      progress: 50,
      isDisabled: false,
    })) as Task[];
  }, [project]);

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
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
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
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
