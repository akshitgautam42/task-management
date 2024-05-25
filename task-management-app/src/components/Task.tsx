"use client";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import EditTask from "./EditTask";
import { useState } from "react";

const Task = ({ id, title, description, status, refreshTasks }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const url = process.env.BACKEND_URL;

    await fetch(`${url}/api/tasks/${id}`, {
      method: "DELETE",
    });
    refreshTasks();
  };

  return (
    <div className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>

        <div className="flex gap-1 sm:gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil2Icon className="w-5 h-5 text-blue-500" />
              </Button>
            </DialogTrigger>

            <EditTask
              id={id}
              title={title}
              description={description}
              status={status}
              open={open}
              setOpen={setOpen}
              refreshTasks={refreshTasks}
            />
          </Dialog>

          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <TrashIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>

      <Badge
        className="my-2"
        variant={
          status === "to_do"
            ? "error"
            : status === "in_progress"
            ? "warning"
            : "success"
        }
      >
        {status === "to_do"
          ? "To DO"
          : status === "in_progress"
          ? "In Progress"
          : "Done"}
      </Badge>

      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default Task;
