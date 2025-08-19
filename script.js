const songs = [
  { title: "Song 1", artist: "Artist 1", path: "./music/04 Hum Nahi Sudhrenge - Golamaal Again.mp3", cover: "./Pictures/card1img.jpeg" },
  { title: "Song 2", artist: "Artist 2", path: "D:/Spotify clone/music/bollywood_Tamasha 2015 - Matargashti.mp3", cover: "./Pictures/card2img.jpeg" },
  { title: "Song 3", artist: "Artist 3", path: "D:/Spotify clone/music/Ek Zindagi - Angrezi Medium 320 Kbps.mp3", cover: "./Pictures/card3img.jpeg" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");

function loadSong(index) {
  audio.src = songs[index].path;
  cover.src = songs[index].cover;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

let isPlaying = false;
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
  isPlaying = true;
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
  isPlaying = true;
});

// Progress Bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100;

  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  if (seconds < 10) seconds = "0" + seconds;
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  if (duration) {
    let dMin = Math.floor(duration / 60);
    let dSec = Math.floor(duration % 60);
    if (dSec < 10) dSec = "0" + dSec;
    durationEl.textContent = `${dMin}:${dSec}`;
  }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Load first song
loadSong(currentSong);

// Play song when clicking on card images
const cardImages = document.querySelectorAll(".card-img");

cardImages.forEach((img, index) => {
  img.style.cursor = "pointer"; // make it clickable
  img.addEventListener("click", () => {
    if (songs[index]) {
      currentSong = index;
      loadSong(currentSong);
      playSong();
      isPlaying = true;
    }
  });
});

