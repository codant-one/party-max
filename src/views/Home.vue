<script setup lang="ts">

import { ref } from 'vue'
import Product1 from '@/components/product/Product1.vue'

import Plaza_1 from '@/assets/images/Plaza_1.jpg';
import Plaza_2 from '@/assets/images/Plaza_2.jpg';
import Plaza_3 from '@/assets/images/Plaza_3.jpg';
import Plaza_4 from '@/assets/images/Plaza_4.jpg';
import Plaza_5 from '@/assets/images/Plaza_5.jpg';
import Banner from '@/assets/images/Banner.jpg';

import Slider1 from '@/assets/images/Slider_1.jpg';
import Slider2 from '@/assets/images/Slider_2.jpg';
import Slider3 from '@/assets/images/Slider_3.jpg';

import icon1 from '@/assets/icons/fiestas_infantiles.svg';
import icon2 from '@/assets/icons/fiestas_tematicas.svg';
import icon3 from '@/assets/icons/fechas_especiales.svg';
import icon4 from '@/assets/icons/hora_loca.svg';
import icon5 from '@/assets/icons/desechables.svg';
import icon6 from '@/assets/icons/decoración.svg';
import icon7 from '@/assets/icons/sorpresas.svg';
import icon8 from '@/assets/icons/mobiliario.svg';
import icon9 from '@/assets/icons/dulces.svg';
import icon10 from '@/assets/icons/animación.svg';

import motorcycle from '@/assets/icons/motorcycle.svg';
import location from '@/assets/icons/location.svg';
import sold from '@/assets/icons/sold.svg';
import tracking from '@/assets/icons/tracking.svg';

import banner_2 from '@/assets/images/banner_2.jpg';
import banner_3 from '@/assets/images/banner_3.jpg';
import banner_4 from '@/assets/images/banner_4.jpg';

import product_1 from '@/assets/images/product_1.png';
import product_2 from '@/assets/images/product_2.png';

const items = ref([
  { text: 'Fiestas infantiles', icon: icon1 },
  { text: 'Fiestas temáticas', icon: icon2 },
  { text: 'Fechas especiales', icon: icon3 },
  { text: 'Hora loca', icon: icon4 },
  { text: 'Desechables', icon: icon5 },
  { text: 'Decoración', icon: icon6 },
  { text: 'Sorpresas', icon: icon7 },
  { text: 'Mobiliario', icon: icon8 },
  { text: 'Dulces', icon: icon9 },
  { text: 'Animación y entretenimiento', icon: icon10 },
])

const sliders = ref( [
  { src: Slider1 },
  { src: Slider2 },
  { src: Slider3 }
])

const products = ref([
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 1 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 2 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 3 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 5 }
])

</script>

<template>
  <VContainer class="mt-10">
    <!-- slider -->
    <VRow no-gutters class="transparent">
      <VCol cols="12" md="3">
        <VSheet class="border">
          <VList class="p-0 border">
            <router-link
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              :to="'/help'"
              class="tw-no-underline tw-text-terciary"
            >
              <VListItem
                color="primary"
                variant="plain"
                class="list py-0  tw-text-terciary"
              >
                <template v-slot:prepend>
                  <img :src="item.icon" class="me-3 ms-4"/>
                </template>
                <VListItemTitle v-text="item.text" class="tw-text-terciary"></VListItemTitle>
              </VListItem>
            </router-link>
          </VList>
        </VSheet>
      </VCol>
      <VCol cols="12" md="9">
        <VRow no-gutters class="transparent">
          <VCol cols="12" md="7">        
            <VCarousel :show-arrows="false" height="393px">
              <VCarouselItem
                v-for="(item,i) in sliders"
                :key="i"
                :src="item.src"
                cover
              />
            </VCarousel>
          </VCol>
          <VCol cols="12" md="5">
            <VRow no-gutters class="transparent">
              <VCol cols="12" md="6">
                <router-link to="/help">
                  <VImg :src="Plaza_1"/>
                </router-link>
              </VCol>
              <VCol cols="12" md="6">
                <router-link to="/help">
                  <VImg :src="Plaza_2" class="border-top-right"/>
                </router-link>
              </VCol>
              <VCol cols="12">
                <router-link to="/help">
                  <VImg :src="Plaza_3"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" md="7">
            <router-link to="/help">
              <VImg :src="Banner" height="197" cover/>
            </router-link>
          </VCol>
          <VCol cols="12" md="5">
            <VRow no-gutters class="transparent">
              <VCol cols="12" md="6">
                <router-link to="/help">
                  <VImg :src="Plaza_4"/>
                </router-link>
              </VCol>
              <VCol cols="12" md="6">
                <router-link to="/help">
                  <VImg :src="Plaza_5" class="border-bottom-right"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCol>     
    </VRow>

    <!-- card -->
    <VCard class="mt-7 no-shadown card-information">
      <VCardItem class="p-0">
        <VRow no-gutters  class="tw-text-terciary">
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="motorcycle" width="60" class="ms-10"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Envíos gratis</span>
              <span class="d-block card-information-subtitle">A partir de $190.000</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="location" width="60" class="ms-10"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Nuestras tiendas</span>
              <span class="d-block card-information-subtitle">En Bogotá</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="sold" width="60" class="ms-10"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Ventas por mayor</span>
              <span class="d-block card-information-subtitle">A los mejores precios</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center">
            <img :src="tracking" width="60" class="ms-10"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Sigue tu compra</span>
              <span class="d-block card-information-subtitle">Desde tu cuenta</span>
            </div>
          </VCol>
        </VRow>
      </VCardItem>  
    </VCard>

    <!-- recommendations -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3"> Recomendaciones según tus búsquedas</VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        <Product1 
          v-for="(product, i) in products"
          :key="i"
          :product="product"
          :readonly="true"/>
      </VCardText>  
    </VCard>

    <!-- banner 2 -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardItem class="p-0">
        <VImg :src="banner_2" cover/>
      </VCardItem>  
    </VCard>
    
    <!-- the most sold -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Lo más vendido</span>
        <VSpacer />
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Globos</router-link>
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Piñatas</router-link>
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Sorpresas</router-link>
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Decoración</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        
      </VCardText>  
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-flex transparent">
        <VCard class="no-shadown card-information p-0 w-50">
          <VCardItem class="p-0">
            <VImg :src="banner_3" cover/>
          </VCardItem>  
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5">
          <VCardItem class="p-0">
            <VImg :src="banner_4" cover/>
          </VCardItem>  
        </VCard>
    </VCard>

    <!-- providers -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Top proveedores mayoristas</span>
        <VSpacer />
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        
      </VCardText>  
    </VCard>

    <!-- theme parties -->
    <VCard class="mt-7 no-shadown card-information transparent p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Fiestas temáticas</span>
        <VSpacer />
        <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-terciary font-size-16 me-3">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        
      </VCardText>   
    </VCard>
  </VContainer>
</template>

<style scoped>

  .hr {
    border-right: 1px solid #D9EEF2;
    height: 60px;
  }
  .card-information {
    padding: 32px;
    border-radius: 16px;
  }

  .card-information-title {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }

  .card-information-subtitle {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .list {
    min-height: 59px;
  }
  .transparent {
    background: transparent !important;
  }
  .border {
    border: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 16px !important;
    border-bottom-left-radius: 16px !important;
  }

  .border-top-right {
    border-top-right-radius: 16px !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  .border-bottom-right {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 16px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
</style>
