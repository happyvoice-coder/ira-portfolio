/* ============================================================
   BYBOLDENKOI — Интерактивный функционал сайта
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. ИСЧЕЗНОВЕНИЕ ЭКРАНА ЗАГРУЗКИ (PRELOADER)
  const preloader = document.getElementById('preloader');
  
  // Функция скрытия прелоадера
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      // Полностью убираем из разметки, чтобы не перекрывал клики
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
  };

  // Скрываем либо при полной загрузке всех ресурсов, либо превентивно через 2.5 сек (защита от зависания)
  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 2500);


  // 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Удаляем слежку за элементом, так как он уже красиво появился
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1, // Элемент начнет проявляться, как только 10% его площади войдет в экран
      rootMargin: '0px 0px -40px 0px' 
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Резервный вариант для старых браузеров
    revealElements.forEach(element => element.classList.add('active'));
  }


  // 3. ПОВЕДЕНИЕ КНОПКИ «НАВЕРХ»
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      // Кнопка появляется, если прокрутили больше 500px
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    // Плавный скролл наверх при клике
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
