// State
const $questionBox = document.querySelector('.question-box');
const $title = document.querySelector('.title');
const $saveBtn = document.querySelector('.save-btn');
const $solvedQuestion = document.querySelector('.solved-question');
const $questionForm = document.querySelector('.question-form');
let $questionInputs = document.querySelectorAll('.question-input');

const joinCode = 'QA332';

const get = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

get(`/question/${joinCode}`).then((question) => {
  $title.textContent = question.title;

  Object.keys(question).forEach((list, index) => {
    if (index < 2) return;

    $questionBox.innerHTML += `<div class="question-box">
    <div class="question-content">
      <div class="question-line">
        <h2 class="question-title">
          <span>Q-${`${question[list].id}`}</span>
          ${`${question[list].question}`}
        </h2>
      </div>
      <div class="question-line">
        <p class="question-score">
          <span>score</span>
          ${`${question[list].score}`}
        </p>
      </div>
      <div class="question-line">
        <label for="questionAnswer-${`${question[list].id}`}" class="question-label"> answer </label>
        <input type="text" id="questionAnswer-${`${question[list].id}`}" class="question-input" autocomplete="off" />
      </div>
    </div>
  </div>`;
  });
  $questionInputs = document.querySelectorAll('.question-input');
  $solvedQuestion.lastElementChild.textContent = $questionInputs.length;
  $questionForm.addEventListener('focusout', (e) => {
    let filledinputArr = [];
    [...$questionInputs].forEach((questionInput) => {
      if (questionInput.value.trim()) filledinputArr.push(questionInput);
    });
    $solvedQuestion.firstElementChild.textContent = filledinputArr.length;
  });

  $questionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const warn = confirm('제출하시겠습니까?');
    if (warn) {
      let score = 0;

      for (let i = 1; i <= $questionInputs.length; ++i) {
        if (question[`Q${i}`]['answer'] === $questionInputs[i - 1].value) {
          score += +question[`Q${i}`]['score'];
        }
      }
      sessionStorage.setItem('joinCode', score);
      alert('제출완료');
      location.assign('result.html');
    } else {
      alert('다시제출해주세요');
      return;
    }
  });
});
