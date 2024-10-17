<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';

import Product1 from '@/components/product/Product1.vue'
import Product2 from '@/components/product/Product2.vue'
import Loader from '@/components/common/Loader.vue'

import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

import Plaza_1 from '@assets/images/Plaza_1.webp';
import Plaza_2 from '@assets/images/Plaza_2.webp';
import Plaza_3 from '@assets/images/Plaza_3.webp';
import Plaza_4 from '@assets/images/Plaza_4.webp';
import Plaza_5 from '@assets/images/Plaza_5.webp';
import Banner from '@assets/images/Banner.webp';

import Slider1 from '@assets/images/Slider_1_op.webp';
import Slider2 from '@assets/images/Slider_2_op.webp';
import Slider3 from '@assets/images/Slider_3_op.webp';

import icon1 from '@assets/icons/fiestas-infantiles.svg';
import icon2 from '@assets/icons/fiestas-tematicas.svg';
import icon3 from '@assets/icons/fechas-especiales.svg';
import icon4 from '@assets/icons/hora-loca.svg';
import icon5 from '@assets/icons/desechables.svg';
import icon6 from '@assets/icons/decoracion.svg';
import icon7 from '@assets/icons/sorpresas.svg';
import icon8 from '@assets/icons/mobiliario.svg';
import icon9 from '@assets/icons/dulces.svg';
import icon10 from '@assets/icons/animación.svg';

import motorcycle from '@assets/icons/motorcycle.svg';
import location from '@assets/icons/location.svg';
import sold from '@assets/icons/sold.svg';
import tracking from '@assets/icons/tracking.svg';

import banner_2 from '@assets/images/Banner_2.webp';
import banner_3 from '@assets/images/Banner_3.webp';
import banner_4 from '@assets/images/Banner_4.webp';
import banner_5 from '@assets/images/Banner_5.webp';

import banner_2_mobile from '@assets/images/Banner_2_mobile.webp';
import banner_3_mobile from '@assets/images/Banner_3_mobile.webp';
import banner_4_mobile from '@assets/images/Banner_4_mobile.webp';

import t_1 from '@assets/images/t_1.webp';
import t_2 from '@assets/images/t_2.webp';
import t_3 from '@assets/images/t_3.webp';
import t_4 from '@assets/images/t_4.webp';
import t_5 from '@assets/images/t_5.webp';
import t_6 from '@assets/images/t_6.webp';

import f_1 from '@assets/images/f_1.webp';
import f_2 from '@assets/images/f_2.webp';
import f_3 from '@assets/images/f_3.webp';
import f_4 from '@assets/images/f_4.webp';

import frame_pink from '@assets/images/frame_pink.webp';

const thumbsSwiper = ref(null);
const modules = ref([Pagination])

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const backgroundStyle = {
  backgroundImage: `url(${frame_pink})`,
  backgroundSize: 'cover'
}

const isMobile = /Mobi/i.test(navigator.userAgent);

const items = ref([
  { text: 'Fiestas infantiles', icon: icon1, slug: 'fiestas-infantiles' },
  { text: 'Fiestas temáticas', icon: icon2, slug: 'fiestas-tematicas' },
  { text: 'Fechas especiales', icon: icon3, slug: 'fechas-especiales' },
  { text: 'Hora loca', icon: icon4, slug: 'hora-loca' },
  { text: 'Desechables', icon: icon5, slug: 'desechables' },
  { text: 'Decoración', icon: icon6, slug: 'decoracion' },
  { text: 'Sorpresas', icon: icon7, slug: 'sorpresas' },
  { text: 'Mobiliario', icon: icon8, slug: 'renta-de-mobiliario' },
  { text: 'Dulces', icon: icon9, slug: 'dulces-y-ponques' },
  { text: 'Animadores de Fiestas', icon: icon10, slug: 'animadores-de-fiestas' }
])

const sliders = ref( [
  { src: Slider1 },
  { src: Slider2 },
  { src: Slider3 }
])

const homeStores = useHomeStores()
const route = useRoute();

