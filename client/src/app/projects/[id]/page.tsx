// we made projects folder and for dynamic URL we are making this file under folder[id]
"use client";
import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";

type Props = {
  params: { id: string };
};
// SINCE WE NEED TO SHOW OUR PROJECTS ON SIDEBAR WE WILL REQUEST FOR API IN SIDEBAR

function Project({ params }: Props) {
  //this particular page grabs the id so that we can use that value  to grab it see below how to
  const { id } = params; //When a user navigates to a URL like /projects/1, the id in the URL is captured as params.id and passed as a prop to the Project component.
  const [activeTab, setActiveTab] = useState("Baord"); //It tracks the active tab (activeTab) and allows switching tabs through setActiveTab.( Tracks the currently active tab (e.g., "Board").)
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false); //A boolean state to manage the visibility of a modal for creating a new project.

  return (
    <div>
      {/* MODAL NEW TASK LEAVE A PLACEHOLDER FOR THIS */}
      {/* Projectheader Component its taking activeTab status */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* {activeTab === "Board" && (
              <Board/>
            )} */}
    </div>
  );
}

export default Project;
