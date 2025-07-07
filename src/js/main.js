document.addEventListener('DOMContentLoaded', () => {
  // AOS (Animate on Scroll) Kütüphanesini Başlatma
  AOS.init({
    duration: 1000,
    offset: 120,
    once: true,
    easing: 'ease-in-out',
  });

  // GSAP ve ScrollTrigger Entegrasyonu
  gsap.registerPlugin(ScrollTrigger);

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
  heroTimeline.to('.city-skyline', {
    scale: 0.8, // %20 zoom out (uzaklaşma)
    duration: 2,
  }, 0); // Animasyonun başlangıç zamanı

  // Bulutların sağa ve sola açılması
  heroTimeline.to('.cloud-1', {
    x: '-50%', // Sola doğru %50 kaydır
    duration: 2,
  }, 0);

  heroTimeline.to('.cloud-2', {
    x: '50%', // Sağa doğru %50 kaydır
    duration: 2,
  }, 0);
  
    heroTimeline.to('.cloud-3', {
    x: '-30%', // Sola doğru %30 kaydır
    duration: 2,
  }, 0);

  // Hero içeriğinin yavaşça kaybolması
  heroTimeline.to('.hero-content', {
    opacity: 0,
    duration: 1,
  }, 0.5); // Zoom başladıktan biraz sonra başlasın

  // Yatay Kaydırma Animasyonu (Neden Eskişehir bölümü için)
  const horizontalContainer = document.querySelector(".horizontal-scroll-container");
  const featureGrid = document.querySelector(".feature-grid");
  const tramwaySection = document.querySelector(".tramway-section");

  window.addEventListener('load', () => {
    const scrollDistance = featureGrid.scrollWidth + (
      tramwaySection.offsetLeft - (window.innerWidth / 2 - tramwaySection.offsetWidth / 2)
    );

  gsap.to(horizontalContainer, {
    x: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-scroll-container",
      start: "top top",
      pin: true,
      scrub: 1,
      end: () => "+=" + scrollDistance,
    }
  });

  // Logo küçültme animasyonu (sadece masaüstü için)
  ScrollTrigger.matchMedia({
    // Masaüstü (768px ve üstü)
    "(min-width: 768px)": function() {
      gsap.to(".site-logo img", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "bottom center",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        },
        width: "80px",
      });
    },
  });

  // Logoya tıklandığında en üste smooth scroll
  document.querySelector('.site-logo').addEventListener('click', (e) => {
    e.preventDefault(); // Varsayılan link davranışını engelle
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
  });
});
