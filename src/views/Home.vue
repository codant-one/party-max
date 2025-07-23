<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';

import Product1 from '@/components/product/Product1.vue'
import Product2 from '@/components/product/Product2.vue'
import Loader from '@/components/common/Loader.vue'
import WelcomePopup from '@/components/app/WelcomePopup.vue'

import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

import motorcycle from '@assets/icons/motorcycle.svg';
import location from '@assets/icons/location.svg';
import sold from '@assets/icons/sold.svg';
import tracking from '@assets/icons/tracking.svg';

import t_1 from '@assets/images/t_1.jpg';
import t_2 from '@assets/images/t_2.jpg';
import t_3 from '@assets/images/t_3.jpg';
import t_4 from '@assets/images/t_4.jpg';
import t_5 from '@assets/images/t_5.jpg';
import t_6 from '@assets/images/t_6.webp';

import f_1 from '@assets/images/f_1.jpg';
import f_2 from '@assets/images/f_2.jpg';
import f_3 from '@assets/images/f_3.jpg';
import f_4 from '@assets/images/f_4.jpg';

const thumbsSwiper = ref(null);
const modules = ref([Pagination])
const modulesSlider = ref([Autoplay, Pagination, Navigation])

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

const banner_1 = ref([])
const banner_2 = ref([])
const banner_3 = ref([])
const banner_4 = ref([])
const banner_5 = ref([])
const banner_6 = ref([])

const isMobile = /Mobi/i.test(navigator.userAgent);

const sliders = ref([])
const banners = ref([])
const firstImageUrl = ref([])

const homeStores = useHomeStores()

const data = ref(null)
const isLoading = ref(true)

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()
  data.value = homeStores.getData

  sliders.value = data.value.images.filter(item => item.is_slider === 1);
  banners.value = data.value.images.filter(item => item.is_slider === 0);

  banner_1.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 1).mobile : banners.value.find(item => item.order_id === 1).image);
  banner_1.value.url = banners.value.find(item => item.order_id === 1).url;

  banner_2.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 2).mobile : banners.value.find(item => item.order_id === 2).image);
  banner_2.value.url = banners.value.find(item => item.order_id === 2).url;

  banner_3.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 3).mobile : banners.value.find(item => item.order_id === 3).image);
  banner_3.value.url = banners.value.find(item => item.order_id === 3).url;

  banner_4.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 4).mobile : banners.value.find(item => item.order_id === 4).image);
  banner_4.value.url = banners.value.find(item => item.order_id === 4).url;

  banner_5.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 5).mobile : banners.value.find(item => item.order_id === 5).image);
  banner_5.value.url = banners.value.find(item => item.order_id === 5).url;

  banner_6.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 6).mobile : banners.value.find(item => item.order_id === 6).image);
  banner_6.value.url = banners.value.find(item => item.order_id === 6).url;


  preloadFirstImage()

  isLoading.value = false
}

const redirectTo = (url) => {
  if (url) {
    window.open(url, '_blank');
    // window.location.href = url
  }
}

const preloadFirstImage = () => {
  if (sliders.value.length > 0) {
    firstImageUrl.value = baseURL.value + sliders.value[0].image
    
    // Crear enlace de precarga
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = firstImageUrl.value
    document.head.appendChild(link)
  }
}

const tab = ref('0')

</script>

