<script setup>

import { ref } from 'vue'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import home from '@assets/images/home.jpg';
import categories from '@assets/images/categories.jpg';
import register from '@assets/images/register.jpg';
import blogs from '@assets/images/blogs.jpg';

const route = useRoute()
const backgroundStyle = ref({})
const background = ref('tw-bg-white')

watchEffect(fetchData)

async function fetchData() {
  var bg = ''
  var repeat = 'repeat'
  var size = 'contain'

  if(route.name === 'shopping_cart' || route.name === 'shopping_delivery' || route.name === 'shopping_summary'|| route.name==='dashboar_client') {
    background.value = 'tw-bg-cyan'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'home')
    bg = home
  else if(route.name === 'categories')
    bg = categories
  else if(route.name === 'register'|| route.name === 'type_client'|| route.name === 'form_client' || 
          route.name === 'form_supplier' || route.name === 'login' || route.name==='success_person' || route.name==='success_company') {
    bg = register
    repeat = 'no-repeat'
    size = 'cover'
  } else if(route.name === 'blogs' || route.name === 'blogDetail') {
    bg = blogs
    size = 'contain'
  } else 
    bg = ''

  backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundSize: size,
    backgroundRepeat: repeat
  }

}
</script>

<template>
  <VApp> 
    <VLayout >
      <Header />
      <VMain :style="backgroundStyle" :class="background">
        <router-view/>
      </VMain>
    </VLayout>
    <Footer />
  </VApp>
</template>