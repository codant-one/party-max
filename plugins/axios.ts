import { useRuntimeConfig } from '#app'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const router = useRouter()

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

    api.interceptors.response.use(response => 
      response,
      error => {
        const { config, response } = error
  
        if (response) {
          const { status, data } = response
          
          if (status === 401) {
            localStorage.removeItem('user_data')
            localStorage.removeItem('userAbilities')
            localStorage.removeItem('accessToken')
            router.push({ name: 'login' })
          }
        } else {
          console.error('Error: No response received', error.request)
        }
  
        return Promise.reject(error)
      }
    )
  
    nuxtApp.provide('axios', api)
  })
