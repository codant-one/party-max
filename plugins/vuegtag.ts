export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const configGtag = {
    property: {
      id: config.public.GOOGLE_TAG_MANAGER
    },
    appName: 'PartyMax',
    isEnabled: true,
    pageTrackerScreenviewEnabled: true,
  }

  return {
    provide: {
      gtagConfig: configGtag
    }
  }
})