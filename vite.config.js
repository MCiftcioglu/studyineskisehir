import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // index.html dosyasının bulunduğu dizin
  build: {
    outDir: '../dist', // Üretim build çıktısının dizini
  },
  publicDir: '../public', // Statik varlıkların bulunduğu dizin
});