// --- LÓGICA DEL SPLASH SCREEN ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splashScreen');
    const heroContent = document.querySelector('.hero-content');
    
    setTimeout(() => {
        if(splashScreen) {
            splashScreen.classList.add('hidden');
        }
        if(heroContent) {
            heroContent.classList.add('is-visible');
        }
    }, 2500); 
    
    setTimeout(() => {
        if(splashScreen && splashScreen.parentNode) {
            splashScreen.parentNode.removeChild(splashScreen);
        }
    }, 3300);
});

// --- TODO EL RESTO DEL CÓDIGO ---
document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling and active nav links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const offsetTop = targetSection.offsetTop - headerHeight + 20; 

                smoothScrollTo(offsetTop, 500);
            }
            
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
            
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lógica para previsualización de videos en el portafolio
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const videoPreview = item.querySelector('.portfolio-video-preview');
        if (videoPreview) {
            item.addEventListener('mouseenter', () => {
                videoPreview.play().catch(error => {});
            });
            item.addEventListener('mouseleave', () => {
                videoPreview.pause();
                videoPreview.currentTime = 0;
            });
        }
    });

    // Custom dropdown functionality
    // ... (el código del dropdown sigue igual) ...
    const dropdownSelected = document.getElementById('dropdownSelected');
    const dropdownOptions = document.getElementById('dropdownOptions');
    const selectedText = document.getElementById('selectedText');
    const projectInput = document.getElementById('project');

    if (dropdownSelected && dropdownOptions && selectedText && projectInput) {
        dropdownSelected.addEventListener('click', () => {
            dropdownSelected.classList.toggle('active');
            dropdownOptions.classList.toggle('active');
        });

        const options = document.querySelectorAll('.dropdown-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                const text = option.textContent;
                
                selectedText.textContent = text;
                projectInput.value = value;
                
                dropdownSelected.classList.remove('active');
                dropdownOptions.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            const projectDropdown = document.getElementById('projectDropdown');
            if (projectDropdown && !projectDropdown.contains(e.target)) {
                dropdownSelected.classList.remove('active');
                dropdownOptions.classList.remove('active');
            }
        });
    }

    // Contact form handling
    // ... (el código del formulario sigue igual) ...
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            startLoadingState(submitBtn, btnText, btnIcon);
            setTimeout(() => {
                showSuccessState(submitBtn, btnText, btnIcon);
                setTimeout(() => resetForm(submitBtn, btnText, btnIcon, contactForm, selectedText, projectInput), 3000);
            }, 2000);
        });
    }

    function startLoadingState(submitBtn, btnText, btnIcon) {
        if(!submitBtn || !btnText || !btnIcon) return;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
        btnIcon.textContent = '⟳';
        btnIcon.style.display = 'inline-block';
    }

    function showSuccessState(submitBtn, btnText, btnIcon) {
        if(!submitBtn || !btnText || !btnIcon) return;
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        btnText.textContent = 'Mensaje Enviado';
        btnIcon.textContent = '✓';
    }

    function resetForm(submitBtn, btnText, btnIcon, contactForm, selectedText, projectInput) {
        if(!submitBtn || !btnText || !btnIcon || !contactForm) return;
        submitBtn.classList.remove('loading', 'success');
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar Mensaje';
        btnIcon.textContent = '➤';
        btnIcon.style.display = 'none';
        
        contactForm.reset();
        if(selectedText) selectedText.textContent = 'Selecciona un servicio';
        if(projectInput) projectInput.value = '';
    }

    // Scroll-based animations, nav highlighting AND auto-hiding header
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (!header) return;
        const headerHeight = header.offsetHeight;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        const sections = document.querySelectorAll('.section, .hero');
        const scrollPos = scrollTop + headerHeight + 20; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Función para animar números
    function animateCount(el) {
        const numberSpan = el.querySelector('.count-number');
        if (!numberSpan) return;

        const target = parseInt(numberSpan.innerText.replace(/\D/g, ''));
        if (isNaN(target)) return;
        
        const duration = 2000;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(easedProgress * target);
            
            numberSpan.innerText = currentValue;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                numberSpan.innerText = target;
                el.classList.add('is-animated');
            }
        };
        
        numberSpan.innerText = '0';
        window.requestAnimationFrame(step);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('stat-item')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.classList.contains('is-animated')) {
                        statNumber.classList.add('is-animated');
                        animateCount(statNumber);
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-item, .service-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll function
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
    }

    // Lógica para mostrar el botón de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-flotante');
    const contactSection = document.querySelector('#contacto');

    if (whatsappButton && contactSection) {
        const whatsappObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    whatsappButton.classList.add('visible');
                } else {
                    whatsappButton.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        whatsappObserver.observe(contactSection);
    }

    // Lógica para el Modal de Video del Portafolio (con Lazy Loading)
    const videoModal = document.getElementById('videoModal');
    const videoPlayerContainer = document.querySelector('.video-container');
    const closeModal = document.querySelector('.close-modal');

    if (videoModal && videoPlayerContainer && closeModal) {
        
        // Función de Cierre ÚNICA
        function closeVideoModal() {
            videoModal.classList.remove('visible');
            videoModal.classList.remove('is-vertical');
            videoModal.classList.remove('is-easter-egg'); // <-- ¡LIMPIEZA!
            videoPlayerContainer.innerHTML = ''; 
        }
        
        // Listeners del modal
        closeModal.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Trigger para las cards del portafolio
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                const videoSource = item.getAttribute('data-video-source') || 'youtube';
                const videoOrientation = item.getAttribute('data-orientation');
                
                if (videoId) {
                    let embedUrl = '';

                    if (videoOrientation === 'vertical') {
                        videoModal.classList.add('is-vertical');
                    }

                    if (videoSource === 'youtube') {
                        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    } else if (videoSource === 'vimeo') {
                        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
                    }
                    
                    if (embedUrl) {
                        videoPlayerContainer.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                        videoModal.classList.add('visible');
                    }
                }
            });
        });

        // Trigger para el Easter Egg
        const footerTrigger = document.querySelector('.footer p');
        if (footerTrigger) {
            footerTrigger.addEventListener('click', () => {
                // 1. Reseteamos el modal (por si acaso)
                videoModal.classList.remove('is-vertical');
                // 2. Agregamos la clase para modo texto
                videoModal.classList.add('is-easter-egg');

                // 3. Cargamos solo el cartel de texto
                videoPlayerContainer.innerHTML = `
                    <div class="easter-egg-text">
                        &gt; NO HAY NADA QUE VER ACÁ_
                    </div>
                `;
                
                // 4. Prendemos el modal
                videoModal.classList.add('visible');
            });
        }
    }

}); // <-- FIN DEL DOMCONTENTLOADED