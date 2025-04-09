// Funcionalidade para o player de música
document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.querySelector("audio");
    const playButton = document.querySelector(".play-button");
  
    // Alternar play/pause
    playButton.addEventListener("click", function() {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = "⏸️"; // Mudar o texto para pausa
      } else {
        audioPlayer.pause();
        playButton.textContent = "▶️"; // Mudar o texto para play
      }
    });
  });
  