require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const files = require('./routes/files');
const disciplinas = require('./routes/disciplinas');
app.use('/api/v1/disciplinas', disciplinas);
require('dotenv').config();

// middleware
app.use('/static', express.static('./static'));
app.use(express.json());

// routes
app.use('/api/v1/files', files);

//testing routes
app.get('/biblioteca', (req, res) => {
    res.sendFile(__dirname + '/static/html/biblioteca.html');
})

app.get('/semestres', (req, res) => {
    res.sendFile(__dirname + '/static/html/semestres.html');
});

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(port, console.log(`server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
}

start();