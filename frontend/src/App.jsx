// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar:', err);
      setError('Não foi possível carregar as tarefas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError('Erro ao adicionar tarefa.');
    }
  };

  const handleToggle = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await updateTask(task.id, updated);
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      setError('Erro ao atualizar tarefa.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Erro ao excluir tarefa.');
    }
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Minhas Tarefas</h1>
        <div className="stats">
          <span>📋 Total: {total}</span>
          <span>✅ Concluídas: {completed}</span>
          <span>⏳ Pendentes: {pending}</span>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <TaskForm onAdd={handleAdd} />

      <div className="task-list">
        {loading && <p className="loading">Carregando tarefas...</p>}
        
        {!loading && tasks.length === 0 && (
          <div className="empty-state">
            <p>🎉 Nenhuma tarefa ainda!</p>
            <p>Adicione sua primeira tarefa acima 👆</p>
          </div>
        )}
        
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;