const express = require('express');

const server = express();

server.use(express.json());

const users = ['Ronaldo', 'Ronaldo Filho', 'Adriana Amorim', 'Luana Dantas']

server.use((req, res, next) => {
  return next();
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Username is required' });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'Username index does not exists' });
  }
  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
})

//query params
//another way
// server.get('/users', (req, res) => {
//   return res.json({ id: req.query.name });
// })

//route params
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

//body
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
})

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body
  users[index] = name;

  return res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.json(users);
})

server.listen(3000);