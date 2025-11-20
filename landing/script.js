// Script para la landing page del Gestor de Sueldos

// Smooth scroll para navegación suave (si se agregan enlaces de navegación)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });
    
    // Configuración inicial
    inicializarBotones();
    
    // Botón scroll to top
    inicializarScrollToTop();
    
    // Modal de PDFs
    inicializarModalPDF();
    
    // Efecto de aparición suave al hacer scroll (backup si AOS falla)
    observarElementos();
    
    // Animaciones avanzadas de arquitectura con GSAP
    if (typeof gsap !== 'undefined') {
        inicializarAnimacionesArquitectura();
    }
});

/**
 * Inicializa los botones "Ver en acción"
 */
function inicializarBotones() {
    const botones = document.querySelectorAll('.boton-accion');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const videoPath = this.getAttribute('data-video');
            const funcionalidad = this.getAttribute('data-funcionalidad');
            
            if (videoPath) {
                // Si tiene video, abrir modal de video
                const titulo = this.closest('.tarjeta-funcionalidad')?.querySelector('h3')?.textContent || 'Video Demostrativo';
                abrirModalVideo(videoPath, titulo);
            } else {
                // Si no tiene video, manejar como antes
                manejarClickBoton(funcionalidad);
            }
        });
    });
}

/**
 * Maneja el click en los botones de acción
 * @param {string} funcionalidad - Nombre de la funcionalidad
 */
function manejarClickBoton(funcionalidad) {
    // Los enlaces se completarán luego según las instrucciones
    // Por ahora, solo mostramos un mensaje en consola
    console.log(`Botón clickeado para: ${funcionalidad}`);
    
    // Aquí se puede agregar la lógica para redirigir cuando se definan los enlaces
    // Ejemplo:
    // const enlaces = {
    //     'empleados': 'https://...',
    //     'convenios': 'https://...',
    //     'liquidacion': 'https://...'
    // };
    // if (enlaces[funcionalidad]) {
    //     window.location.href = enlaces[funcionalidad];
    // }
}

/**
 * Observa elementos para animación al hacer scroll
 */
function observarElementos() {
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar tarjetas y secciones
        const elementos = document.querySelectorAll('.tarjeta-tecnologia, .tarjeta-funcionalidad, .capa-arquitectura');
        elementos.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

/**
 * Inicializa el botón de scroll to top
 */
function inicializarScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll suave al hacer click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Inicializa el modal para visualizar PDFs
 */
function inicializarModalPDF() {
    const modal = document.getElementById('modal-pdf');
    const cerrarBtn = document.getElementById('cerrar-modal');
    const iframe = document.getElementById('iframe-pdf');
    const descargarBtn = document.getElementById('descargar-pdf');
    
    if (!modal) return;
    
    // Cerrar modal al hacer click en el botón X
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', function() {
            cerrarModalPDF();
        });
    }
    
    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModalPDF();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('activo')) {
            cerrarModalPDF();
        }
    });
    
    // Manejar clicks en botones "Ver PDF" o "Ver Documento"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('boton-ver')) {
            const filePath = e.target.getAttribute('data-file') || e.target.getAttribute('data-pdf');
            const fileType = e.target.getAttribute('data-type') || 'pdf';
            const titulo = e.target.closest('.tarjeta-documento')?.querySelector('h3')?.textContent || 'Documento';
            
            if (fileType === 'markdown') {
                abrirModalMarkdown(filePath, titulo);
            } else {
                abrirModalPDF(filePath, titulo);
            }
        }
    });
    
    // Inicializar modal de videos
    inicializarModalVideo();
}

/**
 * Abre el modal con el PDF especificado
 * @param {string} pdfPath - Ruta al archivo PDF
 * @param {string} titulo - Título del documento
 */
