<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { useMiscellaneousStores } from "@/stores/miscellaneous";
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

import f_1 from '@assets/images/f_1.jpg';
import f_2 from '@assets/images/f_2.jpg';
import f_3 from '@assets/images/f_3.jpg';
import f_4 from '@assets/images/f_4.jpg';

import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';

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
const miscellaneousStores = useMiscellaneousStores()

const data = ref(null)
const isLoading = ref(true)

const isDialogVisible = ref(false)
const isError = ref(false)
const message = ref(false)

watch(() => 
  miscellaneousStores.getLoading, async (value) => {
    isLoading.value = value
  }
)

watch(() => 
  miscellaneousStores.getMessage, async (value) => {
    if(value !== '') {
      isError.value = miscellaneousStores.getError
      isDialogVisible.value = true
      message.value = value
      setTimeout(() => {
        miscellaneousStores.setError(false)
        isDialogVisible.value = false
        isError.value = false
        message.value = ''
      }, 2000)
    }
  }
)

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()
  data.value = homeStores.getData

  sliders.value = data.value.images.filter(item => item.is_slider === 1);
  banners.value = data.value.images.filter(item => item.is_slider === 0);

  banner_1.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 1).mobile : banners.value.find(item => item.order_id === 1).image);
  banner_1.value.url = banners.value.find(item => item.order_id === 1).url;
  banner_1.value.title = banners.value.find(item => item.order_id === 1).title;

  banner_2.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 2).mobile : banners.value.find(item => item.order_id === 2).image);
  banner_2.value.url = banners.value.find(item => item.order_id === 2).url;
  banner_2.value.title = banners.value.find(item => item.order_id === 2).title;

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
  <div class="d-flex flex-column flex-md-row tw--mt-2 md:tw-mt-3 lg:tw-h-[683px]">
    <div class="lg:tw-w-[75%] lg:tw-h-[683px]">
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
        class="MySwiper"
      >
        <swiper-slide
          v-for="(item,i) in sliders"
          :key="i"
          class="w-100 tw-h-[683px] tw-relative"
        >
          <img 
            :src="baseURL + (isMobile ? item.mobile : item.image)"
            :alt="'slider'+(i+1)"
            class="w-100 h-100 tw-object-cover"
            loading="lazy"
          >
          <div class="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-justify-center tw-items-start tw-p-5 md:tw-p-[100px]">
            <h2  
              class="tw-text-white tw-font-bold tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mb-4 md:tw-w-[45%]">
              {{ item.title }}
            </h2>

            <span v-html="item.text" class="tw-text-white tw-leading-[24px] tw-text-[16px] tw-max-w-lg tw-mb-6 md:tw-w-[45%]">
            </span>

            <VBtn
              variant="flat"
              class="tw-capitalize btn-register tw-text-white tw-bg-primary button-hover my-2 mt-md-5"
              @click="redirectTo(item.url)"
            >
              {{ item.button_text }}
            </VBtn>

          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="lg:tw-w-[25%] d-flex tw-flex-col md:tw-flex-row lg:tw-flex-col lg:tw-h-[683px] tw-relative">
      <div
          class="absolute tw-p-5 tw-h-[309px] lg:tw-h-[50%] w-100 tw-cursor-pointer tw-bg-cover tw-bg-center img-gallery"
          :style="{ backgroundImage: 'url(' + banner_1.image + ')' }"
          @click="redirectTo(banner_1.url)"
          role="img"
          :aria-label="banner_1.title">
          <span v-html="banner_1.title" class="tw-text-tertiary tw-leading-[36px] tw-text-[24px]">
          </span>
      </div>
      <div
        class="absolute tw-p-5 tw-h-[309px] lg:tw-h-[50%] w-100 tw-cursor-pointer tw-bg-cover tw-bg-center img-gallery"
        :style="{ backgroundImage: 'url(' + banner_2.image + ')' }"
        @click="redirectTo(banner_2.url)"
        role="img"
        :aria-label="banner_2.title">
        <span v-html="banner_2.title" class="tw-text-tertiary tw-leading-[36px] tw-text-[24px]">
        </span>
      </div>
    </div>
  </div>
  <VContainer>
    <!-- card -->
    <VCard class="mt-7 no-shadown card-information">
      <VCardItem class="p-0">
        <VRow no-gutters  class="tw-text-tertiary">
          <VCol cols="12" sm="6" md="3" class="d-flex align-center hr">
            <img :src="motorcycle" width="60" height="60" class="ms-10" alt="motorcycle" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Envíos gratis</span>
              <span class="d-block card-information-subtitle">A partir de $210.000</span>
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3" class="d-flex align-center hr no-border">
            <img :src="location" width="60" height="60" class="ms-10" alt="location" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Nuestras tiendas</span>
              <span class="d-block card-information-subtitle">En Bogotá</span>
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3" class="d-flex align-center hr">
            <img :src="sold" width="60" height="60" class="ms-10" alt="sold" loading="lazy"/>
            <div class="d-block ms-5">
              <span class="d-block card-information-title mb-1">Ventas por mayor</span>
              <span class="d-block card-information-subtitle">A los mejores precios</span>
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="3" class="d-flex align-center col-siguecompra">
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
      <VCardText class="px-4 px-md-7 mt-5 mb-5 d-none d-md-flex align-items-stretch justify-content-between" v-if="data">
        <Product1 
          v-for="(product, i) in data.recommendations"
          :key="i"
          :product="product"
          :readonly="true"/>
      </VCardText>  
      <VCardText class="pb-0 px-4 px-md-7 mt-5 mb-2 xs:tw-hidden md:tw-block lg:tw-hidden align-items-stretch justify-content-between" v-if="data">  
        <swiper
          :pagination="{
            dynamicBullets: true,
          }"
          :modules="modules"
          :spaceBetween="5"
          :slidesPerView="3"
          :freeMode="true"
          :watchSlidesProgress="true"
          @swiper="setThumbsSwiper"
          class="MySwiper3"
          >
          <swiper-slide v-for="(product, i) in data.recommendations" :key="i">
            <Product1 
              :product="product"
              :readonly="true"/>
          </swiper-slide>
        </swiper>
      </VCardText> 
      <VCardText class="pb-0 px-4 px-md-7 mt-5 mb-2 xs:tw-block md:tw-hidden align-items-stretch justify-content-between" v-if="data">  
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
          class="MySwiper2"
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
      <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center card-vendido cardtitles hr-cyan tw-border-b tw-border-tertiary">
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
        <VRow no-gutters class="transparent tw-w-[-webkit-fill-available]">
          <VCol cols="12" lg="9">
            <VCard class="no-shadown tw-bg-yellow_happiness_100">
              <VCardText class="p-0">
                <img 
                  :src="banner_4.image" 
                  class="border-img w-100"
                  alt="banner8"
                  @click="redirectTo(banner_4.url)"
                  />
              </VCardText>
              <VCardText class="p-0">
                <VTabs v-model="tab" class="mt-3 mt-7 tw-text-tertiary">
                  <VTab value="0">Agregados recientemente</VTab>
                  <VTab value="1">Lo  mejor de lo mejor</VTab>
                </VTabs>
                <v-window v-model="tab" disabled>
                  <v-window-item value="0">
                    <VCardText class="px-0 mt-5 d-none d-md-flex align-items-stretch justify-content-between">
                      <Product1 
                        v-for="(product, index) in data.mostSold.latestProducts"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"
                        :bg="`tw-bg-yellow_happiness_100`"/>
                    </VCardText>
                    <VCardText class="pb-0 px-0 mt-5 xs:tw-hidden md:tw-block lg:tw-hidden align-items-stretch justify-content-between">
                      <swiper
                        :pagination="{
                          dynamicBullets: true,
                        }"
                        :modules="modules"
                        :spaceBetween="5"
                        :slidesPerView="3"
                        :freeMode="true"
                        :watchSlidesProgress="true"
                        @swiper="setThumbsSwiper"
                        :style="{ height: '400px !important' }"
                        class="MySwiper3"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.latestProducts" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"
                            :bg="`tw-bg-yellow_happiness_100`"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                    <VCardText class="pb-0 px-0 mt-5 xs:tw-block md:tw-hidden align-items-stretch justify-content-between">
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
                        class="MySwiper2"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.latestProducts" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"
                            :bg="`tw-bg-yellow_happiness_100`"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                  </v-window-item>

                  <v-window-item value="1">
                    <VCardText class="px-0 mt-5 d-none d-md-flex align-items-stretch justify-content-between">
                      <Product1 
                        v-for="(product, index) in data.mostSold.bestSellers"
                        v-show="index < 4"
                        :key="index"
                        :product="product"
                        :readonly="true"
                        :bg="`tw-bg-yellow_happiness_100`"/>
                    </VCardText>
                    <VCardText class="pb-0 px-0 mt-5 xs:tw-hidden md:tw-block lg:tw-hidden align-items-stretch justify-content-between">
                      <swiper
                        :pagination="{
                          dynamicBullets: true,
                        }"
                        :modules="modules"
                        :spaceBetween="5"
                        :slidesPerView="3"
                        :freeMode="true"
                        :watchSlidesProgress="true"
                        @swiper="setThumbsSwiper"
                        :style="{ height: '400px !important' }"
                        class="MySwiper3"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.bestSellers" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"
                            :bg="`tw-bg-yellow_happiness_100`"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                    <VCardText class="pb-0 px-0 mt-5 xs:tw-block md:tw-hidden align-items-stretch justify-content-between">
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
                        class="MySwiper2"
                        >
                        <swiper-slide v-for="(product, i) in data.mostSold.bestSellers" :key="i">
                          <Product1 
                            :product="product"
                            :readonly="true"
                            :bg="`tw-bg-yellow_happiness_100`"/>
                        </swiper-slide>
                      </swiper>
                    </VCardText>
                  </v-window-item>
                </v-window>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" lg="3" class="d-none d-md-flex flex-column col-mobile">
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
          class="ms-5 tw-no-underline d-none d-md-flex tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
          Ver todos
        </router-link>
      </VCardTitle>
      <VDivider class="hr-primary"/>
      <VCardText class="px-4 px-md-7 mt-5 mb-5 d-none d-md-flex align-items-stretch justify-content-between">
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
      <VCardText class="px-0 mt-2 mb-2 xs:tw-hidden md:tw-block lg:tw-hidden align-items-stretch justify-content-between">
        <VRow no-gutters class="transparent">
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-mexicana'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_1" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Mexicana</span>
            </router-link>
          </VCol>
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-hawaiana'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_2" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Hawaiana</span>
            </router-link>
          </VCol>
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-vallenata'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_3" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Vallenata</span>
            </router-link>
          </VCol>
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-metalizada'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_4" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Metalizada</span>
            </router-link>
          </VCol>
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link 
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas',
                  subcategory: 'tematica-neon'
                }
              }" class="tw-no-underline d-block text-center zoom">
              <img :src="t_5" class="d-block size-rect-desktop" width="150"  height="150" loading="lazy" alt="neon"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Neón</span>
            </router-link>
          </VCol>
          <VCol cols="4" class="d-flex align-center text-center justify-content-center mb-5">
            <router-link
              :to="{
                name: 'products',
                query: {
                  category: 'fiestas-tematicas'
                }
              }" 
              class="tw-no-underline d-block text-center zoom mt-0">
              <span class="d-block size-rect-desktop tw-bg-primary"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Todos</span>
            </router-link>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText class="px-0 mt-2 mb-2 xs:tw-block md:tw-hidden align-items-stretch justify-content-between">
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
              <img :src="t_1" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
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
              <img :src="t_2" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
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
              <img :src="t_3" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
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
              <img :src="t_4" class="d-block size-rect-desktop" width="150" height="150" alt=""/>
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
              <img :src="t_5" class="d-block size-rect-desktop" width="150"  height="150" loading="lazy" alt="neon"/>
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
              <span class="d-block size-rect-desktop tw-bg-primary"/>
              <span class="d-block size-theme tw-text-tertiary mt-2">Todos</span>
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
            class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 tw-text-tertiary hover:tw-text-primary">
            Ver todos
          </router-link>
        </VCardTitle>
        <VDivider class="hr-secondary"/>
        <VCardText class="px-4 px-md-7 mt-5 mb-5 d-none d-md-flex align-items-stretch justify-content-between">
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
        <VCardText class="px-4 px-md-7 mt-5 mb-5 xs:tw-hidden md:tw-flex lg:tw-hidden align-items-stretch justify-content-between">
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
        <VCardText class="px-0 mt-2 mb-2 xs:tw-block md:tw-hidden align-items-stretch justify-content-between">
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
                <span class="d-block size-theme tw-text-tertiary mt-2">Niños</span>
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
                <span class="d-block size-theme tw-text-tertiary mt-2">Niñas</span>
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
                <span class="d-block size-theme tw-text-tertiary mt-2">Bebes</span>
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
                <span class="d-block size-theme tw-text-tertiary mt-2">Adultos</span>
              </router-link>
            </VCol>
          </VRow>
        </VCardText>   
      </VCard>
    </VContainer>
  </div>

  <VDialog v-model="isDialogVisible" >
    <VCard
      class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
      <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" class="mx-auto"/>
      <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
        {{ message }}
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>

  .text-message {
    color:  #FF0090;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px !important;
  }

  .card-register {
    width: 500px;
    border-radius: 32px!important;
  }

  .btn-register {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    border-radius: 32px;
    height: 62px;
  }

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
      color: #FF0090!important;
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


  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .MySwiper::v-deep(.swiper-pagination-bullet-active) {
    background: transparent !important;
    border: 2px double #FF0090 !important;
    width: 16px; 
    height: 16px;
    opacity: 1;
    
    /* Círculo interior rosado */
    &::after {
      content: '';
      position: absolute;
      top: 43%;
      transform: translate(-50%, -50%);
      width: 6px;  /* Tamaño del círculo rosado */
      height: 6px;
      background: #FF0090;
      border-radius: 50%;
    }
  }

  .MySwiper:deep(.swiper-pagination-bullets-dynamic) {
    overflow: visible !important;
  }

  .MySwiper:deep(.swiper-pagination-bullet),
  .MySwiper:deep(.swiper-pagination-bullet-active-next),
  .MySwiper:deep(.swiper-pagination-bullet-active-next-next) {
    width: 16px; 
    height: 16px;
    background-color: white;
    opacity: 0.7;
  }

  .MySwiper:deep(.swiper-button-next),
  .MySwiper:deep(.swiper-button-prev) {
    background-position: center !important;
    background-repeat: no-repeat !important;
    border-radius: 11px !important;
    width: 40px !important;
    height: 40px !important;
  }

  .MySwiper:deep(.swiper-button-next) {
    background-image: url('@/assets/icons/arrow-square-right.svg') !important;
    right: 2% !important;
  }

  .MySwiper:deep(.swiper-button-prev) {
    background-image: url('@/assets/icons/arrow-square-left.svg') !important;
    left: 2% !important;
  }

  .MySwiper:deep(.swiper-button-next::after),
  .MySwiper:deep(.swiper-button-prev::after) {
      content: '' !important; /* Elimina flecha default */
  }

  .MySwiper2 {
    height: 300px!important;
  }

  .MySwiper3 {
    height: 380px!important;
  }

  .MySwiper2::v-deep(.swiper-pagination-bullet-active),
  .MySwiper3::v-deep(.swiper-pagination-bullet-active) {
    background: #FF0090 !important;
  }

  /* .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 92%;
  }     */

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .size-circles-desktop {
      width: 170px;
      height: 170px;
    }

    .no-border {
      border-right: 0 !important;
    }
  }

  @media only screen and (max-width: 767px) {
  
    .size-circles-desktop {
      width: 160px;
      height: 160px;
    }

    .size-rect-desktop {
      width: 160px !important;
      height: 220px !important;
    }

    .button-hover:hover {
      color: #FFFFFF !important;
    }
    .btn-register {
      height: 48px;
    }

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

    .MySwiper:deep(.swiper-button-next),
    .MySwiper:deep(.swiper-button-prev) {
        display: none;
    }

    .card-register {
      padding: 20px;
      width: auto;
    }

    .text-message {
      font-size: 18px;
    }
  }
</style>
