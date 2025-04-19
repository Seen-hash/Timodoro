let timeWork = 25*60;
let timeRest = 5*60;
let time = timeWork;
let isWorking = true;
let clockThing = null;

const timeCircle = document.getElementById("progress-ring");
const currentThing = document.getElementById("current");
const timeDis = document.getElementById("clockThing");
const changeText = document.getElementById("change");
const outline = Math.PI * 180;
const ding = document.getElementById("dingSound");

document.getElementById("go").addEventListener("click", beginTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("again").addEventListener("click", againTimer);

timeCircle.style.strokeDasharray = outline;

document.getElementById("dark").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

function newTimeDis() {
    
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    timeDis.textContent= `${minutes}:${seconds}`;
    const perc = time/(isWorking? timeWork:timeRest);
    timeCircle.style.strokeDashoffset = outline*(1-perc);
}

function beginTimer() {
    if (clockThing) return;
    clockThing = setInterval(() => {
        if (time > 0) {
            time--;
            newTimeDis();
          } 
          else {
            clearInterval(clockThing);
            clockThing = null;
            ding.play();
            showChange();
            setTimeout(() => {
              switched();
              begin();
            }, 5000);
          }
        }, 1000);
}

function stopTimer() {
    clearInterval(clockThing);
    clockThing = null;
}
  
  function againTimer() {
    clearInterval(clockThing);
    clockThing = null;
    time = isWorking? timeWork:timeRest;
    newTimeDis();
    hideChange();
}

function switched() {
        isWorking = !isWorking;
        time = isWorking ? timeWork:timeRest;
        currentThing.textContent = isWorking? "Time to work":"Time to rest";
        newTimeDis();
        hideChange();
        beginTimer();
}

function showChange() {
    changeText.textContent = isWorking? "Stopping..." : "Restarting...";
    changeText.classList.add("show");
}

function hideChange() { changeText.classList.remove("show"); }

document.getElementById("apply").addEventListener("click", () => {
    const customWork = parseInt(document.getElementById("worktime").value);
    const customRest = parseInt(document.getElementById("resttime").value);
    if (!isNaN(customWork)) timeWork = customWork * 60;
    if (!isNaN(customRest)) timeRest = customRest * 60;
    time = isWorking? timeWork:timeRest;
    newTimeDis();
  });

newTimeDis();
