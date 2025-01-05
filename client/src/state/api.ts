// Importing createApi and fetchBaseQuery from Redux Toolkit Query.
// These tools simplify API calls and state management for data fetched from APIs.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating an API slice using Redux Toolkit Query.
export const api = createApi({
  // `baseQuery` is a function that handles API requests. Here, we're setting up the base URL for all API calls.
  baseQuery: fetchBaseQuery({
    // Using an environment variable for the base URL to keep the URL flexible and configurable.
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // Make sure this variable is defined in your `.env` file.
  }),
  reducerPath: "api", // The name of this slice in the Redux store. Used internally by Redux.
  tagTypes: [], // You can add tag types here for caching and invalidation logic (e.g., ["Posts", "Users"]).
  endpoints: (build) => ({}), // Define API endpoints (functions for API calls) here. Currently, it's empty.
});

// Exporting the API actions and hooks (when endpoints are defined). Since no endpoints are defined yet, this is empty.
export const {} = api;
