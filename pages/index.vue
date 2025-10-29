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
import { useCategoriesStores } from '@/stores/categories'

import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

import motorcycle from '@assets/icons/motorcycle.svg';
import location from '@assets/icons/location.svg';
import sold from '@assets/icons/sold.svg';
import tracking from '@assets/icons/tracking.svg';

import t_1 from '@assets/images/t_1.webp';
import t_2 from '@assets/images/t_2.webp';
import t_3 from '@assets/images/t_3.webp';
import t_4 from '@assets/images/t_4.webp';
import t_5 from '@assets/images/t_5.webp';

import f_1 from '@assets/images/f_1.webp';
import f_2 from '@assets/images/f_2.webp';
import f_3 from '@assets/images/f_3.webp';
import f_4 from '@assets/images/f_4.webp';

import t_7 from '@assets/images/t_7.jpg';

import mb_1 from '@assets/images/pmhb-01-envio-express.svg';
import mb_2 from '@assets/images/pmhb-02-lo-mas-nuevo.svg';
import mb_3 from '@assets/images/pmhb-03-oferta-del-dia.svg';
import mb_4 from '@assets/images/pmhb-04-mas-vendidos.svg';
import mb_5 from '@assets/images/pmhb-05-aliados.svg';

import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';

const thumbsSwiper = ref(null);
const modules = ref([Navigation, Pagination])
const modulesSlider = ref([Autoplay, Pagination, Navigation])

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const config = useRuntimeConfig()
const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')
const twitterAccount = ref(config.public.TWITTER_ACCOUNT ?? '')

const banner_1 = ref([])
const banner_2 = ref([])
const banner_3 = ref([])
const banner_4 = ref([])
const banner_5 = ref([])
const banner_6 = ref([])
const banner_products = ref([])
const banner_services = ref([])
const homeFeaturedBanners = ref({})

const { isMobile } = useDevice();

const sliders = ref([])
const banners = ref([])

const homeStores = useHomeStores()
const miscellaneousStores = useMiscellaneousStores()
const categoriesStores = useCategoriesStores()
const buildPrettyPathProducts = (category, subcategory = null, fathercategory = null) => {
  if (category && subcategory && fathercategory)
    return `/products/categories/${category}/${fathercategory}/${subcategory}`
  if (category && subcategory)
    return `/products/categories/${category}/${subcategory}`
  if (category)
    return `/products/categories/${category}`
  return '/products'
}

const handleCategoryClickProducts = (category, subcategory = null, fathercategory = null) => {
  categoriesStores.reset()
  if (category) categoriesStores.setCategory(category)
  if (subcategory) categoriesStores.setSubcategory(subcategory)
  if (fathercategory) categoriesStores.setFathercategory(fathercategory)
}

const data = ref(null)
const isLoading = ref(true)

const isDialogVisible = ref(false)
const isError = ref(false)
const message = ref(false)

const categories = ref([]);

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

// watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()

  categories.value = homeStores.getData.parentCategories;

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

  const tempBanners = {};
  const specialBanners = [
    { id: 7, prop: 'products' },
    { id: 8, prop: 'services' }
  ];
  const sequentialIds = { start: 9, end: 16 };
  for (const { id, prop } of specialBanners) {
    const foundBanner = banners.value.find(item => item.order_id === id);
    
    if (foundBanner) {
        tempBanners[prop] = {
            image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
            url: foundBanner.url,
            title: foundBanner.title
        };
    }
  }
  for (let id = sequentialIds.start; id <= sequentialIds.end; id++) {
    const propName = `banner${id}`;
    const foundBanner = banners.value.find(item => item.order_id === id);

    if (foundBanner) {
        tempBanners[propName] = {
            image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
            url: foundBanner.url,
            title: foundBanner.title
        };
    }
  }
  homeFeaturedBanners.value = tempBanners;

  isLoading.value = false
}

await useAsyncData('homeData', fetchData);

const redirectTo = (url) => {
  if (url) {
    window.open(url, '_blank');
    // window.location.href = url
  }
}

const tab = ref('0')

