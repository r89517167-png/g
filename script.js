
// دریافت کارهای ذخیره شده
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// نمایش کارها
function renderTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.done) {
            li.classList.add("done");
        }

        span.onclick = function() {
            tasks[index].done = !tasks[index].done;
            saveTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";

        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCounter();
}

// اضافه کردن کار جدید
function addTask() {
    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        done: false
    });

    input.value = "";

    saveTasks();
}

// ذخیره کارها
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// شمارش کارهای باقی مانده
function updateCounter() {
    const remaining = tasks.filter(function(task) {
        return !task.done;
    }).length;

    document.getElementById("counter").textContent =
        remaining + " کار باقی مانده";
}

// اجرای اولیه برنامه
renderTasks();
