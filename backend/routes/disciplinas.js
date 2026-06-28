const express = require('express');
const router = express.Router();

// Importa as funções que fazem o trabalho com o banco de dados
const {
    getFluxograma,
    getAllDisciplinas,
    getDisciplina,
    createDisciplina,
    updateDisciplina,
    deleteDisciplina
} = require('../controllers/disciplina');
 
// Rota específica para puxar os dados do fluxograma (combinação de matérias)
router.get('/fluxograma', getFluxograma);
 
// Agrupamento por rota raiz:
// GET  -> Lista todas as disciplinas
// POST -> Cria uma nova disciplina
router.route('/')
    .get(getAllDisciplinas)
    .post(createDisciplina);
 
// Agrupamento por rota com parâmetro:
// GET -> Puxa uma disciplina específica pelo código dela
// PATCH -> Atualiza os dados dessa disciplina específica
// DELETE -> Apaga essa disciplina específica
router.route('/:codigo')
    .get(getDisciplina)
    .patch(updateDisciplina)
    .delete(deleteDisciplina);
 
module.exports = router;