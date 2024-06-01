var database = require("../database/config");
var { fezQuest } = require("../controllers/usuarioController");
var { fezQuiz } = require("../controllers/usuarioController");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, FezQuiz, FezQuest) VALUES ('${nome}','${email}', '${senha}', false, false);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function EnviarQuest(q1, q2, q3, q4, fkQuestUsuario) {
    console.log("Finalizando questionário para o usuário:", fkQuestUsuario);
    var instrucaoSql = `
        INSERT INTO questionario (questao1, questao2, questao3, questao4, fk_Pergunta_Usuario) VALUES ('${q1}', '${q2}', '${q3}', '${q4}', ${fkQuestUsuario});
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function fazerQuest(id) {
    var instrucaoSql = `
        UPDATE usuario set fezQuest = true where id = ${id};
        
    `;

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro ao cadastrar se o usuário fez o questionário ou não:", erro);
        throw erro;
    });
}

function fezQuest(id) {
    var instrucaoSql = `
        SELECT fezQuest FROM usuario WHERE id = ${id};
    `;

    return database.executar(instrucaoSql).then(resultado => {
        console.log(resultado)
        if (resultado.length > 0) {
            const questionarioFeito = resultado[0].fezQuest;
            console.log(questionarioFeito)
            return questionarioFeito;
        } else {
            console.error("Usuário não encontrado:", id);
            throw new Error("Usuário não encontrado.");
        }
    }).catch(erro => {
        console.error("Erro ao verificar se o usuário fez o questionário:", erro);
        throw erro;
    });
}

function fezQuiz(id) {
    var instrucaoSql = `
        SELECT fezQuiz FROM usuario WHERE id = ${id};
    `;

    return database.executar(instrucaoSql).then(resultado => {
        console.log(resultado)
        if (resultado.length > 0) {
            const questionarioFeito = resultado[0].fezQuiz;
            console.log(questionarioFeito)
            return questionarioFeito;
        } else {
            console.error("Usuário não encontrado:", id);
            throw new Error("Usuário não encontrado.");
        }
    }).catch(erro => {
        console.error("Erro ao verificar se o usuário fez o questionário:", erro);
        throw erro;
    });
}

module.exports = {
    autenticar,
    cadastrar,
    EnviarQuest,
    fazerQuest,
    fezQuest,
    fezQuiz
};