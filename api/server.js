const express = require('express');
const usersRouter = require('./users/users-router');
const { logger } = require('.//middleware/middleware');

const server = express();
server.use(express.json());

server.use('/api/users', usersRouter);
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({
    message: `[${req.method}] ${req.baseUrl} not found!`
  })
})

server.use((err, req, res, next) => {
  console.log('something is wrong with your HTTP request, Yo!')
  res.status(err.status || 500).json({
    message: 'This is the super sad path =(',
    error: err.message
  })
})

module.exports = server;
