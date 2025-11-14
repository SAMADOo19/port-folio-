

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
        link.href = './CV -TOUNSI Abd Essamed (1).pdf';  
        link.download = 'CV Tounsi Abd Essamed';
        link.click();
    };
}
// ===== MOBILE FUNCTIONALITY =====

// Vérifier si on est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Initialisation mobile
function initMobile() {
    if (!isMobile()) return;
    
    // Cacher les éléments de navigation du livre sur mobile
    const bookNavElements = document.querySelectorAll('.nextprev-btn, .number-page, .back-profile');
    bookNavElements.forEach(el => {
        el.style.display = 'none';
    });
    
    // Activer toutes les pages pour l'affichage mobile
    const allPages = document.querySelectorAll('.book-page');
    allPages.forEach(page => {
        page.classList.add('active');
        
        // Afficher toutes les pages (front et back)
        const frontPages = page.querySelectorAll('.page-front');
        const backPages = page.querySelectorAll('.page-back');
        
        frontPages.forEach(front => {
            front.style.display = 'block';
            front.style.opacity = '1';
            front.style.transform = 'none';
        });
        
        backPages.forEach(back => {
            back.style.display = 'block';
            back.style.opacity = '1';
            back.style.transform = 'none';
        });
    });
    
    // Créer la navigation mobile
    createMobileNavigation();
    
    // Initialiser les animations au scroll
    initScrollAnimations();
}

// Créer la navigation mobile
function createMobileNavigation() {
    if (document.querySelector('.mobile-nav')) return;
    
    const nav = document.createElement('div');
    nav.className = 'mobile-nav';
    
    const sections = [
        { icon: '👤', name: 'Profil' },
        { icon: '💼', name: 'Expérience' },
        { icon: '🎓', name: 'Éducation' },
        { icon: '🛠️', name: 'Services' },
        { icon: '⚡', name: 'Compétences' },
        { icon: '📱', name: 'Projets' },
        { icon: '📞', name: 'Contact' }
    ];
    
    sections.forEach((section, index) => {
        const button = document.createElement('button');
        button.className = 'mobile-nav-btn';
        button.innerHTML = section.icon;
        button.title = section.name;
        button.setAttribute('data-index', index);
        
        button.addEventListener('click', () => {
            scrollToSection(index);
        });
        
        nav.appendChild(button);
    });
    
    document.body.appendChild(nav);
}

// Faire défiler vers une section spécifique
function scrollToSection(index) {
    const pages = document.querySelectorAll('.book-page');
    if (pages[index]) {
        pages[index].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animations au défilement
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animer les éléments de la page
                animatePageElements(entry.target);
            }
        });
    }, observerOptions);
    
    const pages = document.querySelectorAll('.book-page');
    pages.forEach(page => {
        observer.observe(page);
    });
}

// Animer les éléments d'une page
function animatePageElements(page) {
    // Titre
    const titles = page.querySelectorAll('.title');
    titles.forEach(title => {
        title.style.animation = 'fadeInUp 0.8s ease forwards';
    });
    
    // Contenu travail/éducation
    const workeducContents = page.querySelectorAll('.workeduc-content');
    workeducContents.forEach((content, index) => {
        content.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s forwards`;
        content.style.opacity = '0';
    });
    
    // Services
    const servicesContents = page.querySelectorAll('.services-content');
    servicesContents.forEach((content, index) => {
        content.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        content.style.opacity = '0';
    });
    
    // Compétences
    const skillsContents = page.querySelectorAll('.skills-content .content span');
    skillsContents.forEach((skill, index) => {
        skill.style.animation = `bounceIn 0.5s ease ${index * 0.1}s forwards`;
        skill.style.opacity = '0';
    });
    
    // Image de profil
    const profileImg = page.querySelector('.profile-page img');
    if (profileImg) {
        profileImg.style.animation = 'bounceIn 1s ease 0.3s forwards';
        profileImg.style.opacity = '0';
    }
    
    // Boutons sociaux
    const socialLinks = page.querySelectorAll('.social-media a');
    socialLinks.forEach((link, index) => {
        link.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        link.style.opacity = '0';
    });
}

// Gérer le redimensionnement
function handleResize() {
    if (isMobile()) {
        initMobile();
    } else {
        // Supprimer la navigation mobile en desktop
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            mobileNav.remove();
        }
        
        // Réactiver la navigation du livre
        const bookNavElements = document.querySelectorAll('.nextprev-btn, .number-page, .back-profile');
        bookNavElements.forEach(el => {
            el.style.display = 'block';
        });
    }
}

// Modifier le comportement des boutons existants pour mobile
function adaptExistingButtons() {
    const contactMeBtn = document.querySelector('.btn.contact-me');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', (e) => {
            if (isMobile()) {
                e.preventDefault();
                // Sur mobile, faire défiler vers la section contact
                const contactPages = document.querySelectorAll('.book-page');
                const lastPage = contactPages[contactPages.length - 1];
                if (lastPage) {
                    lastPage.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    const backProfileBtn = document.querySelector('.back-profile');
    if (backProfileBtn) {
        backProfileBtn.addEventListener('click', (e) => {
            if (isMobile()) {
                e.preventDefault();
                // Sur mobile, faire défiler vers le profil
                const firstPage = document.querySelector('.book-page');
                if (firstPage) {
                    firstPage.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// CSS animations pour mobile
function addMobileAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .mobile-nav {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        .mobile-nav-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #764ba2;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .mobile-nav-btn:hover,
        .mobile-nav-btn.active {
            background: #2c3e50;
            transform: scale(1.1);
        }
        
        @media (max-width: 480px) {
            .mobile-nav {
                padding: 10px;
            }
            
            .mobile-nav-btn {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALISATION =====

// Démarrer les fonctionnalités mobiles
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les animations CSS
    addMobileAnimations();
    
    // Adapter les boutons existants
    adaptExistingButtons();
    
    // Initialiser mobile si nécessaire
    if (isMobile()) {
        initMobile();
    }
    
    // Écouter le redimensionnement
    window.addEventListener('resize', handleResize);
});

// Désactiver les animations du livre sur mobile
if (isMobile()) {
    // Empêcher l'animation d'ouverture du livre
    const coverRight = document.querySelector('.cover.cover-right');
    if (coverRight) {
        coverRight.style.display = 'none';
    }
    
    // Désactiver les clics sur les boutons de navigation du livre
    const pageTurnBtns = document.querySelectorAll('.nextprev-btn');
    pageTurnBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
}
