/* ==========================================
   ZHEE FASTOUR CS - JAVASCRIPT LOGIC
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Zhee Fastour CS Engine Loaded Successfully.");

    const actionBtn = document.getElementById("click-me-btn");
    const statusCounter = document.getElementById("status-counter");

    if (actionBtn && statusCounter) {
        let clickCount = 0;
        
        actionBtn.addEventListener("click", () => {
            clickCount++;
            const messages = [
                "✅ Koneksi server stabil! CS Fastour siap melayani.",
                "⚡ Slot turnamen kilat terpantau aktif dan lancar.",
                "🔒 Sistem enkripsi aman dan terverifikasi tanpa bug.",
                "🚀 Semua layanan berjalan di performa maksimal!"
            ];
            
            // Ambil pesan secara bergantian tanpa error index out of bounds
            const currentMessage = messages[(clickCount - 1) % messages.length];
            statusCounter.textContent = `${currentMessage} (Verifikasi ke-${clickCount})`;
            statusCounter.style.color = "#10b981";

            // Efek kedip halus
            statusCounter.style.opacity = "0.4";
            setTimeout(() => {
                statusCounter.style.opacity = "1";
            }, 200);
        });
    }
});
