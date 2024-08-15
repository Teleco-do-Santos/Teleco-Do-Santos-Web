// script.js

document.addEventListener("DOMContentLoaded", function() {
    const leerMasButtons = document.querySelectorAll('.leer-mas');

    leerMasButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('¡Gracias por tu interés! Más información estará disponible pronto.');
        });
    });
});