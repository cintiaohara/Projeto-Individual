var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha
                                    });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    // } else if (cpf == undefined){
    //     res.status(400).send("Seu cpf está undefined!");
    // }
    }
    else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function fezQuiz(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var id = req.body.idUsuarioServer;
    var perfil = req.body.perfilServer;
    
    console.log(id)

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Sem resposta de id!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.fezQuiz(perfil, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Quiz! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function fezQuest(req, res) {
    var id = req.body.idUsuarioServer;
    var q1 = req.body.input1Server;
    var q2 = req.body.input2Server;
    var q3 = req.body.input3Server;
    var q4 = req.body.input4Server;
    // var fkQuestUsuario = req.body.idServer;

    console.log(id)

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Sem resposta de id!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        console.log('teste');
        usuarioModel.fezQuest(q1, q2, q3, q4, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



// function EnviarQuest(req, res) {
//     var q1 = req.body.q1Server;
//     var q2 = req.body.q2Server;
//     var q3 = req.body.q3Server;
//     var q4 = req.body.q4Server;
//     var fkQuestUsuario = req.body.idServer;
//     var fezQuest = req.body.fezQuestServer;

//     console.log("CHAMANDO ENVIAR");

//     if (fkQuestUsuario == undefined) {
//         res.status(400).send("Sem resposta de id!");
//     } else if (fezQuest == undefined) {
//         res.status(400).send("Sem resposta de questionario!");
//     } else {

//     if (q1 == undefined) {
//         res.status(400).send("Sem resposta 1");
//     } else if (q2 == undefined) {
//         res.status(400).send("Sem resposta 2");
//     } else if (q3 == undefined) {
//         res.status(400).send("Sem resposta 3");
//     } else if (q4 == undefined) {
//         res.status(400).send("Sem resposta 4");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.EnviarQuest(q1, q2, q3, q4, fkQuestUsuario, id)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o Questionário! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }}

module.exports = {
    autenticar,
    cadastrar,
    fezQuest,
    fezQuiz
}