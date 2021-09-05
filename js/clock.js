const clock = document.querySelector("#clock");
const hello = document.querySelector("#sayHello");

function time() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours >= 5 && hours < 12) {
    hello.innerText = "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    hello.innerText = "Good Afternoon";
  } else {
    hello.innerText = "Good Evening";
  }
  clock.innerText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

time();
setInterval(time, 1000);