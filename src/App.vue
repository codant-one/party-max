<script setup>

import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'

</script>

<template>
  <VApp> 
    <VLayout >
      <Header />
      <VMain>
        <router-view/>
      </VMain>
      <Footer />
    </VLayout>
  </VApp>
</template>