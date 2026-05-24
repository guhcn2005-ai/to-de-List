// frontend/src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('O título não pode estar vazio!');
      return;
    }
    
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>➕ Nova Tarefa</h2>
      
      {error && <p className="error-msg">{error}</p>}
      
      <input
        type="text"
        placeholder="Título da tarefa *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
        rows={3}
      />
      
      <button type="submit" className="btn-primary">
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default TaskForm;