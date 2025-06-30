<script setup>

import { formatNumber } from '@formatters'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { avatarText} from '@formatters'
import { ref } from 'vue';
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { useCartStores } from '@/stores/cart'
import { useFavoritesStores } from '@/stores/favorites'
import { useHomeStores } from "@/stores/home";
import { useOrdersStores } from '@/stores/orders'
import { FreeMode, Navigation, Thumbs, Scrollbar, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { VueImageZoomer } from 'vue-image-zoomer'
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import FlatPickr from 'vue-flatpickr-component';
import router from '@/router'
import Loader from '@/components/common/Loader.vue'
import Service3 from '@/components/service/Service3.vue'
import whatsapp from '@assets/icons/whatsapp.svg?inline';
import facebook from '@assets/icons/facebook2.svg?inline';
import twitter from '@assets/icons/twitter.svg?inline';
import linkendin from '@assets/icons/linkendin.svg?inline';
import whatsapp_mobile from '@assets/icons/whatsapp_mobile.svg?inline';
import facebook_mobile from '@assets/icons/facebook_mobile.svg?inline';
import twitter_mobile from '@assets/icons/twitter_mobile.svg?inline';
import linkendin_mobile from '@assets/icons/linkendin_mobile.svg?inline';
import calendar_icon from '@assets/icons/calendar.svg?inline';
import heart from '@assets/icons/heart.svg?inline';
import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import festin_pending from '@assets/icons/festin_pending.svg';
import playImage from '@assets/images/play.png';

import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';
import arrow_left from '@assets/icons/arrow-left-dark.svg?inline';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar'
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'vue-image-zoomer/dist/style.css';
import 'flatpickr/dist/flatpickr.css';

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()
const cartStores = useCartStores()
const favoritesStores = useFavoritesStores()
const homeStores = useHomeStores();
const ordersStores = useOrdersStores()

const isMobile = /Mobi/i.test(navigator.userAgent);

const isLoading = ref(true)
const tab = ref('0')
const serviceUrl = ref(null)
const searchWhatsapp = ref(null)
const searchFacebook = ref(null)
const searchTwitter = ref(null)
const searchLinkendin = ref(null)

const category = ref(null);
const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  }
])

const serviceImages = ref([])
const modules = ref([Pagination, FreeMode, Navigation, Thumbs, Scrollbar, Zoom])
const modules2 = ref([Pagination])
const thumbsSwiper = ref(null);
const thumbsSwiperModal = ref(null);

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const reviews = ref(null)
const sku = ref(null)
const videos = ref('')
const price = ref(null)
const store = ref(null)
const single_description = ref(null)
const description = ref(null)
const categories = ref([])
const tags = ref([])
const cupcakes = ref([])
const file = ref(null)
const order_file_id = ref(null)

const cant_prod = ref(1)
const load = ref(false)
const imageAux = ref('')
const imageMeta = ref('')

const client_id = ref(null)
const service_id = ref(null)
const user_id = ref(null)

const isFavorite = ref(null)
const isFavoriteService = ref(null)
const message = ref('')

const isDialogVisible = ref(false)
const isError = ref(false)
const isPending = ref(false)

// calendar
const addDays = (date, days) => {
  const result = new Date(date);
  return result.setDate(result.getDate() + days);
}
const date = ref(null)
const calendar = ref()
const config = ref({
  locale: Spanish,
  enableTime: true,
  noCalendar: false,
  dateFormat: "Y-m-d h:i K",
  time_24hr: false,
  minDate: addDays(new Date(), 3),
  disableMobile: true
})

const listFlavors = ref([])
const listFillings = ref([])
const listCakeTypes = ref([])
const listCakeSizes = ref([])
const listSizesByTypes = ref([])
const is_full = ref(true)
const flavor = ref(null)
const flavor_id = ref(null)
const filling = ref(null)
const filling_id = ref(null)
const cake_type = ref([])
const cake_type_id = ref([])
const cake_size = ref([])
const cake_size_id = ref(null)
const is_simple = ref(null)
const isCupcake = ref([])

const radioFlavor = ref([])
const radioFilling = ref([])

const isHoverVisible = ref(false)

watch(() => 
  route.path,(newPath, oldPath) => {
    thumbsSwiper.value.destroy(false, true)
    thumbsSwiperModal.value.destroy(false, true)
    date.value = null
  }
);

watch(() => 
  route.query,(newPath, oldPath) => {
    thumbsSwiper.value.destroy(false, true)
    thumbsSwiperModal.value.destroy(false, true)
    date.value = null
  }
);

watchEffect(fetchData)

