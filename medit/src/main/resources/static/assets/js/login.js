let id = document.getElementsByClassName("vector")[0];
let pw = document.getElementsByClassName("vector")[1];

id.addEventListener("click", function(e) {
  e.preventDefault;
  
  id.classList.remove("bounce");

  id.offsetWidth = id.offsetWidth;
  
  id.classList.add("bounce");
}, false);

pw.addEventListener("click", function(e) {
  e.preventDefault;
  
  pw.classList.remove("bounce");

  pw.offsetWidth = pw.offsetWidth;
  
  pw.classList.add("bounce");
}, false);


let body = document.querySelector('body');
let fingerprint = document.querySelector('.fingerprint');
let center = document.querySelector('.center');
let anno = document.querySelector('#anno');
let timer, timerSuccess;
let submit = document.querySelector("#submit");

function onSuccess() {
  body.removeEventListener('mousedown', onTouchStart);
  body.removeEventListener('touchstart', onTouchStart);

  fingerprint.classList.remove('active');
  center.classList.add('success');

  anno.className += "smooth";

  clearTimeout(timerSuccess);

  timerSuccess = setTimeout(() => {
    body.addEventListener('mousedown', onTouchStart);
    body.addEventListener('touchstart', onTouchStart);

    submit.submit();
    center.classList.remove('success');
  }, 3000);
}

function onTouchStart() {
  fingerprint.classList.add('active');
  timer = setTimeout(onSuccess, 2000);
}

function onTouchEnd() {
  fingerprint.classList.remove('active');
  clearTimeout(timer);
}

body.addEventListener('mousedown', onTouchStart);
body.addEventListener('touchstart', onTouchStart);
body.addEventListener('mouseup', onTouchEnd);
body.addEventListener('touchend', onTouchEnd);