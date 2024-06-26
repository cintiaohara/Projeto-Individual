
const LAST_QUESTION = 10;
var selectedIndexes = [];
var questionIndex = undefined;
var selectedAnswers = [null, null, null, null, null, null, null, null, null, null];
var perfilVar = "";
var idUsuario = sessionStorage.ID_USUARIO;
var jaFez = false;

const startTest = () => {
  selectedIndexes = [];
  let count = 0;
  while (count < 10) {
    let number = null;
    do {
      number = Math.floor(Math.random() * 10);
    } while (selectedIndexes.includes(number));
    selectedIndexes.push(number);
    count++;
  }

  questionIndex = 0;
  let questionObj = questions[selectedIndexes[questionIndex]];


  displayQuestion(questionObj);

  document.getElementById("counter").innerHTML = questionIndex + 1;

  document.getElementById("next").style.pointerEvents = "none";
  document.getElementById("next").style.color = "gray";

  document.getElementById("previous").style.pointerEvents = "none";
  document.getElementById("previous").style.color = "gray";

  document.getElementsByClassName("welcome")[0].style.display = "none";
  document.getElementsByClassName("container")[0].style.display = "flex";

  document.getElementById("test-result").style.display = "none";

  document.getElementById("restart").style.display = "none";

  document.getElementsByClassName("your-answers")[0].style.display = "none";
};

const resetPreviousStyles = () => {
  document.getElementById("div-ans-a").style.border = "none";
  document.getElementById("div-ans-b").style.border = "none";
  document.getElementById("div-ans-c").style.border = "none";
  document.getElementById("div-ans-d").style.border = "none";
};

const displaySelectedAnswer = (answer) => {
  if (answer === 0) {
    document.getElementById("div-ans-a").style.border = "2px solid blue";
  } else if (answer === 1) {
    document.getElementById("div-ans-b").style.border = "2px solid blue";
  } else if (answer === 2) {
    document.getElementById("div-ans-c").style.border = "2px solid blue";
  } else {
    document.getElementById("div-ans-d").style.border = "2px solid blue";
  }
};

const displayQuestion = (questionObj) => {
  document.getElementById("question").innerHTML = questionObj.question;
  document.getElementById("ans-a").innerHTML = questionObj.answers[0].text;
  document.getElementById("ans-b").innerHTML = questionObj.answers[1].text;
  document.getElementById("ans-c").innerHTML = questionObj.answers[2].text;
  document.getElementById("ans-d").innerHTML = questionObj.answers[3].text;

  if (questionIndex > 0) {
    document.getElementById("previous").style.pointerEvents = "auto";
    document.getElementById("previous").style.color = "black";
  } else {
    document.getElementById("previous").style.pointerEvents = "none";
    document.getElementById("previous").style.color = "gray";
  }

  if (selectedAnswers[questionIndex] !== null) {
    document.getElementById("next").style.pointerEvents = "auto";
    document.getElementById("next").style.color = "black";
  } else {
    document.getElementById("next").style.pointerEvents = "none";
    document.getElementById("next").style.color = "gray";
  }


  if (questionIndex === LAST_QUESTION - 1) {
    document.getElementById("next").innerHTML = "Terminar";
  } else {
    document.getElementById("next").innerHTML = "Próxima >";
  }
};

const nextQuestion = () => {
  if (questionIndex < selectedIndexes.length - 1) {
    questionIndex++;
    let questionObj = questions[selectedIndexes[questionIndex]];


    resetPreviousStyles();

    displayQuestion(questionObj);

    if (selectedAnswers[questionIndex] !== null) {
      let answer = selectedAnswers[questionIndex];
      displaySelectedAnswer(answer);
    }

    //set the question number
    document.getElementById("counter").innerHTML = questionIndex + 1;
  } else {
    showAllQuestionAndAnswer();
    fezQuiz();
  }
};

const previousQuestion = () => {
  console.log(questionIndex);
  if (questionIndex > 0) {
    questionIndex--;

    let questionObj = questions[selectedIndexes[questionIndex]];

    resetPreviousStyles();

    displayQuestion(questionObj);

    document.getElementById("counter").innerHTML = questionIndex + 1;

    let answer = selectedAnswers[questionIndex];
    displaySelectedAnswer(answer);
  }
};

