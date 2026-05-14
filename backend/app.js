require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db/connect')

const app = express()

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// middleware
app.use(express.static('./static'));
app.use(express.json());
app.use('/api/v1', require('./routes'))

const port = process.env.PORT || 3000;

// conecta ao banco ANTES de subir o servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
  })
})
