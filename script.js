
let currentQuestion = 0;
let correctAnswers = 0;

//evento do botao de reset
document.querySelector('.scoreArea button').addEventListener('click', reset);

showQuestion();

function showQuestion(){

    //se ainda houverem questões
    if(questions[currentQuestion]){

        let q = questions[currentQuestion];

        //calculando e atribuindo porcentagem a barra de progresso
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';

        //percorre array de respostas
        for(let i in q.options){
            optionsHtml += `<div class="option" data-op="${i}"> <span>${parseInt(i) + 1}</span> ${q.options[i]} </div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    }
    else{

        finishQuiz();
    }
}

function optionClickEvent(e){

    //recupera a resposta clicada
    clicked = parseInt(e.target.getAttribute('data-op'));

    if(clicked == questions[currentQuestion].answer){

        correctAnswers++;
    }

    //avança para a próxima pergunta e exibe
    currentQuestion ++;
    showQuestion();
}

function finishQuiz(){

    //calcula % de acertos
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Tá horriviiss..';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }
    else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Tá marromeno..';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }
    else{
        document.querySelector('.scoreText1').innerHTML = 'Vejo que és o bichão do quiz..';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML =`Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

//resetando o quiz
function reset(){

    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}

