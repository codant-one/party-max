<script setup>

import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'

</script>

<template>
  <v-app> 
    <Header />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>