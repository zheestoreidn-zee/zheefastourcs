import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOjjCIAxJp0XAEj_INqSsXRohBaeqGx6M",
  authDomain: "zeroframe-aa543.firebaseapp.com",
  projectId: "zeroframe-aa543",
  storageBucket: "zeroframe-aa543.firebasestorage.app",
  messagingSenderId: "510693037479",
  appId: "1:510693037479:web:cc308913334759024f5282",
  measurementId: "G-FMKGE1QLBM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const OWNER_EMAIL = "zheestoreidn@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
    const userProfileBtn = document.getElementById('user-profile-btn');
    const floatingAdminBtn = document.getElementById('floating-admin-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeProfileModal = document.getElementById('close-profile-modal');
    const savePaymentBtn = document.getElementById('save-payment-btn');
    const logoutBtn = document.getElementById('logout-btn');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userName = user.displayName ? user.displayName.split(' ')[0] : 'Fanya';
            const userPhoto = user.photoURL || 'https://via.placeholder.com/30';
            
            userProfileBtn.innerHTML = `
                <img src="${userPhoto}" alt="PP">
                <span>${userName}</span>
            `;

            // Load data tersimpan di localStorage khusus akun ini
            const savedData = JSON.parse(localStorage.getItem(`zhee_user_${user.uid}`)) || {};
            document.getElementById('modal-email').value = user.email;
            document.getElementById('input-username').value = savedData.username || userName;
            document.getElementById('input-ewallet').value = savedData.ewallet || '';

            if (user.email === OWNER_EMAIL) {
                if (floatingAdminBtn) floatingAdminBtn.style.display = 'flex';
            } else {
                if (floatingAdminBtn) floatingAdminBtn.style.display = 'none';
            }
        } else {
            userProfileBtn.innerHTML = `
                <img src="https://api.iconify.design/solar:user-bold.svg?color=%23818cf8" alt="User">
                <span>Login</span>
            `;
            if (floatingAdminBtn) floatingAdminBtn.style.display = 'none';
        }
    });

    userProfileBtn.addEventListener('click', () => {
        if (auth.currentUser) {
            if(profileModal) profileModal.classList.add('show');
        } else {
            signInWithPopup(auth, provider).catch((error) => {
                console.error("Gagal Login:", error);
                alert("Gagal login Google.");
            });
        }
    });

    if(closeProfileModal) {
        closeProfileModal.addEventListener('click', () => {
            profileModal.classList.remove('show');
        });
    }

    if(savePaymentBtn) {
        savePaymentBtn.addEventListener('click', () => {
            const user = auth.currentUser;
            if (!user) return;

            const username = document.getElementById('input-username').value.trim();
            const ewallet = document.getElementById('input-ewallet').value.trim();

            if(!username) {
                alert("Username tidak boleh kosong!");
                return;
            }

            // Simulasi Cek Username Unik Global
            const existingUserUid = localStorage.getItem(`zhee_uname_${username}`);
            if(existingUserUid && existingUserUid !== user.uid) {
                alert("Username telah ada, silahkan buat username lain!");
                return;
            }

            // Simpan permanen ke localStorage aman terikat user UID
            localStorage.setItem(`zhee_uname_${username}`, user.uid);
            localStorage.setItem(`zhee_user_${user.uid}`, JSON.stringify({ username, ewallet }));

            profileModal.classList.remove('show');
            if(window.showNotification) window.showNotification('Profil & e-Wallet berhasil disimpan!');
        });
    }

    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                profileModal.classList.remove('show');
                if(window.showNotification) window.showNotification('Berhasil keluar akun.');
            });
        });
    }
});