async function fetchData() {

  bread.value = [
    {
      title: "Home",
      disabled: false,
      href: "/"
    }
  ]

  if(localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)
      
    client_id.value = userDataJ.client.id
    user_id.value = userDataJ.id
  }

  isLoading.value = true
  
  serviceImages.value = []
  data.value = null

 if(route.params.slug && route.path.startsWith('/services/')) {

    await homeStores.fetchData();
    categories.value = homeStores.getData.parentServices;

    await miscellaneousStores.getService(route.params.slug)
    data.value = miscellaneousStores.getData

    imageAux.value = [{ image : data.value.service.image }]
    imageMeta.value = baseURL.value + data.value.service.image

    serviceImages.value = data.value.service.images

    service_id.value = data.value.service.id

    serviceUrl.value = `https://${import.meta.env.VITE_MY_DOMAIN}/services/${data.value.service.slug}`
    const imageUrl = `${import.meta.env.VITE_APP_DOMAIN_API_URL}/storage/${data.value.service.image}`
    const descriptionText = 'Mira este increíble servicio.'
    const twitterText = `${descriptionText} ${serviceUrl.value} ${imageUrl}`;

    searchWhatsapp.value = `https://wa.me/?text=${serviceUrl.value}`
    searchFacebook.value = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(serviceUrl.value)}`
    searchTwitter.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    searchLinkendin.value = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(serviceUrl.value)}`;
    
    title.value = data.value.service.name
    brand.value = data.value.service.brand.name
    rating.value = data.value.service.rating
    reviews.value = []
    // reviews.value = data.value.service.reviews
    sku.value = data.value.service.sku
    price.value = data.value.service.cupcakes.length > 0 ? data.value.service.cupcakes[0].price : data.value.service.price
    store.value = data.value.service.user.user_detail.store_name ?? (data.value.service.user.supplier?.company_name ?? (data.value.service.user.name + ' ' + (data.value.service.user.last_name ?? '')))
    single_description.value = data.value.service.single_description
    description.value = data.value.service.description ?? ''
    cupcakes.value = data.value.service.cupcakes
    isCupcake.value = data.value.service.cupcakes.length > 0 ? true : false
    is_full.value = data.value.service.is_full
    config.value.minDate = addDays(new Date(), Number(data.value.service.estimated_delivery_time) || 0)

    tags.value = []
    data.value.service.tags.forEach(element => { 
      tags.value.push(element.tag.name)
    });

    if(cupcakes.value.length > 0) {
      await miscellaneousStores.fetchDataCupcake();
      loadData()
    }

    if(client_id.value)
      isFavoriteService.value = await favoritesStores.show({user_id: user_id.value, service_id: service_id.value })

    videos.value = data.value.service.videos.map(u => ({
      type: 'video',
      url: u.url,
      thumb: '/assets/video-placeholder.png',
    }))

    await Promise.all(
      videos.value.map(async slide => {
        if (slide.type === 'video') {
            slide.thumb = await loadVideoThumbnail(slide.url);
        }
      })
    );

    setMetaTags({
      title: title.value,
      description: `Servicio publicado en PARTYMAX como: ${title.value}`,
      image:  imageMeta.value,
      url: serviceUrl.value ,
    });

    if (route.query.category) {
      category.value = {
        title: categories.value.filter(item => item.slug === route.query.category)[0].name,
        disabled: false,
        href: `/services?category=${route.query.category}&wholesalers=${route.query.wholesalers ?? 'false'}`
      };

      bread.value.push(category.value);

      if (route.query.fathercategory) {
        const fathercategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name,
          disabled: false,
          href: `/services?category=${route.query.category}&subcategory=${route.query.fathercategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.fathercategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name
        bread.value.push(fathercategory);
      }

      if (typeof route.query.fathercategory === 'undefined' && route.query.subcategory) {
        const subcategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name,
          disabled: false,
          href: `/services?category=${route.query.category}&subcategory=${route.query.subcategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name
        bread.value.push(subcategory);
      }

      if (typeof route.query.fathercategory !== 'undefined' && route.query.subcategory) {
        const subcategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name,
          disabled: false,
          href: `/services?category=${route.query.category}&fathercategory=${route.query.fathercategory}&subcategory=${route.query.subcategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name
        bread.value.push(subcategory);
      }

      if(!isMobile) {
        const service_ = {
          title: "Servicio",
          disabled: true,
          href: "",
        };

        bread.value.push(service_);
      }
    } else {
      bread.value.push({
        title: 'Servicio',
        disabled: true,
        href: '',
      });
    }
  }
  
  isLoading.value = false
}

const loadData = () => {
  listFlavors.value = miscellaneousStores.getData.flavors
  listFillings.value = miscellaneousStores.getData.fillings

  flavor_id.value = listFlavors.value[0].id
  flavor.value = listFlavors.value[0].name

  radioFlavor.value = []
  radioFilling.value = []

  listFlavors.value.forEach(element => { 
    var aux = {
      value: element.id,
      title: element.name,
    }

    radioFlavor.value.push(aux)
  });

  filling_id.value = listFillings.value[0].id
  filling.value = listFillings.value[0].name

  listFillings.value.forEach(element => { 
    var aux = {
      value: element.id,
      title: element.name,
    }

    radioFilling.value.push(aux)
  });
  
  const data = cupcakes.value.filter(item => item.is_simple === cupcakes.value[0].is_simple);

  const cakeTypes = data.map(item => item.cake_size.cake_type);
  listCakeTypes.value = Array.from(new Set(cakeTypes.map(JSON.stringify))).map(JSON.parse);

  const cakeSizes = data.map(item => item.cake_size);
  listCakeSizes.value = Array.from(new Set(cakeSizes.map(JSON.stringify))).map(JSON.parse);

  is_simple.value = cupcakes.value[0].is_simple.toString()
  cake_type.value = cupcakes.value[0].cake_size.cake_type.name
  cake_type_id.value = cupcakes.value[0].cake_size.cake_type_id
  selectCakeType(cake_type.value)
  cake_size.value = cupcakes.value[0].cake_size.name
  cake_size_id.value = cupcakes.value[0].cake_size.id
  price.value = cupcakes.value[0].price

}

const getCakeSizes = computed(() => {
  return listSizesByTypes.value.map((state) => {
    return {
      title: state.name,
      value: state.id,
    }
  })
})

const selectCakeType = (cakeType) => {
  if (cakeType) {
    let _cakeType = listCakeTypes.value.find(item => item.name === cakeType)
    cake_type.value = _cakeType.name
    cake_type_id.value = _cakeType.id

    listSizesByTypes.value = listCakeSizes.value.filter(item => item.cake_type_id === _cakeType.id)
    cake_size.value = listSizesByTypes.value[0].name
    cake_size_id.value = listSizesByTypes.value[0].id
   
    const data = cupcakes.value.filter(item => item.cake_size_id === listSizesByTypes.value[0].id)[0];
    price.value = data.price
  }
}

const selectCakeSize = (cakeSize) => {
  if (cakeSize) {
    let _cakeSize = getCakeSizes.value.find(item => item.value === cakeSize)
    cake_size_id.value = _cakeSize.value
    
    const data = cupcakes.value.filter(item => item.is_simple === parseInt(is_simple.value) && item.cake_size_id === cake_size_id.value)[0];
    price.value = data.price
  }
}

const chanceFlavor = (value) => {
  if (Number.isInteger(Number(value))) {        
      var selected =  listFlavors.value.filter(item => item.id === Number(value))[0]
    
      flavor.value = selected?.name
      flavor_id.value = selected?.id
  }
}

const chanceFilling = (value) => {
  if (Number.isInteger(Number(value))) {        
      var selected =  listFillings.value.filter(item => item.id === Number(value))[0]

      filling.value = selected?.name
      filling_id.value = selected?.id
  }
}

const setMetaTags = ({ title, description, image, url }) => {
  document.title = title;

  const setMetaTag = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
    element.setAttribute('name', name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  };

  const setPropertyMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
    element.setAttribute('property', property);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  };

  setMetaTag('description', description);

  // Open Graph / Facebook / LinkedIn / Pinterest / WhatsApp
  setPropertyMetaTag('og:type', 'website');
  setPropertyMetaTag('og:title', title);
  setPropertyMetaTag('og:description', description);
  setPropertyMetaTag('og:image', image);
  setPropertyMetaTag('og:url', url);
  setPropertyMetaTag('og:site_name', 'PARTYMAX');

  // Twitter
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', description);
  setMetaTag('twitter:image', image);
  setMetaTag('twitter:site', '@SteffaniiPaola');
}

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const setThumbsSwiperModal = (swiper) => {
    thumbsSwiperModal.value = swiper;
}

const closeHoverVisible = () => {
  isHoverVisible.value = false
  thumbsSwiperModal.value.destroy(false, true)
}

const addCart = async() => {

  if(date.value !== null) {
    if(isCupcake.value && is_simple.value === '0' && (file.value === null || typeof file.value === 'undefined')) { 
      isDialogVisible.value = true
       message.value = 'Debes cargar el archivo personalizado para el servicio'
      isError.value = true

      setTimeout(() => {
        isDialogVisible.value = false
        isError.value = false
        message.value = ''
      }, 3000)
    } else {

      load.value = true
      if(isCupcake.value && is_simple.value === '0' && file.value !== null) {
        const formData = new FormData()
                
        formData.append("image", file.value)

        let response = await ordersStores.uploadFile(formData)
        order_file_id.value = response.success ? response.data.order_file.id : null
      }

      let data = {
        date: date.value,
        service_id: service_id.value,
        cake_size_id: cake_size_id.value ?? 0,
        flavor_id: flavor_id.value ?? 0,
        filling_id: filling_id.value ?? 0,
        order_file_id: order_file_id.value ?? 0,
        product_color_id: null,
        quantity: cant_prod.value,
        wholesale: null,
        type: 1
      }

      cartStores.add(data)
        .then(response => {

          isDialogVisible.value = true
          message.value = 'Agregado al carrito'
          load.value = false

          setTimeout(() => {
            isDialogVisible.value = false
            isError.value = false
            message.value = ''
          }, 1000)

        }).catch(err => {
          load.value = false
          //console.error(err.message)
        })
    }

  } else {

    isDialogVisible.value = true
    message.value = 'Debes agregar una fecha para la orden'
    isError.value = true

    setTimeout(() => {
      isDialogVisible.value = false
      isError.value = false
      message.value = ''
    }, 3000)
  }
}

const addfavorite = () => {
  isFavorite.value = true

  favoritesStores.add({user_id: user_id.value, service_id: service_id.value })
    .then(response => {

      isFavorite.value = false
      isDialogVisible.value = true
      message.value = 'Agregado a la lista de favoritos'
      isFavoriteService.value = true
                    
      setTimeout(() => {
        isDialogVisible.value = false
        isError.value = false
        message.value = ''
      }, 1000)
    
    }).catch(err => {
      isFavorite.value = false

      //console.error(err.message)
    })
}

const openCalendar = () => {
  if (calendar.value && calendar.value.$el) {
    calendar.value.$el.click();
  }
};

const decrement = () => {
  if (cant_prod.value > 1)
    cant_prod.value--
}

const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 1000000 || '¡El tamaño del archivo debe ser menor a 1 MB!']

const mediaSlides = computed(() => {
  const imgs = serviceImages.value.map(i => ({
    type: 'image',
    url: baseURL.value + i.image,
    thumb: baseURL.value + i.image
  }));
  const vids = videos.value.map(u => ({
    type: 'video',
    url: u.url,
    thumb: u.thumb
  }));
  const main = {
    type: 'image',
    url: baseURL.value + imageAux.value[0].image,
    thumb: baseURL.value + imageAux.value[0].image
  }
    return [...vids, main, ...imgs];
});

const loadVideoThumbnail = async (url) => {
    const yt = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
    );
    if (yt) {
        return `https://img.youtube.com/vi/${yt[1]}/mqdefault.jpg`;
    }

    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) {
        return `https://vumbnail.com/${vm[1]}.jpg`;
    }

    return '/assets/video-placeholder.png';
}

