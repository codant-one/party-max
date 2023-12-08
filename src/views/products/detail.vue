<script setup>

import { ref } from 'vue'
import Loader from '@/components/common/Loader.vue'

const route = useRoute()
const isLoading = ref(true)

const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  }
])

watchEffect(fetchData)

async function fetchData() {

  if(route.query.category) {
    const category = {
      title: formatTitle(route.query.category),
      disabled: false,
      href: 'categories/' + route.query.category,
    }

    bread.value.push(category)
  }

  const product_ = {
    title: 'Producto',
    disabled: true,
    href: '',
  }

  bread.value.push(product_)

  isLoading.value = true


  isLoading.value = false
}

</script>

<template>
  <section>
    <VAppBar flat class="breadcumb tw-bg-cyan pt-1">
      <VContainer class="tw-text-tertiary d-flex align-center">
        <v-breadcrumbs :items="bread" />
      </VContainer>
    </VAppBar>
    <VContainer class="pt-0">
      <Loader :isLoading="isLoading"/>
      <VCard class="mt-7 no-shadown card-information p-0">
        <VCardTitle class="p-0 d-flex align-center">
          Paquete de globos metalizados
        </VCardTitle>
        <VCardSubtitle class="px-0 d-flex align-center">
          Marca: Galaxy
          SKU: AB123456785
        </VCardSubtitle>
        <VDivider />
        <VCardText class="px-0 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
          <VRow>
            <VCol cols="12" md="5">
                IMAGEN
            </VCol>
            <VCol cols="12" md="7">
              INFO
            </VCol>
          </VRow>
        </VCardText>  
    </VCard>     
    </VContainer>
  </section>
</template>

<style scoped>
  .breadcumb {
    height: 55px !important;
  }

</style>