import { useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const api = axios.create({
      baseURL: config.public.APP_DOMAIN_API_URL + '/api/'
    })
  
    api.interceptors.request.use((config) => {
        if (process.client) {
            const token = localStorage.getItem('accessToken')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
          }
          return config
    })

    api.interceptors.response.use(response => {
        return response
      }, error => {
        const { config, response: { status }, response: { data } } = error
        
        if (status === 401) {
          localStorage.removeItem('user_data')
          localStorage.removeItem('userAbilities')
          localStorage.removeItem('accessToken')
        //   router.push({ name: 'login' } )
        }
        
        return Promise.reject(error)
    })
  
    nuxtApp.provide('axios', api)
  })
