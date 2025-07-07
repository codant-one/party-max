export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const NODE_ENV = config.public.NODE_ENV
    if (NODE_ENV === 'development') {
      // Silencia todos los warnings
      console.warn = (...args) => {
        const [msg] = args;
        if (
          typeof msg === 'string' &&
          msg.includes('Slot "default" invoked outside of the render function')
        ) {
          return;
        }
      };
    }
});
  