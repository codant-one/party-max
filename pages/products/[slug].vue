<script setup>

import { formatNumber } from '@formatters'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { avatarText} from '@formatters'
import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { useCartStores } from '@/stores/cart'
import { useFavoritesStores } from '@/stores/favorites'
import { useHomeStores } from "@/stores/home";
import { FreeMode, Navigation, Thumbs, Scrollbar, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#app'
import InnerImageZoom from "vue-inner-image-zoom";
import CustomRadiosWithIcon from '@/components/app/CustomRadiosWithIcon.vue'
import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import whatsapp from '@assets/icons/whatsapp.svg?inline';
import facebook from '@assets/icons/facebook2.svg?inline';
import twitter from '@assets/icons/twitter.svg?inline';
import linkendin from '@assets/icons/linkendin.svg?inline';
import whatsapp_mobile from '@assets/icons/whatsapp_mobile.svg?inline';
import facebook_mobile from '@assets/icons/facebook_mobile.svg?inline';
import twitter_mobile from '@assets/icons/twitter_mobile.svg?inline';
import linkendin_mobile from '@assets/icons/linkendin_mobile.svg?inline';
import heart from '@assets/icons/heart.svg?inline';
import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import festin_pending from '@assets/icons/festin_pending.svg';
import playImage from '@assets/images/play.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar'
import 'swiper/css/pagination';
import 'swiper/css/zoom';

const route = useRoute()

const miscellaneousStores = useMiscellaneousStores()
const cartStores = useCartStores()
const favoritesStores = useFavoritesStores()
const config = useRuntimeConfig()
const homeStores = useHomeStores();

const { $metapixel } = useNuxtApp()
const { isMobile, isDesktop } = useDevice();

const isLoading = ref(true)
const tab = ref('1')
const productUrl = ref(null)
const searchWhatsapp = ref(null)
const searchFacebook = ref(null)
const searchTwitter = ref(null)
const searchLinkendin = ref(null)

const category = ref(null);
const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/'
  }
])

const productImages = ref([])
const modules = ref([Pagination, FreeMode, Navigation, Thumbs, Scrollbar, Zoom])
const modules2 = ref([Pagination])
const thumbsSwiper = ref(null);

const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')
const twitterAccount = ref(config.public.TWITTER_ACCOUNT ?? '')
const data = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const reviews = ref(null)
const sku = ref(null)
const videos = ref('')
const wholesale = ref(false)
const wholesale_price = ref(null)
const wholesale_min = ref(null)
const price_for_sale = ref(null)
const store = ref(null)
const in_stock = ref(null)
const single_description = ref(null)
const description = ref(null)
const categories = ref([])
const tags = ref([])
const width = ref('')
const height = ref('')
const deep = ref('')
const weigth = ref('')
const material = ref('')
const cant_stock = ref(1)

const existence_whole = ref(false)

const radioContent = ref([])
const selectedColor = ref(null)
const selectedColorId = ref(null)
const load = ref(false)
const color = ref('')
const imageAux = ref('')
const imageMeta = ref('')

const cant_prod = ref(1)
const client_id = ref(null)
const product_id = ref(null)
const user_id = ref(null)

const isFavorite = ref(null)
const isFavoriteProduct = ref(null)
const message = ref('')
const onlyWholesale = ref(0)

const isDialogVisible = ref(false)
const isError = ref(false)
const isPending = ref(false)

watch(() => 
  route.path,(newPath, oldPath) => {
    thumbsSwiper.value.destroy(false, true)
  }
);

watch(() => 
  route.query,(newPath, oldPath) => {
    thumbsSwiper.value.destroy(false, true)
  }
);

watch(() => 
  cartStores.getWholesale, async (value) => {
    onlyWholesale.value = value
  }
);

const { data: productData } = await useAsyncData(
  `product-${route.params.slug}`,
  () => miscellaneousStores.getProductMeta(route.params.slug)
)

