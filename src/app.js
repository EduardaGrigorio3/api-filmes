const express = require('express');
const app = express();

const filmeRoutes = require('./routes/filmeRoutes');

app.use(express.json());

app.use('/api', filmeRoutes);

module.exports = app;