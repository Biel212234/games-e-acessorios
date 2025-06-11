const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static('public'));

let games = [
  { id: 1, nome: 'The Legend of Zelda', plataforma: 'Nintendo Switch', preco: 299.99 },
  { id: 2, nome: 'God of War', plataforma: 'PS5', preco: 349.99 }
];

let acessorios = [
  { id: 1, nome: 'Controle Xbox', tipo: 'Controle', preco: 299.99 },
  { id: 2, nome: 'Headset Gamer', tipo: 'Áudio', preco: 199.99 }
];

// Games endpoints
app.get('/games', (req, res) => res.json(games));
app.post('/games', (req, res) => {
  const novoGame = { id: Date.now(), ...req.body };
  games.push(novoGame);
  res.status(201).json(novoGame);
});
app.put('/games/:id', (req, res) => {
  const id = parseInt(req.params.id);
  games = games.map(game => game.id === id ? { ...game, ...req.body } : game);
  res.json({ message: 'Game atualizado' });
});
app.patch('/games/:nome', (req, res) => {
  const nome = req.params.nome;
  const { nome: novoNome, plataforma, preco } = req.body;

  const game = games.find(g => g.nome === nome);
  if (!game) return res.status(404).send({ erro: "Game não encontrado" });

  game.nome = novoNome;
  game.plataforma = plataforma;
  game.preco = preco;

  res.send(game);
});

app.delete('/games/:id', (req, res) => {
  const id = parseInt(req.params.id);
  games = games.filter(game => game.id !== id);
  res.json({ message: 'Game removido' });
});

// Acessórios endpoints
app.get('/acessorios', (req, res) => res.json(acessorios));
app.post('/acessorios', (req, res) => {
  const novoAcessorio = { id: Date.now(), ...req.body };
  acessorios.push(novoAcessorio);
  res.status(201).json(novoAcessorio);
});
app.put('/acessorios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  acessorios = acessorios.map(acc => acc.id === id ? { ...acc, ...req.body } : acc);
  res.json({ message: 'Acessório atualizado' });
});
app.patch('/acessorios/:nome', (req, res) => {
  const nome = req.params.nome;
  const { nome: novoNome, tipo, preco } = req.body;

  const acc = acessorios.find(a => a.nome === nome);
  if (!acc) return res.status(404).send({ erro: "Acessório não encontrado" });

  acc.nome = novoNome;
  acc.tipo = tipo;
  acc.preco = preco;

  res.send(acc);
});

app.delete('/acessorios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  acessorios = acessorios.filter(acc => acc.id !== id);
  res.json({ message: 'Acessório removido' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
