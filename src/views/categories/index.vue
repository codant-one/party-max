<script setup>

import { useMiscellaneousStores } from '@/stores/miscellaneous'

import Product1 from '@/components/product/Product1.vue'
import banner1 from '@assets/images/banner1.png';
import banner2 from '@assets/images/banner2.png';
import banner3 from '@assets/images/banner3.png';
import banner4 from '@assets/images/banner4.png';

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)

const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)
const image4 = ref(null)

watchEffect(fetchData)

async function fetchData() {

  await miscellaneousStores.getCategory(route.params.slug)
  data.value = miscellaneousStores.getData

  image1.value = (data.value.category.banner === null) ? banner1 : baseURL.value + data.value.category.banner
  image2.value = (data.value.category.banner_2 === null) ? banner2 : baseURL.value + data.value.category.banner_2
  image3.value = (data.value.category.banner_3 === null) ? banner3 : baseURL.value + data.value.category.banner_3
  image4.value = (data.value.category.banner_4 === null) ? banner4 : baseURL.value + data.value.category.banner_4

 
}
</script>

<template>
 
  <!--Banner Principal-->
  <VContainer class="mt-10" v-if="data">
   
    <VCard class="no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <router-link :to="{name:'products',}">
          <VImg :src="image1" cover class="img-style"/>
        </router-link>
      </VCardItem>  
    </VCard>

    <!-- novedades -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex">
        <span>Novedades</span>
        <VSpacer />
        <router-link to="/products" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data">
        <Product1 
          v-for="(product, i) in data.products"
          :key="i"
          :product="product"
          :readonly="true"/>
      </VCardText>
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-flex transparent">
        <VCard class="no-shadown card-information p-0 w-50">
          <router-link to="/products" class="tw-no-underline">
            <VCardItem class="p-0">
              <router-link :to="{name:'products',}">
                <VImg :src="image2" cover class="img-style"/>
              </router-link>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5">
          <router-link to="/products" class="tw-no-underline">
            <VCardItem class="p-0">
              <router-link :to="{name:'products',}">
                <VImg :src="image3" cover class="img-style"/>
              </router-link>
            </VCardItem>  
          </router-link>
        </VCard>
    </VCard>

      <!--Banner 4-->
    <VCard class="mt-7 no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <router-link :to="{name:'products',}">
          <VImg :src="image4" cover class="img-style"/>
        </router-link>
      </VCardItem>  
    </VCard>
    <router-link class="link-button" :to="{name:'products',}">
      <VBtn class="mt-7 mb-5 tw-bg-primary tw-text-white button-product" rounded="xl" block>Ver todos los productos</VBtn>
    </router-link>
    
  </VContainer>
</template>

<style scoped>

    .transparent {
        background: transparent !important;
    }

    .button-product {
        font-size: 16px!important;
        font-weight: 700;
        padding: 24px!important;
    }

    .button-product:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .img-style {
        border-radius: 16px;
        border: 1px solid #000;
        background: #D9D9D9;
    }

    .card-information {
        padding: 32px;
        border-radius: 16px;
    }

    .link-button
    {
      text-decoration: none;
    }
</style>