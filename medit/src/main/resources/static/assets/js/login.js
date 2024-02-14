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
