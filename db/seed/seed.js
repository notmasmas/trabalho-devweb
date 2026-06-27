// Pega as variáveis do arquivo .env pra nao vazar
require('dotenv').config();
const mongoose = require('mongoose');
// Puxa o esqueleto que a gente criou pra saber o que é uma "Disciplina"
const Disciplina = require('../../models/disciplina');
// Importa o arquivo JSON
const dados = require('./disciplinas.json');
// Importa a função que realmente faz o meio de campo e liga o servidor ao banco
const connectDB = require('../connect');
 
const seed = async () => {
    try {
        // Tenta conectar no banco usando a URL que tá no .env. Se der ruim, vai direto pro catch
        await connectDB(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB'); // Se apareceu isso, o primeiro passo deu bom!
 
        // ATENÇÃO: Deleta TUDO que já existe nessa tabela/coleção. Perigo! mas limpa o terreno.
        await Disciplina.deleteMany({});
        console.log('Coleção de disciplinas limpa');
 
        // Pega JSON e joga tudo de uma vez no banco
        await Disciplina.insertMany(dados);
        console.log(`${dados.length} disciplinas inseridas`); // Printa quantas disciplinas o script salvou
 
        // Deu tudo certo, fecha o script com status de sucesso
        process.exit(0);
    } catch (error) {
        // se erro, estoura o erro aqui
        console.error('Erro no seed:', error.message);
        // Fecha o script com status de erro (1)
        process.exit(1);
    }
};
 
seed();