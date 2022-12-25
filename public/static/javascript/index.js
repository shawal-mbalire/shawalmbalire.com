/* ========================================= CHANGE BACKGROUND HEADER =============================== */
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
/*======================================= SERVICES MODAL ==============================================*/


/*================================= MIXITUP FILTER PORTFOLIO ==========================================*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});
/* ======================================Link active work ============================================== */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    if(linkWork) {
        linkWork.forEach(l => l.classList.remove('active-work'))
        this.classList.add('active-work')
    }
}
linkWork.forEach(l => l.addEventListener('click', activeWork))

/*============================================ SWIPER TESTIMONIAL ======================================*/
var swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 24,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 48,
        },
    }
});

/*======================================= SCROLL SECTIONS ACTIVE LINK ===================================*/


/*========================================= LIGHT DARK THEME =============================================*/


/*======================================= SCROLL REVEAL ANIMATION =========================================*/
