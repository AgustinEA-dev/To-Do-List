const calendarContainer = document.getElementById("calendar");
const currentTimeContainer = document.getElementById("current-time");
const inputField = document.getElementById("taskInput")

currentTimeContainer.textContent = "Loading..."

// Función para cambiar el fondo según la hora del día
function setDayNightMode() {
    const now = new Date();
    const hour = now.getHours(); // Obtener la hora actual (de 0 a 23)

    const body = document.body;

    if (hour >= 6 && hour < 18) {
        // Día: establecer la clase 'day-background'
        body.classList.remove('night-background');
        body.classList.add('day-background');
    } else {
        // Noche: establecer la clase 'night-background'
        body.classList.remove('day-background');
        body.classList.add('night-background');
    }
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = now.toLocaleDateString(currentLanguage === 'en' ? 'en-EN' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    currentTimeContainer.textContent = `${translations[currentLanguage].currentTime} ${dateString} | ${timeString}`;
}

function generateCalendar(year, month) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarContainer.innerHTML = "";

    const daysOfWeek = ["Sun", "Mon", "Thue", "Wed", "Thur", "Fry", "Sat"];

    daysOfWeek.forEach(day => {
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("header");
        headerDiv.textContent = day;
        calendarContainer.appendChild(headerDiv);
    });

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;

        if (day === currentDay && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            dayDiv.classList.add("today");
        }

        calendarContainer.appendChild(dayDiv);
    }

    dayDiv.addEventListener("click", () => {
        const selectedDayName = daysOfWeek[new Date(year, month, day).getDay()];
        inputField.value = `${selectedDayName}, ${day}`;
    });

    calendarContainer.appendChild(dayDiv);
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

setDayNightMode();

generateCalendar(currentYear, currentMonth);

setInterval(updateTime, 1000);

setInterval(setDayNightMode, 3600000); // Verifica la hora cada hora (3600000ms)