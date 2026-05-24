// frontend/src/components/TaskItem.jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={Boolean(task.completed)}
        onChange={() => onToggle(task)}
      />
      
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        title="Excluir tarefa"
      >
        🗑️
      </button>
    </div>
  );
}

export default TaskItem;