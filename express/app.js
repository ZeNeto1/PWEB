const express = require('express');
const path = require('path'); 
const app = express();
const port = 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Minha Aplicação Express' });
});

// Outra rota
app.get('/sobre', (req, res) => {
  res.render('index', { title: 'Sobre Nós' });
});

app.get('/tarefas', (req, res) => {
  const tarefas = [
    { nome: 'Aprender Express', concluida: true },
    { nome: 'Criar um formulário', concluida: false },
    { nome: 'Dominar o mundo', concluida: false }
  ];

  res.render('listadetarefas', { 
    title: 'Minha Lista de Tarefas',
    tarefasDaView: tarefas // Passando o array
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
