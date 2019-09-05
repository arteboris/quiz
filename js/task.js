'use strict';

import quiz from './quiz-data.js';

console.log(quiz);

const refs = {
    container: document.querySelector(".container"),
    form: document.querySelector(".form"),
    btn: document.querySelector(".btn")
}

//********************Заголовок текста***********///////


function createQuizTitle(titleText) {
 return   `<h2 class="title-quiz"> ${titleText}</h2> `
}

// refs.container.insertAdjacentHTML("afterbegin", createQuizTitle(quiz.title));

//**********************Вопросы *****************///////
 
function createQuizHtml(questions) {
const array = questions
.map((text, elem) =>

 `<li>
        <section class="js-question-${elem}">
            <h3>${text.question}</h3>
                <ol>
                ${createQuestion(text, elem)}
                </ol>
        </section>
  </li>`
 )
 .join(''); 

 return `<ul class="same-question">${array}</ul>`;
}

function createQuestion({ choices }, string) {
    return choices
      .map(
        (choic, str) => `<li>
      <input type="radio" value="${str}" id="test-${string}${str}" name="radio-group${string}" />
      <label for="test-${string}${str}" class="js-answer-$string}${str}">${choic}</label>
      </li>`,
      )
      .join('');
  }

function drawHtml({title, questions}) {
    const allPreparedHtml = createQuizTitle(title) + createQuizHtml(questions);
    const quizEll = document.querySelector('.form');
    quizEll.insertAdjacentHTML('afterbegin', allPreparedHtml);
}

drawHtml(quiz);


  
  // *********************Проверка результатов теста***************************//
  
  function answerValidation(dataArr, objectTest) {
    const { questions } = objectTest;
    const correctAnswers = questions.map(({ answer }) => answer);
    let sumCorectAnswer = 0;
    for (let i = 0; i < correctAnswers.length; i += 1) {
      if (dataArr.hasOwnProperty(`radio-group${i}`)) {
        if (dataArr[`radio-group${i}`] === correctAnswers[i]) {
          document.querySelector(`.js-answer-${i}${correctAnswers[i]}`);
          sumCorectAnswer += 1;
        } else {
          const querySelector = `.js-question-${i} input[type=radio]:checked+label`;
          document.querySelector(querySelector).classList.add('falseAnswer');
        }
      } else {
        const unansweredQuestion = document.querySelector(`.js-question-${i}`);
        unansweredQuestion.classList.add('empty-answer');
      }
    }
    const unChecked = document.querySelectorAll('.same-question input[type=radio], .btn');
    unChecked.forEach(input => input.setAttribute('disabled', 'disabled'));
    outputResult(correctAnswers.length, sumCorectAnswer);
  }
 
  
  function outputResult(numberOfQestions, numberOfCorrectAnswers) {
    let resultPercent = (100 / numberOfQestions) * numberOfCorrectAnswers;
    resultPercent = Math.round(resultPercent);
    let messageTitle;
    let classResult;
    if (resultPercent > 80) {
      messageTitle = 'Вы прошли тест успешно!';
      classResult = 'grean-text-number';
    } else {
      messageTitle = 'Tест не пройден';
      classResult = 'red-text-number';
    }
    const htmlResult = `<h3 class="result-test-title number">${messageTitle}</h3>
    <p class="result-points">набрали <span class="number">${resultPercent}</span> балов</p>
    <p class="result-statistic"> правильных ответов <span class="number">${numberOfCorrectAnswers}</span> из
    <span class="number">${numberOfQestions}</span> </p>`;
  
    const moalWind = document.querySelector('.modal-result');
    moalWind.classList.add('open-modal', classResult);
    moalWind.querySelector('.modal-window').insertAdjacentHTML('afterbegin', htmlResult);
    const buttonModal = '<button class="btn js-open-modal" type="submit">Результаты</button>';
    moalWind.insertAdjacentHTML('beforebegin', buttonModal);
    modalWindows();
  }
  
  //  Открытие / Закрытие модального окна результатов
  
  function openModal() {
    document.querySelector('.modal-result').classList.add('open-modal');
    window.addEventListener('keydown', handlKeyPress);
  }


  
  function closeModal() {
    document.querySelector('.modal-result').classList.remove('open-modal');
    window.removeEventListener('keydown', handlKeyPress);
  }
  
  function handlKeyPress(event) {
    if (event.code !== 'Escape') {
      return;
    }
    closeModal();
  }
  
  function modalWindows() {
    const openModalBtn = document.querySelector('.js-open-modal');
    const closeModalResult = document.querySelector('.close-modal-result');
    const backdrop = document.querySelector('.wrap-result');
    backdrop.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      closeModal();
    });
    closeModalResult.addEventListener('click', closeModal);
    openModalBtn.addEventListener('click', openModal);
  }
  
  
  

  //***********вызываем проверку *****************//
  
  function testСheck(objectTest) {
  
    const quizForm = document.querySelector('.form');
  
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formDataObj = {};
      formData.forEach((val, key) => {
        formDataObj[key] = Number(val);
      });
      answerValidation(formDataObj, objectTest);
    });
  
  }
  
  
  testСheck(quiz);