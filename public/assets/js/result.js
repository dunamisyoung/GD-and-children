// 시험 결과 페이지 js

const score = 95;

const $score = document.querySelector('.score');
const $solutionBtn = document.querySelector('.solution-btn');
const $homeBtn = document.querySelector('.home-btn');

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


get(`/question`)
.then(() => {
  $score.textContent = `${score}점`;
}).catch();
