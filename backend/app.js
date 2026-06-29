require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db/connect');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // React/Vite
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));


// middleware
app.use(cookieParser()); // cookies
app.use(express.json()); // aceitar body em JSON
app.use('/uploads', express.static('uploads')); // expor a pasta uploads
app.use('/api/v1', require('./routes')); 
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error-handler'));

const port = process.env.PORT || 3000;

// conecta ao banco ANTES de subir o servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
  })
})
