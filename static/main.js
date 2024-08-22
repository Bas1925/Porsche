// JavaScript for handling the toggle menu and scroll reveal animations

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      header = document.querySelector('.header'), // Assuming .header is the class of the element to change background
      carreraButton = document.getElementById('911'), // Assuming Carrera is the id of the button
      sButton = document.getElementById('911-S'),
      gtsButton = document.getElementById('911-GTS'),
      gt3Button = document.getElementById('911-GT3'),
      rsButton = document.getElementById('911-RS');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== BACKGROUND IMAGE CHANGE =====*/
if(carreraButton){
    carreraButton.addEventListener('click', () => {
        header.style.backgroundImage = "url('{{ url_for('static', filename='imgp/iris (6).webp') }}')";
    });
}

if(sButton){
    sButton.addEventListener('click', () => {
        header.style.backgroundImage = "url('{{ url_for('static', filename='imgp/iris (37).webp') }}')";
    });
}

if(gtsButton){
    gtsButton.addEventListener('click', () => {
        header.style.backgroundImage = "url('{{ url_for('static', filename='imgp/iris (43).webp') }}')";
    });
}

if(gt3Button){
    gt3Button.addEventListener('click', () => {
        header.style.backgroundImage = "url('{{ url_for('static', filename='imgp/iris (22).webp') }}')";
    });
}

if(rsButton){
    rsButton.addEventListener('click', () => {
        header.style.backgroundImage = "url('{{ url_for('static', filename='imgp/iris (29).webp') }}')";
    });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animation repeat
});

sr.reveal(`.home__data, .about__data, .popular__card, .features__content, .featured__card, .offer__card, .logos__content, .contact__form`, {
    interval: 100
});
