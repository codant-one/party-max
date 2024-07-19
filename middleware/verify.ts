import { useRuntimeConfig } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig()

    if (!to.fullPath.endsWith('/') && config.public.NODE_ENV === 'production' ) {
        console.log('entra')
        return navigateTo(to.fullPath + '/')
    }
});
  