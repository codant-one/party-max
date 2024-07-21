<script setup>

import { ref } from 'vue'
import { useCartStores } from '@/stores/cart'
import { useAuthStores } from '@/stores/auth'
import { useFiltersStores } from '@/stores/filters'
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
const isMobile = /Mobi/i.test(navigator.userAgent);
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

  if(route.name === 'dashboard' || route.name === 'register_confirm') {
    background.value = 'tw-bg-green'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'home')
    bg = home
  else if(route.name === 'categories' || route.name === 'wholesalers')
    bg = categories
  else if(route.name === 'register' || route.name === 'type_client' || route.name === 'form_client' || 
          route.name === 'form_supplier' || route.name === 'login' || route.name === 'success_person' || 
          route.name === 'success_company' || route.name === 'forgot_password' || route.name === 'reset_password') {
    bg = register
    repeat = 'no-repeat'
    size = 'cover'
  } else if(route.name === 'blogs' || route.name === 'blogDetail') {
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

  if(localStorage.getItem('user_data')){
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
  <VApp> 
    <VLayout >
      <Filters :drawer="drawer"/>
      <Header />
      <VMain :style="backgroundStyle" :class="background">
        <router-view />
      </VMain>
    </VLayout>
    <Footer />
  </VApp>
</template>