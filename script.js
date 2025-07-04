let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;
let timer;
let isPaused = true;
let isBreak = false;
let sessionCount = 0;

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${mins}:${secs}`;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
          document.getElementById('alarmSound').play();
          clearInterval(timer);
          timer = null;
          isBreak = !isBreak;
          timeLeft = (isBreak ? 5 : defaultMinutes) * 60;
          if (!isBreak) {
            sessionCount++;
            document.getElementById('sessionCount').textContent = sessionCount;
          }
          startTimer();
        }
      }
    }, 1000);
  }
  isPaused = false;
}

function pauseTimer() {
  isPaused = true;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = true;
  isBreak = false;
  timeLeft = defaultMinutes * 60;
  sessionCount = 0;
  document.getElementById('sessionCount').textContent = 0;
  updateDisplay();
}

function changeTimePrompt() {
  const input = prompt("Enter new time in minutes:", defaultMinutes);
  const newTime = parseInt(input);
  if (!isNaN(newTime) && newTime > 0) {
    defaultMinutes = newTime;
    timeLeft = defaultMinutes * 60;
    updateDisplay();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

updateDisplay();
