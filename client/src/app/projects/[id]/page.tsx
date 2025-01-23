"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "../BoardView";

// This file is a client component (because of "use client"),
// so we use "useParams()" instead of receiving "params" as a prop.
export default function Project() {
  // Grabs the route segment "id" from the URL, e.g. /projects/123 => id = "123".
  const { id } = useParams() as { id: string };

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Header with tabs */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Only render the Board if the activeTab is "Board" */}
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}
