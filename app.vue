<script setup>

import { ref } from 'vue'
import { useCartStores } from '~/stores/cart'
import { useAuthStores } from '~/stores/auth'
import { useFiltersStores } from '~/stores/filters'
import { useRoute } from 'vue-router'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import Filters from '@/components/app/Filters.vue'
import home from '@assets/images/home.jpg';
import categories from '@assets/images/categories.jpg';
import register from '@assets/images/register.jpg';
import blogs from '@assets/images/blogs.jpg';

const authStores = useAuthStores()
const cartStores = useCartStores()
const filtersStores = useFiltersStores()
const route = useRoute()

const backgroundStyle = ref({})
const background = ref('tw-bg-white')
const { isMobile } = useDevice();
const drawer = ref(false)

watch(() => 
  filtersStores.getDrawer, (data) => {
    drawer.value = data
  }
);

watchEffect(fetchData)

async function fetchData() {

  var bg = ''
  var repeat = 'repeat'
  var size = (isMobile) ? 'auto' : 'contain'

  if(route.name === 'dashboard-profile' || route.name === 'dashboard-purchases' || route.name === 'dashboard-favorites') {
    background.value = 'tw-bg-green'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'index')
    bg = home
  else if(route.name === 'categories-slug')
    bg = categories
  else if(route.name === 'register' || route.name === 'type_client' || route.name === 'clients-form_client' || 
          route.name === 'clients-form_supplier' || route.name === 'login' || route.name === 'clients-success_register_person' || 
          route.name === 'clients-success_register_company' || route.name === 'clients-forgot_password' || route.name === 'clients-reset_password') {
    bg = register
    repeat = 'no-repeat'
    size = 'cover'
  } else if(route.name === 'blogs' || route.name === 'blogs-slug') {
    bg = blogs
    size = 'contain'
  } else 
    bg = ''

  if (route.name === 'cart') {
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
      <VLayout >
        <Filters :drawer="drawer" v-if="route.name === 'products'"/>
        <FilterServices :drawer="drawer" v-else/>
        <Header />
        <VMain :style="backgroundStyle" :class="background">
          <NuxtPage />
        </VMain>
      </VLayout>
      <Footer />
    </VApp>
  </NuxtLayout>
</template>
