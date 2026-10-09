document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const mobileMenuEl = document.getElementById('mobile-menu');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuOpenBtn = document.getElementById('mobile-menu-open');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');

  if (mobileMenuEl && mobileMenuOpenBtn) {
    function openMobileMenu() {
      mobileMenuEl.style.display = 'block';
      requestAnimationFrame(() => {
        mobileMenuOverlay.style.opacity = '1';
        mobileMenuPanel.style.transform = 'translateX(0)';
      });
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
      mobileMenuOverlay.style.opacity = '0';
      mobileMenuPanel.style.transform = 'translateX(100%)';
      setTimeout(() => {
        mobileMenuEl.style.display = 'none';
      }, 350);
      document.body.style.overflow = '';
    }
    mobileMenuOpenBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Hero Slider Logic
  const heroSlider = document.getElementById('hero-slider');
  const heroPrev = document.getElementById('hero-prev');
  const heroNext = document.getElementById('hero-next');
  const heroCounter = document.getElementById('hero-counter');

  if (heroSlider && heroPrev && heroNext && heroCounter) {
    const totalSlides = 3;
    let currentSlide = 0;
    let slideInterval;

    function updateSlider() {
      // Move slider track
      heroSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
      // Update counter text
      heroCounter.textContent = `0${currentSlide + 1} / 0${totalSlides}`;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
      resetInterval();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
      resetInterval();
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000); // Auto-slide every 6s
    }

    // Event listeners
    heroNext.addEventListener('click', nextSlide);
    heroPrev.addEventListener('click', prevSlide);

    // Start auto-slide
    resetInterval();
  }
});
