function createStars() {
    const starsContainer = document.createElement("div")
    starsContainer.classList.add("stars")

    const numberOfStars = 150;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div")
        star.classList.add("star")

        const size = Math.random() < 0.5 ? "small" : "big"
        star.classList.add(size)

        const x = Math.random() * 100 + "%"
        const y = Math.random() * 100 + "%"

        star.style.top = y
        star.style.left = x

        starsContainer.appendChild(star)
    }

    document.body.appendChild(starsContainer)
}

function removeStars() {
    const starsContainer = document.querySelector(".stars")
    if (starsContainer) {
        starsContainer.remove()
    }
}

function setDayNightMode() {
    const now = new Date()
    const hour = now.getHours()
    const body = document.body

    if (hour >= 6 && hour < 18) {
        body.classList.remove('night-background')
        body.classList.add('day-background')
        removeStars()
    } else {
        body.classList.remove('day-background')
        body.classList.add('night-background')
        createStars()
    }
}

setDayNightMode();

setInterval(setDayNightMode, 3600000)