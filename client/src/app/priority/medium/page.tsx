"use client";
import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

// These pages have a Addtask button where we can specify the projectID they are not referenced to anyProject so any Prioritytask is not in the context of any project so the user has to specify
const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
