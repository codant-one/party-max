<script setup>

import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import home from '@assets/images/home.jpg';

const backgroundStyle = {
  backgroundImage: `url(${home})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'repeat'
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