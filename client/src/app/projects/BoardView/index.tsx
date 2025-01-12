import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
// BoardView is the parent component. It fetches the list of tasks (tasks), manages the modal state (setIsModalNewTaskOpen), and provides the logic for moving tasks (moveTask).

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const taskStatus = [
  //tab column headers
  "To Do",
  "Work in Progress",
  "Completed",
  "Under Review",
];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  //Allows toggling a modal for creating a new task.
  // First thing is Grabbing the tasks
  //BoardView prepares the data (tasks), logic (moveTask), and state handlers (setIsModalNewTaskOpen) and passes them as props to TaskColumn.
  const {
    data: tasks, //data is the name of the original property in the object.tasks is the new name (alias) that you assign to the destructured variable.
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) }); //got useGetTasksQuery from api.ts in the API we saw that we required projectID so that we know which project's task is the one.
  const [updateTaskStatus] = useUpdateTaskStatusMutation(); //this is a triggerFUnction that will call the API as its now the taskStatus.
  const moveTask = (taskId: number, toStatus: string) => {
    //If the child component requires a function that resides in the parent component (e.g., API calls or state updates), the function must be passed as a prop.
    updateTaskStatus({ taskId, status: toStatus });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occured while fetching tasks</div>;
    // USING THE Drag and Drop Provider install the react-dnd provider.
    //this will allow us to do all the drag and drop functionality.
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map(
          (
            status //grabbing list of taskSatus from an array and we are going to map that, as we want a column for each of the status we have
          ) => (
            // TaskColumn is a child component of BoardView that is responsible for rendering a single column of tasks based on a specific status. It integrates with react-dnd to allow drag-and-drop functionality
            <TaskColumn
              key={status}
              status={status} //TaskColumn is reused for multiple task statuses (e.g., "To Do," "Work in Progress"). Passing status as a prop ensures it can display tasks for the correct column.
              tasks={tasks || []} //The parent component (BoardView) has fetched tasks from the API. The child component (TaskColumn) needs the tasks to display them in columns. Thus, tasks is passed as a prop.
              moveTask={moveTask}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            />
          )
        )}
      </div>
    </DndProvider>
  ); //used HTML5 backend if we want more customization.
};
// creating task column props:
type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void; //same was for moveTask
  setIsModalNewTaskOpen: (isOpen: boolean) => void; //same as above.
};
const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  // to use some drag and drop functionality
  //   these are some functionalities of React-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", // Defines what type of item can be dropped here
    drop: (item: { id: number }) => moveTask(item.id, status), // When an item is dropped, moveTask is called
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(), // Collects whether the item is currently over the drop target
    }),
  }));
  // above is the functionality for drag and drop
  const taskCount = tasks.filter((task) => task.status === status).length; //tasks: This is the list of tasks you fetched from your API.
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work in Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };
  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      }`}
    >
      {/* Rendering */}
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white ">
            {status} {/* for count */}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCount}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default BoardView;
