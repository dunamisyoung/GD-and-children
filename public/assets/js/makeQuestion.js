// 문제 만들기 페이지 js

let $questionContents = document.querySelectorAll('.question-content');
const $questionBox = document.querySelector('.question-box');
const $plusBtn = document.querySelector('.plus-btn');
const $saveBtn = document.querySelector('.save-btn');

let $titleInput = document.querySelector('.title-input');
let $questionInputs = document.querySelectorAll('.question-input');
let $questionTextareas = document.querySelectorAll('.question-textarea');


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
};

const post = (url, payload) => {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));
  
      xhr.onload = () => {
        if (xhr.status === 201) {
          resolve();
        } else {
          reject(new Error(xhr.status));
        }
      }
  })
}

// 참여코드 생성
const makeCode = () => {
  let code = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i=0; i < 5; i++ )
  code += possible.charAt(Math.floor(Math.random() * possible.length));

  return code;
  };

  let num = 2;
  
  // 문제 추가 버튼 클릭 이벤트
  $plusBtn.onclick = e => {
  $questionBox.innerHTML += `
  <div class="question-content">
    <div class="question-line">
      <label for="questionTitle-${num}" class="question-label">Q-${num}</label>
      <input
        type="text"
        id="questionTitle-${num}"
        class="question-input"
        autocomplete="off"
      />
    </div>
    <div class="question-line">
      <label for="questionScore-${num}" class="question-label"
        >score</label
      >
      <input
        type="number"
        id="questionScore-${num}"
        class="question-input"
        autocomplete="off"
      />
    </div>
    <div class="question-line">
      <label for="questionAnswer-${num}" class="question-label"
        >answer</label
      >
      <input
        type="text"
        id="questionAnswer-${num}"
        class="question-input"
        autocomplete="off"
      />
    </div>
    <div class="question-line">
      <label
        for="questionSolution-${num}"
        class="question-label label-textarea"
        >solution</label
      >
      <textarea
        id="questionSolution-${num}"
        class="question-textarea"
      ></textarea>
    </div>
  </div>`

  $titleInput = document.querySelector('.title-input');
  $questionInputs = document.querySelectorAll('.question-input');
  $questionTextareas = document.querySelectorAll('.question-textarea');
  $questionContents = document.querySelectorAll('.question-content');
  num++;
}

// 저장 버튼 클릭 이벤트
$saveBtn.onclick = e => {
  
  // 생성 시 빈칸 확인
  if ($titleInput.value.trim() === '') {
    alert('빈 칸을 확인해 주세요');
    $titleInput.focus();
    return;
  };

  [...$questionInputs].forEach(question => {
    // 라이브객체 -> 배열로 만들어야 함
    if (question.value.trim() === '') {
      alert('빈 칸을 확인해 주세요');
      question.focus();
      return; 
    }
  });

  [...$questionTextareas].forEach(questionText => {
    if (questionText.value.trim() === '') {
      alert('빈 칸을 확인해 주세요');
      questionText.focus();
      return; 
    }
  })

  let joinCode = makeCode();

  get(`/question`)
  .then(questions =>{
    // 참여 코드 중복 확인
    while (questions.find(question => question.id === joinCode)) {
      joinCode = makeCode();
    }

    // 새로운 퀴즈(페이로드) 생성
    let newQuiz = {};

    newQuiz['id'] = joinCode;
    newQuiz['title'] = $titleInput.value;
    
    [...$questionContents].forEach((_, i) => {
      newQuiz[`Q${i + 1}`] = {};

      const $questionTitle = document.getElementById(`questionTitle-${i + 1}`);
      const $questionScore = document.getElementById(`questionScore-${i + 1}`);
      const $questionAnswer = document.getElementById(`questionAnswer-${i + 1}`);
      const $questionSolution = document.getElementById(`questionSolution-${i + 1}`);

      
      newQuiz[`Q${i + 1}`].id = i + 1;
      newQuiz[`Q${i + 1}`].question = $questionTitle.value;
      newQuiz[`Q${i + 1}`].answer = $questionAnswer.value;
      newQuiz[`Q${i + 1}`].score = $questionScore.value;
      newQuiz[`Q${i + 1}`].solution = $questionSolution.value;
    });

    alert('새로운 문제가 생성되었습니다!');

    post('/question', newQuiz)
    .then(() =>{
      location.assign('/solution.html');
    })
    .catch(err => console.error(err));


  }).catch(err => console.error(err));
}










