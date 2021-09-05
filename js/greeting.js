const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const user = document.querySelector("#user");

const HIDDEEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(info) {
  info.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add(HIDDEEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username){
  greeting.classList.remove(HIDDEEN_CLASSNAME);
  hello.classList.remove(HIDDEEN_CLASSNAME);
  greeting.innerText = `${username}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null) {
  loginForm.classList.remove(HIDDEEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}