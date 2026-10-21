import axios from "../api/axios";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";

export default function Dashboard({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const loadTasks = async () => {
    const res = await axios.get("/tasks", auth);
    setTasks(res.data);
  };

  useEffect(() => {
    const load = async () => {
      const res = await axios.get("/tasks", auth);
      setTasks(res.data);
    };
    load();
    // `auth` is rebuilt each render; token is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const createTask = async () => {
    if (!title) return;
    await axios.post("/tasks", { title, description }, auth);
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const updateTask = async (id, changes) => {
    await axios.put(`/tasks/${id}`, changes, auth);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`, auth);
    loadTasks();
  };

  return (
    <div>
      <h1>TaskFlow Portal</h1>
      <button onClick={onLogout}>Logout</button>

      <h2>New Task</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>

      <h2>My Tasks</h2>
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
}
