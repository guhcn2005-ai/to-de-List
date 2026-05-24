// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// GET - Buscar todas as tarefas
router.get('/', (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT * FROM tasks 
      ORDER BY created_at DESC
    `).all();
    
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova tarefa
router.post('/', (req, res) => {
  const { title, description } = req.body;
  
  // Validação
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'O título é obrigatório' });
  }
  
  try {
    const stmt = db.prepare(`
      INSERT INTO tasks (title, description) 
      VALUES (?, ?)
    `);
    
    const result = stmt.run(title.trim(), description || '');
    
    // Buscar a tarefa recém-criada
    const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  try {
    const stmt = db.prepare(`
      UPDATE tasks 
      SET title = ?, description = ?, completed = ?
      WHERE id = ?
    `);
    
    stmt.run(title, description, completed ? 1 : 0, id);
    
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Remover tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
    
    res.json({ message: 'Tarefa removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;