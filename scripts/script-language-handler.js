const translations = {
    es: {
        h1: "Lista de Tareas",
        h3: "Esto es lo que tengo que hacer:",
        label: "Agregá algo a la lista",
        addButton: "Agregar Tarea",
        langButton: "Cambiar Idioma",
        currentTime: "",
        daysOfWeek: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        emptyUl: "Todavía no hay tareas."

    },
    en: {
        h1: "To-Do List",
        h3: "This is what I have to do:",
        label: "Add something to do",
        addButton: "Add Task",
        langButton: "Change Language",
        currentTime: "",
        daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        emptyUl: "No tasks yet."
    }
}

let currentLanguage = "en"

function toggleLanguage() {
    currentLanguage = (currentLanguage === 'es') ? 'en' : 'es';
    upDateUI();
    generateCalendar(currentYear, currentMonth)
}

function upDateUI() {
    const h1 = document.getElementById("mainTitle")
    const h3 = document.getElementById("subTitle")
    const label = document.getElementById("inputLabel")
    const addButton = document.getElementById("addTaskButton")
    const langButton = document.getElementById("changeLanguageButton")
    const emptyUl = document.getElementById("taskList")
    if (h1 && h3 && label && addButton && langButton && emptyUl) {
        h1.innerText = translations[currentLanguage].h1
        h3.innerText = translations[currentLanguage].h3
        label.innerText = translations[currentLanguage].label
        addButton.innerText = translations[currentLanguage].addButton
        langButton.innerText = translations[currentLanguage].langButton
        emptyUl.innerText = translations[currentLanguage].emptyUl
    }
}

upDateUI()

const changeLanguageButton = document.getElementById("changeLanguageButton")
changeLanguageButton.addEventListener("click", () => toggleLanguage())

console.log(changeLanguageButton)