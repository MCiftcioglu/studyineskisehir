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
  heroTimeline.fromTo(
    '.city-skyline',
    { scale: 1.2 },
    { scale: 1, duration: 2, ease: 'none' },
    0
  );

  // Bulutların sağa ve sola açılması
  heroTimeline.to('.cloud-1', {
    x: '-50%', // Sola doğru %50 kaydır
    opacity: 0,
    duration: 2,
  }, 0);

  heroTimeline.to('.cloud-2', {
    x: '50%', // Sağa doğru %50 kaydır
    opacity: 0,
    duration: 2,
  }, 0);
  
    heroTimeline.to('.cloud-3', {
    x: '-30%', // Sola doğru %30 kaydır
    opacity: 0,
    duration: 2,
  }, 0);

  // Hero içeriğinin yavaşça kaybolması
  heroTimeline.to('.hero-content', {
    opacity: 0,
    duration: 1,
  }, 0.5); // Zoom başladıktan biraz sonra başlasın

  // Yatay Kaydırma Animasyonu (Neden Eskişehir bölümü için)
  const horizontalContainer = document.querySelector('.horizontal-scroll-container');
  const featureGrid = document.querySelector('.feature-grid');
  const tramwaySection = document.querySelector('.tramway-section');
  const tramwayImage = document.querySelector('.tramway-image');
  const universitelerSection = document.querySelector('#universiteler');

  // Yatay kaydırma için toplam mesafe
  const totalScrollDistance = featureGrid.scrollWidth + tramwayImage.offsetWidth;

  // Yatay kaydırma timeline'ı
  const horizontalScrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: horizontalContainer,
      start: 'top top',
      end: () => '+=' + totalScrollDistance, // Toplam kaydırma mesafesi
      scrub: 1,
      pin: true,
      anticipatePin: 1, // Pinleme geçişini yumuşatır
      onUpdate: self => {
        // Tramvay görseli sayfanın ortasına geldiğinde dikey kaydırmaya geçiş
        const tramwayRect = tramwayImage.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;

        if (tramwayRect.left <= viewportCenter && tramwayRect.right >= viewportCenter) {
          // Dikey kaydırmaya geçişi tetikle
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: universitelerSection, autoKill: false },
            ease: 'power2.inOut'
          });
        }
      }
    }
  });

  // 7 kutunun sağdan sola kayması
  horizontalScrollTimeline.to(featureGrid, {
    x: () => -(featureGrid.scrollWidth - window.innerWidth),
    ease: 'none'
  });

  // Tramvay görselinin sağdan sola kayması
  horizontalScrollTimeline.to(tramwayImage, {
    x: () => -(tramwayImage.offsetWidth + window.innerWidth / 2), // Tramvayın ortalanması için ayar
    ease: 'none'
  }, '<+=0.5'); // Kutular kaymaya başladıktan biraz sonra başla

  // Resize durumunda ScrollTrigger'ı yenile
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
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
