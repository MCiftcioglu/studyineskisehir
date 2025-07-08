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
      end: 'center top', // Animasyon daha erken bitecek
      scrub: 1, // Scroll hızına bağlı olarak animasyonu yumuşat
      pin: true, // Hero section'ı scroll süresince sabitler
    },
  });

  // Arka plan için zoom out efekti
  heroTimeline.fromTo(
    '.hero-background-pieces',
    { scale: 1.2 },
    { scale: 1, duration: 2, ease: 'none' },
    0
  );

  // Parçaların ayrılma animasyonu
  heroTimeline.to('.bg-piece.center-left', { x: '-100vw', duration: 2, ease: 'power2.out' }, 0);
  heroTimeline.to('.bg-piece.center-right', { x: '100vw', duration: 2, ease: 'power2.out' }, 0);
  heroTimeline.to('.bg-piece.center', { scale: 0.8, opacity: 0, duration: 2, ease: 'power2.out' }, 0);
  heroTimeline.to('.bg-piece.bottom-right', { x: '30%', y: '30%', opacity: 0, duration: 2, ease: 'power2.out' }, 0);

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

  // Nerede Eğitim Almalı? başlığı için animasyon
  const neredeEgitimH2 = document.querySelector('#universiteler h2');
  if (neredeEgitimH2) {
    const h2CharsNerede = splitText('#universiteler h2');
    gsap.from(h2CharsNerede, {
      y: -50, // Yukarıdan gelme efekti
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05, // Harfler arasında gecikme
      scrollTrigger: {
        trigger: neredeEgitimH2,
        start: 'top 80%', // Başlık ekrana girdiğinde başla
        toggleActions: 'play none none reverse',
      }
    });
  }

  // Nasıl Başvurmalı? başlığı için animasyon
  const nasilBasvurH2 = document.querySelector('#nasil-basvurmalı h2');
  if (nasilBasvurH2) {
    const h2CharsNasil = splitText('#nasil-basvurmalı h2');
    gsap.from(h2CharsNasil, {
      y: -50, // Yukarıdan gelme efekti
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.05, // Harfler arasında gecikme
      scrollTrigger: {
        trigger: nasilBasvurH2,
        start: 'top 80%', // Başlık ekrana girdiğinde başla
        toggleActions: 'play none none reverse',
      }
    });
  }

  if (horizontalContainer && featureGrid && featureGrid.scrollWidth > window.innerWidth) {
    const horizontalScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalContainer, // Yatay kapsayıcıyı tetikleyici yap
        start: 'top top', // Kapsayıcı viewport'un üstüne geldiğinde sabitle
        end: () => '+=' + (featureGrid.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true, // Tetikleyiciyi sabitle
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
  gsap.to(".site-logo", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: self => {
        if (self.progress > 0) {
          gsap.to(".site-logo", { opacity: 1, pointerEvents: "auto", duration: 0.3 });
          gsap.to(".site-logo img", { width: "80px", ease: "power2.out" });
        } else {
          gsap.to(".site-logo", { opacity: 0, pointerEvents: "none", duration: 0.3 });
          gsap.to(".site-logo img", { width: "200px", ease: "power2.out" });
        }
      }
    },
  });

  // Logoya tıklandığında en üste smooth scroll
  const siteLogo = document.querySelector('.site-logo');
  if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
    });
  }

  // Nasıl Başvurmalı kartları için flip animasyonu ve renk ayarları
  document.querySelectorAll('.apply-option').forEach((card, index) => {
    const cardFront = card.querySelector('.card-front');
    const cardBack = card.querySelector('.card-back');

    // Ana kartlara renk ver (flip animasyonu sırasında bu renkler korunur)
    if (index === 0) {
      card.style.backgroundColor = '#FFD700'; // İlk kart sarı
    } else if (index === 1) {
      card.style.backgroundColor = '#87CEEB'; // İkinci kart açık mavi
    }

    // Flip olduğunda gösterilecek arka yüz beyaz
    if (cardBack) {
      cardBack.style.backgroundColor = '#FFFFFF'; // Beyaz
    }

    // Ön yüz şeffaf olsun ki ana kartın rengi görünsün
    if (cardFront) {
      cardFront.style.backgroundColor = 'transparent';
    }

    gsap.set(cardBack, { rotationY: -180 }); // Arka yüzü başlangıçta ters çevir

    card.addEventListener('mouseenter', () => {
      gsap.to(cardFront, { rotationY: 180, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(cardBack, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(cardFront, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(cardBack, { rotationY: -180, duration: 0.6, ease: 'power2.inOut' });
    });
  });
});