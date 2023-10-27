<script setup lang="ts">

import { ref } from 'vue'
import Product1 from '@/components/product/Product1.vue'
import Product2 from '@/components/product/Product2.vue'

import arrow_right from '@/assets/icons/arrow_right_dark.svg?inline';

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

import banner_2 from '@/assets/images/Banner_2.jpg';
import banner_3 from '@/assets/images/Banner_3.jpg';
import banner_4 from '@/assets/images/Banner_4.jpg';
import banner_5 from '@/assets/images/Banner_5.jpg';

import product_1 from '@/assets/images/product_1.png';
import product_2 from '@/assets/images/product_2.png';

import p_1 from '@/assets/images/p_1.jpg';
import p_2 from '@/assets/images/p_2.jpg';
import p_3 from '@/assets/images/p_3.jpg';
import p_4 from '@/assets/images/p_4.jpg';
import p_5 from '@/assets/images/p_5.jpg';

import t_1 from '@/assets/images/t_1.jpg';
import t_2 from '@/assets/images/t_2.jpg';
import t_3 from '@/assets/images/t_3.jpg';
import t_4 from '@/assets/images/t_4.jpg';
import t_5 from '@/assets/images/t_5.jpg';

import f_1 from '@/assets/images/f_1.jpg';
import f_2 from '@/assets/images/f_2.jpg';
import f_3 from '@/assets/images/f_3.jpg';
import f_4 from '@/assets/images/f_4.jpg';

import frame_pink from '@/assets/images/frame_pink.jpeg';

const backgroundStyle = {
  backgroundImage: `url(${frame_pink})`,
  backgroundSize: 'cover'
}

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

const products2 = ref([
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 1 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 2 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 3 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 1 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 2 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 3 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 5 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 }
])

const products3 = ref([
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 2 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 3 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 1 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 2 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 3 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 5 },
  { image: product_2, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 4 },
  { image: product_1, price_1: '0.000', price_2: '0.000', name: 'Grand Slam Indoor Of Show Jumping Novel', store: 'Roberts Store', rating: 1 },
])


