document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // Stats counter animation
  const statsSection = document.querySelector('.stats');
  let animated = false;

  const animateStats = () => {
    if (animated) return;
    
    document.querySelectorAll('.stat-number').forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const increment = target / 100;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
          current = Math.ceil(target * easeOutQuart(progress));
          stat.textContent = current.toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target.toLocaleString();
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
    
    animated = true;
  };

  // Trigger stats animation when stats section is in view
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
    }
  });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Smooth parallax effect for hero section
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
  });

  // Add hover effect to map images
  document.querySelectorAll('.map-image').forEach(map => {
    map.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = map.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      map.style.transform = `scale(1.02) perspective(1000px) rotateY(${(x - 0.5) * 5}deg) rotateX(${(y - 0.5) * -5}deg)`;
    });
    
    map.addEventListener('mouseleave', () => {
      map.style.transform = 'scale(1) perspective(1000px) rotateY(0) rotateX(0)';
    });
  });
});