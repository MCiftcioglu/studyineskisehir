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
  const featureItems = document.querySelectorAll('.feature-item');

  if (horizontalContainer && featureGrid && featureItems.length > 0) {
    const lastItem = featureItems[featureItems.length - 1];
    const itemWidth = lastItem.offsetWidth;
    const gap = 30; // Assuming 30px gap as per CSS
    
    // Calculate the x position to center the last item
    // (n-1) * (itemWidth + gap) gives the start of the last item
    // + itemWidth / 2 to get its center
    // - window.innerWidth / 2 to align it to the center of the viewport
    const xTranslation = -((featureItems.length - 1) * (itemWidth + gap) + itemWidth / 2 - window.innerWidth / 2);

    console.log('xTranslation:', xTranslation);

    gsap.to(featureGrid, {
      x: xTranslation,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalContainer,
        start: 'top top',
        pin: true,
        scrub: 1,
        // Add some extra scroll distance to ensure smooth transition to vertical scroll
        end: () => `+=${Math.abs(xTranslation) + window.innerHeight * 0.5}`, // Adding 50vh extra scroll
        invalidateOnRefresh: true
      }
    });

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  }

  // Logo başlangıç pozisyonu ve scroll animasyonu
  const siteLogo = document.getElementById('siteLogo');
  const heroSection = document.getElementById('hero');

  if (siteLogo && heroSection) {
    const setInitialLogoPosition = () => {
      const heroWidth = heroSection.offsetWidth;
      const logoWidth = siteLogo.offsetWidth;
      const heroHeight = heroSection.offsetHeight;
      const logoHeight = siteLogo.offsetHeight;

      const centeredLeft = (heroWidth - logoWidth) / 2;
      const centeredTop = (heroHeight * 0.1); 

      gsap.set(siteLogo, {
        left: centeredLeft,
        top: centeredTop,
      });
    };

    setInitialLogoPosition();
    window.addEventListener('resize', setInitialLogoPosition);

    gsap.to(siteLogo, {
      left: 15,
      top: 15,
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top', 
        scrub: true,
      }
    });
  }

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
