// 문제 만들기 페이지 js

const $questionContent = document.querySelector('.question-content');
const $questionBox = document.querySelector('.question-box');
const $plusBtn = document.querySelector('.plus-btn');
const $saveBtn = document.querySelector('.save-btn');

const $titleInput = document.querySelectorAll('.title-input');
const $questionInputs = document.querySelectorAll('.question-input');
const $questionTextareas = document.querySelectorAll('.question-textarea');


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
          resolve(JSON.parse(xhr.respones));
        } else {
          reject(new Error(xhr.status));
        }
      }
  })
}

let num = 2;

// 문제 추가 버튼
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

  num++;
}

$saveBtn.onclick = e => {
  
  // 생성 시 빈칸 확인
  if ($titleInput.value.trim() === '') {
    alert('빈 칸을 확인해 주세요');
    $titleInput.focus();
    return;
  };

  // 라이브객체 -> 배열로 만들어야 함
  [...$questionInputs].forEach(question => {
    if ($questionInputs.value.trim() === '') {
      alert('빈 칸을 확인해 주세요');
      question.focus();
      return; 
    }
  });
  [...$questionTextareas].forEach(questionText => {
    if ($questionTextareas.value.trim() === '') {
      alert('빈 칸을 확인해 주세요');
      questionText.focus();
      return; 
    }
  })

  get('/question')
  .then(questions =>{
      // 참여코드 생성
      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      };

      // 참여코드 중복 확인

      // 페이로드 생성

    const test = [
      {
        id: "1",
        question: "아디다스",
        answer: "HTML",
        score: "30",
        solution: "HTML이 웹페이지 뼈대를 완성합니다."
      },
      {
        id: "2",
        question: "아디다스?",
        answer: "CSS",
        score: "50",
        solution: "CSS가 웹페이지 디자인을 완성합니다."
      },
      {
        title: "패스트캠퍼스 문제",
        code: "QA123"
      }
    ];

    post('/question', test)
    .then(question => console.log(question))
    .catch(err => console.error(err));
  }).catch(err => console.error(err));
}










