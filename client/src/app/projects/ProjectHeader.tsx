import Header from "@/components/Header";
import { Modal } from "@mui/material";
import {
  Clock,
  Filter,
  Grid,
  Grid3x3,
  List,
  LucidePlusSquare,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import { Share } from "next/font/google";
import React, { useState } from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  //this state is in page.tsx
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false); //newproject pop-up
  return (
    <div className="px-4 xl:px-6">
      {/* MODAL NEW PROJECT */}
      {/* <ModalNewProject 
      isOpen={isModalNewProjectOpen}
      onClose={setIsModalNewProjectOpen(false)}  we are goinf to use this for NewTaskModel as well as New Project*/} 
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <LucidePlusSquare className="mr-2 h-5 w-5" />
              New Boards
            </button>
          }
        />
        {/* header compon imported. as we need it accross multiple pages. */}
      </div>
      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center ">
        <div className="flex flex-1 items-center gap-2 md:gap-4 ">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        {/* searchbar and share button on small screens we want that above our tabs */}
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 focus:outline-none dark:border-dark dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (isName: string) => void; //: The argument passed to this function is a string, which likely represents the name of the tab that should be set as active.
  activeTab: string;
};
const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
