const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'farmbridge-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'FarmBridge backend API is running',
  });
});

module.exports = app;
