const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const songs = [
    {
        name: "song1.mp3",
        title: "Dreams",
        artist: "Artist One"
    },
    {
        name: "song2.mp3",
        title: "Skyline",
        artist: "Artist Two"
    },
    {
        name: "song3.mp3",
        title: "Night Ride",
        artist: "Artist Three"
    }
];

let songIndex = 0;
let isPlaying = false;


function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.name;
}


function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

audio.addEventListener("play", () => isPlaying = true);
audio.addEventListener("pause", () => isPlaying = false);


function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}


audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
});


function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}


function setVolume(value) {
    audio.volume = value;
}


audio.addEventListener("ended", nextSong);


function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}


loadSong(songs[songIndex]);
