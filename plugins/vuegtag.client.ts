import { useRuntimeConfig } from '#app'
import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const configGtag = {
    property: {
      id:  config.public.GOOGLE_TAG_MANAGER
    },
    appName: 'PartyMax', 
    isEnabled: true,
    pageTrackerScreenviewEnabled: true,
  }

  nuxtApp.vueApp.use(VueGtag, configGtag);
});
