let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStopBtn").innerHTML = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        document.getElementById("startStopBtn").innerHTML = "Stop";
    }
    isRunning = !isRunning;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById("display");
    const formattedTime = formatTime(elapsedTime);
    display.innerHTML = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millisecondsPart = date.getUTCMilliseconds();

    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (millisecondsPart < 100 ? "0" : "") +
        (millisecondsPart < 10 ? "0" : "") +
        millisecondsPart
    );
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById("startStopBtn").innerHTML = "Start";
    updateDisplay();
    clearLaps();
}

function recordLap() {
    if (isRunning) {
        laps.push(formatTime(elapsedTime));
        updateLaps();
    }
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerHTML = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}

function clearLaps() {
    laps = [];
    updateLaps();
}
