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

// change To Do
function changeToDo(event) {
  event.preventDefault();
  const parentLi = event.target.parentElement;
  const curInput = parentLi.querySelector(".todo-list__text input");
  const curCheckBox = parentLi.querySelector(".todo-list__check-box");
  const newLabel = document.createElement("label");
  newLabel.classList.add("todo-list__text");
  newLabel.htmlFor = curCheckBox.id;
  newLabel.innerText = curInput.value;
  const newText = toDos.findIndex((toDo) => toDo.id == parentLi.id);
  toDos[newText].text = newLabel.innerText;
  parentLi.replaceChild(newLabel, event.target);
  
  
  saveToDos();
}

function convertDate(date) {
  const year = String(date.getFullYear()).substr(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `<span>${year}.${month}.${day}</span><span>${hour}:${minute}</span>`;
}

// edit To Do
function editTodo(event) {
  const parentLi = event.target.parentElement;
  const curLabel = parentLi.querySelector(".todo-list__text");
  const editForm = document.createElement("form");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.setAttribute("required","");
  editForm.classList.add("todo-list__text");
  editInput.placeholder = curLabel.innerText;
  editForm.appendChild(editInput);
  parentLi.replaceChild(editForm, curLabel);
  editForm.addEventListener("submit", changeToDo);
}

// save To Do
function saveToDos() {
  console.log(toDos.length);
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete To Do
function deleteToDo(event) {
  const parentLi = event.target.parentElement;
  parentLi.classList.add("removing");
  setTimeout(function () {
    parentLi.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(parentLi.id));
    saveToDos();
  }, 700);
}

// load To Do
function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const time = document.createElement("label");
  const edit = document.createElement("i");
  const button = document.createElement("i");

  //checkBox
  checkBox.classList.add("todo-list__check-box");
  checkBox.id = newToDo.id - 1;
  checkBox.type = "checkbox";
  if (newToDo.isChecked) {
    checkBox.setAttribute("checked", "");
    li.classList.add("checked");
  } else {
    checkBox.removeAttribute("checked");
    li.classList.remove("checked");
  }
  checkBox.addEventListener("click", handleCheckBox);

  // label
  label.classList.add("todo-list__text");
  label.htmlFor = `${checkBox.id}`;

  // time
  time.classList.add("todo-list__time");
  time.htmlFor = `${checkBox.id}`;

  // edit
  edit.setAttribute("class", "fas fa-pencil-alt fa-2x");
  edit.classList.add("todo-list__button");
  edit.addEventListener("click", editTodo);

  // button
  button.setAttribute("class", "fas fa-times");
  button.classList.add("todo-list__button");
  button.addEventListener("click", deleteToDo);

  li.appendChild(checkBox);
  li.appendChild(label);
  li.appendChild(time);
  li.appendChild(edit);
  li.appendChild(button);
  label.innerText = newToDo.text;
  time.innerHTML = convertDate(new Date(newToDo.id));
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