const selectedAnswer = (ans) => {
  resetPreviousStyles();

  displaySelectedAnswer(ans);

  document.getElementById("next").style.pointerEvents = "auto";
  document.getElementById("next").style.color = "black";

  selectedAnswers[questionIndex] = ans;

};

const showElement = (questionObj, chosenAnswer, index) => {
  let element = "";

  switch (chosenAnswer) {
    case 0:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="border: 2px solid blue">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 1:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b" style="pointer-events: none; border: 2px solid blue">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c" >
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 2:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c" style="border: 2px solid blue">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="none; margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 3:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px; border: 2px solid blue">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    default:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
  }

  return element;
};

const showAllQuestionAndAnswer = () => {
  //store the count for later comparison
  let A_count = 0;
  let B_count = 0;
  let C_count = 0;
  let D_count = 0;

  for (let i = 0; i < selectedIndexes.length; i++) {
    let questionObj = questions[selectedIndexes[i]];
    let answer = selectedAnswers[i];
    let element = showElement(questionObj, answer, i + 1);
    document.getElementById("answers").innerHTML += element;

    let cat = questionObj.answers[answer].cat;
    if (cat === "A") {
      A_count++;
    } else if (cat === "B") {
      B_count++;
    } else if (cat === "C") {
      C_count++;
    } else if (cat === "D") {
      D_count++;
    }
  }


  showPersonalities(A_count, B_count, C_count, D_count);

  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "none";



};

const showPersonalities = (A, B, C, D) => {
  console.log(A, B, C, D)
  if (A > B && A > C && A > D) {
   

    document.getElementById("image").src = "assets/img_quiz/quiz1.png";


    document.getElementById("comida-combina").innerText = "Você combina com Kaarage, Missoshiro, Omuraisu, Tempurá e Udon";
    document.getElementById("perfil").innerText = "Calmo e Equilibrado";


    let element = ` <br> Você é uma pessoa naturalmente calma e equilibrada, e assim como o efeito do Missoshiro, você traz paz aos outros. Sua serenidade ajuda a evitar conflitos, mantendo uma atitude positiva. Sua paciência e persistência são notáveis, esperando pelo momento certo e dedicando-se aos objetivos com determinação. Seu senso estético refinado valoriza a beleza em todas as formas, apreciando e criando detalhes que fazem diferença assim como é o Tempurá e o Udon, que misturam texturas e formas de comidas diferentes.`;
    document.getElementById("personalities").innerHTML += element;
    perfilVar = "Calmo e Equilibrado";
  } else if (B > A && B > C && B > D) {

    document.getElementById("image").src = "assets/img_quiz/quiz2.png";
    document.getElementById("comida-combina").innerText = "Você combina com Gyoza, Donburi, Natto, Onigiri e Yakitori";
    document.getElementById("perfil").innerText = "Ativo e Dinâmico";

 
    let element = `
    <br>Você é uma pessoa ativa e sempre em movimento. As 4 comidas são perfeitas para pessoas que estão sempre "on the go". São comidas rápidas para pessoas ocupadas que estão sempre com algo para fazer. A monotonia não faz parte do seu vocabulário; você prospera em ambientes dinâmicos e desafiadores. Seja praticando esportes, participando de eventos ou simplesmente explorando novos lugares, você está sempre em busca de algo para fazer. Sua energia é contagiante, inspirando aqueles ao seu redor a se manterem ativos e envolvidos.`;
    document.getElementById("personalities").innerHTML += element;

    perfilVar = "Ativo e Dinâmico";
  } else if (C > A && C > B && C > D) {

    document.getElementById("image").src = "assets/img_quiz/quiz3.png";
    document.getElementById("comida-combina").innerText = "Você combina com Chahan, Lamen, Oden, Sukiyaki e Yakisoba";
    document.getElementById("perfil").innerText = "Casual e Acolhedor";
    let element = `<br>Você é uma pessoa casual e acolhedora, que se preocupa profundamente com relacionamentos genuínos. O Chahan, Lamen, Oden, Sukiyaki e Yakisoba são comidas ideais para quem gosta de compartilhar comida com amigos e família. Assim como o Oden, você transmite um sentimento de acolhimento para as pessoas da sua vida. Para você, uma refeição é uma desculpa para reunir pessoas queridas e compartilhar momentos espontâneos e divertidos. Sua natureza social e empática faz com que você seja o coração dos seus círculos sociais, sempre pronto para criar memórias e apreciar a companhia daqueles que ama.`;
    document.getElementById("personalities").innerHTML += element;

    perfilVar = "Casual e Acolhedor";
  } else if (D > A && D > B && D > C) {

    document.getElementById("image").src = "assets/img_quiz/quiz4.png";
    document.getElementById("comida-combina").innerText = "Você combina com Chawanmushi, Kare, Okonomiyaki, Takoyaki e Tonkatsu";
    document.getElementById("perfil").innerText = "Criativo e Excêntrico";
    let element = `Você é uma pessoa criativa e excêntrica, apaixonada por hobbies originais e música indie. Adora experimentar novos sabores e explorar a diversidade culinária. Sua autenticidade e curiosidade tornam sua jornada de descoberta tanto na arte quanto na gastronomia verdadeiramente inspiradora.`;
    document.getElementById("personalities").innerHTML += element;
    perfilVar = "Criativo e Excêntrico";
  }

  document.getElementById("test-result").style.display = "flex";

  document.getElementById("restart").style.display = "block";

  document.getElementsByClassName("your-answers")[0].style.display = "block";

  if (perfilVar != "") {
    if (jaFez) {

      fetch(`/medidas/atualizarPerfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idUsuario,
          perfil: perfilVar
        }),
      }).then(function (response) {
        if (response.ok) {

          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${resposta}`);
          });

        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });

    } else {

      fetch(`/medidas/criarPerfil`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idUsuario,
          perfil: perfilVar
        }),
      }).then(function (response) {
        if (response.ok) {

          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${resposta}`);
          });

        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
      
    }
  }
};

verificarJaVotou()
function verificarJaVotou() {
  fetch(`/medidas/pegarPerfilUsuario/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
    console.log(response)
    if (response.status == 200) {
      jaFez = true;
    } else if (response.status == 204) {
      jaFez = false;
    }
  }).catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });
}


