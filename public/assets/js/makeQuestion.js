// 문제 만들기 페이지 js

const $questionContent = document.querySelector('.question-content');
const $questionBox = document.querySelector('.question-box');
const $plusBtn = document.querySelector('.plus-btn');
const $saveBtn = document.querySelector('.save-btn');

let num = 2;

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

const promisePost = (url, payload) => {
  return new Promise((resolve, reject) => {
      const xhr = XMLHttpRequest();
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

promisePost('/users', {

})
.then()
.catch(err => console.error(err));