const tab = ref('0')

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
              :to="'/categories'"
              class="tw-no-underline tw-text-tertiary"
            >
              <VListItem
                color="primary"
                variant="plain"
                class="list py-0  tw-text-tertiary hover:tw-bg-yellow"
              >
                <template v-slot:prepend>
                  <img :src="item.icon" class="me-3 ms-4"/>
                </template>
                <VListItemTitle v-text="item.text" class="tw-text-tertiary"></VListItemTitle>
              </VListItem>
            </router-link>
          </VList>
        </VSheet>
      </VCol>
      <VCol cols="12" md="9">
        <VRow no-gutters class="transparent">
          <VCol cols="12" md="7">        
            <VCarousel 
              cycle
              color="white"
              :show-arrows="false" 
              hide-delimiter-background
              height="393px">
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
                <router-link to="/categories">
                  <VImg :src="Plaza_1" class="img-galery"/>
                </router-link>
              </VCol>
              <VCol cols="12" md="6">
                <router-link to="/categories">
                  <VImg :src="Plaza_2" class="border-top-right img-galery"/>
                </router-link>
              </VCol>
              <VCol cols="12">
                <router-link to="/categories">
                  <VImg :src="Plaza_3" class="img-galery"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" md="7">
            <router-link to="/categories">
              <VImg :src="Banner" class="img-galery"  height="197" cover />
            </router-link>
          </VCol>
          <VCol cols="12" md="5">
            <VRow no-gutters class="transparent">
              <VCol cols="12" md="6">
                <router-link to="/categories">
                  <VImg :src="Plaza_4" class="img-galery"/>
                </router-link>
              </VCol>
              <VCol cols="12" md="6">
                <router-link to="/categories">
                  <VImg :src="Plaza_5" class="border-bottom-right img-galery"/>
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
        <VRow no-gutters  class="tw-text-tertiary">
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
        <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Globos</router-link>
        <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Piñatas</router-link>
        <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Sorpresas</router-link>
        <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Decoración</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        <VRow no-gutters class="transparent">
          <VCol cols="12" md="9">
            <VImg :src="banner_5" class="border-img"/>
            <VCard class="no-shadown">
              <VTabs v-model="tab" class="mt-7">
                <VTab value="0">Agregados recientemente</VTab>
                <VTab value="1">Lo  mejor de lo mejor</VTab>
              </VTabs>

              <VCardText class="p-0">
                <v-window v-model="tab">
                  <v-window-item value="0">
                    <VCardText class="px-0 mt-5 d-flex align-items-stretch justify-content-between">
                      <Product1 
                        v-for="(product, index) in products2"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"/>
                    </VCardText>
                  </v-window-item>

                  <v-window-item value="1">
                    <VCardText class="px-0 mt-5 d-flex align-items-stretch justify-content-between">
                      <Product1 
                        v-for="(product, index) in products3"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"/>
                    </VCardText>
                  </v-window-item>
                </v-window>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3" class="d-flex flex-column">
            <VCardText class="p-0 ms-3">
              <div v-if="tab === '0'">
                <Product2 
                  v-for="(product, index) in products2"
                  v-show="index >= 4"
                  :key="index"
                  :product="product"
                  :readonly="true"/>
              </div>
              <div v-else>
                <Product2 
                  v-for="(product, index) in products3"
                  v-show="index >= 4"
                  :key="index"
                  :product="product"
                  :readonly="true"/>
              </div>
            </VCardText>
            <VCardText class="p-0 more">
              <router-link to="/categories" class="d-flex tw-no-underline hover:tw-text-yellow  hover-icon-arrow-right justify-content-end">
                <span class="ms-5">Ver más</span>
                <arrow_right class="ms-2" />
              </router-link>
            </VCardText>
          </VCol>
        </VRow>
      </VCardText>  
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-flex transparent">
        <VCard class="no-shadown card-information p-0 w-50">
          <router-link to="/categories" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner_3" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5">
          <router-link to="/categories" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner_4" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
    </VCard>

    <!-- suppliers -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Top proveedores mayoristas</span>
        <VSpacer />
        <router-link to="/suppliers" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        <router-link to="/suppliers" class="tw-no-underline">
          <img :src="p_1" class="border-img"/>
        </router-link>
        <router-link to="/suppliers" class="tw-no-underline">
          <img :src="p_2" class="border-img"/>
        </router-link>
        <router-link to="/suppliers" class="tw-no-underline">
          <img :src="p_3" class="border-img"/>
        </router-link>
        <router-link to="/suppliers" class="tw-no-underline">
          <img :src="p_4" class="border-img"/>
        </router-link>
        <router-link to="/suppliers" class="tw-no-underline">
          <img :src="p_5" class="border-img"/>
        </router-link>
      </VCardText>  
    </VCard>

    <!-- theme parties -->
    <VCard class="mt-7 no-shadown card-information transparent p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Fiestas temáticas</span>
        <VSpacer />
        <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider class="hr-primary"/>
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
        <router-link to="/categories" class="tw-no-underline d-block text-center img-party">
          <img :src="t_1" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Mexicana</span>
        </router-link>
        <router-link to="/categories" class="tw-no-underline d-block text-center img-party">
          <img :src="t_2" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Hawaiana</span>
        </router-link>
        <router-link to="/categories" class="tw-no-underline d-block text-center img-party">
          <img :src="t_3" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Vallenata</span>
        </router-link>
        <router-link to="/categories" class="tw-no-underline d-block text-center img-party">
          <img :src="t_4" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Metalizada</span>
        </router-link>
        <router-link to="/categories" class="tw-no-underline d-block text-center img-party">
          <img :src="t_5" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Neón</span>
        </router-link>
      </VCardText>   
    </VCard>
  </VContainer>

  <div :style="backgroundStyle">
    <VContainer>
      <!-- birthday -->
      <VCard class="mt-7 no-shadown card-information transparent p-0 tw-text-white">
        <VCardTitle class="px-7 py-3 d-flex align-center">
          <span>Cumpleaños</span>
          <VSpacer />
          <router-link to="/categories" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 tw-text-white hover:tw-text-yellow">Ver todos</router-link>
        </VCardTitle>
        <VDivider class="hr-secondary"/>
        <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
          <router-link to="/categories" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_1" class="border-theme d-block"/>
            <span class="d-block size-theme tw-text-white mt-5">Niños</span>
          </router-link>
          <router-link to="/categories" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_2" class="border-theme d-block"/>
            <span class="d-block size-theme tw-text-white mt-5">Niñas</span>
          </router-link>
          <router-link to="/categories" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_3" class="border-theme d-block"/>
            <span class="d-block size-theme tw-text-white mt-5">Bebes</span>
          </router-link>
          <router-link to="/categories" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_4" class="border-theme d-white"/>
            <span class="d-block size-theme tw-text-white mt-5">Adultos</span>
          </router-link>
        </VCardText>   
      </VCard>
    </VContainer>
  </div>
</template>

<style scoped>

  .more {
    text-align: end;
    display: contents;
  }
  .hr-primary {
    border-bottom: 1px solid #0A1B33;
    opacity: 1;
  }

  .hr-secondary {
    border-bottom: 1px solid #FFFFFF;
    opacity: 1;
  }
  .size-theme {
    font-size: 20px;
    line-height: 22.4px;
  }

  .border-theme {
    border-radius: 192px;
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  }

  .border-img {
    border-radius: 16px !important;
  }
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

  .hover-icon-arrow-right:hover::v-deep(path) {
    fill: #FFC549;
  }

  .img-zoom {
    transition: transform ease-in-out 0.3s;
}

.img-zoom:hover{ 
    transform: scale(1.1);
}

.img-zoom:hover span{ 
    color: #FFC549!important;
}

.img-party
{
  transition: transform ease-in-out 0.3s;
}

.img-party:hover
{
  transform: scale(1.1);
}

.img-party:hover span{
  color: #FF0090!important;
}

.img-galery:hover{
  filter: saturate(180%)!important;
}




</style>
