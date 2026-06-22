// Mengatur fungsi putar dan hentikan audio genta & mantra
function toggleAudio(id) {
    const audioEl = document.getElementById(`audio-${id}`);
    const btnEl = document.getElementById(`btn-${id}`);

    // Jika audio sedang mati, nyalakan
    if (audioEl.paused) {
        audioEl.play().catch(err => {
            alert("Klik area layar mana saja dulu satu kali untuk memberikan izin audio di browser!");
        });
        btnEl.classList.add("active");
        if (id === 'bell') btnEl.innerText = "🛑 Hentikan Genta";
        if (id === 'chant') btnEl.innerText = "🛑 Hentikan Mantra";
    } 
    // Jika audio sedang menyala, matikan
    else {
        audioEl.pause();
        btnEl.classList.remove("active");
        if (id === 'bell') btnEl.innerText = "🔔 Bunyikan Genta";
        if (id === 'chant') btnEl.innerText = "🕉️ Putar Mantra";
    }
}
