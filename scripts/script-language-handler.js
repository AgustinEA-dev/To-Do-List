const translations = {
    es: {
        h1: "Lista de Tareas"
    },
    en: {
        h1: "To-Do List"
    }
}

let currentLanguage = "en"

function toggleLanguage() {
    currentLanguage = (currentLanguage === 'es') ? 'en' : 'es';
    upDateUI();
}

function upDateUI() {
    const h1 = document.getElementById("mainTitle")
    if (h1) {
        h1.innerText = translations[currentLanguage].h1
    }
}

upDateUI()

const changeLanguageButton = document.getElementById("changeLanguageButton")
changeLanguageButton.addEventListener("click", () => toggleLanguage())

console.log(changeLanguageButton)