const calendarContainer = document.getElementById("calendar")
const currentTimeContainer = document.getElementById("current-time")
const inputField = document.getElementById("taskInput")

currentTimeContainer.textContent = "Loading..."

function updateTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const timeString = `${hours}:${minutes}:${seconds}`
    const dateString = now.toLocaleDateString(currentLanguage === 'en' ? 'en-EN' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

    currentTimeContainer.textContent = `${translations[currentLanguage].currentTime} ${dateString} | ${timeString}`
}

function generateCalendar(year, month) {
    const firstDay = new Date(year, month).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    calendarContainer.innerHTML = ""

    const daysOfWeek = translations[currentLanguage].daysOfWeek

    daysOfWeek.forEach(day => {
        const headerDiv = document.createElement("div")
        headerDiv.classList.add("header")
        headerDiv.textContent = day
        calendarContainer.appendChild(headerDiv)
    });

    const currentDate = new Date()
    const currentDay = currentDate.getDate()

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div")
        calendarContainer.appendChild(emptyDiv)
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div")
        dayDiv.classList.add("day")
        dayDiv.textContent = day

        if (day === currentDay && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            dayDiv.classList.add("today");
        }

        dayDiv.addEventListener("click", () => {
            const selectedDayName = daysOfWeek[new Date(year, month, day).getDay()]
            inputField.value = `${selectedDayName}, ${day}`
        });

        calendarContainer.appendChild(dayDiv)
    }
}

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()

generateCalendar(currentYear, currentMonth)

setInterval(updateTime, 1000)
