const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

function toggleMenu() {
    navList.classList.toggle('active');
    hamburger.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
    const isClickInside = navList.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInside && navList.classList.contains('active')) {
        toggleMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
        toggleMenu();
    }
});