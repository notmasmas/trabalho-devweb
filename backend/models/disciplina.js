const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    dia: {
        type: String,
        enum: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        required: [true, 'Dia da semana é obrigatório']
    },
    inicio: {
        type: String,
        required: [true, 'Horário de início é obrigatório'],
        match: [/^\d{2}:\d{2}$/, 'Formato de horário inválido. Use HH:MM']
    },
    fim: {
        type: String,
        required: [true, 'Horário de fim é obrigatório'],
        match: [/^\d{2}:\d{2}$/, 'Formato de horário inválido. Use HH:MM']
    }
}, { _id: false });

const disciplinaSchema = new mongoose.Schema({

    // Identificador único legível — é o que os outros documentos referenciam em preRequisitos
    codigo: {
        type: String,
        required: [true, 'Código da disciplina é obrigatório'],
        unique: true,
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{3}\d{6}$/, 'Código inválido. Ex: DES123456']
    },

    nome: {
        type: String,
        required: [true, 'Nome da disciplina é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
    },

    // Determina a COLUNA no fluxograma (1 a 8)
    semestre: {
        type: Number,
        required: [true, 'Semestre é obrigatório'],
        min: [1, 'Semestre mínimo é 1'],
        max: [8, 'Semestre máximo é 8']
    },

    cargaHoraria: {
        type: Number,
        required: [true, 'Carga horária é obrigatória'],
        min: [0, 'Carga horária não pode ser negativa']
    },

    professores: {
        type: [String],
        default: []
    },

    ementa: {
        type: String,
        trim: true,
        default: 'Ementa não disponível.'
    },

    // Array de `codigo`s de outras disciplinas — cria as ARESTAS do fluxograma
    preRequisitos: {
        type: [String],
        default: [],
        uppercase: true
    },

    tipo: {
        type: [String],
        enum: ['obrigatoria', 'optativa'],
     default: 'obrigatoria'
    },

    horarios: {
        type: [horarioSchema],
        default: []
    }

});

// Índice para buscas por semestre (útil para a query do fluxograma)
disciplinaSchema.index({ semestre: 1 });

module.exports = mongoose.model('Disciplina', disciplinaSchema);