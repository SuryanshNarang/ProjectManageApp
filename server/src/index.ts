// root directory of our nodejs app
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { log } from "console";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
// Route IMports

// configurations
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that we dont have to deal with the cors issue
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
// this is the route we have for the home its not doing anything it;ll help us call the backend and check if the backend is running
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/projects", projectRoutes); //  /projects is the prefix which will be used in every projectURL
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes); //flow: controller then route then mentioning here: then going to frontend.
// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
