"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { Icon, LockIcon, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
const Sidebar = () => {
  // We need a state to know wether the Projects dropdown is open or closed
  // Just like we are storing these values in the local state we will be storing  the sidebar Collapse in the Global State and we're going
  //to use reduxToolKit we have beeen using reduxToolKit as our main Statemanagement tool rdxToolKit simplifies the old reduxboiler plates it is probably
  //the most used tool in industry npm i redux-persist for local state forex: if user closes in darkmode then opening again he will stay in darkmode
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  // Grabbing Two items from navbar file: dispatch and isSideBarCollapsed.
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  //Sidebar design
  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all
   duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white w-64
    ${isSideBarCollapsed ? "w-0 hidden" : "w-64"}`;
  return (
    <div className={sidebarClassNames}>
      {/* Starting with outer container and we are going to have logo section as well */}
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP Logo Container */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            The Impact Engine
          </div>
          {/* SideBarCollapse BUtton */}
          {isSideBarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM logo with Image*/}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          {/* all the images should be in public folder */}
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              TIE Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-2 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 ">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        {/* Before this we handled sidebar collapse feature: we will be using redux to store the state of sidebar that it is closed or open in redux store */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Team" href="/teams" />
        </nav>
        {/* Projects Button Chevron up and down based on our click */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-400"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5 "></ChevronUp>
          ) : (
            <ChevronDown className="h-5 w-5"></ChevronDown>
          )}
        </button>
        {/* Projects List: We can't do it yet: will do it when we have our api call do that.  */}
        {/* Priorities Button*/}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-400"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5 "></ChevronUp>
          ) : (
            <ChevronDown className="h-5 w-5"></ChevronDown>
          )}
        </button>
        {/* Priorities Links */}
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />

            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />

            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
        {/* After creating the PriorityLinks we went to Building backend. */}
      </div>
    </div>
  );
};
// SidebarLinks like: Home,Timeline,Search,Settings,Users,Teams.

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  // isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  // to highlight the page where we are at: we are putting it isActive
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>

    // now lets create the navbarLinks mentioned above
  );
};
export default Sidebar;
