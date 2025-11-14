

const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {

        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn');

            setTimeout(() => {
                pageTurn.style.zIndex = 2 - index;
            }, 500);

        }else{
            pageTurn.classList.add('turn');

            setTimeout(() => {
                pageTurn.style.zIndex = 2 + index;
            }, 500);
        }
    }
});


// contact me button when click
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {

            page.classList.add('turn');
            setTimeout(() => {
                page.style.zIndex = 20 + index;
            },500);
        }, (index + 1) * 200 + 100)
    });
}


// create reverse index function
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if(pageNumber < 0){
        pageNumber = totalPages - 1;
    }
}


// back profile button when click
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();

            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)
        }, (index + 1) * 200 + 100)

    })
}


// opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');


// open animation (cover right animation)
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100);

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800);


pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();

        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500)
    }, (index + 1) * 200 + 2100)

}) 
// Download CV button (without modifying HTML)
const allBtns = document.querySelectorAll('.btn');
let downloadCVBtn = null;

// trouver le bouton qui contient le texte "Download CV"
allBtns.forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === "download cv") {
        downloadCVBtn = btn;
    }
});

if (downloadCVBtn) {
    downloadCVBtn.onclick = (e) => {
        e.preventDefault();

        const link = document.createElement('a');
        link.href = './CV -TOUNSI Abd Essamed (1).pdf';   // ⚠️ ضع مسار ملف CV الحقيقي هنا
        link.download = 'CV Tounsi Abd Essamed';
        link.click();
    };
}