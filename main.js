document.addEventListener('DOMContentLoaded', function () {
  // 숫자 카운트 애니메이션
  const counters = document.querySelectorAll('.count-up');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = 'x';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased).toFixed(1);
      el.textContent = `${value}${suffix}`;
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

  // 스크롤 시 페이드 업 애니메이션 (당근 스타일의 부드러운 전환)
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target); // 한 번 보여진 후에는 다시 애니메이션 하지 않음
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el) => fadeObserver.observe(el));
});

// 모달(Modal) 제어 함수
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    // 약간의 딜레이를 주어 opacity transition이 적용되도록 함
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    // 모달 열릴 때 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(event, modalId, isButton = false) {
  const modal = document.getElementById(modalId);
  
  // 닫기 버튼을 클릭했거나, 모달 배경(modal-content 바깥)을 클릭했을 때만 닫기
  if (isButton || event.target === modal) {
    modal.classList.remove('show');
    // transition 끝난 후 display none 처리
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // 배경 스크롤 복구
    }, 300);
  }
}