const buildEmbedUrl = (url) => {
  const yt = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

</script>

<template>
  <section>
   <VAppBar flat class="breadcumb tw-bg-cyan pt-1">
      <VContainer class="tw-text-tertiary d-flex align-center px-0">
        <v-breadcrumbs :items="bread" class="px-2" />
      </VContainer>
    </VAppBar>
    <VContainer class="pt-0 m-top">
      <Loader :isLoading="isLoading"/>
      <!-- HEADER -->
      <VCard class="mt-md-7 no-shadown card-information p-0" v-if="!isLoading">
        <VCardTitle class="d-flex p-0 align-end">
          {{ title }}
          <VSpacer />
          <div class="align-end redes-title">
            <a :href="searchWhatsapp" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <whatsapp class="me-2" />
            </a>   
            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <facebook class="me-2"/>
            </a>
            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <twitter class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <linkendin class="me-2"/>               
            </a>
          </div>
        </VCardTitle>
        <VCardSubtitle class="px-0 d-flex flex-column align-start border-title pb-1 pb-md-0">
          <VRow no-gutters>
            <VCol cols="12" md="6" class="text-infoprod d-flex align-center mt-1">
              Marca: {{ brand }}
              <VDivider :thickness="2" color="#999" class="hr" vertical />

              <div class="d-flex align-center">
                <VRating
                  half-increments
                  readonly
                  :length="5"
                  :size="isMobile ? 14 : 20"
                  :model-value="rating"
                  color="yellow-darken-2"
                  active-color="yellow-darken-2"
                />

                <span class="ms-1">({{ reviews.length }} {{ reviews.length > 1 ? 'Reviews' : 'Review' }})</span>
              </div>
              <VDivider :thickness="2" color="#999" class="hr" vertical />
              <span class="d-block">SKU: {{ sku }}</span>
            </VCol>
            <VCol cols="12" md="6" class="align-right"></VCol>
          </VRow>
          <div class="my-1 align-end redes-mobile">
            <a :href="searchWhatsapp" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <whatsapp_mobile class="me-2" />
            </a>   
            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <facebook_mobile class="me-2"/>
            </a>
            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <twitter_mobile class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <linkendin_mobile class="me-2"/>               
            </a>
          </div>
        </VCardSubtitle>
        <!-- BODY -->
        <VCardText class="px-0 pb-0 mt-0 mt-md-5 d-flex align-items-stretch justify-content-between">
          <VRow class="border-title pb-2 pb-md-0">
            <VCol cols="3" md="1" class="px-1 p-md-2 d-none d-md-block">
              <swiper
                :direction="'vertical'"
                :pagination="{ clickable: true }"
                :spaceBetween="isMobile ? 3 : 5"
                :slidesPerView="isMobile ? 3 : 6"
                :freeMode="true"
                :watchSlidesProgress="true"
                @swiper="setThumbsSwiper"
                class="mySwiper pt-0 d-flex align-center justify-content-center"
              >
                <swiper-slide v-for="(slide, index) in mediaSlides" :key="index">
                  <img 
                    v-if="slide.type === 'image'"
                    :src="slide.url" 
                    :alt="'image-'+index"
                    width="60"
                  />
                  <template  v-else>
                    <img                         
                      :src="slide.thumb"
                      :alt="'thumbnail-'+index"
                      class="thumb-media"
                    />
                    <div class="play-overlay">
                        <img 
                          :src="playImage" 
                          alt="play icono"
                        />
                    </div> 
                  </template>
                </swiper-slide>
              </swiper>
            </VCol>
            <VCol cols="12" md="4" class="d-flex justify-content-center pb-0 pb-md-2">
              <swiper
                :pagination="{ type: 'fraction' }"
                :navigation="{
                  prevEl: '.button-prev',
                  nextEl: '.button-next'
                }"
                :spaceBetween="isMobile ? 5 : 10"
                :thumbs="{ swiper: thumbsSwiper }"
                :zoom="{ maxRatio: 3, minRatio: 1 }"
                :modules="modules"
                :slidesPerView="1"
                :watchSlidesProgress="true"
                :loop="true"
                class="mySwiper2 border-img mx-0 mx-md-auto image-container"
                v-if="mediaSlides.length > 0"
                >
                <swiper-slide v-for="(slide, index) in mediaSlides" :key="index">
                  <template v-if="slide.type === 'image'">
                    <div class="swiper-zoom-container">
                      <img :src="slide.url" :alt="'slide-'+index" class="zoom-in" @click="isHoverVisible = true"/>
                    </div>
                  </template>
                  <iframe
                    v-else
                    :src="buildEmbedUrl(slide.url)"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />              
                </swiper-slide>
                <div class="custom-nav-btn button-prev" v-if="mediaSlides.length > 1">
                  <arrow_left />
                </div>
                <div class="custom-nav-btn button-next" v-if="mediaSlides.length > 1">
                  <arrow_right />
                </div>
              </swiper>
            </VCol>
            <VCol cols="12" md="7" class="pb-0">
              <VCardText class="p-0">
                <div class="d-flex py-2">
                  <span class="text_1">$ {{ formatNumber(price) }}</span>
                </div>
              </VCardText>
              <VCardText class="p-0 d-flex border-title">
                <span class="d-block tw-text-tertiary">Tienda: 
                  <strong class="tw-text-gray tw-text-base ms-1">{{ store }}</strong>
                </span>
              </VCardText>
              <VCardText class="p-0 d-block border-title mt-2" v-if="isCupcake && is_full">
                <VRow>
                  <VCol cols="12" md="4" class="mb-0 mb-md-3">
                    <span class="d-block tw-text-tertiary mb-2">Sabor: 
                      <strong class="tw-text-tertiary tw-text-base ms-1">{{ flavor }}</strong>
                    </span>
                    <span class="d-block tw-text-tertiary w-100">
                      <VRadioGroup 
                        v-model="flavor_id" 
                        false-icon="mdi-circle-outline"
                        true-icon="mdi-circle-slice-8"
                        @update:model-value="chanceFlavor">
                        <VRadio
                          v-for="f in radioFlavor"
                          :key="f.value"
                          :value="f.value"
                          color="primary"
                        >
                        <template #label>
                          <span class="ms-2">
                            {{ f.title }}
                          </span>
                        </template>
                      </VRadio>
                      </VRadioGroup>
                    </span>
                  </VCol>
                  <VCol cols="12" md="4" class="mb-0 mb-md-3">
                    <span class="d-block tw-text-tertiary mb-2">Relleno: 
                      <strong class="tw-text-tertiary tw-text-base ms-1">{{ filling }}</strong>
                    </span>
                    <span class="d-block tw-text-tertiary w-100">
                      <VRadioGroup 
                        v-model="filling_id" 
                        false-icon="mdi-circle-outline"
                        true-icon="mdi-circle-slice-8"
                        @update:model-value="chanceFilling">
                        <VRadio
                          v-for="f in radioFilling"
                          :key="f.value"
                          :value="f.value"
                          color="primary"
                        >
                        <template #label>
                          <span class="ms-2">
                            {{ f.title }}
                          </span>
                        </template>
                      </VRadio>
                      </VRadioGroup>
                    </span>
                  </VCol>
                  <VCol cols="12" md="4">
                    <span class="d-block tw-text-tertiary mb-4">Tamaño: </span>
                    <span class="d-block tw-text-tertiary w-100">
                      <VAutocomplete
                        variant="outlined"
                        v-model="cake_size"
                        :items="getCakeSizes"
                        autocomplete="off"
                        @update:model-value="selectCakeSize(cake_size)" />
                    </span>

                    <span class="d-block tw-text-tertiary mb-4" v-if="is_simple === '0'">Diseño: </span>
                    <span class="d-block tw-text-tertiary w-100" v-if="is_simple === '0'">
                      <VFileInput 
                        v-model="file"
                        :rules="rules"
                        label="Subir archivo"
                        accept="image/png, image/jpeg, image/bmp"
                        variant="outlined"
                        prepend-icon="mdi-file-image-outline"
                        class="custom-file-input"
                      >
                        <template #selection="{ fileNames }">
                          <template
                            v-for="fileName in fileNames"
                            :key="fileName"
                          >
                            <VChip
                              label
                              size="small"
                              color="primary"
                              class="file-chip"
                              closable
                              @click:close="file = null"
                            >
                              {{ fileName }}
                            </VChip>
                          </template>
                        </template>
                      </VFileInput>
                    </span>
                  </VCol>
                </VRow> 
              </VCardText>
              <VCardText class="p-0 d-block border-title mt-2" v-if="single_description !== null && single_description.length > 10">
                <span class="d-block tw-text-tertiary ms-5 mb-2 tw-leading-5" v-html="single_description" />
              </VCardText>
              <VCardText class="p-0 d-block d-md-flex justify-content-between align-center text-center border-title">
                <VBtn 
                  class="mx-0 my-2 my-md-5 btn-date" 
                  variant="outlined"
                  @click="openCalendar" >
                    <calendar_icon class="mr-2"/>
                    Elegir fecha y hora
                    <flat-pickr
                      v-model="date"
                      ref="calendar"
                      :config="config"
                    />
                </VBtn>
                <div class="d-flex py-2 justify-content-center md:tw-justify-start ">
                  <span class="text_1">{{ date }}</span>
                </div>
                <div v-if="!is_full" class="text-start w-size">
                  <span class="d-block tw-text-tertiary mb-4">Tamaño: </span>
                  <span class="d-block tw-text-tertiary w-100">
                    <VAutocomplete
                      variant="outlined"
                      v-model="cake_size"
                      :items="getCakeSizes"
                      autocomplete="off"
                      @update:model-value="selectCakeSize(cake_size)" />
                  </span>

                  <span class="d-block tw-text-tertiary mb-4" v-if="is_simple === '0'">Diseño: </span>
                  <span class="d-block tw-text-tertiary w-100" v-if="is_simple === '0'">
                    <VFileInput 
                      v-model="file"
                      :rules="rules"
                      label="Subir archivo"
                      accept="image/png, image/jpeg, image/bmp"
                      variant="outlined"
                      prepend-icon="mdi-file-image-outline"
                      class="custom-file-input"
                    >
                      <template #selection="{ fileNames }">
                        <template
                          v-for="fileName in fileNames"
                          :key="fileName"
                        >
                          <VChip
                            label
                            size="small"
                            color="primary"
                            class="file-chip"
                            closable
                            @click:close="file = null"
                          >
                            {{ fileName }}
                          </VChip>
                        </template>
                      </template>
                    </VFileInput>
                  </span>
                </div>
              </VCardText>
              <VCardText class="p-0 d-flex justify-content-center md:tw-justify-start ">
                <div class="d-flex flex-column my-auto me-md-5" v-if="isCupcake">
                  <span>Cantidad:</span>
                  <div class="number-input-wrapper">
                    <VBtn icon size="x-small" @click="decrement" variant="plain" color="#0A1B33">
                      <VIcon>mdi-minus</VIcon>
                    </VBtn>
                    <VTextField
                      v-model="cant_prod"
                      variant="solo"
                      type="text"
                      readonly
                      style="height: 30px;"
                    />
                    <VBtn icon size="x-small" @click="cant_prod++" variant="plain" color="#0A1B33">
                      <VIcon>mdi-plus</VIcon>
                    </VBtn>
                  </div>
                </div>
                <div class="my-auto">
                  <VBtn 
                    variant="flat"
                    @click="addCart"
                    class="btn-register tw-text-white tw-bg-primary button-hover mx-5 my-5" 
                    >
                      Agregar al carrito
                      <VProgressCircular
                        v-if="load"
                        indeterminate
                        color="#fff"
                      />
                  </VBtn>
                </div>
                <div class="my-auto ms-md-5">
                  <span 
                    v-if="!isFavorite" 
                    class="me-4 index heart p-0 d-flex justify-content-center align-center"
                    :class="(isFavoriteService) ? 'heart_fill' : ''" 
                    @click="addfavorite">
                    <heart />
                  </span>
                  <VProgressCircular
                    v-else
                    :size="30"
                    width="3"
                    indeterminate
                    color="primary"
                  />
                </div>
              </VCardText>
            </VCol>
          </VRow>
          </VCardText>
          <VCardText class="px-0 pb-0 d-flex align-items-stretch justify-content-between">
          <VRow no-gutters>
            <VCol cols="12" class="text-center">
              <VTabs v-model="tab" color="pink-accent-3" align-tabs="center" class="px-0">
                <VTab value="0" class="text-tabs">Descripción</VTab>
                <VTab value="1" class="text-tabs">Reviews ({{reviews.length}})</VTab>
              </VTabs>
            </VCol>

            <VCol cols="12" class="d-block description">
              <v-window v-model="tab">
                <v-window-item value="0">
                  <span v-html="description" class="content"></span>
                </v-window-item>
                <v-window-item value="1">
                  <VCardText class="py-0">
                    <VRow class="row-reviews border-title" v-for="review in reviews">
                      <VCol cols="3" md="1">
                        <VAvatar
                          :size="isMobile ? '50': '80'"
                          :color="review.client.user.avatar ? 'default' : 'primary'"
                          :variant="review.client.user.avatar ? 'flat' : 'tonal'"
                        >
                          <VImg
                            v-if="review.client.user.avatar"
                            style="border-radius: 6px;"
                            :src="baseURL + review.client.user.avatar"
                            cover
                          />
                          <span
                            v-else
                            class="text-5xl font-weight-semibold"
                            >
                            {{ avatarText(review.client.user.name) }}
                          </span>
                        </VAvatar>
                      </VCol>
                      <VCol cols="9" md="11">
                        <VRating
                          hover
                          :length="5"
                          :size="isMobile ? 25 : 32"
                          :model-value="review.rating"
                          :style="isMobile ? {marginLeft: '-5px'} : {marginLeft: '-10px'}"
                          color="yellow-darken-2"
                          active-color="yellow-darken-2"
                          readonly
                        />

                        <p class="d-flex tw-flex-col md:tw-flex-row">
                          De<span class="ms-md-1">{{ review.client.user.name }} {{ review.client.user.last_name }}</span>
                          <div class="d-none d-md-block ms-1 me-1">|</div>
                          <div>{{ format(review.date, 'd').concat(' de ') }} {{ format(review.date, 'MMMM, y', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}</div>
                        </p> <br>
                        <p>{{ review.comments }}</p> 
                      </VCol>
                    </VRow>
                  </VCardText>
                </v-window-item>
              </v-window>
            </VCol>
          </VRow>
        </VCardText>  
      </VCard> 

      <!-- recommendations -->
      <VCard class="no-shadown card-information p-0" v-if="data">
        <VCardTitle class="px-4 px-md-7 py-3 col-recomendaciones">
          <VRow align="center">
            <VCol cols="8" md="6" class="text-left">
              <p class="text-lef">Recomendaciones que te pueden interesar</p>
            </VCol>
            <VCol cols="4" md="6" class="text-right">
              <router-link to="/services" class="ms-md-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
            </VCol> 
          </VRow>
        </VCardTitle>
        <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && !isMobile">
          <Service3 
            v-for="(service, i) in data.recommendations"
            :key="i"
            :service="service"
            :readonly="true"/>
        </VCardText>  
        <VCardText class="pb-0 px-4 px-md-7 mt-0 mt-md-5 swiper-recomendations" v-if="data && isMobile">
          <swiper
            :pagination="{
              dynamicBullets: true,
            }"
            :modules="modules2"
            :spaceBetween="5"
            :slidesPerView="2"
            :freeMode="true"
            :watchSlidesProgress="true"
            :style="{ height: isMobile ? '340px' : '370px' }"
            >
            <swiper-slide v-for="(service, i) in data.recommendations" :key="i">
              <Service3 
                :service="service"
                :readonly="true"/>
            </swiper-slide>
          </swiper>
        </VCardText> 
      </VCard>
    </VContainer>
    <VDialog v-model="isDialogVisible" >
      <VCard
        class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
        <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : (isPending ? festin_pending : check_circle)" class="mx-auto"/>
        <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
          {{ message }}
        </VCardText>
      </VCard>
    </VDialog>

    <!-- hover -->
    <VDialog 
      v-if="!isMobile"
      v-model="isHoverVisible"   
      fullscreen
      transition="dialog-bottom-transition">
      <div class="d-flex justify-content-end">
        <VBtn
          icon="mdi-window-close"
          variant="text"
          color="white"
          @click="closeHoverVisible"
         />
      </div>
      <div class="px-10">
        <VRow no-gutters>
          <VCol cols="3" md="2" class="px-1 p-md-2 d-none d-md-block">
            <swiper
              :direction="'vertical'"
              :pagination="{ clickable: true }"
              :spaceBetween="isMobile ? 3 : 5"
              :slidesPerView="isMobile ? 3 : 6"
              :freeMode="true"
              :watchSlidesProgress="true"
              @swiper="setThumbsSwiperModal"
              class="mySwiperModal pt-0 h-100"
            >
              <swiper-slide v-for="(slide, index) in mediaSlides" :key="index">
                  <img 
                    v-if="slide.type === 'image'"
                    :src="slide.url" 
                    :alt="'image-'+index"
                    width="100"
                  />
                  <template  v-else>
                    <img                         
                      :src="slide.thumb"
                      :alt="'thumbnail-'+index"
                      class="thumb-media-modal"
                    />
                    <div class="play-overlay">
                        <img :src="playImage" />
                    </div> 
                  </template>
              </swiper-slide>
            </swiper>
          </VCol>
          <VCol cols="9" md="10" class="d-flex justify-content-center pb-0 pb-md-2 tw-relative">
            <swiper
              :pagination="{ type: 'fraction' }"
              :navigation="{
                prevEl: '.button-prev',
                nextEl: '.button-next'
              }"
              :spaceBetween="isMobile ? 5 : 10"
              :thumbs="{ swiper: thumbsSwiperModal }"
              :modules="modules"
              :slidesPerView="1"
              :watchSlidesProgress="true"
              :loop="true"
              class="mySwiper2Modal border-img mx-0 mx-md-auto image-container"
              v-if="mediaSlides.length > 0"
              >
              <swiper-slide v-for="(slide, index) in mediaSlides" :key="index">
                <template v-if="slide.type === 'image'">
                  <vue-image-zoomer
                    :regular="slide.url"
                    :zoom-amount="3"
                  />
                </template>
                <iframe
                  v-else
                  :src="buildEmbedUrl(slide.url)"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />              
              </swiper-slide>
              
            </swiper>
            <div class="button-prev" v-if="mediaSlides.length > 1">
                  <arrow_left />
              </div>
              <div class="button-next" v-if="mediaSlides.length > 1">
                <arrow_right />
              </div>
          </VCol>
        </VRow>
      </div>
    </VDialog>
  </section>
