document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.glass-card');
    
    const bookToggle = document.getElementById('book-dropdown-toggle');
    const bookSubmenu = document.getElementById('book-submenu');
    const arrowIcon = document.getElementById('arrow-icon');

    const floatingBtn = document.getElementById('floating-admin-btn');
    const adminModal = document.getElementById('admin-modal');
    let adminOpen = false;

    function showNotification(text) {
        const island = document.getElementById('dynamic-island');
        const islandText = document.getElementById('island-text');
        islandText.textContent = text;
        island.classList.add('show');
        setTimeout(() => { island.classList.remove('show'); }, 3000);
    }

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    if(menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if(overlay) overlay.addEventListener('click', toggleSidebar);

    if(bookToggle) {
        bookToggle.addEventListener('click', () => {
            bookSubmenu.classList.toggle('show');
            arrowIcon.style.transform = bookSubmenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabs.forEach(t => t.classList.remove('active-tab'));
            setTimeout(() => {
                const targetEl = document.getElementById(target);
                if(targetEl) targetEl.classList.add('active-tab');
            }, 50);

            if(sidebar) sidebar.classList.remove('active');
            if(overlay) overlay.classList.remove('active');
            showNotification(`Membuka: ${btn.textContent}`);
        });
    });

    if(floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            adminOpen = !adminOpen;
            if(adminModal) adminModal.classList.toggle('show', adminOpen);
            floatingBtn.textContent = adminOpen ? '✕' : '+';
        });
    }

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
