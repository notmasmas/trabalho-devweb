// Importa o módulo do Mongoose para modelagem de dados do MongoDB
const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    // Dia da semana em que a aula ocorre
    dia: {
        type: String,
        // Limita os valores aceitos apenas aos dias listados no array
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        required: [true, 'Dia da semana é obrigatório'] // Mensagem de erro customizada
    },
    // Horário de início da aula (ex: "08:00")
    inicio: {
        type: String,
        // Horario de início da aula (ex: "08:00")
        required: [true, 'Horário de início é obrigatório'],
        // Validação para garantir o formato HH:MM
        match: [/^\d{2}:\d{2}$/, 'Formato de horário inválido. Use HH:MM']
    },
    fim: {
        type: String,
        // Horário de término da aula (ex: "10:00")
        required: [true, 'Horário de fim é obrigatório'],
        // Validação HH:MM
        match: [/^\d{2}:\d{2}$/, 'Formato de horário inválido. Use HH:MM']
    }
}, { _id: false });

const disciplinaSchema = new mongoose.Schema({

    // Identificador único legível, é o que os outros documentos referenciam em preRequisitos
    codigo: {
        type: String,
        required: [true, 'Código da disciplina é obrigatório'],
        unique: true,      // Garante que não existam duas disciplinas com o mesmo código no banco
        trim: true,        // rtemove espaços em branco desnecessários no início e fim
        uppercase: true,   // Força a conversão do texto para letras maiúsculas
        // Exige de 2 a 6 letras seguiidas de 3 a 6 números (Ex: DES101, COMP3012)
        match: [/^[A-Z]{2,6}\d{3,6}$/, 'Código inválido. Ex: DES101']
    },

    // Nome por extenso da disciplina (ex: "Programação WEB")
    nome: {
        type: String,
        required: [true, 'Nome da disciplina é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome não pode ter mais de 100 caracteres'] // Limita o tamanho do texto
    },

    // Determina a COLUNA no fluxograma, a qual semestre aquela discplina pertence, WEB é do terceiro
    semestre: {
        type: Number,
        required: [true, 'Semestre é obrigatório'],
        min: [1, 'Semestre mínimo é 1'], //Mínimo
        max: [8, 'Semestre máximo é 8']  //Máximo
        //Ainda estou pensando como vou fazer com os optativas, ajusto em um próximo commit
    },

    // Carga horária total da disciplina em horas (ex: 60, 72)
    cargaHoraria: {
        type: Number,
        required: [true, 'Carga horária é obrigatória'],
        min: [0, 'Carga horária não pode ser negativa']
    },

    // Lista com os nomes dos professores que lecionam a disciplina
    professores: {
        type: [String], // Array de Strings
        default: []     // Caso não informado, inicia como um array vazio
    },

    // Resumo do conteúdo programático da disciplina
    ementa: {
        type: String,
        trim: true,
        default: 'Ementa não disponível.' // Valor padrão caso o campo seja omitido
        //Estou pensnado em ao invés de ser um resumo, ser um link para o site do IFSC
        //Quando eu visualizar melhor, arrumo isso em outro commit
    },

    // Array de `codigo`s de outras disciplinas — cria as ARESTAS do fluxograma
    preRequisitos: {
        type: [String], // Array de Strings contendo os códigos (ex: ['MAT101', 'FIS101'])
        default: [],
        uppercase: true // Apenas garantindo que vai ficar maiusculo de certeza absoluta
    },

    // Lista de horários associados a esta disciplina
    horarios: {
        type: [horarioSchema], // Incorpora o subdocumento definido anteriormente
        default: []
    }

});

// Índice para buscas por semestre
disciplinaSchema.index({ semestre: 1 });

// Exporta o modelo 'Disciplina' baseado no schema para ser usado em outras partes da aplicação
module.exports = mongoose.model('Disciplina', disciplinaSchema);