import { useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const GTM_ID = config.public.GOOGLE_TAG_MANAGER;
    
    if (process.client) {
        try {
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            
            // GTM script loader function
            const loadGTM = () => {
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
                
                // Add error handling for script loading
                script.onerror = () => {
                    console.error('Failed to load Google Tag Manager script');
                };
                
                // Find the first script tag and insert GTM before it
                const firstScript = document.getElementsByTagName('script')[0];
                if (firstScript && firstScript.parentNode) {
                    firstScript.parentNode.insertBefore(script, firstScript);
                } else {
                    document.head.appendChild(script);
                }
            };
            
            // Push initial GTM event
            window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            
            // Load GTM script
            loadGTM();
            
            // Add GTM noscript fallback for users with JavaScript disabled
            const noscript = document.createElement('noscript');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
            iframe.height = '0';
            iframe.width = '0';
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            noscript.appendChild(iframe);
            document.head.appendChild(noscript);
            
            console.log('Google Tag Manager initialized successfully');
        }
        } catch (error) {
            console.error('Error initializing Google Tag Manager:', error);
        }
    } else if (process.client) {
        console.warn('Google Tag Manager ID not configured. Please set NUXT_PUBLIC_GTM_ID environment variable.');
    }
});