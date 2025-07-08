# Study in Eskişehir – One Page Scroll Site PRD

## 📌 Proje Özeti

"Study in Eskişehir", Eskişehir’de üniversite eğitimi almak isteyen uluslararası öğrencilere yönelik, etkileyici bir tanıtım sitesi olacak. Ana sayfa tek sayfalık (one page) yapıda olup; bulutlu bir geçiş animasyonu ile başlayacak, scroll yaptıkça farklı bölümler görünür hale gelecektir. Site modern, hızlı, responsive ve görsel açıdan zengin bir yapı sunacaktır.

---

## 🎯 Amaçlar

- Eskişehir’in öğrenci dostu yapısını güçlü görsellerle tanıtmak
- Anadolu Üniversitesi, ESTÜ ve ESOGÜ’ye dair bilgileri etkileyici biçimde sunmak
- Mobil ve masaüstü cihazlarda akıcı bir kullanıcı deneyimi sağlamak
- Scroll tabanlı interaktif bir yapı sunmak (motion + discovery odaklı)

---

## 🧱 Sayfa Yapısı (Section Breakdown)

1. **Hero Section – Bulutlu Giriş**
   - Full-screen şehir manzarası
   - Katmanlı PNG bulut görselleri (parallax + fade-out)
   - Başlık + CTA butonu

2. **Şehir Tanıtımı**
   - Neden Eskişehir?
   - Görsel + metin blokları (slide-up)

3. **Üniversiteler**
   - 3 kart: Anadolu Üni., ESTÜ, ESOGÜ (fade-in + delay)

4. **Öğrenci Deneyimleri**
   - YouTube embed (lazy-load + zoom-in)

5. **Etkinlikler / Duyurular**
   - Güncellenebilir yapı (fade-in + scroll-triggered animation)

6. **Footer**
   - Linkler, sosyal medya, üniversite logoları

---

## ⚙️ Teknik Gereksinimler

### 🌐 Frontend

- HTML5, CSS3, JavaScript (ES6+)
- CSS preprocessor (SASS / SCSS) [opsiyonel]
- **Responsive yapı** (mobile-first tasarım)

### 📦 Framework / Araçlar

| Amaç | Kütüphane | Açıklama |
|------|-----------|----------|
| Scroll animasyon | [GSAP](https://greensock.com/gsap/) + ScrollTrigger | Yüksek performanslı scroll bazlı animasyon |
| Alternatif / hafif çözüm | [AOS](https://michalsnik.github.io/aos/) | Basit fade-in/fade-up efektleri için |
| Scroll görünürlük tespiti | Intersection Observer API | Lightweight alternatif, fallback olarak kullanılır |
| Görsel optimizasyon | [LazySizes](https://github.com/aFarkas/lazysizes) | Lazy load için (YouTube & img) |
| Stil framework | TailwindCSS / Custom CSS | Tailwind hızlı prototipleme için önerilir |

---

## 📁 Proje Yapısı (Klasörler)

```
studyineskisehir/
│
├── public/
│   ├── images/           → Tüm görseller (bulutlar, üniversiteler vs.)
│   ├── videos/           → YouTube embed placeholder’ları
│   └── index.html
│
├── src/
│   ├── css/
│   │   └── style.scss    → Özel stiller
│   └── js/
│       └── main.js       → Scroll animasyonları, event handlers
│
├── dist/                 → Build çıktısı
└── package.json
```

---

## 📦 Bağımlılıklar (Dependencies)

```json
{
  "dependencies": {
    "gsap": "^3.12.2",
    "aos": "^3.0.0-beta.6",
    "lazysizes": "^5.3.2"
  },
  "devDependencies": {
    "sass": "^1.65.1",
    "vite": "^5.2.0"
  }
}
```

---

## 🔐 Güvenlik & Uyumluluk

- HTTPS (SSL) gereklidir
- GDPR/KVKK kapsamında veri toplanmadığı için cookie yönetimi yok
- Dış içerikler (YouTube) embed şeklinde gösterilecektir

---

## 📱 Responsive Plan

| Cihaz Türü | Yaklaşım |
|------------|----------|
| Mobil | Animasyon süresi azaltılabilir, bazı efektler devre dışı bırakılır |
| Tablet | Küçük ekranlara özel içerik hizalamaları yapılır |
| Masaüstü | Tüm animasyonlar aktif, yüksek çözünürlükte görsel desteği |

---

## 🧪 Test Planı

- Lighthouse performans ve erişilebilirlik testi
- Animasyon geçişlerinin mobilde test edilmesi (Chrome DevTools, gerçek cihaz)
- Scroll trigger'ların zamanlamasının test edilmesi

---



---

## 📤 Yayınlama

- Statik site olarak host edilebilir (Vercel, Netlify, GitHub Pages)
- CMS gerektiren içerikler (duyuru vs.) için Netlify CMS veya basit JSON dosyası güncellenebilir
- Alan adı: `www.studyineskisehir.com.tr` (kullanıcı sağlayacak)

---

## 🔚 Sonuç

Bu doküman, Study in Eskişehir web sitesinin tek sayfalık, animasyonlu yapısı için teknik temel oluşturur. İçerik hazır oldukça görseller ve metinlerle yerleştirme yapılacak, animasyonlar ilgili bölümlere entegre edilecektir.
