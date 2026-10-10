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

    // Global Fade Up Elements
    const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
    fadeUpElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    // Global Stagger Sections
    const staggerSections = document.querySelectorAll('.stagger-section');
    staggerSections.forEach((section) => {
      const cards = section.querySelectorAll('.stagger-card');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      }
    });

    // GSAP Split-Screen Pinned Stack Layout
    const pinnedSection = document.getElementById('gsap-pinned-stack');
    const stackItems = gsap.utils.toArray('.stack-item');
    
    if (pinnedSection && stackItems.length > 0) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinnedSection,
                pin: true,
                start: "center center",
                end: "+=2500", // Total scroll distance
                scrub: 1
            }
        });

        // Card 2 slides up over Card 1
        tl.to(stackItems[1], { y: 0, duration: 1 })
          .to(stackItems[0], { scale: 0.95, opacity: 0.5, duration: 1 }, "<")
          
        // Card 3 slides up over Card 2
          .to(stackItems[2], { y: 0, duration: 1 })
          .to(stackItems[1], { scale: 0.95, opacity: 0.5, duration: 1 }, "<")
          
        // Card 4 slides up over Card 3
          .to(stackItems[3], { y: 0, duration: 1 })
          .to(stackItems[2], { scale: 0.95, opacity: 0.5, duration: 1 }, "<")
          
        // Card 5 slides up over Card 4
          .to(stackItems[4], { y: 0, duration: 1 })
          .to(stackItems[3], { scale: 0.95, opacity: 0.5, duration: 1 }, "<")
          
          .to({}, {duration: 0.5}); // small pause at the end before unpinning
    }

    // Legacy nextStepsSection (from index.html)
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

  // City Slider Logic
  const citySlider = document.getElementById('city-slider');
  const cityPrev = document.getElementById('city-prev');
  const cityNext = document.getElementById('city-next');
  
  if (citySlider && cityPrev && cityNext) {
    let currentCitySlide = 0;
    const citySlides = citySlider.children;
    
    function getCityMaxSlides() {
      if (window.innerWidth >= 1024) return citySlides.length - 4;
      if (window.innerWidth >= 768) return citySlides.length - 2;
      return citySlides.length - 1;
    }
    
    function updateCitySlider() {
      const maxSlides = getCityMaxSlides();
      if (currentCitySlide > maxSlides) currentCitySlide = maxSlides;
      if (currentCitySlide < 0) currentCitySlide = 0;
      
      let slidePercentage = 100; // mobile
      if (window.innerWidth >= 1024) slidePercentage = 25; // lg
      else if (window.innerWidth >= 768) slidePercentage = 50; // md
      
      // Bulletproof: Force the items to be the exact percentage width and padding
      for(let i = 0; i < citySlides.length; i++) {
          citySlides[i].style.flex = `0 0 ${slidePercentage}%`;
          citySlides[i].style.maxWidth = `${slidePercentage}%`;
          citySlides[i].style.paddingLeft = '12px';
          citySlides[i].style.paddingRight = '12px';
      }
      
      citySlider.style.transform = `translateX(-${currentCitySlide * slidePercentage}%)`;
    }

    // Call it once on load to initialize widths
    updateCitySlider();

    cityNext.addEventListener('click', () => {
      const maxSlides = getCityMaxSlides();
      if (currentCitySlide < maxSlides) {
        currentCitySlide++;
        updateCitySlider();
      }
    });

    cityPrev.addEventListener('click', () => {
      if (currentCitySlide > 0) {
        currentCitySlide--;
        updateCitySlider();
      }
    });
    
    window.addEventListener('resize', updateCitySlider);
  }
});
