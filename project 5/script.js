const songs = [
        { songName: "Satranga", url: "https://wynk.in/u/AE9m99cds", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jiosaavn.com%2Fsong%2Fsatranga-from-animal%2FAycDZSdhb1g&psig=AOvVaw1y9UpWQAJ5DoXKd-1URtPQ&ust=1720100740364000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCvtN6Ai4cDFQAAAAAdAAAAABAE" },
        { songName: "Pehle Bhi Main", url: "./songs/Pehle Bhi Main.mp3", img: "./images/animal.jpg" },
        { songName: "Ram Siya Ram", url: "./songs/Ram Siya Ram.mp3", img: "./images/ram.jpg" },
        { songName: "Arjan Valley", url: "./songs/Arjan Vailly Ne.mp3", img: "./images/animal.jpg" }
    ];
    
    const allSongsContainer = document.querySelector("#all-songs");
    const poster = document.querySelector("#left");
    const playButton = document.querySelector("#play");
    const backwardButton = document.querySelector("#backward");
    const forwardButton = document.querySelector("#forward");
    
    const audio = new Audio();
    let selectedSong = 0;
    let isPlaying = false;
    
    function renderSongs() {
        const songsHtml = songs.map((song, index) => `
            <div class="song-card" data-id="${index}">
                <div class="part1">
                    <img src="${song.img}" alt="${song.songName}">
                    <h2>${song.songName}</h2>
                </div>
                <h6>3:56</h6>
            </div>
        `).join("");
        allSongsContainer.innerHTML = songsHtml;
    }
    
    function loadSong(index) {
        audio.src = songs[index].url;
        poster.style.backgroundImage = `url(${songs[index].img})`;
    }
    
    function playSong() {
        audio.play();
        playButton.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        isPlaying = true;
    }
    
    function pauseSong() {
        audio.pause();
        playButton.innerHTML = `<i class="ri-play-fill"></i>`;
        isPlaying = false;
    }
    
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    function changeSong(step) {
        selectedSong += step;
        if (selectedSong >= 0 && selectedSong < songs.length) {
            loadSong(selectedSong);
            playSong();
        }
    }
    
    allSongsContainer.addEventListener("click", (e) => {
        const songCard = e.target.closest(".song-card");
        if (songCard) {
            selectedSong = parseInt(songCard.dataset.id, 10);
            loadSong(selectedSong);
            playSong();
        }
    });
    
    playButton.addEventListener("click", togglePlay);
    backwardButton.addEventListener("click", () => changeSong(-1));
    forwardButton.addEventListener("click", () => changeSong(1));
    
    loadSong(selectedSong);
    renderSongs();