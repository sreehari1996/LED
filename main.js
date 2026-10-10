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
    const totalSlides = 6;
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

  // Number Counting Animation
  const counters = document.querySelectorAll('.stat-counter');

  if (counters.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // roughly 60fps

          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
          observer.unobserve(counter); // Only animate once
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(1rem)';
        backToTopBtn.style.pointerEvents = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const nextStepsSection = document.getElementById('next-steps-section');
    if (nextStepsSection) {
      const cards = nextStepsSection.querySelectorAll('.grid > div');
      
      // Set initial state
      gsap.set(cards, { y: 60, opacity: 0 });

      // Animate on scroll
      ScrollTrigger.create({
        trigger: nextStepsSection,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          });
        },
        once: true
      });
    }
  }
  // Portfolio Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active styling from all buttons
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#0B1E36]', 'text-white');
          b.classList.add('text-gray-500', 'hover:text-[#0B1E36]', 'hover:bg-gray-100');
        });

        // Add active styling to clicked button
        btn.classList.add('bg-[#0B1E36]', 'text-white');
        btn.classList.remove('text-gray-500', 'hover:text-[#0B1E36]', 'hover:bg-gray-100');

        const filterValue = btn.getAttribute('data-filter');

        // Filter items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  // Testimonial Slider Logic
  const testiSlider = document.getElementById('testimonial-slider');
  const testiPrev = document.getElementById('testi-prev');
  const testiNext = document.getElementById('testi-next');
  
  if (testiSlider && testiPrev && testiNext) {
    let currentTestiSlide = 0;
    const slides = testiSlider.children;
    
    function getMaxSlides() {
      if (window.innerWidth >= 1024) return slides.length - 3;
      if (window.innerWidth >= 768) return slides.length - 2;
      return slides.length - 1;
    }
    
    function updateTestiSlider() {
      const maxSlides = getMaxSlides();
      if (currentTestiSlide > maxSlides) currentTestiSlide = maxSlides;
      if (currentTestiSlide < 0) currentTestiSlide = 0;
      
      let slidePercentage = 100; // mobile
      if (window.innerWidth >= 1024) slidePercentage = 33.333333; // lg
      else if (window.innerWidth >= 768) slidePercentage = 50; // md
      
      testiSlider.style.transform = `translateX(-${currentTestiSlide * slidePercentage}%)`;
    }

    testiNext.addEventListener('click', () => {
      const maxSlides = getMaxSlides();
      if (currentTestiSlide < maxSlides) {
        currentTestiSlide++;
        updateTestiSlider();
      }
    });

    testiPrev.addEventListener('click', () => {
      if (currentTestiSlide > 0) {
        currentTestiSlide--;
        updateTestiSlider();
      }
    });
    
    window.addEventListener('resize', updateTestiSlider);
  }
});
