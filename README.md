# Project Management App - Next.js, AWS, Cognito, EC2, Node.js, RDS, Postgres, Tailwind

## Overview

This is a full-stack Project Management App built using **Next.js** and deployed on **AWS**. The app enables users to manage projects, track tasks, collaborate with teams, and monitor project progress in real-time. The application leverages **AWS Cognito** for secure user authentication, **AWS EC2** for hosting, **Node.js** for the backend API, **PostgreSQL** (via **AWS RDS**) for database management, and **Tailwind CSS** for responsive frontend design.

## Key Features

- **User Authentication** with AWS Cognito
- **Task Management**: Create, update, and assign tasks
- **Team Collaboration**: Invite team members, assign roles, and collaborate on projects
- **Project Tracking**: Track project progress, set milestones, and monitor deadlines
- **Responsive UI**: Tailwind CSS for a modern, mobile-friendly design
- **State Management**: Centralized state management using **React Context API** and **Redux**

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, React Context API, Redux
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via AWS RDS)
- **Authentication**: AWS Cognito

## State Management

The application uses a combination of **React Context API** and **Redux** to manage the global state. Here’s how the state is handled:

### Redux Setup

The global state is managed using Redux. Redux is used to manage states like **sidebar visibility**, **dark mode**, and other settings that need to be accessible throughout the app. We have set up the Redux store using **Redux Toolkit**.

1. **Global Slice**: A slice of the Redux state handles the state for **sidebar collapse** and **dark mode**.
   
   - `setIsSidebarCollapsed`: This action is used to toggle the sidebar's collapsed state.
   - `setIsDarkMode`: This action is used to toggle the dark mode state.

   ```js
   export const globalSlice = createSlice({
     name: "global",
     initialState: {
       isSidebarCollapsed: false,
       isDarkMode: false,
     },
     reducers: {
       setIsSidebarCollapsed: (state, action) => {
         state.isSidebarCollapsed = action.payload;
       },
       setIsDarkMode: (state, action) => {
         state.isDarkMode = action.payload;
       },
     },
   });
## Features

- **User Authentication with AWS Cognito**
  - Secure user registration, login, and session management.
  - JWT tokens are used to authenticate API requests.
  
- **Backend Deployment on AWS EC2**
  - The Node.js application is hosted on an EC2 instance for scalability.
  - Nginx is used as a reverse proxy to handle HTTP requests and route traffic to the Node.js server.
  
- **Database Management with AWS RDS (PostgreSQL)**
  - User, project, and task data are stored in a fully managed PostgreSQL database.
  - Secure communication between the app and the RDS database using SSL.

## Authentication with AWS Cognito

The application uses AWS Cognito for handling user authentication. It securely manages user sign-up, sign-in, and session management, ensuring that only authenticated users can access the application.

### User Registration & Login

- **Sign-Up Flow**: Users can register via AWS Cognito's User Pool. Their credentials are validated, and a user profile is created.
- **Login Flow**: After logging in, a JWT token is returned and stored locally, allowing users to remain authenticated across sessions.

```javascript
const authenticateUser = async (email, password) => {
  try {
    const response = await Auth.signIn(email, password);
    const token = response.signInUserSession.idToken.jwtToken;
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};