</template>

<style lang="scss" scoped>
  .content {
    :deep(img)  {
      width: 100%;
    }
  }
</style>

<style scoped>

  .thumb-media {
    width: 60px !important;
    height: 60px !important;
    object-fit: cover !important;
    border-radius: 8px !important;
  }

  .thumb-media-modal {
    width: 100px !important;
    height: 100px !important;
    object-fit: cover !important;
    border-radius: 8px !important;
  }

  .swiper::v-deep(.vh--message-bottom) {
    bottom: 30px !important;
  } 

  .swiper::v-deep(.vh--message) {
    display: none !important;
  } 

  .m-top {
    margin-top: -10px;
  }

  .custom-nav-btn {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  .button-prev, .button-next {
    position: absolute;
    background: #D9EEF2;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    z-index: 10;
    display: flex;
    padding: 8px;
  }

  .mySwiper2:hover .custom-nav-btn {
    opacity: 1;
    pointer-events: auto;
  }

  .mySwiper2 iframe {
    pointer-events: none !important;
  }

  .zoom-in:hover {
    cursor: zoom-in;
  }

  .button-prev { left: 8px; }
  .button-next { right: 8px; }

  /* Opcional: efectos hover */
  .button-prev:hover v-icon,
  .button-next:hover v-icon {
    transform: scale(1.1);
  }

  .swiper-slide-active::v-deep(.vh--outer),
  .swiper-slide-active::v-deep(.vh--outer > .vh--holder),
  .swiper-slide-active::v-deep(.vh--outer > .vh--holder > picture) {
    width: 100%;
    height: 100%;
  }

  .swiper-slide-active::v-deep(.vh--outer > .vh--holder > picture > img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    justify-content: center;
    display: flex;
  }

  .play-overlay img {
    width: 15px !important;
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

  .v-rating::v-deep(.v-icon--size-default) {
    font-size: 20px;
  }

  .number-input-wrapper {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 2px solid #E1E1E1;
    height: 40px;
  }

  .text-pink-accent-3 {
    color: #FF0090 !important;
  }

  .heart:hover::v-deep(path), .shoppinp_cart:hover::v-deep(path) {
    fill: #FF0090;
  }

  .heart_fill::v-deep(path) {
    fill: #FF0090 !important;
  }

  .text_1 {
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  .text_2 {
    color: #999;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  
  .hr {
    height: 15px; 
    opacity: 1;
    margin: 3px 10px;
  }

  .border-title {
    border-bottom: 1px solid #D9EEF2;
  }

  .border-title2 {
    border-bottom: 1px solid #D9EEF2;
    border-top: 1px solid #D9EEF2;
    padding-top: 16px;
    margin-top: 40px;
  }

  .border-title2 span {
    color:  #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.2px;
  }

  .border-title2 p {
    color: #0A1B33;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.4px; 
  }

  .border-title2 span {
    color: #0A1B33;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    margin: auto;
    line-height: 20px; /* 100% */
  }

  .border-title2 span:hover {
    color: #FF0090;
    text-decoration: underline #FF0090;
  }

  .btn-register {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    border-radius: 32px;
    width: 260px;
    height: 60px;
  }

  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .breadcumb {
    height: 55px !important;
  }

  .hearth-icon path {
    fill:#0A1B33;
  }

  .hearth-icon path:hover {
    fill: #FF0090;
  }

  .row-add {
    width: 100%;
  }

  .b-mayorista {
    display: flex;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    border: 1px solid  #0A1B33;
    color: #0A1B33;
    font-weight: 700;
  }

  .b-mayorista:hover::v-deep(path) {
    fill: white;
  }

  .b-mayorista:hover {
    background-color:  #0A1B33;
    border: 1px solid #0A1B33;
    color: white;
  }

  .b-mayorista-active {
    display: flex;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background-color:  #0A1B33;
    border: 1px solid  #0A1B33;
    color: white;
    font-weight: 700;
  }

  .b-mayorista-active::v-deep(path) {
    fill: white;
  }

  .b-mayorista-active:hover::v-deep(path) {
    fill: #0A1B33;
  }

  .b-mayorista-active:hover {
    background-color:  white;
    border: 1px solid #0A1B33;
    color: #0A1B33;
  }

  .description {
    border-top: 1px solid #D9EEF2;
    padding: 16px 0px!important;
  }

  .col-recomendaciones {
    display: flex;
    background-color: #E2F8FC;
    border-radius: 32px;
    align-items: center;
    color:  #0A1B33;
  }
  
  .col-recomendaciones p {
    font-size: 24px;
  }

  .col-recomendaciones span {
    font-size: 14px;
  }

  .custom-file-input::v-deep(.v-field) {
    border-radius: 40px;
    height: 35px;
  }

  .custom-file-input::v-deep(.v-field-label) {
    top: 18px !important;
  }

  .custom-file-input::v-deep(.v-input__prepend) {
    margin-inline-end: 5px !important;
  }

  .custom-file-input::v-deep(.v-field__outline__start) {
    flex: 0 0 48px !important;
  }

  .custom-file-input::v-deep(.v-label.v-field-label--floating) {
    display: none !important;
  }

  .custom-file-input::v-deep(.v-field__input) {
    padding: 0 0 0 15px !important;
    min-height: 35px !important;
  }

  .custom-file-input::v-deep(.v-field__clearable > .v-icon) {
    display: none !important;
  }

  .custom-file-input::v-deep(.v-field__clearable) {
    margin: 0 !important;
  }

</style>


<style lang="scss">
/* stylelint-disable no-descending-specificity */

.flat-picker-custom-style {
  position: absolute;
  color: inherit;
  inline-size: 100%;
  inset: 0;
  outline: none;
  padding-block: 0;
  padding-inline: var(--v-field-padding-start);
}

input[altinputclass="inlinePicker"] {
  display: none;
}

.flatpickr-calendar {
  background-color: rgb(var(--v-theme-surface));
  inline-size: 16.625rem;
  margin-block-start: 0.1875rem;

  .flatpickr-rContainer {
    .flatpickr-weekdays {
      padding-inline: 0.8rem;
    }

    .flatpickr-days {
      min-inline-size: 16.625rem;

      .dayContainer {
        justify-content: center !important;
        inline-size: 16.625rem;
        min-inline-size: 16.625rem;
        padding-block-end: 0.5rem;
        padding-block-start: 0;

        .flatpickr-day {
          block-size: 2.125rem;
          line-height: 2.125rem;
          margin-block-start: 0 !important;
          max-inline-size: 2.125rem;
        }
      }
    }
  }

  .flatpickr-day {
    color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));

    &.today {
      border-color: rgb(var(--v-theme-primary));

      &:hover {
        border-color: rgb(var(--v-theme-primary));
        background: transparent;
        color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
      }
    }

    &.selected,
    &.selected:hover {
      border-color: rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }

    &.inRange,
    &.inRange:hover {
      border: none;
      background: rgba(var(--v-theme-primary), 0.1) !important;
      box-shadow: none !important;
      color: rgb(var(--v-theme-primary));
    }

    &.startRange {
      box-shadow: none;
    }

    &.endRange {
      box-shadow: none;
    }

    &.startRange,
    &.endRange,
    &.startRange:hover,
    &.endRange:hover {
      border-color: rgb(var(--v-theme-primary));
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }

    &.selected.startRange + .endRange:not(:nth-child(7n + 1)),
    &.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
    &.endRange.startRange + .endRange:not(:nth-child(7n + 1)) {
      box-shadow: -10px 0 0 rgb(var(--v-theme-primary));
    }

    &.flatpickr-disabled,
    &.prevMonthDay:not(.startRange,.inRange),
    &.nextMonthDay:not(.endRange,.inRange) {
      opacity: var(--v-disabled-opacity);
    }

    &:hover {
      border-color: rgba(var(--v-theme-surface-variant), var(--v-hover-opacity));
      background: rgba(var(--v-theme-surface-variant), var(--v-hover-opacity));
    }
  }

  .flatpickr-weekday {
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    font-size: 0.875rem;
    font-weight: 500;
  }

  .flatpickr-days {
    inline-size: 16.625rem;
  }

  &::after,
  &::before {
    display: none;
  }

  .flatpickr-months {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

    .flatpickr-prev-month,
    .flatpickr-next-month {
      fill: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));

      &:hover i,
      &:hover svg {
        fill: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
      }
    }
  }

  .flatpickr-current-month span.cur-month {
    font-weight: 300;
  }

  &.open {
    z-index: 1051;
  }

  &.hasTime.open {
    .flatpickr-time {
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
      block-size: auto;
    }
  }
}

