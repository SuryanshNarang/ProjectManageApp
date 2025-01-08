// Importing createApi and fetchBaseQuery from Redux Toolkit Query.
// These tools simplify API calls and state management for data fetched from APIs.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// WE DO NEED TO SET THESE TYPINGS WHICH HELP US TO IDENTIFY WHAT THE TYPE STRUCTURE WILL BE FOR EACH API's
export interface Project {
  id: number;
  projectName: string; // Match the field name in the Prisma schema
  description?: string;
  startDate?: string; // Parse to Date
  endDate?: string; // Handle null values
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
} // enum means it can be one out of these 4
export enum Status { //enum means it can be one out of these 4
  ToDo = "To Do",
  WorkinProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}
export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}
export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}
export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string; // But what happens if that data changes (e.g., you add a new project)? You don’t want to show outdated data in your app. Tags ensure the cache is updated when necessary.
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId?: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

// Creating an API slice using Redux Toolkit Query.
export const api = createApi({
  // `baseQuery` is a function that handles API requests. Here, we're setting up the base URL for all API calls.
  baseQuery: fetchBaseQuery({
    //The fetchBaseQuery function is used to make HTTP requests
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // It reads the base URL from an environment variable (NEXT_PUBLIC_API_BASE_URL), so the URL can change without modifying the code.
  }),
  reducerPath: "api", // Defines the name for this API slice in the Redux store.
  tagTypes: ["Projects"], //  Lists tags used for caching and invalidation.
  endpoints: (build) => ({
    // this will allow us to make calls from FrontEnd
    getProjects: build.query<Project[], void>({
      //: Defines this as a query (read-only) that returns an array of Project objects.
      query: () => "projects", // When getProjects is called, the response is cached in Redux with the tag "Projects".
      providesTags: ["Projects"], //This means the app now knows this cached data represents "Projects.
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects", //url: "projects": Sends the request to the projects endpoint.
        method: "POST", //The "Projects" tag is invalidated, telling Redux Toolkit Query, "The cached data for projects is no longer accurate." Redux Toolkit Query automatically refetches getProjects to get the latest list of projects.
        body: project, // Sends the project data in the request body.
      }),
      invalidatesTags: ["Projects"], //The data labeled as "Projects" is now outdated. Please refetch it."
    }),
  }),
});

// Exporting the API actions and hooks (when endpoints are defined). Since no endpoints are defined yet, this is empty.
export const {} = api;
