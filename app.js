const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const emptyMsg = document.getElementById("emptyMsg");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

function addTodo(text) {
  todos.push({ id: Date.now(), text, completed: false });
  render();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

function getVisibleTodos() {
  if (currentFilter === "active") return todos.filter((t) => !t.completed);
  if (currentFilter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

function render() {
  list.innerHTML = "";
  const visible = getVisibleTodos();

  visible.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";
    del.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });

  emptyMsg.hidden = visible.length > 0;
  const remaining = todos.filter((t) => !t.completed).length;
  counter.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
});

render();