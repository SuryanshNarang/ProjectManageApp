import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
// BoardView is the parent component. It fetches the list of tasks (tasks), manages the modal state (setIsModalNewTaskOpen), and provides the logic for moving tasks (moveTask).
import { ConnectDragSource } from "react-dnd";

interface BoardViewProps {
  drag: ConnectDragSource; // Ensure this matches your drag type
  isDragging: boolean;
}
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
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;
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
  // USE DROP FUNCTION
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
          <div className="flex items-center gap-1 ">
            <button className="flex h-6 w-5 items-center justify-center text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            {/* Button to open a newTask Modal */}
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Handeling tasks list */}
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          // returning a task component
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

// TASK COMPONENT
type TaskProps = {
  task: TaskType;
};
const Task = ({ task }: TaskProps) => {
  //grabbed Tasks from task Props
  // in our task column we had useDrop function
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task", // Defines what type of item can be dropped here
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(), // Collects whether the item is currently over the drop target
    }),
  }));
  // Feature	useDrag	useDrop
  // Purpose	Makes an element draggable.	Makes an element a drop target.
  // Key Property	type (defines what is being dragged).	accept (defines what can be dropped).
  // Key Function	item (data to pass during drag).	drop (action to perform on drop).
  // Metadata Collected	isDragging (is the item being dragged?).	isOver (is the dragged item over the target?).
  // Ref Attachment	Attach drag ref to the draggable element.	Attach drop ref to the drop target element.
  const taskTagsSplit = task.tags ? task.tags.split(",") : []; //If your application allows searching or filtering tasks by tags, having tags as an array makes it easier to compare individual tags.
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = (task.comments && task.comments.length) || 0; //default it with 0
  // PRIORITY COMPONENT
  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          priority === "Urgent"
            ? "bg-red-200 text-red-700"
            : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
            ? "bg-green-200 text-green-700"
            : priority === "Low"
            ? "bg-blue-200 text-blue-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            {/* Rendering Task Tags like deployment etc */}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          {/* Dotted button */}
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points}pts
            </div>
          )}
        </div>
        {/* Dates */}
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate}-</span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
      </div>
    </div>
  );
};

export default BoardView;
