<script setup>

import { ref } from 'vue'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import home from '@assets/images/home.jpg';
import categories from '@assets/images/categories.jpg';

const route = useRoute()
const backgroundStyle = ref({})

watchEffect(fetchData)

async function fetchData() {
  var bg = ''

  if(route.name === 'home')
    bg = home
  else
    bg = categories

  backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'repeat'
  }

}
</script>

<template>
  <VApp> 
    <VLayout >
      <Header />
      <VMain :style="backgroundStyle">
        <router-view/>
      </VMain>
    </VLayout>
    <Footer />
  </VApp>
</template>