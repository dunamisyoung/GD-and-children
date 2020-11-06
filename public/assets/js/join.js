// 회원가입 페이지 js

// state

// Doms
$joinForm = document.getElementById('joinForm');
$inputUserId = document.getElementById('userId');
$inputUserPw = document.getElementById('userPw');
$inputUserPwConfirm = document.getElementById('userPwConfirm');
$inputUserName = document.getElementById('userName');
$userPosition = document.getElementById('userPosition');


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
        reject(console.error(xhr.status));
      }
    }
  })
}


// post 함수
const post = (url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 201) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(console.error(xhr.status));
      }
    }
  })
}

// 양식 제출 이벤트
$joinForm.onsubmit = e => {
  e.preventDefault();
  get('/users')
    .then(users => {
      if (!$inputUserId.value) {
        alert('아이디를 입력하세요');
        $inputUserId.focus();
        return;
      } else if ($inputUserId.value.length < 4) {
        alert('아이디를 4자리 이상 입력해주세요');
        $inputUserId.focus();
        return;
      } else if($inputUserPw.value.length < 4) {
        alert('비밀번호를 4자리 이상 입력해주세요');
        $inputUserPw.focus();
        return;
      } else if (!$inputUserPw.value) {
        alert('비밀번호를 입력하세요');
        $inputUserPw.focus();
        return;
      } else if (!$inputUserPwConfirm.value) {
        alert('비밀번호를 입력하세요');
        $inputUserPwConfirm.focus();
        return;
      } else if (!$inputUserName.value) {
        alert('이름을 입력하세요');
        $inputUserName.focus();
        return;
      } else if ($inputUserPw.value !== $inputUserPwConfirm.value) {
        alert('비밀번호가 일치하지 않습니다');
        $inputUserPwConfirm.focus();
        return;
      }

      // ID 중복확인을 위한 변수
      const checkIdValid = users.find(user => user.id === $inputUserId.value)

      if (checkIdValid) {
        alert('이미 사용중인 아이디가 있습니다');
        $inputUserId.focus();
        return;
      }

      // post get, catch
      post('/users', {
        id: $inputUserId.value,
        pw: $inputUserPw.value,
        name: $inputUserName.value,
        position: $userPosition.value
      })
      .then(() => {
        alert('회원가입에 성공했습니다');
        location.assign('/');
      })
      .catch(err => {
        alert('데이터를 저장하지 못했습니다' + err)
      })
    })
    
    // get catch
    .catch(err => {
      alert('데이터를 불러오지 못했습니다' + err);
    })
}