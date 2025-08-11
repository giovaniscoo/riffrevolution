document.addEventListener("DOMContentLoaded", function () {
    const imagenes = document.querySelectorAll(".imagen-container img");
    let currentIndex = null;
    let overlay = null;

    imagenes.forEach((imagen, index) => {
        imagen.style.cursor = "zoom-in";
        imagen.addEventListener("click", () => {
            currentIndex = index;
            mostrarImagenEnPantallaCompleta(imagen.src, imagen.alt);
        });
    });

    function mostrarImagenEnPantallaCompleta(src, alt) {
        // Crea overlay solo si no existe
        if (overlay) document.body.removeChild(overlay);

        overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.cursor = "zoom-out";

        // Imagen grande
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";
        img.style.boxShadow = "0 0 20px rgba(255,255,255,0.5)";
        img.style.borderRadius = "10px";
        img.style.transition = "transform 0.3s";
        img.classList.add("imagen-ampliada");

        // Flechas
        const flechaIzquierda = document.createElement("div");
        flechaIzquierda.innerHTML = "&#10094;"; // ←
        flechaIzquierda.style.position = "absolute";
        flechaIzquierda.style.left = "20px";
        flechaIzquierda.style.fontSize = "60px";
        flechaIzquierda.style.color = "white";
        flechaIzquierda.style.cursor = "pointer";
        flechaIzquierda.style.userSelect = "none";

        const flechaDerecha = document.createElement("div");
        flechaDerecha.innerHTML = "&#10095;"; // →
        flechaDerecha.style.position = "absolute";
        flechaDerecha.style.right = "20px";
        flechaDerecha.style.fontSize = "60px";
        flechaDerecha.style.color = "white";
        flechaDerecha.style.cursor = "pointer";
        flechaDerecha.style.userSelect = "none";

        // Cerrar al hacer clic fuera de la imagen
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay || e.target === img) {
                cerrarOverlay();
            }
        });

        // Agregar todo
        overlay.appendChild(img);
        overlay.appendChild(flechaIzquierda);
        overlay.appendChild(flechaDerecha);
        document.body.appendChild(overlay);

        // Eventos de las flechas
        flechaIzquierda.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que se cierre el overlay
            mostrarAnterior();
        });

        flechaDerecha.addEventListener("click", (e) => {
            e.stopPropagation();
            mostrarSiguiente();
        });
    }

    function cerrarOverlay() {
        if (overlay) {
            document.body.removeChild(overlay);
            overlay = null;
            currentIndex = null;
        }
    }

    function mostrarAnterior() {
        if (currentIndex > 0) {
            currentIndex--;
            const img = imagenes[currentIndex];
            mostrarImagenEnPantallaCompleta(img.src, img.alt);
        }
    }

    function mostrarSiguiente() {
        if (currentIndex < imagenes.length - 1) {
            currentIndex++;
            const img = imagenes[currentIndex];
            mostrarImagenEnPantallaCompleta(img.src, img.alt);
        }
    }

    // Cerrar con tecla ESC o navegar con flechas
    document.addEventListener("keydown", (e) => {
        if (!overlay) return;

        if (e.key === "Escape") {
            cerrarOverlay();
        } else if (e.key === "ArrowLeft") {
            mostrarAnterior();
        } else if (e.key === "ArrowRight") {
            mostrarSiguiente();
        }
    });
});
