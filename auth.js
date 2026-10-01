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
    const googleLoginBtn = document.getElementById('google-login-btn');
    const floatingAdminBtn = document.getElementById('floating-admin-btn');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userName = user.displayName ? user.displayName.split(' ')[0] : 'Fanya';
            googleLoginBtn.textContent = userName;
            googleLoginBtn.classList.add('logged-in');

            if (user.email === OWNER_EMAIL) {
                if (floatingAdminBtn) floatingAdminBtn.style.display = 'flex';
            } else {
                if (floatingAdminBtn) floatingAdminBtn.style.display = 'none';
            }
        } else {
            googleLoginBtn.textContent = 'Login Google';
            googleLoginBtn.classList.remove('logged-in');
            if (floatingAdminBtn) floatingAdminBtn.style.display = 'none';
        }
    });

    googleLoginBtn.addEventListener('click', () => {
        if (auth.currentUser) {
            signOut(auth).then(() => {
                alert("Berhasil keluar akun.");
            });
        } else {
            signInWithPopup(auth, provider).catch((error) => {
                console.error("Gagal Login:", error);
                alert("Gagal login. Pastikan domain Vercel sudah terdaftar di Firebase Authorized Domains.");
            });
        }
    });
});