.flatpickr-time input:hover,
.flatpickr-time .flatpickr-am-pm:hover,
.flatpickr-time input:focus,
.flatpickr-time .flatpickr-am-pm:focus {
  background: transparent;
}

.flatpickr-time {
  .flatpickr-am-pm,
  .flatpickr-time-separator,
  input {
    color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
  }

  .numInputWrapper {
    span {
      &.arrowUp {
        &::after {
          border-block-end-color: rgb(var(--v-border-color));
        }
      }

      &.arrowDown {
        &::after {
          border-block-start-color: rgb(var(--v-border-color));
        }
      }
    }
  }
}

.flatpickr-input[readonly],
.flatpickr-input ~ .form-control[readonly],
.flatpickr-human-friendly[readonly] {
  background-color: inherit;
  opacity: 1 !important;
}

.flatpickr-weekdays {
  margin-block-start: 8px;
}

.flatpickr-current-month {
  .flatpickr-monthDropdown-months {
    appearance: none;
  }

  .flatpickr-monthDropdown-months,
  .numInputWrapper {
    padding: 2px;
    border-radius: 4px;
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.15s ease-out;
    text-transform: uppercase;

    span {
      display: none;
    }

    .flatpickr-monthDropdown-month {
      background-color: rgb(var(--v-theme-surface));
    }

    .numInput.cur-year {
      font-weight: 500;
    }
  }
}

