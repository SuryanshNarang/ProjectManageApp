"use client";
import { Priority, useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { Task } from "gantt-task-react";

// we need to set this as our Route Page to do this: we go to page.tsx where we have the main component pass the homepage we created
const HomePage = () => {
  // we are grabbing our data just like we normally would:
  const {
    data: tasks, //renaming
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") }); //The useGetTasksQuery hook is fetching tasks based on a hardcoded projectId of 1
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (tasksLoading || isProjectsLoading) return <div>Loading...</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;
  //we need number of priorities task priority distribution for specific project
  //This code counts how many tasks belong to each priority category (High, Medium, Low, etc.) and stores the counts in an object.
  const priorityCount = tasks.reduce<Record<string, number>>((acc, task) => {
    if (!task.priority) return acc; // Skip if priority is undefined

    const priorityKey = task.priority as string; // Ensure it's a string
    acc[priorityKey] = (acc[priorityKey] || 0) + 1;

    return acc;
  }, {} as Record<string, number>);

  const taskDistribution = 


  return <div>Home</div>;
};

export default HomePage;
