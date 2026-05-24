// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date() });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 API de tarefas: http://localhost:${PORT}/api/tasks`);
});