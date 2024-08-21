document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // Agregar estilos dinámicamente
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                  transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .animate-on-scroll.animate {
      opacity: 1;
    }
    .fade-up { transform: translateY(50px); }
    .fade-up.animate { transform: translateY(0); }
    .fade-left { transform: translateX(-50px); }
    .fade-left.animate { transform: translateX(0); }
    .fade-right { transform: translateX(50px); }
    .fade-right.animate { transform: translateX(0); }
    .scale-up { transform: scale(0.8); }
    .scale-up.animate { transform: scale(1); }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Activar la animación con un retraso basado en el índice
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 100); // 100ms de retraso entre cada elemento
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '-50px 0px'
  });
  
  animatedElements.forEach((element, index) => {
    // Asignar una clase de animación aleatoria
    const animations = ['fade-up', 'fade-left', 'fade-right', 'scale-up'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    element.classList.add(randomAnimation);
    
    observer.observe(element);
  });
});