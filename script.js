document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    // Aplicar estilos generales
    body.style.backgroundColor = '#000';
    body.style.color = '#fff';
    body.style.fontFamily = "'Arial', sans-serif";
    
    // Ocultar el contenido inicialmente
    body.style.opacity = '0';
    
    // Animar la aparición del contenido
    setTimeout(function() {
      body.style.transition = 'opacity 1.5s ease-in-out';
      body.style.opacity = '1';
    }, 100);

    // Mejorar el estilo de los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        applyButtonStyles(button);
    });

    // Mejorar la animación de entrada para elementos principales
    const mainElements = document.querySelectorAll('h1, h2, p, img');
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        if (element.tagName === 'H1' || element.tagName === 'H2') {
            element.style.fontWeight = '300';
            element.style.letterSpacing = '2px';
            element.style.textTransform = 'uppercase';
        }
        
        if (element.tagName === 'IMG') {
            element.style.borderRadius = '10px';
            element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)';
        }
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });
});

// La función createRipple se mantiene igual

// Actualizar los estilos para la animación de ondulación
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    body {
        background: linear-gradient(45deg, #000, #1a1a1a);
        min-height: 100vh;
    }
`;
document.head.appendChild(style);

// Función para aplicar estilos a los botones
function applyButtonStyles(button) {
    Object.assign(button.style, {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '30px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
    
    // Mantener el efecto de ondulación
    button.addEventListener('click', createRipple);
}

// Asegurar que los botones añadidos dinámicamente también tengan el estilo
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === 'BUTTON') {
                        applyButtonStyles(node);
                    }
                    node.querySelectorAll('button').forEach(applyButtonStyles);
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
