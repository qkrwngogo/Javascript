const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function handleCheckBox(event) {
  
  if (event.target.checked) {
    event.target.setAttribute("checked", "");
    event.target.parentElement.classList.add("checked");
  } else {
    event.target.removeAttribute("checked");
    event.target.parentElement.classList.remove("checked");
  }
  const id = event.path[1].id;
  const targetId = toDos.findIndex((toDo) => toDo.id == id);
  toDos[targetId].isChecked = event.target.checked;
  saveToDos();
}

function convertDate(date) {
  const year = String(date.getFullYear()).substr(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}`;
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const parentLi = event.target.parentElement;
  parentLi.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(parentLi.id));
  saveToDos();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const checkBox = document.createElement("input");
  const span = document.createElement("span");
  const time = document.createElement("span");
  const button = document.createElement("i");
  checkBox.className = "check-box";
  checkBox.type = "checkbox";

  if (newToDo.isChecked) {
    checkBox.setAttribute("checked", "");
    li.classList.add("checked");
  } else {
    checkBox.removeAttribute("checked");
    li.classList.remove("checked");
  }

  checkBox.addEventListener("click", handleCheckBox);
  button.setAttribute("class", "fas fa-times");
  button.addEventListener("click", deleteToDo);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(time);
  li.appendChild(button);
  span.innerText = newToDo.text;
  time.innerText = convertDate(new Date(newToDo.id));
  toDoList.appendChild(li);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
    isChecked: false,
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