function abrirModalPDF(pdfPath, titulo) {
    const modal = document.getElementById('modal-pdf');
    const iframe = document.getElementById('iframe-pdf');
    const descargarBtn = document.getElementById('descargar-pdf');
    const modalTitulo = document.getElementById('modal-titulo');
    
    if (!modal || !iframe) return;
    
    // Establecer el título
    if (modalTitulo) {
        modalTitulo.textContent = titulo;
    }
    
    // Cargar el PDF en el iframe
    iframe.src = pdfPath;
    
    // Configurar enlace de descarga
    if (descargarBtn) {
        descargarBtn.href = pdfPath;
        descargarBtn.download = pdfPath.split('/').pop();
    }
    
    // Mostrar el modal
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

/**
 * Abre el modal con un archivo Markdown
 * @param {string} filePath - Ruta al archivo Markdown
 * @param {string} titulo - Título del documento
 */
function abrirModalMarkdown(filePath, titulo) {
    const modal = document.getElementById('modal-pdf');
    const iframe = document.getElementById('iframe-pdf');
    const markdownViewer = document.getElementById('markdown-viewer');
    const descargarBtn = document.getElementById('descargar-pdf');
    const modalTitulo = document.getElementById('modal-titulo');
    
    if (!modal || !markdownViewer) return;
    
    // Establecer el título
    if (modalTitulo) {
        modalTitulo.textContent = titulo;
    }
    
    // Ocultar iframe y mostrar markdown viewer
    if (iframe) {
        iframe.classList.add('oculto');
    }
    markdownViewer.classList.add('visible');
    
    // Cargar y convertir el markdown
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo');
            }
            return response.text();
        })
        .then(markdown => {
            markdownViewer.innerHTML = convertirMarkdownAHTML(markdown);
        })
        .catch(error => {
            markdownViewer.innerHTML = `<p style="color: red;">Error al cargar el documento: ${error.message}</p>`;
        });
    
    // Configurar enlace de descarga
    if (descargarBtn) {
        descargarBtn.href = filePath;
        descargarBtn.download = filePath.split('/').pop();
        descargarBtn.textContent = 'Descargar Markdown';
    }
    
    // Mostrar el modal
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

/**
 * Convierte texto Markdown básico a HTML
 * @param {string} markdown - Texto en formato Markdown
 * @returns {string} - HTML convertido
 */
function convertirMarkdownAHTML(markdown) {
    let html = markdown;
    const lines = html.split('\n');
    const result = [];
    let inList = false;
    let currentParagraph = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
        
        // Separadores (líneas con guiones o iguales)
        if (/^[─═=]+$/.test(line)) {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (currentParagraph.length > 0) {
                result.push('<p>' + currentParagraph.join(' ') + '</p>');
                currentParagraph = [];
            }
            result.push('<hr>');
            continue;
        }
        
        // Títulos con #
        if (line.startsWith('#')) {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (currentParagraph.length > 0) {
                result.push('<p>' + currentParagraph.join(' ') + '</p>');
                currentParagraph = [];
            }
            if (line.startsWith('### ')) {
                result.push('<h3>' + line.substring(4) + '</h3>');
            } else if (line.startsWith('## ')) {
                result.push('<h2>' + line.substring(3) + '</h2>');
            } else if (line.startsWith('# ')) {
                result.push('<h1>' + line.substring(2) + '</h1>');
            }
            continue;
        }
        
        // Listas con guiones (– o -)
        if (/^[–-] (.+)$/.test(line)) {
            if (currentParagraph.length > 0) {
                result.push('<p>' + currentParagraph.join(' ') + '</p>');
                currentParagraph = [];
            }
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            const listItem = line.replace(/^[–-] (.+)$/, '$1');
            result.push('<li>' + convertirFormatoTexto(listItem) + '</li>');
            continue;
        }
        
        // Si no es lista pero estábamos en una, cerrar
        if (inList && line && !/^[–-] /.test(line)) {
            result.push('</ul>');
            inList = false;
        }
        
        // Párrafos normales
        if (line) {
            currentParagraph.push(convertirFormatoTexto(line));
        } else {
            // Línea vacía: cerrar párrafo actual
            if (currentParagraph.length > 0) {
                result.push('<p>' + currentParagraph.join(' ') + '</p>');
                currentParagraph = [];
            }
        }
    }
    
    // Cerrar elementos abiertos
    if (inList) {
        result.push('</ul>');
    }
    if (currentParagraph.length > 0) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
    }
    
    return result.join('\n');
}

/**
 * Convierte formato de texto (negritas, etc.)
 * @param {string} text - Texto a convertir
 * @returns {string} - Texto con formato HTML
 */