.flatpickr-day.flatpickr-disabled,
.flatpickr-day.flatpickr-disabled:hover {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}

.v-theme--dark.flatpickr-calendar {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  box-shadow: none;
}

.flatpickr-months {
  padding-block: 0.75rem;
  padding-inline: 1rem;

  .flatpickr-prev-month,
  .flatpickr-next-month {
    background: rgba(var(--v-theme-surface-variant), var(--v-selected-opacity));
    block-size: 1.75rem;
    border-radius: 5rem;
    inline-size: 1.75rem;
    inset-block-start: 0.75rem !important;
    padding-block: 0.25rem;
    padding-inline: 0.4375rem;
  }

  .flatpickr-next-month {
    inset-inline-end: 1.05rem !important;
  }

  .flatpickr-prev-month {
    /* stylelint-disable-next-line liberty/use-logical-spec */
    right: 3.5rem;
    left: unset !important;
  }

  .flatpickr-month {
    block-size: 1.75rem;

    .flatpickr-current-month {
      block-size: 1.75rem;
      inset-inline-start: 0;
      padding-block-start: 0.2rem;
      text-align: start;
    }
  }
}
</style>

<style scoped>

  .w-size {
    width: 200px;
  }

  .v-radio-group::v-deep(.v-input__details) { 
    min-height: 0px;
    height: 0px;
    padding: 0;
  }

  .v-text-field::v-deep(.v-field__append-inner) { 
    padding-top: 8px !important;
    align-items: start !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-radius: 24px;
    height: 35px;
    font-size: 14px;
  }

  .v-text-field::v-deep(.v-field-label) {
    top: 33% !important;
    font-size: 14px !important;
  }

  .v-text-field::v-deep(.v-field__outline__start) {
    flex: 0 0 17px !important;
  }

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    padding-left: 20px !important;
  }

  .v-text-field::v-deep(.v-input__details) {
    min-height: 15px !important;
  }

  .number-input-wrapper .v-text-field::v-deep(.v-field) { 
    border: 0 !important;
    height: 30px;
    box-shadow: none;
  } 

  .number-input-wrapper .v-text-field::v-deep(.v-field__input){
    min-height: 30px;
    padding: 0 !important;
    width: 20px;
    text-align: center;
  }
  
  .number-input-wrapper .v-text-field::v-deep(.v-field__field) { 
    height: 30px;
  }

  .number-input-wrapper .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .number-input-wrapper .v-text-field::v-deep(input) { 
    padding: 0 0 0 5px !important;
    color: #0A1B33 !important;
  }
  
  .number-input-wrapper .v-text-field::v-deep(.v-input__details){
    padding: 0;
    min-height: 0;
  }

  .v-autocomplete::v-deep(.v-field__overlay) {
    background: white !important;
  }

  .v-autocomplete::v-deep(.v-field__input) { 
    padding-top: 0 !important;
  }

  .v-autocomplete::v-deep(.v-input__prepend) {
    margin-inline-end: 0 !important;
  }

  .btn-date {
    padding: 0 27px;
    border-radius: 32px;
    height: 60px;
    border: 1px solid  #0A1B33;
    color: #0A1B33;
    font-weight: bold;
  }

  .btn-date:hover::v-deep(path) {
    fill: #0A1B33;
    stroke: white;
  }

  .btn-date:hover {
    background-color:  #0A1B33;
    border: 1px solid #0A1B33;
    color: white;
  }

  .flatpickr-input {
    width: 0px !important;
  }

  .carousel__item img {
    width: 60%;
  }

  .border-img {
    border-radius: 16px !important;
    border: 1px solid #D9EEF2;
    /* padding: 10px  10px 40px 10px !important; */
    background-color: white;
    text-align: center;
    align-items: center;
    display: flex;
  }
    
  .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet {
    display: none !important;
  }

  .swiper::v-deep(.swiper-wrapper)  {
    width: 60px !important;
  }

  .swiper {
    width: 100%;
    height: 350px;
    margin-left: auto;
    margin-right: auto;
  }
    
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
  }

  .swiper-slide img, .swiper-slide iframe {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .mySwiper, .mySwiperModal {
    box-sizing: border-box;
    padding: 10px 5px;
  }
      
  .mySwiper .swiper-slide {
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    width: 60px !important;
    height: 60px !important;
  }

  .mySwiperModal .swiper-slide {
    opacity: 1;
    border: 2px solid #D9D9D9;
    border-radius: 8px;
    width: 100px !important;
    height: 100px !important;
  }
    
  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
    border: 1px solid #D9EEF2;
  }

  .mySwiperModal .swiper-slide-thumb-active {
    opacity: 1;
    border: 2px solid #FF0090;
  }

  .mySwiper2 {
    position: relative;
    height: 400px;
    width: 400px;
  }

  .mySwiper2Modal {
    position: relative;
    height: 650px;
    width: 650px;
  }

  .swiper-recomendations .swiper::v-deep(.swiper-pagination-bullet-active) {
    background: #FF0090 !important;
  }

  /* .swiper-recomendations .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 95% !important;
  } */
    
  .col-item {
    padding: 16px 32px;
    border: 1px solid  #E1E1E1;
    background-color: #E2F8FC;
  }
    
  .col-value {
    padding: 16px 32px;
    border: 1px solid #E1E1E1;
    background-color: #FFF;
  }

  .col-item span {
    color: #999;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
  }
    
  .col-value span {
    color: #999;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */
  }

  .row-reviews {
    padding: 32px;
  }
    
  .row-reviews p {
    color: #999;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
  }
    
  .row-reviews span {
    color: #FF0090;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
  }

  .redes-title {
    display: flex;
  }

  .redes-title a {
    height: 41px;
  }

  .redes-mobile {
    display: none;
  }

  @media only screen and (max-width: 767px) {

    /* .border-img {
      padding: 10px !important;
    } */

    .w-size {
      width: 100%;
      margin-top: 30px;
    }

    .col-recomendaciones p {
      font-size: 16px;
    }

    .row-reviews .v-rating::v-deep(.v-icon--size-default) {
      font-size: 25px;
    }

    .row-reviews {
      padding: 0 !important;
    }

    .row-reviews div {
      font-size: 10px;
    }

    .v-tabs::v-deep(.v-btn--size-default) { 
      padding: 0 5px !important;
    }

    .v-text-field::v-deep(input) { 
      font-size: 11px;
    }

    /* .swiper {
      height: 200px;
    } */

    .swiper-recomendations .swiper {
      height: 300px !important;
    }

    .mySwiper, .mySwiperModal {
      padding: 0 5px 10px 5px;
    }

    .mySwiper .swiper-slide {
      width: 60px;
    }

    .mySwiperModal .swiper-slide {
      width: 100px;
    }

    .mySwiper2, .mySwiper2Modal {
      /* max-height: 200px;
      width: 200px; */
      width: 100%;
    }

    .mySwiper2 {
      max-height: 200px;
      width: 200px;
    }
    
    .btn-register {
      width: auto;
      height: 50px;
      font-size: 10px;
    }

    .btn-date {
      width: auto;
      height: 50px;
      font-size: 10px;
    }

    .text-tabs {
      font-size: 11px!important;
    }

    .redes-title {
      display: none;
    }

    .redes-mobile {
      display: flex!important;
    }

    .redes-mobile a {
      height: 32px;
    }

    .text-infoprod {
      font-size: 10px !important;
    }

    .breadcumb {
      height: 50px !important;
      margin-top: -5px !important;
    }
      
    .v-breadcrumbs {
      padding-top: 0 !important;
      margin-top: -5px !important;
    }

    .v-breadcrumbs::v-deep(.v-breadcrumbs-item) {
      font-size: 10px;
    }

    .v-breadcrumbs::v-deep(.v-breadcrumbs-divider){
      padding: 0 2px !important;
    }

    .v-card-title {
      white-space: pre-wrap;
      line-height: 24px;
      font-size: 24px;
    }

    .hr {
      margin: 3px;
    }

    .v-rating::v-deep(.v-icon--size-default) {
      font-size: 15px;
    }

    .col-item, .col-value  {
      padding: 8px 16px;
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