import { format, parseISO } from 'date-fns'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dateFns: {
        format,
        parseISO,
      }
    }
  }
})