// Page-specific JS goes here

// Services Carousel
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!track || slides.length === 0) return;

  const slideCount = slides.length;

  // Clone first and last slides for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let currentIndex = 1; // Start at 1 because of prepended clone
  let isTransitioning = false;

  // Set initial position (skip the prepended clone)
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  function updateCarousel(smooth = true) {
    if (smooth) {
      track.style.transition = 'transform 0.4s ease';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Handle the seamless loop after transition ends
  track.addEventListener('transitionend', () => {
    isTransitioning = false;

    // If we're at the first clone (after last real slide), jump to first real slide
    if (currentIndex === slideCount + 1) {
      currentIndex = 1;
      updateCarousel(false);
    }

    // If we're at the last clone (before first real slide), jump to last real slide
    if (currentIndex === 0) {
      currentIndex = slideCount;
      updateCarousel(false);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
  });
});
