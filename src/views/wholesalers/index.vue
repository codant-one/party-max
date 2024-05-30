<script setup>


import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
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

import p_1 from '@assets/images/p_1.jpg';
import p_2 from '@assets/images/p_2.jpg';
import p_3 from '@assets/images/p_3.jpg';
import p_4 from '@assets/images/p_4.jpg';
import p_5 from '@assets/images/p_5.jpg';

const thumbsSwiper = ref(null);
const modules = ref([Pagination])
const miscellaneousStores = useMiscellaneousStores()
const data = ref(null)
const isLoading = ref(true)

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const isMobile = /Mobi/i.test(navigator.userAgent);
const route = useRoute()

watchEffect(fetchData)

async function fetchData() {

  if(route.params.slug) {
    isLoading.value = true

    await miscellaneousStores.getCategory(route.params.slug)
    data.value = miscellaneousStores.getData
    
    isLoading.value = false
  }
}

</script>

<template>
  <VContainer class="mt-1 mt-md-10">
       
    <VCard class="mt-3 mt-md-7 no-shadown card-information p-0">
      <VCardTitle class="px-4 px-md-7 py-3 d-flex align-center cardtitles">
        <span>Top proveedores mayoristas</span>
        <VSpacer />
        <router-link to="/suppliers" class="ms-0 ms-md-5 tw-no-underline tw-text-tertiary font-size-16 me-0 me-md-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="!isMobile">
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
      <VCardText class="pb-0 px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-else>
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
          :style="{ height: isMobile ? '180px' : '370px' }"
          >
          <swiper-slide>
            <router-link to="/suppliers" class="tw-no-underline">
              <img width="144" :src="p_1" class="border-img"/>
            </router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/suppliers" class="tw-no-underline">
              <img width="144" :src="p_2" class="border-img"/>
            </router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/suppliers" class="tw-no-underline">
              <img width="144" :src="p_3" class="border-img"/>
            </router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/suppliers" class="tw-no-underline">
              <img width="144" :src="p_4" class="border-img"/>
            </router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link to="/suppliers" class="tw-no-underline">
              <img width="144" :src="p_5" class="border-img"/>
            </router-link>
          </swiper-slide>
        </swiper>
      </VCardText>
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-block d-md-flex transparent">
        <VCard class="no-shadown card-information p-0 w-100 w-md-50">
          <router-link
            to="/"
            class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner2" cover class="img-style"/>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-100 w-md-50 ms-0 ms-md-5 mt-7 mt-md-0">
          <router-link
            to="/"
            class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner3" cover class="img-style"/>
            </VCardItem>  
          </router-link>
        </VCard>
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

    <!--BANNER PROMO-->
    <VCard class="mt-7 no-shadown card-information p-0 transparent">
      <VCardItem class="p-0">
        <router-link 
          to="/">
          <VImg :src="banner1" cover class="img-style"/>
        </router-link>
      </VCardItem>  
    </VCard>

    <router-link 
      to="/products"
      class="link-button"  >
      <VBtn class="mt-7 mb-5 tw-bg-primary tw-text-white button-product" rounded="xl" block>Ver todos los productos</VBtn>
    </router-link>



  </VContainer>

</template>

<style scoped>

.transparent {
        background: transparent !important;
    }

.card-information {
    padding: 32px;
    border-radius: 16px;
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

    .link-button {
      text-decoration: none;
    }

  .border-img {
      border-radius: 16px !important;
    }

  .cardtitles {
      white-space: pre-wrap;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .img-style {
        border-radius: 16px;
        border: 1px solid #000;
        background: #D9D9D9;
    }

    @media only screen and (max-width: 767px) 
    {
        .card-information 
        {
             padding: 10px 32px;
        }

        .swiper::v-deep(.swiper-pagination-bullet-active) {
      background: #FF0090 !important;
    }

    .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 90%;
    } 

    .img-style {
          height: 140px;
      }

      .button-product {
        font-size: 14px !important;
        line-height: 14px; 
      }
    }
</style>