var medidaModel = require("../models/medidaModel");

function criarPerfil(req, res) {
    var id = req.body.id;
    var perfil = req.body.perfil;

    if (id == undefined) {
        res.status(400).send("Seu questao está undefined!");
    } else if (perfil == undefined) {
        res.status(400).send("Seu comida está undefined!");
    } else {
        medidaModel.criarPerfil(perfil, id).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function atualizarPerfil(req, res) {
    var id = req.body.id;
    var perfil = req.body.perfil;

    if (id == undefined) {
        res.status(400).send("Seu questao está undefined!");
    } else if (perfil == undefined) {
        res.status(400).send("Seu comida está undefined!");
    } else {
        medidaModel.criarPerfil(perfil, id).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function pegarQuantidadePerfil(req, res) {
    medidaModel.pegarQuantidadePerfil().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function pegarPerfilUsuario(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        medidaModel.pegarPerfilUsuario(id).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

    }
}

function procurarVotos(req, res) {
    var questao = req.params.questao;
    var comida = req.params.comida;

    if (questao == undefined) {
        res.status(400).send("Seu questao está undefined!");
    } else if (comida == undefined) {
        res.status(400).send("Seu comida está undefined!");
    } else {
        medidaModel.procurarVotos(questao, comida).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao procurar os votos.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}


module.exports = {
    criarPerfil,
    atualizarPerfil,
    pegarQuantidadePerfil,
    pegarPerfilUsuario,
    procurarVotos
}