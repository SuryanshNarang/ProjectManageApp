import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";
import TaskCard from "@/components/TaskCard/index";
import Header from "@/components/Header";
type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) }); //on the basis of project ID tasks are fetched
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  // BURR
  return (
    <div className="px-4 pb-8 xl:px-6 ">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {/* Jitne bhi cards hai tasks ke they are in a component  */}
        {tasks?.map(
          (
            task: Task //rendering all the tasks using map function
          ) => (
            <TaskCard key={task.id} task={task} />
          )
        )}
      </div>
    </div>
  );
};

export default ListView;
