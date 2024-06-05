var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});




// router.post('/fazerQuiz/:id/:fezQuiz', function (req, res) {
//     usuarioController.fazerQuiz(req, res);
// });

router.post('/fezQuiz/:id', function (req, res) {
    usuarioController.fezQuiz(req, res);
});







// router.post('/EnviarQuest/:id/:fezQuest', function (req, res) {
//     usuarioController.EnviarQuest(req, res);
// });

router.post('/FezQuest/:id', function (req, res) {
    usuarioController.fezQuest(req, res);
});

module.exports = router;