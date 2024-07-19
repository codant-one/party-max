import { useNuxtApp } from '#app'
import axios from 'axios'

export async function loadCategories() {
  const { $axios } = useNuxtApp()

  const home = async () => {
      return await $axios.get('home')
  }

  return home()
  .then((response) => {
    return Promise.resolve(response.data.data)
  })
  .catch(error => {
      return Promise.reject(error)
  }) 

}
