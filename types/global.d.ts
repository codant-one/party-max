/// <reference types="nuxt" />

declare global {
  interface Window {
    dataLayer: any[]; // Para Google Tag Manager
    fbq: any;         // Para Meta Pixel
    _fbq: any;        // Para Meta Pixel
  }
}

// This export is needed to make this a module
export {};