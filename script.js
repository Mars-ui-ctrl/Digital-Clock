const clock = document.getElementById("clock");
const date = document.getElementById("date");
const clockTic = document.querySelector(".clock-tic");
const alarmSound = document.querySelector(".alarm-sound");
const newDate = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amOrpm;

    if (hours >= 12) {
        amOrpm = "PM";
    }
    else {
        amOrpm = "AM";
    }



    if (hours == 0) {
        hours = 12;
    }
    else if (hours > 12) {
        hours = hours - 12;

    }

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds} ${amOrpm}`;
    clock.textContent = time;

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let currWeekDay = days[now.getDay()];
    let curDay = now.getDate();
    let currMonth = months[now.getMonth()];
    let curryear = now.getFullYear();
    let dateString = `${currWeekDay}, ${curDay} ${currMonth} ${curryear}`;
    date.textContent = dateString;

    // if (seconds === 0) {
    //     // Play the clock tick sound
    //     clockTic.currentTime = 0; // Reset audio to start
    //     clockTic.play().catch(e => console.log("Audio play failed:", e));
    // }
}
setInterval(newDate, 1000);
newDate();

function setTheme(theme) {
    document.body.className = theme;
}
function setAlarm() {
    const alarmTimeInput = document.getElementById("alarmtime").value;
    const [alarmHour, alarmMinute] = alarmTimeInput.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date();
    alarmDate.setHours(alarmHour);
    alarmDate.setMinutes(alarmMinute);
    alarmDate.setSeconds(0);
    alarmDate.setMilliseconds(0);

    if (alarmDate.getTime() < now.getTime()) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }
    const timeToAlarm = alarmDate.getTime() - now.getTime();

    if (timeToAlarm > 0) {
        const alarmBtn = document.querySelector('[onclick="setAlarm(\'alarm-btn\')"]');
        alarmBtn.style.backgroundColor = '#ff4444';
        alarmBtn.style.color = 'white';
        alarmBtn.textContent = 'Alarm Set!';
                setTimeout(() => {
            alarmSound.currentTime = 0;
            alarmSound.play();
            alert('Time to wake up sleepy!');
            alarmSound.pause(); // Stop sound when user clicks OK
            alarmSound.currentTime = 0;
            alarmBtn.style.backgroundColor = '';
            alarmBtn.style.color = '';
            alarmBtn.textContent = 'Set Alarm';
        }, timeToAlarm);
        console.log(`Alarm set for: ${alarmDate.toLocaleString()}`);

    } else {
        console.log('Invalid alarm time or alarm already passed.');
    }

}


