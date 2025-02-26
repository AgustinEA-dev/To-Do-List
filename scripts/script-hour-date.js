const calendarContainer = document.getElementById("calendar");
const currentTimeContainer = document.getElementById("current-time");

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const dateString = now.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' });

    currentTimeContainer.textContent = `Date: ${dateString} | Hour: ${timeString}`;
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
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

generateCalendar(currentYear, currentMonth);

setInterval(updateTime, 1000);