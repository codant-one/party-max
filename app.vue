<script setup>

import { ref, computed, onBeforeMount, watch as vueWatch } from 'vue'
import { useCartStores } from '~/stores/cart'
import { useAuthStores } from '~/stores/auth'
import { useFiltersStores } from '~/stores/filters'
import { useRoute, useRouter } from 'vue-router'
import { useCategoriesStores } from '~/stores/categories'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import Filters from '@/components/app/Filters.vue'
import FilterServices from '@/components/app/FilterServices.vue'
import register from '@assets/images/register.jpg';

const authStores = useAuthStores()
const cartStores = useCartStores()
const filtersStores = useFiltersStores()
const route = useRoute()
const router = useRouter()
const categoriesStores = useCategoriesStores()

const backgroundStyle = ref({})
const background = ref('tw-bg-white')
const drawer = ref(false)

const { isMobile } = useDevice()

const isProductsRoute = computed(() => route.path?.startsWith('/products'))
const isServicesRoute = computed(() => route.path?.startsWith('/services'))

const hydrateCategoriesFromStorage = () => {
  if (!process.client) return
  const inPS = route.path?.startsWith('/products') || route.path?.startsWith('/services')
  if (!inPS) return
  if (!categoriesStores.getCategory) {
    const cat = localStorage.getItem('products_category')
    const sub = localStorage.getItem('products_subcategory')
    const father = localStorage.getItem('products_fathercategory')
    if (cat) {
      categoriesStores.setCategory(cat)
      if (father) categoriesStores.setFathercategory(father)
      if (sub) categoriesStores.setSubcategory(sub)
    }
  }
}

const persistCategoriesToStorage = () => {
  if (!process.client) return
  if (categoriesStores.getCategory) {
    localStorage.setItem('products_category', categoriesStores.getCategory)
    if (categoriesStores.getFathercategory) localStorage.setItem('products_fathercategory', categoriesStores.getFathercategory)
    else localStorage.removeItem('products_fathercategory')
    if (categoriesStores.getSubcategory) localStorage.setItem('products_subcategory', categoriesStores.getSubcategory)
    else localStorage.removeItem('products_subcategory')
  }
}

watch(() => 
  filtersStores.getDrawer, (data) => {
    drawer.value = data
  }
)

// Reset categories store only when leaving products/services to other views
router.afterEach((to, from) => {
  const fromPS = from.path?.startsWith('/products') || from.path?.startsWith('/services')
  const toPS = to.path?.startsWith('/products') || to.path?.startsWith('/services')
  if (fromPS && !toPS) {
    categoriesStores.reset()
    categoriesStores.resetColorId()
    if (process.client) {
      localStorage.removeItem('products_colorId')
      localStorage.removeItem('products_category')
      localStorage.removeItem('products_subcategory')
      localStorage.removeItem('products_fathercategory')
    }
  }
})

onBeforeMount(() => {
  hydrateCategoriesFromStorage()
})

vueWatch(() => route.path, () => {
  hydrateCategoriesFromStorage()
})

vueWatch(() => [
  categoriesStores.getCategory,
  categoriesStores.getSubcategory,
  categoriesStores.getFathercategory,
], () => {
  persistCategoriesToStorage()
})

watchEffect(fetchData)

async function fetchData() {

  var bg = ''
  var repeat = 'repeat'
  var size = (isMobile) ? 'auto' : 'contain'

  if(route.name === 'dashboard' || route.name === 'register-confirm') {
    background.value = 'tw-bg-green'
  } else if(route.name === 'categories-slug' || route.name === 'blogs' || route.name === 'blogs-slug' || route.name === 'event-planner') {
    background.value = 'tw-bg-light_cyan_2'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'register' || route.name === 'type_client' || route.name === 'clients-form_client' || 
          route.name === 'clients-form_supplier' || route.name === 'login' || route.name === 'clients-success_register_person' || 
          route.name === 'clients-success_register_company' || route.name === 'clients-forgot_password' || route.name === 'clients-reset_password') {
    bg = register
    repeat = 'no-repeat'
    size = 'cover'
  } else 
    bg = ''

  if (route.name === 'cart' || route.name === 'quote') {
    if (Object.keys(route.query).length > 0) {
      bg = register
      repeat = 'no-repeat'
      size = 'cover'
    } if(route.name === 'cart') {
      background.value = 'tw-bg-[#eef0ef]'
    } else {
      background.value = 'tw-bg-green'
    }
  }

  backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundSize: size,
    backgroundRepeat: repeat
  }

  if(process.client && localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)

    const { user_data, userAbilities } = await authStores.me(userDataJ.hash)

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    localStorage.setItem('user_data', JSON.stringify(user_data))
  }

  await cartStores.fetchCart()
}

</script>

<template>
  <NuxtLayout>
    <VApp> 
      <ClientOnly v-if="route.name === 'index'">
        <VLayout >
          <Filters :drawer="drawer" v-if="isProductsRoute"/>
          <FilterServices :drawer="drawer" v-if="isServicesRoute"/>
          <Header />
          <VMain :style="backgroundStyle" class="pm-main" :class="background">
            <NuxtPage />
          </VMain>
        </VLayout>
        <Footer />
      </ClientOnly>
      <template v-else>
        <VLayout >
          <Filters :drawer="drawer" v-if="isProductsRoute"/>
          <FilterServices :drawer="drawer" v-if="isServicesRoute"/>
          <Header />
          <VMain :style="backgroundStyle" class="pm-main" :class="background">
            <NuxtPage />
          </VMain>
        </VLayout>
        <Footer />
      </template>
    </VApp>
  </NuxtLayout>
</template>