useHead({
  title: 'PARTYMAX | THE PARTY MARKET',
  meta: [
    { name: 'description', content: 'Partymax, tu aliado ideal para fiestas en Colombia. Conectamos tus ideas con los mejores proveedores.¡Haz tu celebración inolvidable de forma fácil y económica!' },
    { name: 'keywords', content: 'eventos en Colombia, marketplace de fiestas, proveedores de eventos, organización de eventos, planificación de fiestas, catering, decoración de fiestas, entretenimiento para eventos, servicios para bodas, fiestas infantiles, despedidas de soltera, tecnología para eventos, Partymax' },
    { name: 'robots', content: 'index, follow' },
    { name: 'autor', content: 'Partymax' },
    { name: 'language', content: 'es' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'PARTYMAX | THE PARTY MARKET' },
    { property: 'og:description', content: 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.' },
    { property: 'og:image', content: config.public.APP_DOMAIN_API_URL + '/logos/R_ORIGINAL@2x.png' },
    { property: 'og:url', content: `https://${config.public.MY_DOMAIN}` },
    { property: 'og:site_name', content: 'PARTYMAX' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'PARTYMAX | THE PARTY MARKET' },
    { name: 'twitter:description', content: 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.' },
    { name: 'twitter:image', content: config.public.APP_DOMAIN_API_URL + '/logos/R_ORIGINAL@2x.png' },
    { name: 'twitter:site', content: twitterAccount.value }
  ]
});

const featuredCategory = 'fiestas-tematicas'
const featuredCategorySwiperOptions = reactive({
  slidesPerView: 2,
  spaceBetween: 2,
  breakpoints: {
    501: {
      slidesPerView: 3,
      spaceBetween: 3,
    },
    768: {
      slidesPerView: 4, 
      spaceBetween: 4, 
    },
    1280: {
      slidesPerView: 6, 
      spaceBetween: 6, 
    },
  },
});
</script>

<template>
  <WelcomePopup />
  <Loader :isLoading="isLoading"/>

  <h1 class="visually-hidden">
    Partymax, tu aliado ideal para fiestas en Colombia.
  </h1>

  <!-- B: NEW MAIN BANNER SLIDER -->
  <section id="main-banner">
    <div class="tw--mt-2 md:tw-mt-3">
      <swiper
        :pagination="true"
        :navigation="true"
        :modules="modulesSlider"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        class="MySwiper"
      >
        <swiper-slide
          v-for="(item,i) in sliders"
          :key="i"
          class="w-100 tw-relative"
        >
          <NuxtLink 
            :to="item.url" 
            class="tw-block tw-w-full tw-h-full"
            rel="noopener"
          >
            <img 
              :src="baseURL + (isMobile ? item.mobile : item.image)"
              :alt="item.title"
              class="w-100"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'auto'"
            >
          </NuxtLink>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <!-- E: NEW MAIN BANNER SLIDER -->

  <!-- B: PRODUCTS / SERVICES CARDS CTA | MISC CARDS -->
  <section id="main-banner" class="mt-3">
    <VContainer>
      <!-- B: PRODUCTS / SERVICES CARDS CTA -->
      <VCard class="no-shadown card-information p-0 d-flex transparent card-banner34">
        <VCard class="no-shadown card-information p-0 w-50 grid-item w-100">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.products?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.products?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.products?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5 grid-item w-100">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.services?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.services?.image" cover class="img-gallery" :alt="homeFeaturedBanners.services?.title"/>
              </NuxtLink>
            </VCardItem>
        </VCard>
      </VCard>
      <!-- E: PRODUCTS / SERVICES CARDS CTA -->

      <!-- B: MISC CARDS -->
      <VCard 
      class="home-misc-card-container mt-10 no-shadown p-0 transparent"
      :class="[
        'tw-w-full', 
        'tw-grid tw-gap-4', 
        'tw-grid-cols-2', 
        'md:tw-grid-cols-5' 
      ]"
      >
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/help" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="mb_1" class="" loading="lazy" alt="Envío Express ¡Recibe Hoy!"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="#" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="mb_2" class="" loading="lazy" alt="¡Si Llegaron! Lo Más Nuevo"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="#" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="mb_3" class="" loading="lazy" alt="Descubre La Oferta Del Día"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="#" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="mb_4" class="" loading="lazy" alt="Productos Más Vendidos"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/clients/form_supplier" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="mb_5" class="" loading="lazy" alt="Quiero Ser Aliado"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
      </VCard>
      <!-- E: MISC CARDS -->
    </VContainer>
  </section>
  <!-- E: PRODUCTS / SERVICES CARDS CTA | MISC CARDS -->

  <section id="most-popular">
    <h2 class="home-section-title tw-text-center tw-uppercase tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">¡Los Más Elegidos!</h2>
    <VContainer>
      <!-- B: MOST POPULAR 1 -->
      <VCard 
        class="mt-7 no-shadown p-0 transparent"
        :class="[
          'tw-w-full', 
          'tw-grid tw-gap-4', 
          'tw-grid-cols-2', 
          'md:tw-grid-cols-4' 
        ]"
      >
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner9?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner9?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner9?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner10?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner10?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner10?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner11?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner11?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner11?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner12?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner12?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner12?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
      </VCard>
      <!-- E: MOST POPULAR 1 -->
      <!-- B: MOST POPULAR 2 -->
      <VCard class="mt-7 no-shadown p-0 d-flex transparent card-banner34">
          <VCard class="no-shadown p-0 w-50 grid-item w-100 card-information">
              <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner13?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner13?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner13?.title"/>
              </NuxtLink>
            </VCardItem> 
          </VCard>
          <VCard class="no-shadown p-0 w-50 ms-5 grid-item w-100 card-information">
              <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner14?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
              >
                <img :src="homeFeaturedBanners.banner14?.image" cover  class="img-gallery" :alt="homeFeaturedBanners.banner14?.title"/>
              </NuxtLink>
            </VCardItem> 
          </VCard>
      </VCard>
      <!-- E: MOST POPULAR 2 -->
    </VContainer>
  </section>

  <!-- B: FEATURED CATEGORY A -->
  <section id="featured-category-a">
    <div class="tw-bg-green featured-category-container">
      <h2 class="home-section-title tw-text-center tw-uppercase tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">Compra por Temática</h2>
      <VContainer class="mt-3">
        <VCard 
          class="no-shadown card-icons tw-bg-green" 
          v-if="categories && categories.length > 0 && categories.filter(item => item.slug === featuredCategory)[0]?.children?.length > 0">
          
          <VCardText class="pt-2 pb-1 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
            <swiper
              :slides-per-view="featuredCategorySwiperOptions.slidesPerView"
              :space-between="featuredCategorySwiperOptions.spaceBetween"
              :breakpoints="featuredCategorySwiperOptions.breakpoints"

              :navigation="true"
              :loop="true"
              :modules="modules"
              class="mySwiper">
              
              <swiper-slide 
                v-for="(i, index) in (categories?.filter(item => item.slug === featuredCategory)[0]?.children || [])"
                :key="index"
                class="py-2">
                
                <NuxtLink
                  :to="{
                    name: 'products',
                    query: {
                      category: featuredCategory,
                      subcategory: i.slug.split('/')[1],
                      wholesalers: false
                    }
                  }"
                  class="tw-no-underline d-block text-center justify-content-center zoom">
                  
                  <img 
                    v-if="i.icon_subcategory" 
                    :src="baseURL + i.icon_subcategory"
                    class="d-block border-theme"
                  />
                  <img 
                    v-else 
                    :src="t_7"
                    class="d-block border-theme"
                  />
                  <span 
                    class="d-block mt-2 tw-text-tertiary" 
                  >
                    {{ i.name }}
                  </span>
                </NuxtLink>
              </swiper-slide>
            </swiper>
          </VCardText> 
        </VCard>
      </VContainer>
    </div>
  </section>
  <!-- E: FEATURED CATEGORY A -->

  <!-- B: MOST WANTED / RECOMMENDATIONS -->
  <section id="most-wanted">
    <h2 class="home-section-title tw-text-center tw-uppercase text-yellow-darken-2 tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">Los Más Buscados</h2>
    <VContainer>
      <VCard class="no-shadown card-information p-0">
        <!-- d-none d-md-flex align-items-stretch justify-content-between -->
        <VCardText class="px-4 px-md-7 mt-5 mb-5 prodrecommended-grid-6-4-2" v-if="data"> 
          <Product1 
            v-for="(product, i) in data.recommendations"
            :key="i"
            :product="product"
            :readonly="true"/>
        </VCardText>
      </VCard>
      
      <!-- B: MOST WANTED BANNERS -->
      <VCard class="mt-7 no-shadown card-information p-0 transparent most-wanted-banners">
        <VRow no-gutters class="tw-w-full">
          
          <VCol cols="12" lg="5" md="5" sm="5" xs="12">
            <VCard class="no-shadown p-0 tw-w-full card-information">
              <VCardItem class="p-0">
                <NuxtLink 
                  :to="homeFeaturedBanners.banner15?.url" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="homeFeaturedBanners.banner15?.image" cover class="img-gallery" :alt="homeFeaturedBanners.banner15?.title"/>
                </NuxtLink>
              </VCardItem> 
            </VCard>
          </VCol>

          <VCol cols="12" lg="7" md="7" sm="7" xs="12" class="tw-h-full tw-mt-0 tw-pl-5">
            <VCard class="no-shadown p-0 tw-w-full card-information">
              <VCardItem class="p-0">
                <NuxtLink 
                  :to="homeFeaturedBanners.banner16?.url" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                >
                  <img :src="homeFeaturedBanners.banner16?.image" cover class="img-gallery" :alt="homeFeaturedBanners.banner16?.title"/>
                </NuxtLink>
              </VCardItem> 
            </VCard>
          </VCol>
        </VRow>
      </VCard>
      <!-- E: MOST WANTED BANNERS -->
    </VContainer>
  </section>
  <!-- E: MOST WANTED / RECOMMENDATIONS -->

