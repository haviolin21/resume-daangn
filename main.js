document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.count-up');
  const fadeEls = document.querySelectorAll('.fade-up');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const prefix = el.textContent.includes('💳') ? '💳 ' : '📈 ';
    const suffix = 'x';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(1);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach((el) => fadeObserver.observe(el));
});