var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/criarPerfil", function (req, res) {
    medidaController.criarPerfil(req, res);
});

router.put("/atualizarPerfil", function (req, res) {
    medidaController.atualizarPerfil(req, res);
});

router.get("/pegarQuantidadePerfil", function (req, res) {
    medidaController.pegarQuantidadePerfil(req, res);
});

router.get("/pegarPerfilUsuario/:id", function (req, res) {
    medidaController.pegarPerfilUsuario(req, res);
});

router.get("/procurarVotos/:questao/:comida", function (req, res) {
    medidaController.procurarVotos(req, res);
});


module.exports = router;