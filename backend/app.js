require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db/connect')

const app = express()

// middleware
app.use(express.static('./static'));
app.use(express.json());
app.use('/api/v1', require('./routes'))

// conecta ao banco ANTES de subir o servidor
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
  })
})

//testing routes (remove)
app.get('/biblioteca', (req, res) => {
    res.sendFile(__dirname + '/static/html/biblioteca.html');
})