import axios from 'axios'

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
    //setting
  }
  
  return Promise.reject(error)
})

export default axiosIns
