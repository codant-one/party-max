import { createPinia, setActivePinia } from 'pinia'
import { useHomeStores } from './../stores/home'

export async function loadCategories() {
  const pinia = createPinia()
  setActivePinia(pinia)
  const homeStores = useHomeStores()
  await homeStores.fetchData()
  return homeStores.getData.parentCategories
}
