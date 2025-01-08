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
    const { id } = params;
    const [activeTab, setActiveTab] = useState("Baord"); //state for which of the tab items is active
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false); //new task modal is open or not

    return (
        <div>
            {/* MODAL NEW TASK LEAVE A PLACEHOLDER FOR THIS */}
            {/* Projectheader Component its taking activeTab status
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} /> */}
            {/* {activeTab === "Board" && (
              <Board/>
            )} */}
        </div>
    );
}

export default Project;
