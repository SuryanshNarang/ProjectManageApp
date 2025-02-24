import React from "react";
import { Project } from "@/state/api";
type Props = {
  // getting from our app/stateapi
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3> {project.projectName} </h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
