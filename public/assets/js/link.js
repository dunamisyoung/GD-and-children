// 링크 입력 페이지 js

// 페이지 로딩 시 , 로그인이 되어있지 않다면 login.html로 이동
window.onDOMContentLoaded = e => {
  if(!sessionStorage.getItem('login')){
    alert('로그인이 필요합니다');
    location.assign('/')
  }
}

// Doms
const $createQuestion = document.querySelector('.create-question');
const $linkForm = document.getElementById('linkForm');
const $linkInput = document.getElementById('linkInput');
const $logOut = document.getElementById('logOut');

// 세션 스토리지의 login을 키로 갖는 객체의 position 프로퍼티만 획득
const {position} = JSON.parse(sessionStorage.getItem('login'));

if(position === 'student') {
  $createQuestion.style.display = 'none';
}

const get = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if(xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error());
      }
    }
  })
}

$linkForm.onsubmit = e => {
  e.preventDefault();

  get(`/question`)
    .then((questions) => {
      const linkValid = questions.find(question => $linkInput.value === question.id);
      if(linkValid) {
        sessionStorage.setItem('joinCode', `${$linkInput.value}`);
        location.assign('/exam.html');
      } else {
        alert('올바른 참여 코드를 입력하세요');
        $linkInput.focus();
      }
    })
}

$logOut.onclick = e => {
  // log-out 시 세션 스토리지에서 
  sessionStorage.removeItem('login');
  location.assign('/')
}






