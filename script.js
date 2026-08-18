/* =========================================================
   CONFIGURACIÓN
========================================================= */

// 20 de julio de 2026
// Meses en JavaScript empiezan desde 0.
// Julio = 6

const startDate = new Date(
    2026,
    6,
    20,
    0,
    0,
    0
);


/* =========================================================
   VARIABLES DEL LIBRO
========================================================= */

let currentPage = 0;

const pages = document.querySelectorAll('.page');

const totalPages = pages.length;


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initBookNavigation();

        initCounter();

        initKissButton();

        initSecret();

        initPageDots();

        initPhotoLightbox();

        updateNavigation();

    }
);


/* =========================================================
   NAVEGACIÓN
========================================================= */

function goToPage(pageIndex) {

    if (
        pageIndex < 0 ||
        pageIndex >= totalPages
    ) {
        return;
    }


    pages.forEach(
        (page, index) => {

            page.classList.remove(
                'active',
                'prev'
            );


            if (index === pageIndex) {

                page.classList.add(
                    'active'
                );

            }

            else if (index < pageIndex) {

                page.classList.add(
                    'prev'
                );

            }

        }
    );


    currentPage = pageIndex;


    updateNavigation();

    updatePageIndicator();

    updatePageDots();

}


/* =========================================================
   CLIC EN EL LIBRO
========================================================= */

function initBookNavigation() {

    const book =
        document.getElementById('book');


    book.addEventListener(
        'click',
        (event) => {

            /*
             * Si se pulsa un botón,
             * no cambiamos de página.
             */

            if (
                event.target.closest(
                    'button'
                )
            ) {
                return;
            }


            /*
             * Si se pulsa un enlace,
             * tampoco cambiamos.
             */

            if (
                event.target.closest(
                    'a'
                )
            ) {
                return;
            }


            const rect =
                book.getBoundingClientRect();


            const clickX =
                event.clientX - rect.left;


            const width =
                rect.width;


            if (
                clickX > width / 2
            ) {

                nextPage();

            }

            else {

                previousPage();

            }

        }
    );


    /*
     * Botones laterales
     */

    document
        .getElementById('prevBtn')
        .addEventListener(
            'click',
            previousPage
        );


    document
        .getElementById('nextBtn')
        .addEventListener(
            'click',
            nextPage
        );


    /*
     * Teclado
     */

    document.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key === 'ArrowRight'
            ) {
                nextPage();
            }


            if (
                event.key === 'ArrowLeft'
            ) {
                previousPage();
            }

        }
    );


    /*
     * Deslizamiento en celular
     */

    let touchStartX = 0;


    book.addEventListener(
        'touchstart',
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    book.addEventListener(
        'touchend',
        (event) => {

            const touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (
                Math.abs(difference) < 50
            ) {
                return;
            }


            if (
                difference > 0
            ) {

                nextPage();

            }

            else {

                previousPage();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   SIGUIENTE / ANTERIOR
========================================================= */

function nextPage() {

    if (
        currentPage <
        totalPages - 1
    ) {

        goToPage(
            currentPage + 1
        );

    }

}


function previousPage() {

    if (
        currentPage > 0
    ) {

        goToPage(
            currentPage - 1
        );

    }

}


/* =========================================================
   CONTROLES DE NAVEGACIÓN
========================================================= */

function updateNavigation() {

    const prevBtn =
        document.getElementById(
            'prevBtn'
        );


    const nextBtn =
        document.getElementById(
            'nextBtn'
        );


    /*
     * Página anterior
     */

    if (
        currentPage === 0
    ) {

        prevBtn.classList.add(
            'disabled'
        );

    }

    else {

        prevBtn.classList.remove(
            'disabled'
        );

    }


    /*
     * Página siguiente
     */

    if (
        currentPage ===
        totalPages - 1
    ) {

        nextBtn.classList.add(
            'disabled'
        );

    }

    else {

        nextBtn.classList.remove(
            'disabled'
        );

    }

}


/* =========================================================
   INDICADOR DE PÁGINA
========================================================= */

function updatePageIndicator() {

    const current =
        document.getElementById(
            'currentPage'
        );


    const total =
        document.getElementById(
            'totalPage'
        );


    current.innerText =
        currentPage + 1;


    total.innerText =
        totalPages;

}


/* =========================================================
   PUNTOS DE NAVEGACIÓN
========================================================= */

function initPageDots() {

    const container =
        document.getElementById(
            'pageDots'
        );


    container.innerHTML = '';


    pages.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    'span'
                );


            dot.classList.add(
                'page-dot'
            );


            if (
                index === currentPage
            ) {

                dot.classList.add(
                    'active'
                );

            }


            dot.addEventListener(
                'click',
                (event) => {

                    event.stopPropagation();

                    goToPage(index);

                }
            );


            container.appendChild(
                dot
            );

        }
    );

}


function updatePageDots() {

    const dots =
        document.querySelectorAll(
            '.page-dot'
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                'active',
                index === currentPage
            );

        }
    );

}


/* =========================================================
   CONTADOR
========================================================= */

