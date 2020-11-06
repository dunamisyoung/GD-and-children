//Status
const $loginForm = document.getElementById('login-form');
const $loginBtn = document.querySelector('.login-btn');

const $userId = document.getElementById('userId');
const $userPw = document.getElementById('userPw');

//DOMs

// 로그인폼 서버와연결 기능구현
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

// 로그인폼 필터링기능 구현
$loginForm.onsubmit = (e) => {
  e.preventDefault();

  if (!$userId.value.trim()) {
    alert('아이디를 입력해주세요');
    $userId.focus();
    return;
  } else if (!$userPw.value.trim()) {
    alert('비밀번호를 입력해주세요');
    $userPw.focus();
    return;
  }

  // 이벤트 발생시에 get함수 호출
  get('/users')
    .then((users) => {
      // console.log(users);
      const checkUser = users.find((user) => {
        return user.id === $userId.value && user.pw === $userPw.value;
      });
      if (checkUser) {
        location.assign('link.html');
      } else {
        alert('아이디와 비밀번호를 입력해주세요');
      }
    })
    .catch();
};
