/* =======================================================
   BÀI 01 – TODO MATRIX
======================================================= */

const MSSV = "231A011102";  
const lastDigit = Number(MSSV[MSSV.length - 1]);
const storageKey = "tasks_" + MSSV;

let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function renderTasks() {
  ["p1","p2","p3","p4"].forEach(id => {
    let title = document.querySelector(`#${id} h3`).innerText;
    document.getElementById(id).innerHTML = `<h3>${title}</h3>`;
  });

  tasks.forEach((t, index) => {
    let div = document.createElement("div");
    div.className = "task-item";

    // Logic chống AI
    if (t.name.length > 10) {
      div.style.color = lastDigit % 2 === 0 ? "red" : "blue";
    }

    div.innerHTML = `
      <span>${t.name}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `;

    document.getElementById("p" + t.priority).appendChild(div);
  });
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
}

// Sự kiện thêm task
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("btnAddTask");

  if (addBtn) {
    addBtn.onclick = function() {
      let name = document.getElementById("taskName").value.trim();
      let pr = Number(document.getElementById("taskPriority").value);

      if (!name) return alert("Nhập tên công việc!");

      tasks.push({ name, priority: pr });
      saveTasks();
      renderTasks();

      document.getElementById("taskName").value = "";
    };

    renderTasks();
  }
});

/* =======================================================
   BÀI 02 – GAME ĐOÁN SỐ
======================================================= */

let randomNum, attempts;

function newGame() {
  randomNum = Math.floor(Math.random()*100) + 1;
  attempts = 0;

  const guess = document.getElementById("guess");
  const msg = document.getElementById("message");
  const cnt = document.getElementById("count");
  const restart = document.getElementById("btnRestart");

  if (!guess) return;

  guess.value = "";
  msg.textContent = "";
  cnt.textContent = "";
  guess.disabled = false;

  restart.classList.add("hidden");
  document.getElementById("confetti").innerHTML = "";
}

function checkGuess() {
  let val = Number(document.getElementById("guess").value);
  let msg = document.getElementById("message");
  let cnt = document.getElementById("count");
  let restart = document.getElementById("btnRestart");

  if (isNaN(val) || val < 1 || val > 100) {
    msg.textContent = "Nhập số từ 1-100!";
    return;
  }

  attempts++;
  cnt.textContent = `Số lần thử: ${attempts}`;

  if (val === randomNum) {
    msg.textContent = "🎉 Chính xác!";
    document.getElementById("guess").disabled = true;
    restart.classList.remove("hidden");
    showConfetti();
  } 
  else if (val > randomNum) msg.textContent = "Quá cao!";
  else msg.textContent = "Quá thấp!";
}

function showConfetti() {
  const box = document.getElementById("confetti");
  for (let i = 0; i < 80; i++) {
    let c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.left = Math.random()*100 + "%";
    c.style.background = `hsl(${Math.random()*360}, 70%, 50%)`;
    box.appendChild(c);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let btnGuess = document.getElementById("btnGuess");
  let btnRestart = document.getElementById("btnRestart");

  if (btnGuess) btnGuess.onclick = checkGuess;
  if (btnRestart) btnRestart.onclick = newGame;

  newGame();
});
