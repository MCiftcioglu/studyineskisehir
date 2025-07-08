import '../css/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


document.addEventListener('DOMContentLoaded', () => {
  // Helper function to split text into spans for animation
  function splitText(selector) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.innerText;
      element.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        // Replace spaces with non-breaking spaces to maintain layout
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);
      });
      return element.querySelectorAll('span');
    }
    return [];
  }

  // Split hero content text into characters
  const h1Chars = splitText('.hero-content h1');
  const pChars = splitText('.hero-content p');

  // Animate hero text on page load
  if (h1Chars.length > 0) {
    gsap.from(h1Chars, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'bounce.out',
      stagger: 0.05,
    });
  }
  if (pChars.length > 0) {
    gsap.from(pChars, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.02,
    }, '-=1.0'); // Start this animation slightly before the h1 animation finishes
  }

  // AOS (Animate on Scroll) Kütüphanesini Başlatma
  AOS.init({
    duration: 1000,
    offset: 120,
    once: true,
    easing: 'ease-in-out',
  });

  // GSAP ve ScrollTrigger Entegrasyonu
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Hero Section Animasyonları
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top', // Animasyon ne zaman başlayacak
      end: 'bottom top', // Animasyon ne zaman bitecek
      scrub: 1, // Scroll hızına bağlı olarak animasyonu yumuşat
      pin: true, // Hero section'ı scroll süresince sabitler
    },
  });

  // Arka plan için zoom out efekti
  heroTimeline.fromTo(
    '.city-skyline',
    { scale: 1.2 },
    { scale: 1, duration: 2, ease: 'none' },
    0
  );

  // Bulutların sağa ve sola açılması
  heroTimeline.to('.cloud-1', { x: '-50%', opacity: 0, duration: 2 }, 0);
  heroTimeline.to('.cloud-2', { x: '50%', opacity: 0, duration: 2 }, 0);
  heroTimeline.to('.cloud-3', { x: '-30%', opacity: 0, duration: 2 }, 0);

  // Hero içeriğinin yavaşça kaybolması
  heroTimeline.to('.hero-content', { opacity: 0, duration: 1 }, 0.5);
  heroTimeline.to('.hero-logo', { opacity: 0, duration: 1 }, 0.5);

  // Yatay Kaydırma Animasyonu (Neden Eskişehir bölümü için)
  const horizontalContainer = document.querySelector('.horizontal-scroll-container');
  const featureGrid = document.querySelector('.feature-grid');
  
  // Neden Eskişehir başlığı için animasyon
  const nedenEskisehirH2 = document.querySelector('#sehir h2');
  if (nedenEskisehirH2) {
    const h2Chars = splitText('#sehir h2');
    gsap.from(h2Chars, {
      y: -50, // Yukarıdan gelme efekti
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05, // Harfler arasında gecikme
      scrollTrigger: {
        trigger: nedenEskisehirH2,
        start: 'top 80%', // Başlık ekrana girdiğinde başla
        toggleActions: 'play none none reverse',
      }
    });
  }

  if (horizontalContainer && featureGrid && featureGrid.scrollWidth > window.innerWidth) {
    const horizontalScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalContainer,
        start: 'top top',
        end: () => '+=' + (featureGrid.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    horizontalScrollTimeline.to(featureGrid, {
      x: () => -(featureGrid.scrollWidth - window.innerWidth),
      ease: 'none',
      onUpdate: () => {
        const line = document.querySelector('.horizontal-line');
        if (line) {
          line.style.width = `${featureGrid.scrollWidth}px`;
        }
      }
    });
  }

  // Resize durumunda ScrollTrigger'ı yenile
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  // Logo küçültme ve konumlandırma animasyonu
  gsap.to(".site-logo img", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    width: "80px",
    ease: "power2.out"
  });

  // Logoya tıklandığında en üste smooth scroll
  const siteLogo = document.querySelector('.site-logo');
  if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
    });
  }
});