<!-- **************************************************************** OLD HOMEPAGE **************************************************************** -->

  <VDialog v-model="isDialogVisible" >
    <VCard
      class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
      <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" :alt="isError ? 'Icono de error' : 'Icono de éxito'" class="mx-auto"/>
      <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
        {{ message }}
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>

  .home-section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: 38.4px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

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
    /* background: transparent !important; */
    border: 2px double #FF0090 !important;
    width: 16px; 
    height: 16px;
    opacity: 1;
    
    /* Círculo interior rosado */
    &::after {
      content: '';
      position: absolute;
      top: 45%;
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

  .home-misc-card-container {
    overflow: unset;
  }
  .home-misc-card {
    transition: transform ease-in-out .2s; 
  }
  .home-misc-card:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }

  #featured-category-a .swiper {
    width: 100%;
    height: 100%;
  }

  #featured-category-a .swiper::v-deep(.swiper-wrapper)  {
    align-items: center !important;
  }

  #featured-category-a .swiper::v-deep(.swiper-slide) {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #featured-category-a .swiper-slide img {
    display: block;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev), 
  #featured-category-a .swiper::v-deep(.swiper-button-next) {
    color: #0A1B33 !important;
    width: 6px !important;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev) {
    left: 5px;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-next) {
    right: 5px;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev:after), 
  #featured-category-a .swiper::v-deep(.swiper-button-next:after) {
    font-size: 20px;
    font-weight: bold;
  }

  .featured-category-container {
    padding-top: 150px;
    margin-top: -150px;
  }

  .most-wanted-banners .v-card {
    max-height: 280px;
  }
  /* .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 92%;
  }     */

  @media only screen and (max-width: 1280px) {
    .most-wanted-banners .v-card {
      max-height: 180px;
    }
  }
  @media only screen and (max-width: 869px) {
    .most-wanted-banners .v-card {
      max-height: 150px;
    }
  }
  @media only screen and (max-width: 768px) {
    .most-wanted-banners .v-card {
      max-height: 125px;
    }
  }
  @media only screen and (max-width: 600px) {
    .most-wanted-banners .v-card {
      max-height: unset;
    }
    .most-wanted-banners .v-col-12 {
      padding-left: 0 !important;
      margin-top: 1rem !important;
    }
  }

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


  /* *********** B: PRODUCTS RECOMMENDED STYLES *********** */

  .prodrecommended-grid-6-4-2 {
    /* Móvil (sm/xs) -> 2 columnas */
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  /* Tablet (md/sm) -> 3 columnas */
  @media (min-width: 501px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* Tablet (md) -> 4 columnas */
  @media (min-width: 768px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  /* Desktop (lg) -> 6 columnas */
  @media (min-width: 1280px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
  /* *********** E: PRODUCTS RECOMMENDED STYLES *********** */

</style>