const data = ref(null)
const isLoading = ref(true)

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()
  data.value = homeStores.getData
 
  isLoading.value = false
}

const tab = ref('0')

</script>

<template>
  <VContainer class="mt-2 mt-md-10">
    <Loader :isLoading="isLoading"/>
    <!-- slider -->
    <VRow no-gutters class="transparent">
      <VCol cols="12" md="3" class="col-mobile">
        <VSheet class="border">
          <VList class="p-0 border">
            <template v-for="(item, i) in items" :key="i" :value="item">
              <router-link         
                v-if="i < 7"
                :to="{
                  name: 'categories',
                  params: {
                    slug: item.slug
                  }
                }"
                class="tw-no-underline tw-text-tertiary"
              >
                <VListItem
                  color="primary"
                  variant="plain"
                  class="list py-0  tw-text-tertiary hover:tw-bg-yellow"
                >
                  <template v-slot:prepend>
                    <img :src="item.icon" class="me-3 ms-4" loading="lazy"/>
                  </template>
                  <VListItemTitle v-text="item.text" class="tw-text-tertiary"></VListItemTitle>
                </VListItem>
              </router-link>
              <router-link         
                v-else
                :to="{
                  name: 'services',
                  query: {
                    category: item.slug
                  }
                }"
                class="tw-no-underline tw-text-tertiary"
              >
                <VListItem
                  color="primary"
                  variant="plain"
                  class="list py-0  tw-text-tertiary hover:tw-bg-yellow"
                >
                  <template v-slot:prepend>
                    <img :src="item.icon" class="me-3 ms-4" loading="lazy"/>
                  </template>
                  <VListItemTitle v-text="item.text" class="tw-text-tertiary"></VListItemTitle>
                </VListItem>
              </router-link>
              <!-- <VListItem
                v-else
                color="primary"
                variant="plain"
                class="list py-0 tw-text-tertiary tw-cursor-pointer">
                <template v-slot:prepend>
                  <img :src="item.icon" class="me-3 ms-4 soon-img"/>
                </template>
                <VListItemTitle class="tw-text-tertiary d-flex align-center">
                  <span class="soon-items">{{ item.text }}</span>
                  <span class="soon-text d-none"> Próximamente </span>
                </VListItemTitle>
              </VListItem> -->
            </template>
          </VList>
        </VSheet>
      </VCol>
      <VCol cols="12" md="9" class="tw-bg-white border-categories">
        <VRow no-gutters>
          <VCol cols="12" md="7" class="pslider">        
            <VCarousel 
              cycle
              class="carousel-home"
              color="white"
              :show-arrows="false" 
              hide-delimiter-background
              >
              <VCarouselItem
                v-for="(item,i) in sliders"
                :key="i"
                :src="item.src"
                :lazy="true"
                cover
              />
            </VCarousel>
          </VCol>
          <VCol cols="12" md="5" class="pslider">
            <VRow :class="isMobile ? 'px-mobile' : 'v-row--no-gutters'" class="transparent">
              <VCol cols="6" md="6" class="pslider2">
                <router-link 
                  :to="{
                    name: 'products',
                    query: {
                      category: 'pinatas'
                    }
                  }"
                >
                  <VImg :src="Plaza_1" class="img-galery" alt="pinatas"/>
                </router-link>
              </VCol>
              <VCol cols="6" md="6" class="pslider2">
                <router-link
                  :to="{
                    name: 'services',
                    query: {
                      category: 'dulces-y-ponques'
                    }
                  }"
                >
                  <VImg :src="Plaza_2" class="border-top-right img-galery" alt="ponques"/>
                </router-link>
              </VCol>
              <VCol cols="12" class="pslider3">
                <router-link
                  :to="{
                    name: 'products',
                    query: {
                      category: 'globos'
                    }
                  }"
                >
                  <VImg :src="Plaza_3" class="img-galery" alt="globos"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" md="7" class="pslider4" :class="isMobile ? 'order-last order-md-first pslider5' : ''">
            <router-link 
              :to="{
                name: 'services',
                query: {
                  category: 'renta-de-mobiliario'
                }
              }">
              <VImg :src="Banner" class="img-galery" :class="isMobile ? 'slider5Img' : ''" height="auto" cover />
            </router-link>
          </VCol>
          <VCol cols="12" md="5" class="pslider4">
            <VRow :class="isMobile ? 'px-mobile' : 'v-row--no-gutters'" class="transparent">
              <VCol cols="6" md="6" class="pslider2">
                <router-link 
                  :to="{
                    name: 'services',
                    query: {
                      category: 'animadores-de-fiestas'
                    }
                  }">
                  <VImg :src="Plaza_4" class="img-galery" alt="eventos"/>
                </router-link>
              </VCol>
              <VCol cols="6" md="6" class="pslider2">
                <router-link 
                  :to="{
                    name: 'services',
                    query: {
                      category: 'animadores-de-fiestas'
                    }
                  }">
                  <VImg :src="Plaza_5" class="border-bottom-right img-galery" alt="personalizados"/>
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
            <img :src="motorcycle" width="60" height="60" class="ms-10" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Envíos gratis</span>
              <span class="d-block card-information-subtitle">A partir de $190.000</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="location" width="60" height="60" class="ms-10" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Nuestras tiendas</span>
              <span class="d-block card-information-subtitle">En Bogotá</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="sold" width="60" height="60" class="ms-10" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Ventas por mayor</span>
              <span class="d-block card-information-subtitle">A los mejores precios</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center col-siguecompra">
            <img :src="tracking" width="60" height="60" class="ms-10" loading="lazy"/>
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
      <VCardTitle class="px-4 px-md-7 py-3 cardtitles hr-cyan">Recomendaciones según tus búsquedas</VCardTitle>
      <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && !isMobile">
        <Product1 
          v-for="(product, i) in data.recommendations"
          :key="i"
          :product="product"
          :readonly="true"/>
      </VCardText>  
      <VCardText class="pb-0 px-4 px-md-7 mt-5 mb-2 d-md-flex align-items-stretch justify-content-between" v-if="data && isMobile">  
        <swiper
          :pagination="{
            dynamicBullets: true,
          }"
          :modules="modules"
          :spaceBetween="5"
          :slidesPerView="2"
          :freeMode="true"
          :watchSlidesProgress="true"
          @swiper="setThumbsSwiper"
          :style="{ height: isMobile ? '340px' : '370px' }"
          >
          <swiper-slide v-for="(product, i) in data.recommendations" :key="i">
            <Product1 
              :product="product"
              :readonly="true"/>
          </swiper-slide>
        </swiper>
      </VCardText> 
    </VCard>

    <!-- banner 2 -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardItem class="p-0">
        <VImg :src="isMobile ? banner_2_mobile : banner_2" cover/>
      </VCardItem>  
    </VCard>
    
    <!-- the most sold -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center card-vendido cardtitles hr-cyan">
        <span>Lo más vendido</span>
        <VSpacer />
        <router-link 
          :to="{
            name: 'categories',
            params: {
              slug: 'globos'
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-1 me-md-3 hover:tw-text-primary vendido-globos">Globos
        </router-link>
        <router-link 
          :to="{
            name: 'categories',
            params: {
              slug: 'hora-loca'
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-1 me-md-3 hover:tw-text-primary vendido-globos">
          Piñatas
        </router-link>
        <router-link 
          :to="{
            name: 'categories',
            params: {
              slug: 'sorpresas'
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-1 me-md-3 hover:tw-text-primary vendido-globos">
          Sorpresas
        </router-link>
        <router-link 
          :to="{
            name: 'categories',
            params: {
              slug: 'decoracion'
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-1 me-md-3 hover:tw-text-primary vendido-globos">
          Decoración
        </router-link>
      </VCardTitle>
      <VCardText class="px-4 px-md-7 pb-0 mt-2 mt-md-5 mb-2 mb-md-5 d-flex align-items-stretch justify-content-between card-banner5" v-if="data">
        <VRow no-gutters class="transparent mostSoldMobile">
          <VCol cols="12" md="9">
            <VCard class="no-shadown">
              <VCardText class="p-0">
                <VImg 
                  :src="banner_5" 
                  class="border-img" 
                  cover
                  />
              </VCardText>
              <VCardText class="p-0">
                <VTabs v-model="tab" class="mt-3 mt-md-7" color="pink-accent-3">
                  <VTab value="0">Agregados recientemente</VTab>
                  <VTab value="1">Lo  mejor de lo mejor</VTab>
                </VTabs>
                <v-window v-model="tab" disabled>
                  <v-window-item value="0">
                    <VCardText class="px-0 mt-5 d-flex align-items-stretch justify-content-between" v-if="!isMobile">
                      <Product1 
                        v-for="(product, index) in data.mostSold.latestProducts"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"/>
                    </VCardText>

                    <VCardText class="pb-0 px-0 mt-5 d-md-flex align-items-stretch justify-content-between" v-else>
                      <swiper
                        :pagination="{
                          dynamicBullets: true,
                        }"
                        :modules="modules"
                        :spaceBetween="5"
                        :slidesPerView="2"
                        :freeMode="true"
                        :watchSlidesProgress="true"
                        @swiper="setThumbsSwiper"
                        :style="{ height: isMobile ? '330px' : '370px' }"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.latestProducts" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                  </v-window-item>

                  <v-window-item value="1">
                    <VCardText class="px-0 mt-5 d-flex align-items-stretch justify-content-between" v-if="!isMobile">
                      <Product1 
                        v-for="(product, index) in data.mostSold.bestSellers"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"/>
                    </VCardText>

                    <VCardText class="pb-0 px-0 mt-5 d-md-flex align-items-stretch justify-content-between" v-else>
                      <swiper
                        :pagination="{
                          dynamicBullets: true,
                        }"
                        :modules="modules"
                        :spaceBetween="5"
                        :slidesPerView="2"
                        :freeMode="true"
                        :watchSlidesProgress="true"
                        @swiper="setThumbsSwiper"
                        :style="{ height: isMobile ? '330px' : '370px' }"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.bestSellers" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                  </v-window-item>
                </v-window>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="3" class="d-flex flex-column col-mobile">
            <VCardText class="p-0 ms-3">
              <div v-if="tab === '0'">
                <Product2 
                  v-for="(product, index) in data.mostSold.latestProducts"
                  v-show="index >= 4"
                  :key="index"
                  :product="product"
                  :readonly="true"/>
              </div>
              <div v-else>
                <Product2 
                  v-for="(product, index) in data.mostSold.bestSellers"
                  v-show="index >= 4"
                  :key="index"
                  :product="product"
                  :readonly="true"/>
              </div>
            </VCardText>
            <VCardText class="p-0 more">
              <router-link to="/products" class="d-flex tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-end align-center">
                <span class="ms-5">Ver más</span>
                <arrow_right class="ms-2" />
              </router-link>
            </VCardText>
          </VCol>
        </VRow>
      </VCardText>  
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-flex transparent card-banner34">
        <VCard class="no-shadown card-information p-0 w-50 grid-item w-100">
          <router-link 
            :to="{
              name: 'products',
              query: {
                category: 'decoracion',
                subcategory: 'velas'
              }
            }" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="isMobile ? banner_3_mobile : banner_3" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5 grid-item w-100">
          <router-link 
            :to="{
              name: 'products',
              query: {
                category: 'globos',
                subcategory: 'globos-metalizados'
              }
            }" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="isMobile ? banner_4_mobile : banner_4" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
    </VCard>

    <!-- theme parties -->
    <VCard class="mt-7 no-shadown card-information transparent p-0">
      <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center cardtitles">
        <span>Fiestas temáticas</span>
        <VSpacer />
        <router-link 
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas'
            }
          }"  
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary" v-if="!isMobile">
          Ver todos
        </router-link>
      </VCardTitle>
      <VDivider class="hr-primary"/>
      <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="!isMobile">
        <router-link
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas',
              subcategory: 'tematica-mexicana'
            }
          }" class="tw-no-underline d-block text-center zoom">
          <img :src="t_1" class="border-theme d-block size-circles-desktop" loading="lazy"  alt="mexicana"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Mexicana</span>
        </router-link>
        <router-link 
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas',
              subcategory: 'tematica-hawaiana'
            }
          }" class="tw-no-underline d-block text-center zoom">
          <img :src="t_2" class="border-theme d-block size-circles-desktop" loading="lazy" alt="hawaiana"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Hawaiana</span>
        </router-link>
        <router-link 
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas',
              subcategory: 'tematica-vallenata'
            }
          }" class="tw-no-underline d-block text-center zoom">
          <img :src="t_3" class="border-theme d-block size-circles-desktop" loading="lazy" alt="vallenata"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Vallenata</span>
        </router-link>
        <router-link 
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas',
              subcategory: 'tematica-metalizada'
            }
          }" class="tw-no-underline d-block text-center zoom">
          <img :src="t_4" class="border-theme d-block size-circles-desktop" loading="lazy" alt="metalizada"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Metalizada</span>
        </router-link>
        <router-link 
          :to="{
            name: 'products',
            query: {
              category: 'fiestas-tematicas',
              subcategory: 'tematica-neon'
            }
          }" class="tw-no-underline d-block text-center zoom">
          <img :src="t_5" class="border-theme d-block size-circles-desktop" loading="lazy" alt="neon"/>
          <span class="d-block size-theme tw-text-tertiary mt-5">Neón</span>
        </router-link>
      </VCardText> 
      <VCardText class="px-0 mt-2 mb-2 d-flex align-items-stretch justify-content-between" v-else>
        <VRow no-gutters class="transparent">
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-mexicana'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_1" class="border-theme d-block" width="150" height="150" alt="mexicana"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Mexicana</span>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-hawaiana'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_2" class="border-theme d-block" width="150" height="150" alt="hawaiana"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Hawaiana</span>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-vallenata'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_3" class="border-theme d-block" width="150" height="150" alt="vallenata"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Vallenata</span>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-metalizada'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_4" class="border-theme d-block" width="150" height="150" alt="metalizada"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Metalizada</span>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-neon'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_5" class="border-theme d-block" width="150"  height="150" loading="lazy" alt="neon"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Neón</span>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas'
                }
              }" 
              class="tw-no-underline d-block text-center zoom mt-0">
              <img :src="t_6" class="border-theme d-block" width="150"  height="150" alt="todos"/>
              <span class="d-block size-theme tw-text-tertiary mt-2 transparentColor">.</span>
            </router-link>
          </VCol>
        </VRow>
      </VCardText>     
    </VCard>
  </VContainer>

  <div :style="backgroundStyle">
    <VContainer>
      <!-- birthday -->
      <VCard class="mt-7 no-shadown card-information transparent p-0 tw-text-white">
        <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center cardtitles">
          <span>Cumpleaños</span>
          <VSpacer />
          <router-link
            :to="{
              name: 'products',
              query: {
                category: 'fiestas-tematicas',
                subcategory: 'tematica-cumpleanos'
              }
            }"
            class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 tw-text-white hover:tw-text-yellow">
            Ver todos
          </router-link>
        </VCardTitle>
        <VDivider class="hr-secondary"/>
        <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="!isMobile">
          <router-link 
            :to="{
              name: 'products',
              query: {
                category: 'fiestas-infantiles',
                subcategory: 'fiestas-ninos'
              }
            }" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_1" class="border-theme d-block size-circles-desktop" loading="lazy" alt="iconos"/>
            <span class="d-block size-theme tw-text-white mt-5">Niños</span>
          </router-link>
          <router-link 
            :to="{
              name: 'products',
              query: {
                category: 'fiestas-infantiles',
                subcategory: 'tematica-ninas'
              }
            }" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_2" class="border-theme d-block size-circles-desktop" loading="lazy" alt="icons2"/>
            <span class="d-block size-theme tw-text-white mt-5">Niñas</span>
          </router-link>
          <router-link 
            :to="{
              name: 'products',
              query: {
                category: 'fiestas-infantiles',
                subcategory: 'tematica-bebes'
              }
            }" class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_3" class="border-theme d-block size-circles-desktop" loading="lazy" alt="icons3"/>
            <span class="d-block size-theme tw-text-white mt-5">Bebes</span>
          </router-link>
          <router-link
            :to="{
              name: 'products',
              query: {
                category: 'globos',
                fathercategory: 'globos-metalizados',
                subcategory: 'globos-metalizados-tematicas-adultos'
              }
            }"
            class="tw-no-underline d-block text-center img-zoom">
            <img :src="f_4" class="border-theme d-white size-circles-desktop" loading="lazy" alt="icons4"/>
            <span class="d-block size-theme tw-text-white mt-5">Adultos</span>
          </router-link>
        </VCardText> 
        <VCardText class="px-0 mt-2 mb-2 d-flex align-items-stretch justify-content-between" v-else>
          <VRow no-gutters class="transparent">
            <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
              <router-link
                :to="{
                  name: 'products',
                  query: {
                    category: 'fiestas-infantiles',
                    subcategory: 'fiestas-ninos'
                  }
                }"
                class="tw-no-underline d-block text-center img-zoom mt-0">
                <img :src="f_1" class="border-theme d-block" width="150" height="150" loading="lazy"/>
                <span class="d-block size-theme tw-text-white mt-2">Niños</span>
              </router-link>
            </VCol>
            <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
              <router-link
                :to="{
                  name: 'products',
                  query: {
                    category: 'fiestas-infantiles',
                    subcategory: 'tematica-ninas'
                  }
                }"
                class="tw-no-underline d-block text-center img-zoom mt-0">
                <img :src="f_2" class="border-theme d-block" width="150" height="150" loading="lazy"/>
                <span class="d-block size-theme tw-text-white mt-2">Niñas</span>
              </router-link>
            </VCol>
            <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
              <router-link
                :to="{
                  name: 'products',
                  query: {
                    category: 'fiestas-infantiles',
                    subcategory: 'tematica-bebes'
                  }
                }"
                class="tw-no-underline d-block text-center img-zoom mt-0">
                <img :src="f_3" class="border-theme d-block" width="150" height="150" loading="lazy"/>
                <span class="d-block size-theme tw-text-white mt-2">Bebes</span>
              </router-link>
            </VCol>
            <VCol cols="6" class="d-flex align-center text-center justify-content-center mb-5">
              <router-link
                :to="{
                  name: 'products',
                  query: {
                    category: 'globos',
                    fathercategory: 'globos-metalizados',
                    subcategory: 'globos-metalizados-tematicas-adultos'
                  }
                }"
                class="tw-no-underline d-block text-center img-zoom mt-0">
                <img :src="f_4" class="border-theme d-white" width="150" height="150" loading="lazy"/>
                <span class="d-block size-theme tw-text-white mt-2">Adultos</span>
              </router-link>
            </VCol>
          </VRow>
        </VCardText>   
      </VCard>
    </VContainer>
  </div>
