"use client";
import { useAppSelector } from "@/app/redux";
import { Priority, useGetTasksByUserQuery, Task } from "@/state/api";
import React, { useState } from "react";

type Props = {
  priority: Priority; //took priority from our API
};

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const userId = 1; //later on when we will add cognito for authentication this user id will be grabbed from backend and
  // whole purpose of this is when we are making an api call to grab this user info so that backend call will be made first to this component
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId, {
    skip: userId === null,
  }); //here it get's tricky because we need a USERID and we haven;t created the authentication so harcoded for now(this is a feature provided by redux toollkit query)
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority
  ); //priority is going to be specific to urgent,high,medium and low (making it reusable and we are going to get the task for that priority)
  if (isTaskError || !tasks) return <div>Error Fetching tasks</div>;
  return <div>ReusablePriorityPage</div>;
};

export default ReusablePriorityPage;
