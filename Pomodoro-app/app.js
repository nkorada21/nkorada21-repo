const bells = new Audio('./sounds/mixkit-service-bell-931.wav');
const startBtn = document.querySelector('.button-start');
const pauseBtn = document.querySelector('.button-pause');
const resetBtn = document.querySelector('.button-reset');
const session = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
let myInterval;
let state = true;  // Controls if timer can start
let isPaused = false; // Controls pause/resume
let totalSeconds; // Holds remaining time

// Main Timer Function
const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent)

    if(state) {
        state = false;
        totalSeconds = sessionAmount * 60; // assign to global

        const updateSeconds = () => {
            // Function code here.
            if (!isPaused) {
                totalSeconds--;
            
            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;

            // Update seconds with leading 0
            if(secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            // Update minutes
            session.textContent = `${minutesLeft}`

            //Timer finished
            if(minutesLeft === 0 && secondsLeft === 0) {
                console.log("Timer ended! Playing bell.");
                bells.volume = 1.0;
                bells.currentTime = 0;
                bells.play().catch(err => console.error("Autoplay blocked:", err));
                clearInterval(myInterval);
                state = true;
            }
        }
        };
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
};

// Pause / Resume Button
const togglePause = () => {
    if (!state) { // Only works if timer already started
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'RESUME' : 'PAUSE';
    }
};

// Reset Button
const resetTimer = () => {
    clearInterval(myInterval);
    state = true;
    isPaused = false;
    pauseBtn.textContent = 'PAUSE';

    // Reset display back to default 25:00
    session.textContent = '25';
    secondDiv.textContent = '00';
};


// Event Listeners
startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetTimer);