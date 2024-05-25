"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface EditTaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshTasks: () => void;
}

const EditTask = ({
  id,
  title,
  description,
  status,
  open,
  setOpen,
  refreshTasks,
}: EditTaskProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(status);
  const [error, setError] = useState("");

  const handleEditedTask = async (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (newDescription.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else if (!newStatus) {
      setError("Please select a status for the task");
    } else {
      const editedTask = {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      };

      const url = process.env.BACKEND_URL;

      const response = await fetch(`${url}/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        refreshTasks();
        setNewTitle("");
        setNewDescription("");
        setNewStatus("");
        setError("");
        setOpen(!open);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Task</DialogTitle>
        <DialogDescription>
          Edit or Update Your Task here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedTask}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              id="description"
              rows={5}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="status" className="text-left">
              Status
            </Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to_do">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-center py-1 rounded bg-error-background text-error-foreground">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditTask;
