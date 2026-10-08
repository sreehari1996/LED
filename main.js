// Using CDNs for GSAP and THREE, they are available globally
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lenis for premium smooth scrolling
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync GSAP ScrollTrigger with Lenis using RAF loop (correct pattern)
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  // Navbar blur effect — use Lenis scroll event (not native) to avoid conflict
  const navbar = document.getElementById('navbar');
  lenis.on('scroll', ({ scroll }) => {
    if (scroll > 50) {
      navbar.style.backgroundColor = 'rgba(3, 3, 3, 0.85)';
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.WebkitBackdropFilter = 'blur(16px)';
      navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      navbar.style.backgroundColor = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.WebkitBackdropFilter = 'none';
      navbar.style.borderColor = 'transparent';
    }
  });

  // Hero Animation
  const heroTl = gsap.timeline();

  // Animate lines in hero text
  heroTl.to('.hero-title .reveal-text-line > span', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power4.out',
    delay: 0.2
  })
    .fromTo('.hero-fade', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.8');

  // Projects Page specific Hero Animation
  if (document.querySelector('.projects-hero-content')) {
    const phTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial states
    gsap.set('.ph-tag, .ph-title, .ph-desc, .ph-stat-item', { opacity: 0, y: 30 });
    gsap.set('.ph-image-container', { opacity: 0, scale: 0.95, y: 20 });
    gsap.set('.ph-floating-card', { opacity: 0, x: 40, y: 20 });

    phTl.to('.ph-tag', { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .to('.ph-title', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
      .to('.ph-desc', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
      .to('.ph-stat-item', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
      .to('.ph-image-container', { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power4.out' }, '-=1')
      .to('.ph-floating-card', { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'back.out(1.5)' }, '-=0.8');
  }

  // Networks Page specific Hero Animation
  if (document.querySelector('.network-hero-content')) {
    const nhTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Initial states for premium reveal
    gsap.set('.nh-tag-line', { scaleX: 0 });
    gsap.set('.nh-tag-text', { opacity: 0, x: -10 });
    gsap.set('.nh-word', { yPercent: 120, rotateZ: 3, opacity: 0 });
    gsap.set('.nh-desc', { opacity: 0, y: 30 });
    gsap.set('.nh-buttons a', { opacity: 0, y: 20, scale: 0.95 });

    nhTl.to('.nh-tag-line', { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.2)
      .to('.nh-tag-text', { opacity: 1, x: 0, duration: 1 }, 0.8)
      .to('.nh-word', { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.5, stagger: 0.15 }, 0.5)
      .to('.nh-desc', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 1.0)
      .to('.nh-buttons a', { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.5)' }, 1.2);

    // Floating animation for the blurred background blob
    gsap.to('.bg-glow-1', {
      y: 50,
      x: 30,
      scale: 1.1,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  // About Page specific Hero Animation
  if (document.querySelector('.about-hero-content')) {
    const ahTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    gsap.set('.ah-tag-line', { scaleX: 0 });
    gsap.set('.ah-tag-text', { opacity: 0, x: -10 });
    gsap.set('.ah-word', { yPercent: 120, rotateZ: 3, opacity: 0 });
    gsap.set('.ah-desc', { opacity: 0, y: 30 });
    gsap.set('.ah-buttons button', { opacity: 0, y: 20, scale: 0.95 });

    ahTl.to('.ah-tag-line', { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.2)
      .to('.ah-tag-text', { opacity: 1, x: 0, duration: 1 }, 0.8)
      .to('.ah-word', { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.5, stagger: 0.15 }, 0.5)
      .to('.ah-desc', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 1.0)
      .to('.ah-buttons button', { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.5)' }, 1.2);
      
    // Slow cinematic zoom for about hero background
    gsap.to('.hero-bg-layer', {
      scale: 1.15,
      duration: 15,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  // Three.js Interactive LED Particle Canvas
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a structured grid of particles representing an LED matrix
    const geometry = new THREE.BufferGeometry();
    
    // Calculate grid dimensions to aggressively overfill the screen for any aspect ratio
    const spacing = 0.4;
    const cols = Math.floor(100 / spacing); // Massive width to cover ultrawide screens
    const rows = Math.floor(60 / spacing);  // Massive height
    const count = cols * rows;
    
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3); // Store original for spring physics
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color('#ffffff');

    let i = 0;
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            // Center the grid perfectly
            const pX = (x - cols/2) * spacing;
            const pY = (y - rows/2) * spacing;
            const pZ = 0;
            
            positions[i*3] = pX;
            positions[i*3+1] = pY;
            positions[i*3+2] = pZ;
            
            originalPositions[i*3] = pX;
            originalPositions[i*3+1] = pY;
            originalPositions[i*3+2] = pZ;

            // Subtle blueish-white tint
            colors[i*3] = baseColor.r;
            colors[i*3+1] = baseColor.g;
            colors[i*3+2] = baseColor.b;
            
            i++;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // LED Pixel Material
    const material = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.3, // Very subtle, acts as a high-tech overlay
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Position camera to view the flat grid
    camera.position.z = 12;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Convert mouse to world coordinates roughly
        // We know camera z is 12, so world space is roughly mouseX * scale
        const mouseWorldX = (mouseX / windowHalfX) * 16;
        const mouseWorldY = -(mouseY / windowHalfY) * 10;

        const positions = particles.geometry.attributes.position.array;
        
        for(let i = 0; i < count; i++) {
            const i3 = i * 3;
            const origX = originalPositions[i3];
            const origY = originalPositions[i3+1];
            
            // Calculate distance from mouse to this particle
            const dx = origX - mouseWorldX;
            const dy = origY - mouseWorldY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Interaction radius
            const radius = 3.5;
            
            let targetZ = 0;
            if (dist < radius) {
                // Push the point forward (or backward) based on proximity to mouse
                // Using cosine for a smooth ripple curve
                const push = (Math.cos((dist/radius) * Math.PI) + 1) * 0.5;
                targetZ = push * 2.0; // Max push distance
            }
            
            // Add a very subtle continuous ambient wave to the entire grid
            targetZ += Math.sin(origX * 0.5 + elapsedTime * 2) * 0.2;
            targetZ += Math.cos(origY * 0.5 + elapsedTime * 2) * 0.2;

            // Spring physics to smoothly interpolate to targetZ
            positions[i3+2] += (targetZ - positions[i3+2]) * 0.1;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Very slight tilt to the whole grid based on mouse to give 3D depth
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;
        particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
        particles.rotation.x += 0.05 * (targetY - particles.rotation.x);

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // Ken Burns Continuous Scale for Background Image
  gsap.to('#hero-bg-img', {
    scale: 1.15,
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true
  });

  // Infinite Scrolling Marquee
  gsap.to('#hero-marquee', {
    xPercent: -50,
    ease: 'none',
    duration: 30,
    repeat: -1
  });

  // Parallax on Scroll for Hero Background
  gsap.to('#hero-bg-img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });


  // Section Titles Reveal
  const titles = gsap.utils.toArray('.sec-title, .gsap-fade-up');
  titles.forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        }
      }
    );
  });

  // Next-Gen Ecosystem Cards Image Parallax
  const ecosystemCards = gsap.utils.toArray('.gsap-ecosystem-card');
  ecosystemCards.forEach(card => {
    
    // Scale the card container up on scroll
    gsap.fromTo(card,
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        }
      }
    );

    // Parallax the inner image
    const img = card.querySelector('.card-img');
    if (img) {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });

  // Cards stagger reveal
  const cardSections = gsap.utils.toArray('.stagger-section');
  cardSections.forEach(section => {
    const cards = section.querySelectorAll('.stagger-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );
  });

  // Parallax background elements
  gsap.to('.bg-glow-1', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });

  // Next-Gen Custom Cursor
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });
  });

  const hoverElements = document.querySelectorAll('a, button, input, select, textarea, .glass-panel');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // 3D Tilt Effect for Cards
  const tiltCards = document.querySelectorAll('.stagger-card, .glass-panel');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.5
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
        duration: 0.7
      });
    });
  });

  // Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => {
          b.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white', 'shadow-md');
          b.classList.add('text-gray-500');
        });
        btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white', 'shadow-md');
        btn.classList.remove('text-gray-500');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
        
        if (typeof ScrollTrigger !== 'undefined') {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 350);
        }
      });
    });
  }

  // Sliders initialization (OwlCarousel)
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    var logosOwl = $('.logos-track');
    if (logosOwl.length) {
      logosOwl.owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 2 },
          600: { items: 4 },
          1000: { items: 6 }
        }
      });
      $('.nav-arrow.right').click(function () {
        logosOwl.trigger('next.owl.carousel');
      });
      $('.nav-arrow.left').click(function () {
        logosOwl.trigger('prev.owl.carousel');
      });
    }

    var testiOwl = $('.testimonials-carousel');
    if (testiOwl.length) {
      testiOwl.owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1024: { items: 3 }
        }
      });
      $('.testi-next').click(function () {
        testiOwl.trigger('next.owl.carousel');
      });
      $('.testi-prev').click(function () {
        testiOwl.trigger('prev.owl.carousel');
      });
    }
  }

  // Mobile Menu
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
});
