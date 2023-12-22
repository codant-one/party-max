import axios from 'axios'
import router from '@/router'

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_DOMAIN_API_URL + '/api/',
})

axiosIns.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    } 
    
    return config
  })

axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  const { config, response: { status }, response: { data } } = error
  
  if (status === 401) {
    localStorage.removeItem('user_data')
    localStorage.removeItem('userAbilities')
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' } )
  }
  
  return Promise.reject(error)
})

export default axiosIns
