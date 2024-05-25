"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Task from "./Task";
import AddTask from "./AddTask";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const searchParams = useSearchParams();
  const tasksFilter = searchParams.get("tasks");
  const fetchTasks = async () => {
    const url = process.env.BACKEND_URL || "";

    let fullUrl = `${url}/api/tasks`;
    if (tasksFilter) {
      fullUrl += `?status=${tasksFilter}`;
    }

    // console.log("Full URL:", fullUrl);

    const response = await fetch(fullUrl);
    const data = await response.json();
    // console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksFilter]);

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-end mb-8 sm:mb-14">
        <AddTask refreshTasks={fetchTasks} />
      </div>
<div>
      <TaskFilter />
	  </div>

      <div className="flex flex-col gap-2 px-4 py-5 max-h-[600px] overflow-auto">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              refreshTasks={fetchTasks}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
