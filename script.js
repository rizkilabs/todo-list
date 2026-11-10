let tasks = [];

let editingId = null;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty">Belum ada task</li>';
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    if (task.done) li.classList.add("done");

    if (task.id === editingId) {
      // mode edit
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "edit-input";
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(task.id, input.value);
        if (e.key === "Escape") cancelEdit();
      });

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Simpan";
      saveBtn.addEventListener("click", () => saveEdit(task.id, input.value));

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Batal";
      cancelBtn.addEventListener("click", cancelEdit);

      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
      taskList.appendChild(li);
      input.focus();
      return;
    }

    // mode normal
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false,
  });

  taskInput.value = "";
  taskInput.focus();
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  );
  renderTasks();
}

function startEdit(id) {
  editingId = id;
  renderTasks();
}

function cancelEdit() {
  editingId = null;
  renderTasks();
}

function saveEdit(id, newText) {
  const text = newText.trim();
  if (text === "") return; // tidak boleh kosong

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: text } : task,
  );
  editingId = null;
  renderTasks();
}

renderTasks();
