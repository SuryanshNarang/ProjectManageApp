// This basic file is for EC2 for the PM2 module.
//This configuration file is typically used with PM2 to manage Node.js applications. It specifies how PM2 should start and manage the ProjectManageApp process, ensuring it runs in the specified environment (development in this case) using npm to execute the dev script.
module.exports = {
  apps: [
    {
      name: "ProjectManageApp",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development", //NODE_ENV: This environment variable is set to "development", indicating that the application should run in development mode.
      },
    },
  ],
};
//If you're running a Node.js app on a server (like EC2, DigitalOcean, VPS, etc.), PM2 ensures it stays alive and stable.
//It’s useful for background tasks, APIs, and microservices that need to stay running 24/7.