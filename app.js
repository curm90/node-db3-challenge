const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/api/schemes', SchemeRouter);

module.exports = app;
