"use client";
import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";

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

  return <div>Home</div>;
};

export default HomePage;
