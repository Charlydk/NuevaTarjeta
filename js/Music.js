document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('music');
    const welcomeModal = document.getElementById('welcomeModal');
    const playMusicButton = document.getElementById('playMusicButton');
    const noMusicButton = document.getElementById('noMusicButton');
    // const loadingMessage = document.getElementById('loadingMessage'); // Si decides usar el mensaje de carga

    if (music && welcomeModal && playMusicButton && noMusicButton) {
        // Muestra el modal apenas el DOM esté cargado
        welcomeModal.classList.remove('hidden'); // Asegurarse de que el modal no tenga display:none en CSS inicial si usas una clase 'hidden'

        // Listener para el botón "Sí, ¡claro!"
        playMusicButton.addEventListener('click', () => {
            // Intenta reproducir la música
            music.play().then(() => {
                console.log("Música reproducida con éxito.");
                
                loadingMessage.classList.remove('hidden');
                
                setTimeout(() => {
                    welcomeModal.classList.add('hidden'); // Oculta el modal
                    // Opcional: Desactivar scroll del body mientras el modal está abierto
                    document.body.style.overflow = 'auto'; 
                }, 1500); // Pequeño retraso para la transición CSS
                
            }).catch(e => {
                console.warn("Error al intentar reproducir la música (posible bloqueo de autoplay aún con interacción):", e);
                // Si aún con el clic del usuario hay un problema (raro, pero posible en casos extremos),
                // aún así cerramos el modal y seguimos adelante.
                welcomeModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                alert("No pudimos reproducir la música. Por favor, asegúrate de que el sonido esté activado en tu dispositivo.");
            });
        });

        // Listener para el botón "No, gracias"
        noMusicButton.addEventListener('click', () => {
            music.pause(); // Asegúrate de que no se reproduzca
            music.currentTime = 0; // Reinicia el audio por si acaso
            console.log("Música no reproducida por elección del usuario.");
            // Oculta el modal inmediatamente
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        // Opcional: Desactivar el scroll del body mientras el modal esté visible
        // Esto previene que el usuario vea el contenido principal antes de interactuar.
        document.body.style.overflow = 'hidden';

    } else {
        console.error("Algunos elementos necesarios para el modal o el audio no fueron encontrados.");
        // Si no se encuentran, al menos intenta ocultar el modal si existe para no bloquear la página
        if (welcomeModal) {
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
});




var myMusic= document.getElementById("music");

function play() {
myMusic.play();

}
 
function pause() {
myMusic.pause();

}