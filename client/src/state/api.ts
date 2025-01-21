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
  tagTypes: ["Projects", "Tasks"], //  Lists tags used for caching and invalidation.
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
        body: project, // The body of the request contains the data you're sending to the server.
      }),
      invalidatesTags: ["Projects"], //The data labeled as "Projects" is now outdated. Please refetch it."
    }),

    // Similar for getTasks: It fetches tasks for a specific project by its projectId. What the tags do: They help manage the cache of the tasks. When we have tasks, we create individual tags for each task, so we know which tasks to update or refresh if needed. If no tasks are returned, we just create a general tag for the tasks.
    // // The query will take an object with a projectId (a number) as an argument.
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`, //BUG FIXED HERE [1] ::1 - - [16/Jan/2025:19:14:42 +0000] "GET /tasks?projectId=[object%20Object] HTTP/1.1" 400 31 //This is the function that builds the URL for the API request.It uses the projectId passed in the request and appends it to the URL like this Example URL: tasks?projectId=123
      //We knew we had to destructure the projectId property because of how the query arguments are being passed to useGetTasksQuery.

      // Why Destructure?
      // How the API call is set up:

      // In your api.ts file, the getTasks function expects an object with projectId as a key:
      // ts
      // Copy
      // Edit
      // getTasks: build.query<Task[], { projectId: number }>({
      //   query: ({ projectId }) => `tasks?projectId=${projectId}`,
      // });
      // Notice how query is designed to destructure { projectId }.
      // What you passed in:

      // In your BoardView component, you’re calling useGetTasksQuery like this:
      // ts
      // Copy
      // Edit
      // useGetTasksQuery({ projectId: Number(id) });
      // You passed an object with a key projectId.
      // Mismatch if not destructured:

      // If you don't destructure the projectId, the query function would see the entire object ({ projectId: 123 }) instead of just the projectId value (123).
      // Without destructuring, your code would look like:
      // ts
      // Copy
      // Edit
      // query: (params) => `tasks?projectId=${params.projectId}`;
      // Here, you'd have to access the projectId manually using params.projectId.
      // Why destructure directly?

      // // By destructuring:
      // ts
      // Copy
      // Edit
      // query: ({ projectId }) => `tasks?projectId=${projectId}`;
      // The code automatically extracts the projectId value from the object, making it simpler and cleaner.
      // No need to refer to params.projectId repeatedly.
      // In Simple Words
      // When you call useGetTasksQuery({ projectId: 123 }), you’re passing an object. To directly grab the projectId value from that object, destructuring is the cleanest and most efficient way:

      // ts
      // Copy
      // Edit
      // query: ({ projectId }) => `tasks?projectId=${projectId}`;
      // If you didn’t destructure, you'd have to do extra work to access projectId (e.g., using params.projectId), which is unnecessary.
      providesTags: (
        result //{ type: "Tasks", id: 1 } { type: "Tasks", id: 2 }
      ) =>
        result //toggling logic.
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }], //If the query returns no tasks (result is empty or null), we just create a generic tag: { type: "Tasks"
    }),

    //createTasks
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"], //we are updating the entire list we can get refetched the entire list.
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      //used in BOardView.
      //passed object taskid and status
      query: ({ taskId }) => ({
        //object that's why it is in curly brack.

        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        //since we are updating a specific task and doing it via taskID that's why we have to do this arrowfunction
        { type: "Tasks", id: taskId }, //we dont have to refetch but only update 1 specific task
      ],
    }),
  }),
});

// take them as functions.
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery, //used in the boardView under Projects
  useCreateTaskMutation,
  useUpdateTaskStatusMutation, //used in BoardView under Tasks
} = api;
