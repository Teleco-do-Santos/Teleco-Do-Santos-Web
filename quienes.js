import React, { useEffect, useRef } from 'react';
import './estilos.css'; // Asegúrate de crear este archivo CSS

function Quienes() {
  const elementosRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elementosRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="quienes-container">
      <h1 ref={(el) => (elementosRef.current[0] = el)} className="animado fade-in">
        Quiénes Somos
      </h1>
      <p ref={(el) => (elementosRef.current[1] = el)} className="animado slide-in">
        Somos un equipo apasionado por...
      </p>
      <div ref={(el) => (elementosRef.current[2] = el)} className="animado scale-in">
        {/* Agrega más contenido aquí */}
      </div>
    </div>
  );
}

export default Quienes;
