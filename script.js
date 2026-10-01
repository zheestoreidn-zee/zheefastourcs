document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.glass-card');
    const googleLoginBtn = document.getElementById('google-login-btn');
    
    const bookToggle = document.getElementById('book-dropdown-toggle');
    const bookSubmenu = document.getElementById('book-submenu');
    const arrowIcon = document.getElementById('arrow-icon');

    function showNotification(text) {
        const island = document.getElementById('dynamic-island');
        const islandText = document.getElementById('island-text');
        islandText.textContent = text;
        island.classList.add('show');
        setTimeout(() => { island.classList.remove('show'); }, 3000);
    }

    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    bookToggle.addEventListener('click', () => {
        bookSubmenu.classList.toggle('show');
        arrowIcon.style.transform = bookSubmenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabs.forEach(t => t.classList.remove('active-tab'));
            setTimeout(() => {
                document.getElementById(target).classList.add('active-tab');
            }, 50);

            sidebar.classList.remove('active');
            showNotification(`Membuka: ${btn.textContent}`);
        });
    });

    googleLoginBtn.addEventListener('click', () => {
        googleLoginBtn.textContent = 'Fanya';
        googleLoginBtn.classList.add('logged-in');
        showNotification('Berhasil terhubung ke akun Google!');
    });

    const copyBtn = document.getElementById('copy-rules-btn');
    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const rulesText = document.getElementById('rules-text').textContent;
            navigator.clipboard.writeText(rulesText).then(() => {
                showNotification('Rules berhasil disalin ke clipboard!');
            });
        });
    }
});
