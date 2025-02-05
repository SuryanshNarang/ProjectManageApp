"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// root directory of our nodejs app
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
// Route IMports
// configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that we dont have to deal with the cors issue
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// routes
// this is the route we have for the home its not doing anything it;ll help us call the backend and check if the backend is running
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use("/projects", projectRoutes_1.default); //  /projects is the prefix which will be used in every projectURL
app.use("/tasks", taskRoutes_1.default);
app.use("/search", searchRoutes_1.default); //flow: controller then route then mentioning here: then going to frontend.(state/api)
app.use("/users", userRoutes_1.default);
app.use("/teams", teamRoutes_1.default);
// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
