// Using CDNs for GSAP and THREE, they are available globally
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Lenis for premium smooth scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease out
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Navbar blur effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-[#030303]/80', 'backdrop-blur-xl', 'border-white/10');
      navbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar.classList.remove('bg-[#030303]/80', 'backdrop-blur-xl', 'border-white/10');
      navbar.classList.add('bg-transparent', 'border-transparent');
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
});
