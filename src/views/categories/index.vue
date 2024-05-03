<script setup>

import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';

import Product1 from '@/components/product/Product1.vue'
import Loader from '@/components/common/Loader.vue'
import banner1 from '@assets/images/banner1.png';
import banner2 from '@assets/images/banner2.png';
import banner3 from '@assets/images/banner3.png';
import banner4 from '@assets/images/banner4.png';
import t_6 from '@assets/images/t_6.jpg';

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)
const isLoading = ref(true)

const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)
const image4 = ref(null)
const slug1 = ref(null)
const slug2 = ref(null)
const slug3 = ref(null)
const slug4 = ref(null)

const icons_categories = ref([])

const isMobile = /Mobi/i.test(navigator.userAgent);

const thumbsSwiper = ref(null);
const modules = ref([Pagination])

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}
 
watchEffect(fetchData)

async function fetchData() {

  if(route.params.slug) {
    isLoading.value = true

    await miscellaneousStores.getCategory(route.params.slug)
    data.value = miscellaneousStores.getData
    icons_categories.value = data.value.category.children

    image1.value = (data.value.category.banner === null) ? banner1 : baseURL.value + data.value.category.banner
    slug1.value = data.value.category.banner1?.slug.split('/')[1]
    image2.value = (data.value.category.banner_2 === null) ? banner2 : baseURL.value + data.value.category.banner_2
    slug2.value = data.value.category.banner2?.slug.split('/')[1]
    image3.value = (data.value.category.banner_3 === null) ? banner3 : baseURL.value + data.value.category.banner_3
    slug3.value = data.value.category.banner3?.slug.split('/')[1]
    image4.value = (data.value.category.banner_4 === null) ? banner4 : baseURL.value + data.value.category.banner_4
    slug4.value = data.value.category.banner4?.slug.split('/')[1]

    isLoading.value = false
  }
}
</script>

<template>
  <VContainer class="mt-1 mt-md-10" v-if="data">
    <VCard class="no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <router-link 
          :to="{
            name:'products',
            query: {
                category: route.params.slug,
                subcategory: slug1
            }
          }">
          <VImg :src="image1" cover class="img-style"/>
        </router-link>
      </VCardItem>  
    </VCard>

    <!--OTRAS CATEGORIAS-->

    <!--LISTADO DE SUBCATEGORIAS-->

    <!-- theme parties -->
    <VCard class="mt-7 no-shadown card-information transparent p-0">
      <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center cardtitles">
        <span>¡Encuentra exactamente lo que necesitas!</span>
        <VSpacer />
        <router-link
          :to="{
            name: 'products',
            query: {
              category: route.params.slug
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary" v-if="!isMobile">Ver todos</router-link>
      </VCardTitle>
      <VDivider class="hr-primary"/>
      <VCardText 
        class="px-4 px-md-7 pb-0 mt-5 d-flex align-items-stretch card-icons"
        :class="icons_categories.length === 3 ? 'justify-content-between' : 'justify-content-center'">
        <template v-for="(i, index) in icons_categories">
          <router-link
            v-if="i.icon_subcategory !== null"
            :to="{
              name: 'products',
              query: {
                category: route.params.slug,
                subcategory: i.slug.split('/')[1]
              }
            }" class="tw-no-underline d-block text-center justify-content-center zoom router-icons">
            <img :src="baseURL + i.icon_subcategory" class="border-theme d-block" v-if="i.icon_subcategory !== null"/>
            <span class="d-block size-theme tw-text-tertiary mt-5 mb-5" v-if="i.icon_subcategory !== null">{{i.name}}</span>
          </router-link>      
        </template>
        <router-link
          v-if="isMobile"
          :to="{
            name: 'products',
            query: {
              category: route.params.slug
            }
          }" 
          class="tw-no-underline d-block text-center justify-content-center zoom router-icons">
          <img :src="t_6" class="border-theme d-block"/>
          <span class="d-block size-theme tw-text-tertiary mt-5 mb-5 transparentColor">.</span>
        </router-link>
      </VCardText>      
    </VCard>

    <!-- novedades -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center cardtitles">
        <span>Novedades</span>
        <VSpacer />
        <router-link
          :to="{
            name:'products',
            query: {
              category: route.params.slug
            }
          }"
          class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && !isMobile">
        <Product1 
          v-for="(product, i) in data.products"
          :key="i"
          :product="product"
          :readonly="true"/>
      </VCardText>
      <VCardText class="pb-0 px-3 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && isMobile">
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
          class="mySwiper"
          :style="{ height: isMobile ? '350px' : '370px' }"
          >
          <swiper-slide v-for="(product, i) in data.products" :key="i">
            <Product1 
              :product="product"
              :readonly="true"/>
          </swiper-slide>
        </swiper>
      </VCardText>
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-block d-md-flex transparent">
        <VCard class="no-shadown card-information p-0 w-100 w-md-50">
          <router-link
            :to="{
              name:'products',
              query: {
                category: route.params.slug,
                subcategory: slug2
              }
            }"
            class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="image2" cover class="img-style"/>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-100 w-md-50 ms-0 ms-md-5 mt-7 mt-md-0">
          <router-link
            :to="{
              name:'products',
              query: {
                category: route.params.slug,
                subcategory: slug3
              }
            }"
            class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="image3" cover class="img-style"/>
            </VCardItem>  
          </router-link>
        </VCard>
    </VCard>

      <!--Banner 4-->
    <VCard class="mt-7 no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <router-link
          :to="{
            name:'products',
            query: {
              category: route.params.slug,
              subcategory: slug4
            }
          }">
          <VImg :src="image4" cover class="img-style"/>
        </router-link>
      </VCardItem>  
    </VCard>

    
    
    <router-link 
      :to="{
        name:'products',
          query: {
            category: route.params.slug
          }
      }"
      class="link-button"  >
      <VBtn class="mt-7 mb-5 tw-bg-primary tw-text-white button-product" rounded="xl" block>Ver todos los productos</VBtn>
    </router-link>
  </VContainer>

  <Loader :isLoading="isLoading" v-else/>
</template>

<style scoped>

  .transparentColor {
    color: transparent !important;
  }
  .card-icons  {
    flex-wrap: wrap;

  }
    
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

  .link-button {
    text-decoration: none;
  }

  .border-theme {
    border-radius: 192px;
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
    margin: auto;
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

  .router-icons
  {
    width: 20%;
  }

  @media only screen and (max-width: 767px) {
    .img-style {
      height: 140px;
    }

    .swiper::v-deep(.swiper-pagination-bullet-active) {
      background: #FF0090 !important;
    }

    .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 90%
    }

    .cardtitles {
      white-space: pre-wrap;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .button-product {
      font-size: 14px !important;
      line-height: 14px; 
    }

    .router-icons {
      width: 50%;
      padding: 0px 10px;
    }

    .border-theme {
      width: 100%;
    }

  }
</style>