var database = require("../database/config");

function criarPerfil(perfil, id) {

    var instrucaoSql = `
    insert into quiz (perfil, fkQuizUsuario) values ('${perfil}', ${id});
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarPerfil(perfil, id) {

    var instrucaoSql = `
    update quiz set perfil = '${perfil}' where fkQuizUsuario = ${id};
                    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarQuantidadePerfil() {

    var instrucaoSql = `
    select sum(case when perfil = 'Calmo e Equilibrado' then 1 else 0 end) as calma,
        sum(case when perfil = 'Ativo e Dinâmico' then 1 else 0 end) as ativa,
        sum(case when perfil = 'Casual e Acolhedor' then 1 else 0 end) as casual,
        sum(case when perfil = 'Criativo e Excêntrico' then 1 else 0 end) as criativa
        from quiz;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarPerfilUsuario(id) {

    var instrucaoSql = `
    select perfil from quiz where fkQuizUsuario = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function procurarVotos(questao, comida) {

    var instrucaoSql = `
    select count(fkQuestUsuario) as votos from questionario where questao${questao} LIKE '%${comida}%';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    criarPerfil,
    atualizarPerfil,
    pegarQuantidadePerfil,
    pegarPerfilUsuario,
    procurarVotos
}
