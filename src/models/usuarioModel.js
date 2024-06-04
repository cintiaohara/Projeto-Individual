var database = require("../database/config");

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


// function EnviarQuest(q1, q2, q3, q4, fkQuestUsuario, id) {
//     console.log("Finalizando questionário para o usuário:", fkQuestUsuario, id);
//     var instrucao1Sql = `
//         INSERT INTO questionario (questao1, questao2, questao3, questao4, fk_Pergunta_Usuario) VALUES ('${q1}', '${q2}', '${q3}', '${q4}', ${fkQuestUsuario});
//     `;

//     var instrucao2Sql = `
//     UPDATE usuario set fezQuest = true where id = ${id};
// `;

//     console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucao1Sql + instrucao2Sql);
//      database.executar(instrucao1Sql);
//     return database.executar(instrucao2Sql).catch(erro => {
//         console.error("Erro ao cadastrar se o usuário fez o questionário ou não:", erro);
//         throw erro;
//     });
// }


function fezQuest(q1, q2, q3, q4, fkQuestUsuario, id) {
    console.log("Finalizando questionário para o usuário:", fkQuestUsuario, id);
    var instrucao1Sql = `
        INSERT INTO questionario (questao1, questao2, questao3, questao4, fkQuestUsuario) VALUES ('${q1}', '${q2}', '${q3}', '${q4}', ${id});
    `;

    var instrucao2Sql = `
    UPDATE usuario set fezQuest = true where id = ${id};
`;
    var instrucaoSql = `
        SELECT fezQuest FROM usuario WHERE id = ${id};
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucao1Sql + instrucao2Sql);
     database.executar(instrucao1Sql);
    database.executar(instrucao2Sql).catch(erro => {
        console.error("Erro ao cadastrar se o usuário fez o questionário ou não:", erro);  
    return database.executar(instrucaoSql)
    
});/* .then(resultado => {
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
    }); */
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
    fezQuest,
    fezQuiz
};