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

    window.showNotification = function(text) {
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
            floatingBtn.classList.toggle('rotate', adminOpen);
        });
    }

    window.openRoomList = function(feeName, modeName) {
        const modeView = document.getElementById(`mode-view-${feeName}`);
        const roomView = document.getElementById(`room-view-${feeName}`);
        const titleEl = document.getElementById(`room-title-${feeName}`);

        if(modeView && roomView) {
            modeView.style.display = 'none';
            roomView.style.display = 'block';
            titleEl.textContent = `Fee ${feeName.replace('fee','')} - ${modeName} (10 Room)`;
            showNotification(`Membuka ${modeName} Fee ${feeName.replace('fee','')}`);
        }
    }

    window.backToModeList = function(feeName) {
        const modeView = document.getElementById(`mode-view-${feeName}`);
        const roomView = document.getElementById(`room-view-${feeName}`);

        if(modeView && roomView) {
            roomView.style.display = 'none';
            modeView.style.display = 'grid';
        }
    }

    window.setAdminStatus = function(feeId, status) {
        const btnOpen = document.getElementById(`${feeId}-open`);
        const btnClose = document.getElementById(`${feeId}-close`);
        const badge = document.getElementById(`${feeId}-badge`);
        const sidebarBadge = document.getElementById(`${feeId}-side-badge`);

        if(status === 'OPEN') {
            btnOpen.className = 'toggle-btn active-open';
            btnClose.className = 'toggle-btn';
            if(badge) { badge.className = 'status-badge open'; badge.textContent = 'OPEN'; }
            if(sidebarBadge) { sidebarBadge.className = 'mini-badge open'; sidebarBadge.textContent = 'OPEN'; }
            showNotification(`Fee ${feeId.replace('fee','')} diubah menjadi OPEN`);
        } else {
            btnOpen.className = 'toggle-btn';
            btnClose.className = 'toggle-btn active-close';
            if(badge) { badge.className = 'status-badge close'; badge.textContent = 'CLOSE'; }
            if(sidebarBadge) { sidebarBadge.className = 'mini-badge close'; sidebarBadge.textContent = 'CLOSE'; }
            showNotification(`Fee ${feeId.replace('fee','')} diubah menjadi CLOSE`);
        }
    }

    // Salin Template Skill No Pet Khusus
    window.copySkillTemplate = function() {
        navigator.clipboard.writeText("#FF#YnlnZ39yZ359aXNtbXB0eWVtd2JwfnVvcmR/cWd/").then(() => {
            showNotification('Template skill no pet berhasil disalin!');
        });
    }
});
