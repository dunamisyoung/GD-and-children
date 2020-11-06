// 해설 보기 페이지 js
window.onload = e => {
  if(!sessionStorage.getItem('login')){
    alert('로그인이 필요합니다');
    location.assign('/')
  }
}

// Doms
const $questionBox = document.querySelector('.question-box');
const $title = document.querySelector('.title');

let joinCode = sessionStorage.getItem('joinCode');

// get 함수
const get = url => {
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
    }
  });
}


get(`/question/${joinCode}`) 
  .then(question => {
    const keys = Object.keys(question);
 
    $title.textContent = question.title;
    keys.forEach((key, i) => {
      if(i < 2) return;

      const quiz = question[`Q${i - 1}`];

        $questionBox.innerHTML += `
        <div class="question-content">
        <div class="question-line">
          <h2 class="question-title">
            <span>Q-${quiz.id}</span>
            ${quiz.question}
          </h2>
        </div>
        <div class="question-line">
          <p class="question-score">
            <span>score</span>
            ${quiz.score}
          </p>
        </div>
        <div class="question-line">
          <p class="question-answer">
            <span>answer</span>
            ${quiz.answer}
          </p>
        </div>
        <div class="question-line">
          <p class="question-solution">
            <span>solution</span>
            ${quiz.solution}
          </p>
        </div>
      </div>
        `
    })
  })

