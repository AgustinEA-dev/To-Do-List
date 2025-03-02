// Función para crear estrellas de manera dinámica
function createStars() {
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars");

    const numberOfStars = 150;  // Número total de estrellas que quieres
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Asignamos un tamaño aleatorio a las estrellas
        const size = Math.random() < 0.5 ? "small" : "big";  // Estrella pequeña o grande
        star.classList.add(size);

        // Establecemos una posición aleatoria en el contenedor
        const x = Math.random() * 100 + "%";
        const y = Math.random() * 100 + "%";

        star.style.top = y;
        star.style.left = x;

        // Añadimos la estrella al contenedor de estrellas
        starsContainer.appendChild(star);
    }

    // Añadimos el contenedor de estrellas al body
    document.body.appendChild(starsContainer);
}

// Llamamos a la función para crear las estrellas
createStars();