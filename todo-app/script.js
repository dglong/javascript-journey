const todoInputElement = document.getElementById("todo-input");
const todoListElement = document.getElementById("todo-list");
let todoList = [];

// Initialize app
appInitialize();

function appInitialize() {
  getTodoListFromLocalStorage();
  console.log(todoList);
  for (todoItem of todoList) {
    addTodoItemElement(todoItem);
  }
}

todoInputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    todoInputElement.value ? addTodoItem(todoInputElement.value) : null;
    todoInputElement.value = "";
  }
});

function addTodoItem(value) {
  // Set up todoItem
  let todoItem = {
    id: Date.now(),
    label: value,
    status: "not-finished",
  };
  todoList.push(todoItem);

  // Set up todoItemELement
  addTodoItemElement(todoItem);

  // Save data
  saveTodoListToLocalStorage();

  console.log(todoList);
}

function addTodoItemElement(todoItem) {
  let todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";
  todoItemElement.innerText = todoItem.label;
  todoItemElement.id = `todo-item-${todoItem.id}`;
  todoItemElement.addEventListener("click", onTodoItemClick);
  todoListElement.insertBefore(todoItemElement, todoListElement.firstChild);
}

function onTodoItemClick(e) {
  const itemId = parseInt(e.target.id.replace("todo-item-", ""));
  todoList.map((item) => {
    if (item.id === itemId) {
      item.label += "Clicked";
      e.target.innerText = item.label;
    }
  });
}

function saveTodoListToLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

function getTodoListFromLocalStorage() {
  todoList = JSON.parse(localStorage.getItem("todo-list")) ?? [];
}