if (productData.value) {
  const productUrl = `https://${config.public.MY_DOMAIN}/products/${productData.value.product.slug}`
  const imageUrl = baseURL.value + productData.value.product.image
  const descriptionText = `Descubre nuestro '${productData.value.product.name}' en PARTYMAX. ¡El complemento perfecto para celebrar con estilo! Ideal para fiestas, noches especiales o cualquier ocasión que merezca brillar. ✨. ${productData.value.keywords.join(', ')}`;

  useSeoMeta({
    title: productData.value.product.name + ' | PARTYMAX',
    description: descriptionText,
    ogType: 'product',
    ogUrl: productUrl,
    ogTitle: productData.value.product.name,
    ogDescription: descriptionText,
    ogSiteName: 'PARTYMAX',
    ogImage: imageUrl,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: productData.value.product.name,
    twitterCard: 'summary_large_image',
    twitterTitle: productData.value.product.name,
    twitterDescription: descriptionText,
    twitterImage: imageUrl,
    twitterSite: twitterAccount.value
  })

  useHead({
    link: [ { rel: 'canonical', href: productUrl } ],
    meta: [
      { name: 'product:availability', content: 'in stock' },
      { name: 'product:condition', content: 'new' },
      { name: 'product:price:amount', content: productData.value.product.price_for_sale },
      { name: 'product:price:currency', content: 'COP' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: () => JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          'name':  productData.value.product.name,
          'image': imageUrl,
          'description': descriptionText,
          'offers': {
            '@type': 'Offer',
            'url': productUrl,
            'priceCurrency': 'COP',
            'price': productData.value.product.price_for_sale
          },
        }),
      },
    ],
  });

  if ($metapixel && $metapixel.trackEvent) {
    $metapixel.trackEvent('ViewContent', {
      content_ids: [productData.value.product.id],
      content_name: productData.value.product.name,
      content_type: 'product',
      availability: 'in stock',
      image_link: imageUrl,
      price: Number(productData.value.product.price_for_sale),
      currency: 'COP',
      description: descriptionText
    })
  }
}

watchEffect(fetchData)

