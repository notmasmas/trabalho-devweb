// Importa o modelo da Disciplina para interagir com a coleção no banco de dados MongoDB que vai ser implementado em breve
const Disciplina = require('../models/disciplina');

// Retorna os dados estruturados em nós (semestres) e arestas (conexões) para renderizar o fluxograma.
const getFluxograma = async (req, res) => {
    try {
        // Busca todas as disciplinas ordenando incrementalmente por semestre e depois por nome
        const disciplinas = await Disciplina.find({}).sort({ semestre: 1, nome: 1 });

        // Agrupa as diisciplinas por semestre utilizand a função .reduce()
        // Isso cria um objeto onde as chaves são os semestres ("1", "2"...) e os valores são arrays de diisciplinas
        const semestres = disciplinas.reduce((acc, disc) => {
            const sem = String(disc.semestre);
            if (!acc[sem]) acc[sem] = []; // Inicializa o array do semestre caso ele ainda não exista
            acc[sem].push(disc); // Adiciona a disciplina na sua respectiva coluna/semestre
            return acc;
        }, {});

        // Constrói lista de conexões a partir dos preRequisitos de cada disciplina.
        // Cada objeto gerado representa uma linha/seta conectando o pré-requisito à disciplina atual.
        const conexoes = [];
        disciplinas.forEach(disc => {
            disc.preRequisitos.forEach(codigoPreReq => {
                conexoes.push({
                    de: codigoPreReq, // Origem do fluxo (Disciplina que libera)
                    para: disc.codigo // Destino do fluxo (Disciplina que recebe a seta na bundinha)
                });
            });
        });

        // Retorna a estrutura pronta
        res.status(200).json({ semestres, conexoes });

    } catch (error) {
        // Retorna status 500 (Internal Server Error) caso aconteça alguma falha
        res.status(500).json({ msg: error.message });
    }
};

