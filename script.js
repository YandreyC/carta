// --- CONFIGURACIÓN DE LA FECHA DE INICIO DE NOVIOS ---
// Formato: (Año, Mes [0-11], Día, Hora, Minuto). Julio es 6.
const startDate = new Date(2026, 6, 20, 0, 0, 0); 

let currentPage = 0;
const totalPages = 6;

document.addEventListener('DOMContentLoaded', () => {
    initBookNavigation();
    initCounter();
    initKissButton();
});

// --- 1. NAVEGACIÓN FLUIDA TIPO LECTOR ---
function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev');
        
        if (index === pageIndex) {
            page.classList.add('active');
        } else if (index < pageIndex) {
            page.classList.add('prev');
        }
    });

    currentPage = pageIndex;
    
    // Actualizar marcapáginas activos
    const bookmarks = document.querySelectorAll('.bookmark');
    bookmarks.forEach((bm, index) => {
        if (index === currentPage) {
            bm.classList.add('active');
        } else {
            bm.classList.remove('active');
        }
    });
}

function initBookNavigation() {
    const bookContainer = document.getElementById('book');

    bookContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

        const rect = bookContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (clickX > width / 2) {
            if (currentPage < totalPages - 1) {
                goToPage(currentPage + 1);
            }
        } else {
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }
    });
}

// --- 2. CONTADOR DE TIEMPO REAL ---
function initCounter() {
    updateCounter();
    setInterval(updateCounter, 1000);
}

function updateCounter() {
    const now = new Date();
    const difference = now - startDate;

    if (difference < 0) return;

    const seconds = Math.floor(difference / 1000) % 60;
    const minutes = Math.floor(difference / (1000 * 60)) % 60;
    const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// --- 3. ANIMACIÓN DE BESOS / CONFETI ---
function initKissButton() {
    const kissBtn = document.getElementById('kissBtn');
    if (!kissBtn) return;

    kissBtn.addEventListener('click', () => {
        createConfetti();
    });
}

function createConfetti() {
    const symbols = ['💋', '❤️', '✨', '💜', '🌸'];
    const container = document.body;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-5vh';
        particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        particle.style.zIndex = '9999';
        particle.style.transition = `all ${Math.random() * 2 + 2}s ease-in-out`;
        particle.style.pointerEvents = 'none';

        container.appendChild(particle);

        setTimeout(() => {
            particle.style.top = '105vh';
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            particle.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
}