async function fetchData() {

  bread.value = [
    {
      title: "Home",
      disabled: false,
      href: "/"
    }
  ]

  if(process.client && localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)
      
    client_id.value = userDataJ.client.id
    user_id.value = userDataJ.id
  }

  isLoading.value = true
  
  radioContent.value = []
  productImages.value = []
  data.value = null

  if(route.params.slug && route.path.startsWith('/products/')) {
    existence_whole.value = route.query.wholesalers === 'true' ? true : false

    await homeStores.fetchData();
    categories.value = homeStores.getData.parentCategories;

    await miscellaneousStores.getProduct(route.params.slug)
    data.value = miscellaneousStores.getData

    imageAux.value = [{ image : data.value.product.image }]
    imageMeta.value = baseURL.value + data.value.product.image

    productImages.value = data.value.product.colors[0]?.images
    color.value = data.value.product.colors[0]?.color.name
    selectedColor.value = data.value.product.colors[0]?.color.id.toString()
    selectedColorId.value = data.value.product.colors[0]?.id

    onlyWholesale.value = cartStores.getWholesale

    data.value.product.colors.forEach(element => { 
      var aux = {
        value: element.color.id.toString(),
        title: element.color.name,
        image:  (element.images.length === 0) ? data.value.product.image : element.images[0].image
      }

      radioContent.value.push(aux)
    });

    product_id.value = data.value.product.id

    productUrl.value = `https://${config.public.MY_DOMAIN}/products/${data.value.product.slug}`
    const descriptionText = 'Mira este increíble producto.'
    const twitterText = `${descriptionText}`;

    searchWhatsapp.value = `https://api.whatsapp.com/send?text=${descriptionText} ${encodeURIComponent(productUrl.value)}`
    searchFacebook.value = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl.value)}`
    searchTwitter.value = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl.value)}&text=${encodeURIComponent(twitterText)}`;
    searchLinkendin.value = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl.value)}`;
    
    title.value = data.value.product.name
    brand.value = data.value.product.brand.name
    rating.value = data.value.product.rating
    reviews.value = data.value.product.reviews
    sku.value = data.value.product.colors[0].sku
    wholesale.value = data.value.product.wholesale === 1 ? true : false
    wholesale_price.value = data.value.product.wholesale_price
    cant_prod.value = route.query.wholesalers === 'true' ? data.value.product.wholesale_min : 1
    wholesale_min.value = route.query.wholesalers === 'true' ? data.value.product.wholesale_min : 1
    price_for_sale.value = data.value.product.price_for_sale
    store.value = data.value.product.user.user_detail.store_name ?? (data.value.product.user.supplier?.company_name ?? (data.value.product.user.name + ' ' + (data.value.product.user.last_name ?? '')))
    in_stock.value = data.value.product.colors[0].in_stock
    color.value = data.value.product.colors[0].color.name
    cant_stock.value = parseInt(data.value.product.colors[0].stock)
    single_description.value = data.value.product.single_description
    description.value = data.value.product.description ?? ''

    width.value = data.value.product.detail.width
    weigth.value = data.value.product.detail.weigth
    height.value = data.value.product.detail.height
    deep.value = data.value.product.detail.deep
    material.value = data.value.product.detail.material

    tags.value = []
    data.value.product.tags.forEach(element => { 
      tags.value.push(element.tag.name)
    });

    if(client_id.value)
      isFavoriteProduct.value = await favoritesStores.show({user_id: user_id.value, product_id: product_id.value })

    videos.value = data.value.product.videos.map(u => ({
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

    if (route.query.category) {
      category.value = {
        title: categories.value.filter(item => item.slug === route.query.category)[0].name,
        disabled: false,
        href: `/products?category=${route.query.category}&wholesalers=${route.query.wholesalers ?? 'false'}`
      };

      bread.value.push(category.value);

      if (route.query.fathercategory) {
        const fathercategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name,
          disabled: false,
          href: `/products?category=${route.query.category}&subcategory=${route.query.fathercategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.fathercategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name
        bread.value.push(fathercategory);
      }

      if (typeof route.query.fathercategory === 'undefined' && route.query.subcategory) {
        const subcategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name,
          disabled: false,
          href: `/products?category=${route.query.category}&subcategory=${route.query.subcategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name
        bread.value.push(subcategory);
      }

      if (typeof route.query.fathercategory !== 'undefined' && route.query.subcategory) {
        const subcategory = {
          title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name,
          disabled: false,
          href: `/products?category=${route.query.category}&fathercategory=${route.query.fathercategory}&subcategory=${route.query.subcategory}&wholesalers=${route.query.wholesalers ?? 'false'}`
        };

        category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name
        bread.value.push(subcategory);
      }

      if(isDesktop) {
        const product_ = {
          title: "Producto",
          disabled: true,
          href: "",
        };

        bread.value.push(product_);
      }
    } else {
      bread.value.push({
        title: 'Producto',
        disabled: true,
        href: '',
      });
    }
  }

  isLoading.value = false
}

const chanceRadio = (value) => {

  if (Number.isInteger(Number(value.id))) {        
      var seleted =  data.value.product.colors.filter(item => item.color_id === Number(value.id))[0]
      
      productImages.value = (seleted?.images.length === 0) ? imageAux.value : seleted?.images
      color.value = seleted?.color.name
      selectedColor.value = seleted?.color.id.toString()
      selectedColorId.value = seleted.id
      sku.value = seleted?.sku ?? null

      cant_prod.value = 1
      cant_stock.value = parseInt(seleted?.stock)
      in_stock.value = seleted?.in_stock
  }
}

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const addCart = () => {
  let isWholesale = route.query.wholesalers === 'true' ? 1 : 0

  if(isWholesale === onlyWholesale.value || onlyWholesale.value === -1 ) {
    let data = {
      date: null,
      service_id: null,
      cake_size_id: null,
      flavor_id: null,
      filling_id: null,
      order_file_id: null,
      product_color_id: selectedColorId.value,
      quantity: cant_prod.value,
      wholesale: isWholesale,
      type: 0
    }

    load.value = true

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
  } else {
    isDialogVisible.value = true
    message.value = 'Debes agregar al carrito productos ' + (isWholesale ? 'al detal' : 'al mayor') + ' debido a tu selección anterior'
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

  favoritesStores.add({user_id: user_id.value, product_id: product_id.value })
    .then(response => {

      isFavorite.value = false
      isDialogVisible.value = true
      message.value = 'Agregado a la lista de favoritos'
      isFavoriteProduct.value = true
                    
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

const increment = () => {
  if (cant_prod.value < cant_stock.value)
    cant_prod.value++
}

const decrement = () => {
  if (cant_prod.value > wholesale_min.value)
    cant_prod.value--
}

const mediaSlides = computed(() => {
  const imgs = productImages.value.map(i => ({
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
          <h1>{{ title }}</h1>
          <VSpacer />
          <div class="align-end redes-title">
            <a :href="searchWhatsapp" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer" data-action="share/whatsapp/share">
              <whatsapp class="me-2" />
            </a>   
            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
              <facebook class="me-2"/>
            </a>
            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
              <twitter class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
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
                  class="mb-1"
                />

                <span class="ms-1">({{ reviews.length }} {{ reviews.length > 1 ? 'Reviews' : 'Review' }})</span>
              </div>
              <VDivider :thickness="2" color="#999" class="hr" vertical />
              <span class="d-block">SKU: {{ sku }}</span>
            </VCol>
            <VCol cols="12" md="6" class="align-right"></VCol>
          </VRow>
          <div class="my-1 align-end redes-mobile">
            <a :href="searchWhatsapp" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer" data-action="share/whatsapp/share">
              <whatsapp_mobile class="me-2" />
            </a>   
            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
              <facebook_mobile class="me-2"/>
            </a>
            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
              <twitter_mobile class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-no-underline hover:tw-text-secondary" rel="noopener noreferrer">
              <linkendin_mobile class="me-2"/>               
            </a>
          </div>
        </VCardSubtitle>
        <!-- BODY -->
        <VCardText class="px-0 pb-0 mt-0 mt-md-5 d-flex align-items-stretch justify-content-between">
          <VRow class="border-title pb-2 pb-md-5">
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
                        <img :src="playImage" />
                      </div> 
                    </template>
                </swiper-slide>
              </swiper>
            </VCol>
            <VCol cols="12" md="4" class="d-flex justify-content-center pb-0 pb-md-2">
              <swiper
                :pagination="{ type: 'fraction' }"
                :navigation="true"
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
                    <div v-if="isDesktop">
                      <inner-image-zoom
                        :src="slide.url"
                        :zoomSrc="slide.url"
                        :zoomPreload="true"
                        zoomScale="2"
                        zoomType="hover"
                      />
                    </div>
                    <div v-if="isMobile" class="swiper-zoom-container">
                      <img :src="slide.url" :alt="'slide-'+index" class="zoom-in"/>
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
              </swiper>
            </VCol>
            <VCol cols="12" md="7">
              <VCardText class="p-0">
                <div class="d-flex py-2">
                  <span class="text_1" v-if="existence_whole">$ {{ formatNumber(wholesale_price) }}</span>
                  <span class="text_1" v-else>$ {{ formatNumber(price_for_sale) }}</span>
                </div>
              </VCardText>
              <VCardText class="p-0 d-flex border-title">
                <span class="d-block tw-text-tertiary">Tienda: 
                  <strong class="tw-text-gray tw-text-base ms-1">{{ store }}</strong>
                </span>
                <span class="d-block tw-text-tertiary ms-1 ms-md-8 mb-2">Status: 
                  <strong class="tw-text-gray tw-text-base ms-1">
                    {{ (in_stock === 1) ? 'En Stock (' + cant_stock + ')'  : 'AGOTADO' }}
                  </strong>
                </span>
              </VCardText>
              <VCardText class="p-0 d-block border-title mt-2">
                <span class="d-block tw-text-tertiary mb-2">Color: 
                  <strong class="tw-text-tertiary tw-text-base ms-1">{{ color }}</strong>
                </span>
                <span class="d-block tw-text-tertiary w-100" v-if="selectedColor">
                  <CustomRadiosWithIcon
                    v-model:selected-radio="selectedColor"
                    :radio-content="radioContent"
                    :grid-column="{ sm: '2', cols: '4' }"
                    class="custom-input-setting"
                    @change="chanceRadio"
                  >
                    <template #default="{ item }">
                      <div class="text-center">
                        <span class="font-weight-semibold text-uppercase tw-text-xs">
                          {{ item.title }}
                        </span>
                        <div class="d-flex align-center justify-center">
                          <img 
                            width="75"
                            :src="baseURL + item.image" />
                        </div>
                      </div>
                    </template>
                  </CustomRadiosWithIcon>
                </span>
              </VCardText>
              <VCardText class="p-0 d-block border-title mt-2" v-if="single_description !== null && single_description.length > 10">
                <span class="d-block tw-text-tertiary ms-5 mb-2 tw-leading-5" v-html="single_description" />
              </VCardText>

              <VCardText class="p-0 d-flex mt-2 mt-md-4 mb-md-2">
                <div class="d-flex flex-column">
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
                    <VBtn icon size="x-small" @click="increment" variant="plain" color="#0A1B33">
                      <VIcon>mdi-plus</VIcon>
                    </VBtn>
                  </div>
                </div>
                <div class="my-auto ms-5">
                  <VBtn 
                    variant="flat"
                    @click="addCart"
                    class="btn-register tw-text-white tw-bg-primary button-hover" 
                    :disabled="(in_stock === 0 || cant_prod > cant_stock) ? true : false"
                    >
                      Agregar al carrito
                      <VProgressCircular
                        v-if="load"
                        indeterminate
                        color="#fff"
                      />
                  </VBtn>
                </div>
                <div class="my-auto ms-5">
                  <span 
                    v-if="!isFavorite" 
                    class="me-4 index heart p-0 d-flex justify-content-center align-center"
                    :class="(isFavoriteProduct) ? 'heart_fill' : ''" 
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
                <VTab value="1" class="text-tabs">Especificaciones</VTab>
                <VTab value="2" class="text-tabs">Reviews ({{reviews.length}})</VTab>
              </VTabs>
            </VCol>

            <VCol cols="12" class="d-block description">
              <v-window v-model="tab">
                <v-window-item value="0">
                  <span v-html="description" class="content"></span>
                </v-window-item>
                <v-window-item value="1">
                  <VCardText>
                    <VRow>
                      <VCol cols="6" md="2" class="col-item"><span>Alto</span></VCol>
                      <VCol cols="6" md="10" class="col-value"><span>{{ height }}cm</span></VCol>
                      <VCol cols="6" md="2" class="col-item"><span>Ancho</span></VCol>
                      <VCol cols="6" md="10" class="col-value"><span>{{ width }}cm</span></VCol>
                      <VCol cols="6" md="2" class="col-item"><span>Peso</span></VCol>
                      <VCol cols="6" md="10" class="col-value"><span>{{ weigth }}g</span></VCol>
                      <VCol cols="6" md="2" class="col-item"><span>Profundo</span></VCol>
                      <VCol cols="6" md="10" class="col-value"><span>{{ deep }}cm</span></VCol>
                      <VCol cols="6" md="2" class="col-item"><span>Material</span></VCol>
                      <VCol cols="6" md="10" class="col-value"><span>{{ material }}</span></VCol>
                    </VRow>
                  </VCardText>
                </v-window-item>
                <v-window-item value="2">
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
                          <span class="d-none d-md-block ms-1 me-1">|</span>
                          <span>{{ format(review.date, 'd').concat(' de ') }} {{ format(review.date, 'MMMM, y', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}</span>
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
              <NuxtLink :to="{ name: 'products' }" class="ms-md-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</NuxtLink>
            </VCol> 
          </VRow>
        </VCardTitle>
        <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && isDesktop">
          <Product1 
            v-for="(product, i) in data.recommendations"
            :key="i"
            :product="product"
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
            >
            <swiper-slide v-for="(product, i) in data.recommendations" :key="i">
              <Product1 
                :product="product"
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

  .swiper::v-deep(.vh--message-bottom) {
    bottom: 30px !important;
  } 

  .m-top {
    margin-top: -10px;
  }

  .mySwiper2 iframe {
    pointer-events: none !important;
  }

  .zoom-in:hover {
    cursor: zoom-in;
  }

  .mySwiper2:deep(.swiper-button-next),
  .mySwiper2:deep(.swiper-button-prev) {
    background-color: #FFC549 !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    border-radius: 11px !important;
    width: 40px !important;
    height: 40px !important;
  }

  .mySwiper2:deep(.swiper-button-next) {
    background-image: url('@/assets/icons/arrow-square-right.svg') !important;
    right: 2% !important;
  }

  .mySwiper2:deep(.swiper-button-prev) {
    background-image: url('@/assets/icons/arrow-square-left.svg') !important;
    left: 2% !important;
  }

  .mySwiper2:deep(.swiper-button-next::after),
  .mySwiper2:deep(.swiper-button-prev::after) {
      content: '' !important; /* Elimina flecha default */
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

  .image-container {
    position: relative;
    display: inline-block;
  }

  .out-of-stock-label {
    position: absolute;
    top: 30%;
    left: 47%;
    transform: translate(-50%, -50%) rotate(-30deg);
    background-color: rgba(255, 0, 144, 0.7);
    color: white;
    padding: 10px 20px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 5px;
    z-index: 10;
    pointer-events: none; /* Para que no interfiera con el zoomer */
    width: 85%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

  .v-text-field::v-deep(.v-field) { 
    border: 0 !important;
    height: 30px;
    box-shadow: none;
  } 

  .v-text-field::v-deep(.v-field__input){
    min-height: 30px;
    padding: 0 !important;
    width: 20px;
    text-align: center;
  }
  
  .v-text-field::v-deep(.v-field__field) { 
    height: 30px;
  }

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding: 0 0 0 5px !important;
    color: #0A1B33 !important;
  }
  
  .v-text-field::v-deep(.v-input__details){
    padding: 0;
    min-height: 0;
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
  
</style>

<style scoped>

  .v-card-title h1 {
    white-space: pre-wrap;
    line-height: 24px;
    font-weight: 400 !important;
    font-size: 24px !important;
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

  .mySwiper {
    box-sizing: border-box;
    padding: 10px 5px;
  }
      
  .mySwiper .swiper-slide {
    border: 1px solid #D9D9D9;
    border-radius: 8px;
    width: 60px !important;
    height: 60px !important;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
    border: 1px solid #D9EEF2;
  }

  .mySwiper2 {
    position: relative;
    height: 400px;
    width: 400px;
  }

  .swiper-recomendations .swiper::v-deep(.swiper-pagination-bullet-active) {
    background: #FF0090 !important;
  }

  /* .swiper-recomendations .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 94% !important;
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

    .MySwiper2:deep(.swiper-button-next),
    .MySwiper2:deep(.swiper-button-prev) {
        display: none;
    }

    .out-of-stock-label {
      font-size: 16px;
      top: 25%;
      left: 50%;
    }

    /* .border-img {
      padding: 10px !important;
    } */

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
      height: 320px !important;
    }

    .mySwiper .swiper-slide {
      width: 60px;
    }

    .mySwiper2 {
      /* max-height: 200px;
      width: 200px; */
      width: 100%;
    }
    
    .btn-register {
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