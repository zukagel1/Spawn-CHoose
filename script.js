const music = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");
const soundBtn = document.getElementById("sound-btn");
const soundText = document.getElementById("sound-text");
const loadingOverlay = document.getElementById("loadingOverlay");
const cards = [...document.querySelectorAll(".spawn-card")];

music.volume = 0.32;
clickSound.volume = 0.55;

let musicPlaying = false;
let choosing = false;

function playClick() {
    try {
        clickSound.currentTime = 0;
        const p = clickSound.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
    } catch (_) {}
}

function emit(eventName, ...args) {
    if (window.cef && typeof window.cef.emit === "function") {
        window.cef.emit(eventName, ...args);
        return true;
    }
    return false;
}

soundBtn.addEventListener("click", async () => {
    playClick();
    try {
        if (!musicPlaying) {
            await music.play();
            musicPlaying = true;
            soundText.textContent = "გამორთვა";
        } else {
            music.pause();
            musicPlaying = false;
            soundText.textContent = "ხმა";
        }
    } catch (_) {}
});

cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (choosing) return;

        playClick();
        choosing = true;
        loadingOverlay.classList.add("show");

        const choice = card.dataset.choice;

        // EXACT GM EVENT:
        // cef_subscribe("pwd:choice", "OnChoose");
        //
        // OnChoose accepts:
        // spawn-choose
        // home-choose
        // fraction-choose
        // exitpoint-choose
        emit("pwd:choice", choice);

        // If GM accepts the choice it destroys this browser immediately.
        // If GM rejects it (no house/faction/last position), it only sends
        // a chat error and leaves CEF open. Unlock UI automatically.
        setTimeout(() => {
            choosing = false;
            loadingOverlay.classList.remove("show");
        }, 900);
    });
});
