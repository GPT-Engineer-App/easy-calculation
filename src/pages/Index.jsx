import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle, Pencil, Trash } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask("");
      setIsAddDialogOpen(false);
    }
  };

  const editTask = () => {
    if (editingTask && editingTask.title.trim() !== "") {
      setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
      setIsEditDialogOpen(false);
      setEditingTask(null);
    }
  };

  const deleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Todo App</h1>
      <p className="text-xl mb-4">Manage your tasks efficiently</p>
      
      <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
      </Button>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
            <Button variant="outline" size="icon" onClick={() => {
              setEditingTask(task);
              setIsEditDialogOpen(true);
            }}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => {
              setTaskToDelete(task);
              setIsDeleteDialogOpen(true);
            }}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
          />
          <DialogFooter>
            <Button onClick={addTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Input
            value={editingTask?.title || ""}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            placeholder="Enter task title"
          />
          <DialogFooter>
            <Button onClick={editTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;