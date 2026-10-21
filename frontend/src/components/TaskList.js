export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <div>
      {tasks.map(task => (
        <div className="task" key={task._id}>
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
          <select
            value={task.status}
            onChange={e => onUpdate(task._id, { status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