const restartQuestion = () => {
  window.location.reload();
};


const fezQuiz = () => {

  // var perfil = document.getElementById("perfil").textContent;
  console.log(perfil)
  var id = sessionStorage.ID_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;


  // if (perfil == "") {
  //   alert("Todas as perguntas precisam ser respondidas.");
  //   return;
  // }var fezQuiz = true;
  // fetch(`/usuarios/FezQuiz/${id}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     perfilServer: perfil,
  //     idUsuarioServer: id,
  //     fezQuestServer: fezQuiz
  //   })
  // }).then(function (resposta) {
  //   console.log("ESTOU NO THEN DO finalizar()!")

  //   if (resposta.ok) {
  //     resposta.json().then(json => {
  //       console.log(json);
  //       console.log(JSON.stringify(json));
  //     })
  //   } else {
  //     resposta.text().then(texto => {
  //       console.error(texto);
  //     });
  //     // alert("Erro ao finalizar o questionário.");
  //     //  alert("Quiz finalizado com sucesso.");
  //     //  if (resposta.ok) {
  //     //    console.log(resposta);
  //     //    window.alert("Quiz finalizado com sucesso " + nome + "!");
  //     //    var fezQuest = true;
  //     //    fetch(`/usuarios/FezQuiz/${id}`, {
  //     //      method: "POST",
  //     //      headers: {
  //     //        "Content-Type": "application/json"
  //     //      },
  //     //      body: JSON.stringify({
  //     //        idUsuarioServer: id,
  //     //        fezQuestServer: fezQuest
  //     //      }),
  //     //    })

  //   };
  //  alert("Quiz finalizado com sucesso.");
  //  window.location = "../index.html";

  //   return false;
  // })

}