function initCounter() {

    updateCounter();


    setInterval(
        updateCounter,
        1000
    );

}


function updateCounter() {

    const now =
        new Date();


    const difference =
        now - startDate;


    if (
        difference < 0
    ) {

        return;

    }


    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;


    const minutes =
        Math.floor(
            difference / (1000 * 60)
        ) % 60;


    const hours =
        Math.floor(
            difference / (1000 * 60 * 60)
        ) % 24;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    document.getElementById(
        'days'
    ).innerText =
        String(days)
        .padStart(2, '0');


    document.getElementById(
        'hours'
    ).innerText =
        String(hours)
        .padStart(2, '0');


    document.getElementById(
        'minutes'
    ).innerText =
        String(minutes)
        .padStart(2, '0');


    document.getElementById(
        'seconds'
    ).innerText =
        String(seconds)
        .padStart(2, '0');

}


/* =========================================================
   SECRETO
========================================================= */

function initSecret() {

    const secretBtn =
        document.getElementById(
            'secretBtn'
        );


    const intro =
        document.getElementById(
            'secret-intro'
        );


    const content =
        document.getElementById(
            'secret-content'
        );


    if (
        !secretBtn
    ) {
        return;
    }


    secretBtn.addEventListener(
        'click',
        (event) => {

            event.stopPropagation();


            intro.classList.add(
                'hidden'
            );


            content.classList.remove(
                'hidden'
            );


            createSecretParticles();

        }
    );

}


/* =========================================================
   BESOS / CONFETI
========================================================= */

function initKissButton() {

    const kissBtn =
        document.getElementById(
            'kissBtn'
        );


    if (
        !kissBtn
    ) {

        return;

    }


    kissBtn.addEventListener(
        'click',
        (event) => {

            event.stopPropagation();


            createConfetti();


            kissBtn.innerText =
                'Beso enviado 💋❤️';


            kissBtn.disabled =
                true;


            const message =
                document.getElementById(
                    'kiss-message'
                );


            message.innerText =
                'Espero que te haya llegado. ❤️';


            setTimeout(
                () => {

                    message.innerText =
                        'Nos vemos en el Volumen II...';

                },
                2500
            );

        }
    );

}


/* =========================================================
   CONFETI
========================================================= */

function createConfetti() {

    const symbols = [
        '💋',
        '❤️',
        '✨',
        '💜',
        '🌸',
        '💕'
    ];


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const particle =
            document.createElement(
                'div'
            );


        particle.classList.add(
            'love-particle'
        );


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() *
            100 +
            'vw';


        particle.style.fontSize =
            (
                Math.random() *
                1.3 +
                0.8
            ) +
            'rem';


        particle.style.animationDuration =
            (
                Math.random() *
                2 +
                2
            ) +
            's';


        particle.style.animationDelay =
            (
                Math.random() *
                0.7
            ) +
            's';


        document.body.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            5000
        );

    }

}


/* =========================================================
   PARTICULAS DEL SECRETO
========================================================= */

function createSecretParticles() {

    const symbols = [
        '💜',
        '✨',
        '😏',
        '❤️'
    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const particle =
            document.createElement(
                'div'
            );


        particle.classList.add(
            'love-particle'
        );


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            (
                30 +
                Math.random() * 40
            ) +
            'vw';


        particle.style.fontSize =
            '1rem';


        particle.style.animationDuration =
            '3s';


        document.body.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            3500
        );

    }

}


/* =========================================================
   VOLVER AL PRINCIPIO
========================================================= */

const restartBtn =
    document.getElementById(
        'restartBtn'
    );


if (
    restartBtn
) {

    restartBtn.addEventListener(
        'click',
        (event) => {

            event.stopPropagation();


            goToPage(0);


            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }
    );

}


/* =========================================================
   AMPLIAR POLAROIDS
========================================================= */

function initPhotoLightbox() {

    const polaroids =
        document.querySelectorAll('.polaroid');


    polaroids.forEach(
        (polaroid) => {

            polaroid.addEventListener(
                'click',
                (event) => {

                    event.stopPropagation();

                    const lightbox =
                        document.createElement('div');

                    lightbox.className =
                        'photo-lightbox';

                    lightbox.setAttribute(
                        'role',
                        'dialog'
                    );

                    lightbox.setAttribute(
                        'aria-label',
                        'Foto ampliada'
                    );

                    lightbox.appendChild(
                        polaroid.cloneNode(true)
                    );

                    lightbox.addEventListener(
                        'click',
                        () => lightbox.remove()
                    );

                    lightbox
                        .querySelector('.polaroid')
                        .addEventListener(
                            'click',
                            (photoEvent) => photoEvent.stopPropagation()
                        );

                    document.body.appendChild(
                        lightbox
                    );

                    document.addEventListener(
                        'keydown',
                        function closeWithEscape(keyEvent) {

                            if (
                                keyEvent.key === 'Escape'
                            ) {

                                lightbox.remove();

                                document.removeEventListener(
                                    'keydown',
                                    closeWithEscape
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}