</template>

<style scoped>

  .soon-text {
    color: #FF0090;
    border: 1px solid #FF0090;
    padding: 5px;
    font-size: 13px;
    margin: 10px 10px 10px auto;
    border-radius: 5px;
  }
  .v-list::v-deep(.v-list-item:hover .soon-text) {
    display: block !important;
  }

  .v-list::v-deep(.v-list-item:hover .soon-items) {
    color: #E1E1E1 !important;
    width: 120px;
    white-space: pre-wrap;
  }

  .v-list::v-deep(.v-list-item:hover .soon-img) {
    opacity: 0.2 !important;
  }

  .v-list-item--variant-plain {
    opacity: 1 !important;
  }

  .pslider {
    padding: 3px 1px !important;
  }

  .pslider2 {
    padding: 0 2px 4px 2px !important;
  }

  .pslider3 {
    padding: 0 2px !important;
  }

  .pslider4 {
    padding: 1px 1px 0 1px!important;
  }

  .border-categories {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .more {
    text-align: end;
    display: contents;
  }

  .hr-primary {
    border-bottom: 1px solid #0A1B33;
    opacity: 1;
  }

  .hr-cyan {
    border-bottom: 1px solid #D9EEF2;
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
    min-height: 59.2px !important;
  }

  .transparent {
    background: transparent !important;
  }

  .transparentColor {
    color: transparent !important;
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
    fill: #FF0090;
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

  .zoom {
    transition: transform ease-in-out 0.3s;
  }

  .zoom:hover {
    transform: scale(1.1);
  }

  .zoom:hover span{
    color: #FF0090!important;
  }

  .img-galery:hover{
    filter: saturate(180%)!important;
  }

  .v-tab:hover::v-deep(button) {
    background-color: teal !important;
  }

  .carousel-home {
    height:389px !important;
  }

  .v-tab::v-deep(.v-btn__content) {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25.6px;
    text-transform: none !important;
  }

  .text-pink-accent-3 {
    color: #FF0090 !important;
  }

  .size-circles-desktop
  {
    width: 194px;
    height: 194px;
  }

  @media only screen and (max-width: 767px) {
    .col-mobile {
      display: none !important;
    }

    .pslider {
      padding: 3px 3px 0 3px !important;
    }

    .pslider2 {
      padding: 12px 2px 3px 2px !important;
    }

    .carousel-home {
      height: 195px !important;
      border-radius:  16px 16px 0 0 !important;
    }

    .border-categories {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }

    .border-top-right {
      border-top-right-radius: 0px!important;
    }

    .hr {
      border-right: 0px;
      border-bottom: 1px solid #D9EEF2;
      width: 80%;
      padding-top: 64px!important;
      padding-bottom: 64px!important;
    }

    .col-siguecompra {
      padding-top: 32px!important;
      padding-bottom: 32px!important;
    }

    .card-information {
      padding: 10px 32px;
    }

    .card-vendido {
      display: block!important;
    }

    .vendido-globos {
      margin-inline-start: 0px !important;
    }

    .banner5-mobile {
      width: 325.088px;
      height: 100px;
    }

    .card-banner5 {
        padding-top: 8px!important;
    }

    .card-banner34 {
      display: grid!important;
      grid-template-columns: 1fr!important;
      grid-gap: 0!important;
    }

    .grid-item {
      margin: 0 0 15px 0px !important;
      padding: 0!important;
    }

    .v-carousel::v-deep(.v-btn--icon.v-btn--density-default) {
      width: calc(var(--v-btn-height) + 1px);
      height: calc(var(--v-btn-height) + 1px);
    }

    .v-carousel::v-deep(.v-icon--size-default) {
      font-size: calc(var(--v-icon-size-multiplier) * 1.1em);
    }

    .px-mobile {
      padding-right: 10px !important;
      padding-left: 10px !important;
    }

    .pslider3 {
      padding: 0 2px 14px 2px !important
    }

    .border-bottom-right {
      border-radius: 0 !important;
    }

    .pslider4 {
      padding: 1px 3px 3px 3px!important;
    }

    .pslider5 {
      padding: 9px 3px 3px 3px!important;
    }

    .slider5Img {
      border-bottom-right-radius: 16px!important;
      border-bottom-left-radius: 16px!important;
    }

    .cardtitles {
      white-space: pre-wrap;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .swiper {
      height: 280px!important;
    }

    .swiper::v-deep(.swiper-pagination-bullet-active) {
      background: #FF0090 !important;
    }

    .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 92%;
    }    

    .mostSoldMobile {
      width: -webkit-fill-available;
    }

    .v-tab::v-deep(.v-btn__content) {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .v-tabs::v-deep(.v-btn.v-btn--density-default) {
      height: 40px !important;
      padding: 0 2px;
    }
  }
</style>