<template>
  <WelcomePopup />
  <Loader :isLoading="isLoading"/>
  <div class="d-flex flex-column flex-md-row tw-mt-2 mt-3 md:tw-h-[683px]">
    <div class="md:tw-w-[75%] md:tw-h-[683px]">
     <swiper
        v-if="data"
        :pagination="true"
        :navigation="true"
        :modules="modulesSlider"    
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(item,i) in sliders"
          :key="i"
          class="w-100 md:tw-h-[683px]"
        >
          <img 
            :src="baseURL + (isMobile ? item.mobile : item.image)"
            :alt="'slider'+(i+1)"
            class="w-100 h-100 tw-object-cover"
            loading="lazy"
            @click="redirectTo(item.url)"
          >
        </swiper-slide>
      </swiper>
    </div>
    <div class="md:tw-w-[25%] d-flex flex-column md:tw-h-[683px]">
      <div
          class="h-50 w-100 tw-cursor-pointer tw-bg-cover tw-bg-center"
          :style="{ backgroundImage: 'url(' + banner_1.image + ')' }"
          @click="redirectTo(banner_1.url)"
          role="img"
          :aria-label="'banner4'">
      </div>
      <div
        class="h-50 w-100 tw-cursor-pointer tw-bg-cover tw-bg-center"
        :style="{ backgroundImage: 'url(' + banner_2.image + ')' }"
        @click="redirectTo(banner_2.url)"
        role="img"
        :aria-label="'banner5'"
      ></div>
    </div>
  </div>
  <VContainer>
    <!-- card -->
    <VCard class="mt-7 no-shadown card-information">
      <VCardItem class="p-0">
        <VRow no-gutters  class="tw-text-tertiary">
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="motorcycle" width="60" height="60" class="ms-10" alt="motorcycle" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Envíos gratis</span>
              <span class="d-block card-information-subtitle">A partir de $210.000</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="location" width="60" height="60" class="ms-10" alt="location" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Nuestras tiendas</span>
              <span class="d-block card-information-subtitle">En Bogotá</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center hr">
            <img :src="sold" width="60" height="60" class="ms-10" alt="sold" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Ventas por mayor</span>
              <span class="d-block card-information-subtitle">A los mejores precios</span>
            </div>
          </VCol>
          <VCol cols="12" md="3" class="d-flex align-center col-siguecompra">
            <img :src="tracking" width="60" height="60" class="ms-10" alt="tracking" loading="lazy"/>
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
    <VCard class="mt-7 no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <img :src="banner_3.image" cover @click="redirectTo(banner_3.url)" class="img-gallery" alt="banner7"/>
      </VCardItem>  
    </VCard>
    
    <!-- the most sold -->
    <VCard class="mt-7 no-shadown card-information p-0 tw-bg-yellow_happiness_100">
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
            <VCard class="no-shadown tw-bg-yellow_happiness_100">
              <VCardText class="p-0">
                <img 
                  :src="banner_4.image" 
                  class="border-img img-gallery"
                  alt="banner8"
                  cover
                  @click="redirectTo(banner_4.url)"
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
                        :readonly="true"
                        :bg="`tw-bg-yellow_happiness_100`"/>
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
                        :readonly="true"
                        :bg="`tw-bg-yellow_happiness_100`"/>
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
                  :readonly="true"
                  :bg="`tw-bg-yellow_happiness_100`"/>
              </div>
              <div v-else>
                <Product2 
                  v-for="(product, index) in data.mostSold.bestSellers"
                  v-show="index >= 4"
                  :key="index"
                  :product="product"
                  :readonly="true"
                  :bg="`tw-bg-yellow_happiness_100`"/>
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
            <VCardItem class="p-0">
              <img :src="banner_5.image" cover @click="redirectTo(banner_5.url)"  class="img-gallery" alt="banner9"/>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5 grid-item w-100">
            <VCardItem class="p-0">
              <img :src="banner_6.image" cover @click="redirectTo(banner_6.url)" class="img-gallery" alt="banner10"/>
            </VCardItem>
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
          <img :src="t_1" class="d-block size-rect-desktop" loading="lazy" alt=""/>
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
          <img :src="t_2" class="d-block size-rect-desktop" loading="lazy" alt=""/>
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
          <img :src="t_3" class="d-block size-rect-desktop" loading="lazy" alt=""/>
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
          <img :src="t_4" class="d-block size-rect-desktop" loading="lazy" alt=""/>
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
          <img :src="t_5" class="d-block size-rect-desktop" loading="lazy" alt="neon"/>
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
              <img :src="t_1" class="d-block" width="150" height="150" alt=""/>
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
              <img :src="t_2" class="d-block" width="150" height="150" alt=""/>
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
              <img :src="t_3" class="d-block" width="150" height="150" alt=""/>
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
              <img :src="t_4" class="d-block" width="150" height="150" alt=""/>
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
              <img :src="t_5" class="d-block" width="150"  height="150" loading="lazy" alt="neon"/>
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

  <div class="tw-bg-magenta_100">
    <VContainer>
      <!-- birthday -->
      <VCard class="mt-7 no-shadown card-information transparent p-0 tw-text-tertiary">
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
            class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 tw-text-tertiary hover:tw-text-yellow">
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
            <span class="d-block size-theme tw-text-tertiary mt-5">Niños</span>
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
            <span class="d-block size-theme tw-text-tertiary mt-5">Niñas</span>
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
            <span class="d-block size-theme tw-text-tertiary mt-5">Bebes</span>
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
            <span class="d-block size-theme tw-text-tertiary mt-5">Adultos</span>
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
                <img :src="f_1" class="border-theme d-block" width="150" height="150" loading="lazy" alt="iconos"/>
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
                <img :src="f_2" class="border-theme d-block" width="150" height="150" loading="lazy" alt="icons2"/>
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
                <img :src="f_3" class="border-theme d-block" width="150" height="150" loading="lazy" alt="icons3"/>
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
                <img :src="f_4" class="border-theme d-white" width="150" height="150" loading="lazy" alt="icons4"/>
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
    transition: padding 0.3s ease-in-out;
    padding: 0 2px !important;
  }

  .pslider4 {
    padding: 0 1px!important;
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
  
  .img-gallery {
    width: 100%;
    height: 100%;
  }

  .img-gallery:hover{
    filter: saturate(180%)!important;
  }

  .v-tab:hover::v-deep(button) {
    background-color: teal !important;
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

  .size-circles-desktop {
    width: 194px;
    height: 194px;
  }

  .size-rect-desktop {
    width: 204px;
    height: 284px;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid #D9EEF2;
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

    .img-main {
      height: 170px !important;
      width: 100%;
      border-radius:  16px 16px 0 0 !important;
    }

    .img-globo {
      height: 160px !important;
    }

    .slider5Img {
      border-bottom-right-radius: 16px!important;
      border-bottom-left-radius: 16px!important;
      margin-top: 12px;
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

    .px-mobile {
      padding-right: 10px !important;
      padding-left: 10px !important;
    }

    .pslider3 {
      margin: 0 0 14px 0 !important
    }

    .border-bottom-right {
      border-radius: 0 !important;
    }

    .pslider4 {
      padding: 0 3px!important;
    }

    .pslider5 {
      padding: 1px 3px 3px 3px!important;
    }

    .cardtitles {
      white-space: pre-wrap;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .swiper {
      height: 300px!important;
    }

    .swiper::v-deep(.swiper-pagination-bullet-active) {
      background: #FF0090 !important;
    }

    /* .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 92%;
    }     */

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
