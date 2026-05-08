// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .project-card, .service-card, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formSuccess = document.createElement('div');
formSuccess.className = 'form-success';
formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
contactForm.parentNode.insertBefore(formSuccess, contactForm);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:melkamdemelash14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formSuccess.classList.add('show');
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.classList.remove('show');
    }, 5000);
});

// Typing Animation for Home Title
const homeTitle = document.querySelector('.home-title');
const originalText = homeTitle.innerHTML;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    if (!isDeleting && charIndex < originalText.length) {
        homeTitle.innerHTML = originalText.slice(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        homeTitle.innerHTML = originalText.slice(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else if (charIndex === originalText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (charIndex === 0) {
        isDeleting = false;
        typingSpeed = 500; // Pause before typing again
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Parallax Effect for Home Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home');
    const homeContent = document.querySelector('.home-container');
    
    if (homeSection && homeContent) {
        const rate = scrolled * -0.5;
        homeContent.style.transform = `translateY(${rate}px)`;
    }
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) scale(1)';
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add CSS transitions for smooth animations
const style = document.createElement('style');
style.textContent = `
    .service-icon {
        transition: transform 0.3s ease;
    }
    
    .project-card, .service-card {
        transition: all 0.3s ease;
    }
    
    .nav-link.active {
        color: #3b82f6 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Counter Animation for Stats (if you add stats later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Particle Background Effect (Optional Enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.5';
    particle.style.background = '#3b82f6';
    particle.style.width = Math.random() * 3 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.zIndex = '1';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    particle.animate([
        { transform: 'translateY(0) scale(1)', opacity: 0.5 },
        { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create particles occasionally
setInterval(() => {
    if (Math.random() > 0.7) {
        createParticle();
    }
}, 500);

// Console Welcome Message
console.log('%c Welcome to Melkam Demelash Portfolio! ', 'background: #3b82f6; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore my projects and get in touch! ', 'background: #1e293b; color: #38bdf8; font-size: 14px; padding: 8px; border-radius: 5px;');
