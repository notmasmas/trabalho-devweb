require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./config/db/connect');

const app = express();

// error handler
const notFound = require('./middleware/not-found');

// middleware
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/api/v1', require('./routes'))
app.use(notFound);
app.use(require('./middleware/error-handler'));

const port = process.env.PORT || 3000;

// conecta ao banco ANTES de subir o servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
  })
})