// Retorna todas as disciplinas
const getAllDisciplinas = async (req, res) => {
    try {
        // Captura o parâmetro de query "semestre=X" da URL
        const { semestre } = req.query;
        // Se houver parâmetro de semestre, converte para Número, senão busca tudo ({})
        const filtro = semestre ? { semestre: Number(semestre) } : {};
        // Executa a busca aplicando o filtro e ordenando por semestre e nome
        const disciplinas = await Disciplina.find(filtro).sort({ semestre: 1, nome: 1 });
        // Retorna o contador de registros encontrados junto com a lista de diisciplinas
        res.status(200).json({ count: disciplinas.length, disciplinas });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Retorna os detalhes de uma disciplina específica e resolve as informações básicas de seus pré-requisitos.
const getDisciplina = async (req, res) => {
    try {
        const { codigo } = req.params;
        // Busca a disciplina ignorando diferenças entre maiúsculas/mincuúslas digitadas na URL
        const disciplina = await Disciplina.findOne({ codigo: codigo.toUpperCase() });

        // Validação preventiva caso o código informado não exista no banco de dados
        if (!disciplina) {
            return res.status(404).json({ msg: `Disciplina '${codigo}' não encontrada.` });
        }

        // SE LIGA
        // Busca paralela para resolver os códigos do array de pré-requisitos em objetos legíveis
        // O operador $in filtra disciplinas cujo códiigo esteja presente na lista de pré-requisitos da atual
        const preRequisitosResolv = await Disciplina.find(
            { codigo: { $in: disciplina.preRequisitos } },
            'codigo nome semestre'
        );

        // Retorna a disciplina detalhada e seus pré-requisitos devidamente mapeados
        res.status(200).json({ disciplina, preRequisitosResolv });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Valida se os pré-requisitos existem no banco antes de salvar, para não criar arestas no meio do nada no fluxograma.
const createDisciplina = async (req, res) => {
    try {
        // Extrai a lista de pré-requisitos do corpo da requisição
        const { preRequisitos = [] } = req.body;

        // Se houver pré-requisitos, valida a existência de cada um deles
        if (preRequisitos.length > 0) {
            // Busca no banco quais desses códigos realmente existem
            const encontrados = await Disciplina.find(
                { codigo: { $in: preRequisitos.map(c => c.toUpperCase()) } },
                'codigo'
            );

            // Cria um array contendo apenas as strings dos códigos encontrados no banco
            const codigosEncontSrados = encontrados.map(d => d.codigo);
            // Compara as listas para filtrar quaiis códigos enviados pelo usuário NÃO foram achados no banco
            const naoEncontrados = preRequisitos.filter(
                c => !codigosEncontrados.includes(c.toUpperCase())
            );

            // Bloqueia a inserção caso haja qualquer código fantasma/inválido
            if (naoEncontrados.length > 0) {
                return res.status(400).json({
                    msg: `Pré-requisitos não encontrados: ${naoEncontrados.join(', ')}`
                });
            }
        }

        // Se a validação passou, cria efetivamente o registro no banco de dados
        const disciplina = await Disciplina.create(req.body);
        res.status(201).json(disciplina);

    } catch (error) {
        // Trata erro de código duplicado do MongoDB (código 11000)
        if (error.code === 11000) {
            return res.status(400).json({ msg: `Código '${req.body.codigo}' já existe.` });
        }
        res.status(500).json({ msg: error.message });
    }
};

// Atualiza os dados de uma disciplina existente, revalidando os pré-requisitos se eles forem alterados.
const updateDisciplina = async (req, res) => {
    try {
        const { codigo } = req.params;

        // Se está atualizando pré-requisitos, valida antes
        if (req.body.preRequisitos && req.body.preRequisitos.length > 0) {
            const encontrados = await Disciplina.find(
                { codigo: { $in: req.body.preRequisitos.map(c => c.toUpperCase()) } },
                'codigo'
            );
            const codigosEncontrados = encontrados.map(d => d.codigo);
            const naoEncontrados = req.body.preRequisitos.filter(
                c => !codigosEncontrados.includes(c.toUpperCase())
            );

            if (naoEncontrados.length > 0) {
                return res.status(400).json({
                    msg: `Pré-requisitos não encontrados: ${naoEncontrados.join(', ')}`
                });
            }
        }

        // Executa a atualização localizando a disciplina pelo código
        const disciplina = await Disciplina.findOneAndUpdate(
            { codigo: codigo.toUpperCase() },
            req.body,
            { new: true, runValidators: true }
        );

        if (!disciplina) {
            return res.status(404).json({ msg: `Disciplina '${codigo}' não encontrada.` });
        }

        res.status(200).json(disciplina);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Verifica se alguma outra disciplina depende desta antes de deletar.
const deleteDisciplina = async (req, res) => {
    try {
        const { codigo } = req.params;
        const codigoUpper = codigo.toUpperCase();

        // Checa se alguém depende desta disciplina
        const dependentes = await Disciplina.find(
            { preRequisitos: codigoUpper },
            'codigo nome'
        );

        // Bloqueia a exclusão se houver dependências
        if (dependentes.length > 0) {
            return res.status(400).json({
                msg: `Não é possível deletar: as disciplinas a seguir dependem de '${codigoUpper}'.`,
                dependentes: dependentes.map(d => `${d.codigo} — ${d.nome}`)
            });
        }

        // Executa a exclusão definitiva caso esteja livre de dependências
        const disciplina = await Disciplina.findOneAndDelete({ codigo: codigoUpper });

        if (!disciplina) {
            return res.status(404).json({ msg: `Disciplina '${codigo}' não encontrada.` });
        }

        res.status(200).json({ msg: `Disciplina '${codigoUpper}' deletada com sucesso.` });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Exporta as funções do controller
module.exports = {
    getFluxograma,
    getAllDisciplinas,
    getDisciplina,
    createDisciplina,
    updateDisciplina,
    deleteDisciplina
};