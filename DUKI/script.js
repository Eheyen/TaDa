/* =========================================
   VARIABLES
========================================= */

let currentScreen = 1;

const totalScreens = 5;

const music = document.getElementById("music");

const playButton = document.getElementById("playButton");

const progress = document.querySelector(".progress");


/* =========================================
   CAMBIAR DE PANTALLA
========================================= */

function showScreen(number) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const selectedScreen =
        document.getElementById(`screen${number}`);


    if (selectedScreen) {

        selectedScreen.classList.add("active");

        currentScreen = number;

    }

}


/* =========================================
   SIGUIENTE PANTALLA
========================================= */

function nextScreen() {

    if (currentScreen < totalScreens) {

        showScreen(currentScreen + 1);

    }

}


/* =========================================
   REINICIAR
========================================= */

function restartPage() {

    showScreen(1);

}


/* =========================================
   MÚSICA
========================================= */

function toggleMusic() {

    if (music.paused) {

        music.play();

        playButton.textContent = "Ⅱ";

    } else {

        music.pause();

        playButton.textContent = "▶";

    }

}


/* =========================================
   PROGRESO DE LA CANCIÓN
========================================= */

music.addEventListener("timeupdate", () => {

    if (!music.duration) return;

    const percentage =
        (music.currentTime / music.duration) * 100;

    progress.style.width = percentage + "%";

});


/* =========================================
   CUANDO TERMINA
========================================= */

music.addEventListener("ended", () => {

    playButton.textContent = "▶";

    progress.style.width = "0%";

});


/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextScreen();

    }


    if (event.key === "ArrowLeft") {

        if (currentScreen > 1) {

            showScreen(currentScreen - 1);

        }

    }

});


/* =========================================
   EFECTO GLITCH
========================================= */

const glitchTexts =
    document.querySelectorAll(
        ".hero-text h1 span, .music-title"
    );


setInterval(() => {

    glitchTexts.forEach(element => {

        if (Math.random() > 0.85) {

            element.style.transform =
                `translate(${Math.random() * 4 - 2}px, 0)`;

            setTimeout(() => {

                element.style.transform = "translate(0,0)";

            }, 80);

        }

    });

}, 1200);


/* =========================================
   MENSAJE INICIAL
========================================= */

console.log(
    "🖤 21 de Septiembre — Good Music × Good People"
);