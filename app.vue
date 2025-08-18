<script setup>

import { ref } from 'vue'
import { useCartStores } from '~/stores/cart'
import { useAuthStores } from '~/stores/auth'
import { useFiltersStores } from '~/stores/filters'
import { useRoute } from 'vue-router'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import Filters from '@/components/app/Filters.vue'
import FilterServices from '@/components/app/FilterServices.vue'
import categories from '@assets/images/categories.jpg';
import register from '@assets/images/register.jpg';

const authStores = useAuthStores()
const cartStores = useCartStores()
const filtersStores = useFiltersStores()
const route = useRoute()

const backgroundStyle = ref({})
const background = ref('tw-bg-white')
const drawer = ref(false)

const { isMobile } = useDevice()
const { $metapixel } = useNuxtApp()

onMounted(() => {
  $metapixel.init();
})

watch(
  () => route.fullPath,
  () => {
    if (process.client && window.fbq) {
      $metapixel.trackEvent('PageView');
    }
  },
  { immediate: true }
)

watch(() => 
  filtersStores.getDrawer, (data) => {
    drawer.value = data
  }
)

watchEffect(fetchData)

async function fetchData() {

  var bg = ''
  var repeat = 'repeat'
  var size = (isMobile) ? 'auto' : 'contain'

  if(route.name === 'dashboard' || route.name === 'register_confirm') {
    background.value = 'tw-bg-green'
  } else if(route.name === 'index' || route.name === 'categories-slug' || route.name === 'blogs' || route.name === 'blogs-slug' || route.name === 'event-planner') {
    background.value = 'tw-bg-light_cyan_2'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'wholesalers')
    bg = categories
  else if(route.name === 'register' || route.name === 'type_client' || route.name === 'clients-form_client' || 
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
          <Filters :drawer="drawer" v-if="route.name === 'products'"/>
          <FilterServices :drawer="drawer" v-if="route.name === 'services'"/>
          <Header />
          <VMain :style="backgroundStyle" :class="background">
            <NuxtPage />
            <noscript>
              <iframe src="https://sst.partymax.co/ns.html?id=GTM-MPFBMPB"
                      height="0"
                      width="0"
                      style="display:none;visibility:hidden">
              </iframe>
            </noscript>
          </VMain>
        </VLayout>
        <Footer />
      </ClientOnly>
      <template v-else>
        <VLayout >
          <Filters :drawer="drawer" v-if="route.name === 'products'"/>
          <FilterServices :drawer="drawer" v-if="route.name === 'services'"/>
          <Header />
          <VMain :style="backgroundStyle" :class="background">
            <NuxtPage />
            <noscript>
              <iframe src="https://sst.partymax.co/ns.html?id=GTM-MPFBMPB"
                      height="0"
                      width="0"
                      style="display:none;visibility:hidden">
              </iframe>
            </noscript>
          </VMain>
        </VLayout>
        <Footer />
      </template>
    </VApp>
  </NuxtLayout>
</template>
