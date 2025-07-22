// js/Music.js

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('music');
    const welcomeModal = document.getElementById('welcomeModal');
    const playMusicButtonModal = document.getElementById('playMusicButtonModal'); // Botón "Sí, ¡claro!" del modal
    const noMusicButtonModal = document.getElementById('noMusicButtonModal'); // Botón "No, gracias" del modal
    const musicToggleButton = document.getElementById('musicToggleButton'); // El botón flotante principal
    // const loadingMessage = document.getElementById('loadingMessage'); // Si decides usar el mensaje de carga
    
    let isPlaying = false; // Variable para controlar el estado de reproducción

    // Función para actualizar el icono y la clase del botón flotante principal
    function updateToggleButtonUI() {
        if (isPlaying) {
            musicToggleButton.innerHTML = '<i class="fas fa-pause"></i>'; // Icono de pausa
            musicToggleButton.classList.add('playing');
        } else {
            musicToggleButton.innerHTML = '<i class="fas fa-music"></i>'; // Icono de música o play
            musicToggleButton.classList.remove('playing');
        }
        // Aseguramos que el botón flotante sea visible una vez que el modal se cierra
        musicToggleButton.classList.add('active'); 
    }

    // Asegúrate de que el audio y los botones existan
    if (music && welcomeModal && playMusicButtonModal && noMusicButtonModal && musicToggleButton) {
        // Desactivar scroll del body al inicio mientras el modal esté visible
        document.body.style.overflow = 'hidden';

        // Listener para el botón "Sí, ¡claro!" del modal
        playMusicButtonModal.addEventListener('click', () => {
            music.play().then(() => {
                isPlaying = true;
                console.log("Música reproducida con éxito por interacción del modal.");
                // Oculta el modal y permite el scroll
                welcomeModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                updateToggleButtonUI(); // Actualiza el botón flotante a estado de "pausa"
            }).catch(e => {
                console.warn("Error al intentar reproducir la música (posible bloqueo de autoplay aún con interacción):", e);
                // Si aún con el clic del usuario hay un problema, cerramos el modal y mostramos alerta
                welcomeModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                updateToggleButtonUI(); // Asegura que el botón flotante muestre "play"
                alert("Tu navegador ha bloqueado la reproducción automática de la música. Puedes intentar activarla manualmente con el botón flotante.");
            });
        });

        // Listener para el botón "No, gracias" del modal
        noMusicButtonModal.addEventListener('click', () => {
            music.pause(); // Asegúrate de que no se reproduzca
            music.currentTime = 0; // Reinicia el audio
            isPlaying = false;
            console.log("Música no reproducida por elección del usuario.");
            // Oculta el modal y permite el scroll
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            updateToggleButtonUI(); // Asegura que el botón flotante muestre "play"
        });

        // Listener para el botón flotante principal (controla play/pause después del modal)
        musicToggleButton.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                isPlaying = false;
            } else {
                music.play().then(() => {
                    isPlaying = true;
                }).catch(e => {
                    console.error("Error al reproducir desde el botón flotante:", e);
                    isPlaying = false;
                    alert("No se pudo reproducir la música.");
                });
            }
            updateToggleButtonUI(); // Actualiza el icono del botón flotante
        });

        // Eventos del propio audio para mantener el estado sincronizado
        music.addEventListener('play', () => {
            isPlaying = true;
            updateToggleButtonUI();
        });

        music.addEventListener('pause', () => {
            isPlaying = false;
            updateToggleButtonUI();
        });

        // Inicializa el estado del botón flotante al cargar la página (oculto y con icono de música)
        musicToggleButton.classList.remove('active'); // Asegura que inicie oculto
        musicToggleButton.innerHTML = '<i class="fas fa-music"></i>'; // Icono inicial de música

    } else {
        console.error("Algunos elementos necesarios para el modal o el audio no fueron encontrados. Asegúrate de que los IDs sean correctos.");
        // Si hay un problema, al menos asegúrate de que el modal no bloquee la página
        if (welcomeModal) {
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        // Si el botón flotante no se encuentra, no se muestra
    }
});