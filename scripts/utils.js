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

// Smoothly scrolls to the products section when the CTA button is clicked
document.querySelector(".cta-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#products").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // Closes the hamburger menu when the Escape key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hamburger.setAttribute("aria-expanded", "false");
      navList.classList.remove("active");
      hamburger.classList.remove("open");
    }
  });