function convertirFormatoTexto(text) {
    // Negritas con **
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Negritas con __
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Código inline con `
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');
    
    return text;
}

/**
 * Cierra el modal de PDF/Markdown
 */
function cerrarModalPDF() {
    const modal = document.getElementById('modal-pdf');
    const iframe = document.getElementById('iframe-pdf');
    const markdownViewer = document.getElementById('markdown-viewer');
    
    if (!modal) return;
    
    modal.classList.remove('activo');
    document.body.style.overflow = ''; // Restaurar scroll del body
    
    // Limpiar después de un breve delay para la animación
    setTimeout(function() {
        if (iframe) {
            iframe.src = '';
            iframe.classList.remove('oculto');
        }
        if (markdownViewer) {
            markdownViewer.innerHTML = '';
            markdownViewer.classList.remove('visible');
        }
    }, 300);
}

/**
 * Inicializa animaciones avanzadas para la sección de arquitectura
 */
function inicializarAnimacionesArquitectura() {
    const capas = document.querySelectorAll('.capa-arquitectura');
    const conexiones = document.querySelectorAll('.conexion-arquitectura');
    
    // Animación de entrada para las capas
    capas.forEach((capa, index) => {
        gsap.from(capa, {
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)"
        });
        
        // Animación al hover
        capa.addEventListener('mouseenter', function() {
            gsap.to(capa, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animar icono
            const icono = capa.querySelector('.capa-icono');
            if (icono) {
                gsap.to(icono, {
                    rotation: 360,
                    scale: 1.1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        capa.addEventListener('mouseleave', function() {
            gsap.to(capa, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            const icono = capa.querySelector('.capa-icono');
            if (icono) {
                gsap.to(icono, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Animación de entrada para conexiones
    conexiones.forEach((conexion, index) => {
        gsap.from(conexion, {
            height: 0,
            opacity: 0,
            duration: 0.6,
            delay: 0.5 + (index * 0.2),
            ease: "power2.out"
        });
    });
    
    // Animación continua de partículas (horizontal)
    const particulas = document.querySelectorAll('.particula-flujo');
    particulas.forEach((particula, index) => {
        gsap.to(particula, {
            x: 50,
            duration: 2,
            repeat: -1,
            delay: index * 0.5,
            ease: "none"
        });
    });
}

/**
 * Inicializa el modal para reproducir videos
 */
function inicializarModalVideo() {
    const modal = document.getElementById('modal-video');
    const cerrarBtn = document.getElementById('cerrar-modal-video');
    const videoPlayer = document.getElementById('video-player');
    
    if (!modal) return;
    
    // Cerrar modal al hacer click en el botón X
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', function() {
            cerrarModalVideo();
        });
    }
    
    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModalVideo();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('activo')) {
            cerrarModalVideo();
        }
    });
}

/**
 * Abre el modal con el video especificado
 * @param {string} videoPath - Ruta al archivo de video
 * @param {string} titulo - Título del video
 */
function abrirModalVideo(videoPath, titulo) {
    const modal = document.getElementById('modal-video');
    const videoPlayer = document.getElementById('video-player');
    const modalTitulo = document.getElementById('modal-titulo-video');
    
    if (!modal || !videoPlayer) return;
    
    // Establecer el título
    if (modalTitulo) {
        modalTitulo.textContent = titulo;
    }
    
    // Cargar el video
    videoPlayer.src = videoPath;
    videoPlayer.load(); // Cargar el video
    
    // Mostrar el modal
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

/**
 * Cierra el modal de video
 */
function cerrarModalVideo() {
    const modal = document.getElementById('modal-video');
    const videoPlayer = document.getElementById('video-player');
    
    if (!modal) return;
    
    // Pausar el video antes de cerrar
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0; // Reiniciar al inicio
    }
    
    modal.classList.remove('activo');
    document.body.style.overflow = ''; // Restaurar scroll del body
    
    // Limpiar el video después de un breve delay para la animación
    setTimeout(function() {
        if (videoPlayer) {
            videoPlayer.src = '';
        }
    }, 300);
}

/**
 * Función auxiliar para scroll suave (si se necesita)
 */
function scrollSuave(elemento) {
    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

