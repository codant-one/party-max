<script setup>

import { formatNumber } from '@formatters'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { avatarText} from '@formatters'
import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { useCartStores } from '@/stores/cart'
import { useFavoritesStores } from '@/stores/favorites'
import { FreeMode, Navigation, Thumbs, Scrollbar, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Head } from '@vueuse/head';
import router from '@/router'
import CustomRadiosWithIcon from '@/components/app/CustomRadiosWithIcon.vue'
import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import whatsapp from '@assets/icons/whatsapp.svg?inline';
import facebook from '@assets/icons/facebook2.svg?inline';
import instagram from '@assets/icons/instagram2.svg?inline';
import threads from '@assets/icons/threads2.svg?inline';
import whatsapp_mobile from '@assets/icons/whatsapp_mobile.svg?inline';
import facebook_mobile from '@assets/icons/facebook_mobile.svg?inline';
import instagram_mobile from '@assets/icons/instagram_mobile.svg?inline';
import threads_mobile from '@assets/icons/threads_mobile.svg?inline';
import iconmayorista from '@assets/icons/Union.svg?inline';
import heart from '@assets/icons/heart.svg?inline';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar'
import 'swiper/css/pagination';

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()
const cartStores = useCartStores()
const favoritesStores = useFavoritesStores()

const isMobile = /Mobi/i.test(navigator.userAgent);

const isLoading = ref(true)
const tab = ref('1')
const searchWhatsapp = ref(null)
const searchFacebook = ref(null)
const searchTwitter = ref(null)
const searchLinkendin = ref(null)

const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'Producto',
    disabled: true,
    href: '',
  }
])

const productImages = ref([])
const modules = ref([FreeMode, Navigation, Thumbs, Scrollbar])
const modules2 = ref([Pagination])
const thumbsSwiper = ref(null);

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const reviews = ref(null)
const sku = ref(null)
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
const isSnackbarBottomStartVisible = ref(false)
const variant = ref('tonal')
const colorMessage = ref('')
const message = ref('')
const onlyWholesale = ref(false)

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

watchEffect(fetchData)

async function fetchData() {

  if(localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)
      
    client_id.value = userDataJ.client.id
    user_id.value = userDataJ.id
  }

  isLoading.value = true
  
  radioContent.value = []
  productImages.value = []
  data.value = null

  if(route.params.slug) {
    existence_whole.value = route.query.wholesale === 'true' ? true : false

    await miscellaneousStores.getProduct(route.params.slug)
    data.value = miscellaneousStores.getData

    imageAux.value = [{ image : data.value.product.image }]
    imageMeta.value = baseURL.value + data.value.product.image

    categories.value = data.value.product.colors[0]?.categories.map(item => item.category.name)
    productImages.value = (data.value.product.colors[0]?.images.length === 0) ? imageAux.value : data.value.product.colors[0]?.images
    color.value = data.value.product.colors[0]?.color.name
    selectedColor.value = data.value.product.colors[0]?.color.id.toString()
    selectedColorId.value = data.value.product.colors[0]?.id

    onlyWholesale.value = data.value.wholesale

    data.value.product.colors.forEach(element => { 
      var aux = {
        value: element.color.id.toString(),
        title: element.color.name,
        image:  (element.images.length === 0) ? data.value.product.image : element.images[0].image
      }

      radioContent.value.push(aux)
    });

    product_id.value = data.value.product.id

    const productUrl = `https://${import.meta.env.VITE_MY_DOMAIN}/products/${data.value.product.slug}`
    const imageUrl = `${import.meta.env.VITE_APP_DOMAIN_API_URL}/storage/${data.value.product.image}`
    const descriptionText = 'Mira este increíble producto.'
    const twitterText = `${descriptionText} ${productUrl} ${imageUrl}`;

    searchWhatsapp.value = `https://wa.me/?text=${productUrl}`
    searchFacebook.value = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    searchTwitter.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    searchLinkendin.value = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`;
     
    title.value = data.value.product.name
    brand.value = data.value.product.brand.name
    rating.value = data.value.product.rating
    reviews.value = data.value.product.reviews
    sku.value = data.value.product.colors[0].sku
    wholesale.value = data.value.product.wholesale === 1 ? true : false
    wholesale_price.value = data.value.product.wholesale_price
    cant_prod.value = route.query.wholesale === 'true' ? data.value.product.wholesale_min : 1
    wholesale_min.value = route.query.wholesale === 'true' ? data.value.product.wholesale_min : 1
    price_for_sale.value = data.value.product.price_for_sale
    store.value = data.value.product.user.user_detail.store_name ?? (data.value.product.user.supplier?.company_name ?? (data.value.product.user.name + ' ' + (data.value.product.user.last_name ?? '')))
    in_stock.value = data.value.product.in_stock
    color.value = data.value.product.colors[0].color.name
    single_description.value = data.value.product.single_description
    description.value = data.value.product.description ?? ''
    cant_stock.value = parseInt(data.value.product.stock)

    width.value = data.value.product.detail.width
    weigth.value = data.value.product.detail.weigth
    height.value = data.value.product.detail.height
    deep.value = data.value.product.detail.deep
    material.value = data.value.product.detail.material

    data.value.product.colors[0].categories.forEach(element => { 
      categories.value.push(element.category.name)
    });

    tags.value = []
    data.value.product.tags.forEach(element => { 
      tags.value.push(element.tag.name)
    });

    if(client_id.value)
      isFavoriteProduct.value = await favoritesStores.show({user_id: user_id.value, product_id: product_id.value })
  }
  
  isLoading.value = false
}

const chanceRadio = (value) => {

  if (Number.isInteger(Number(value.id))) {        
      var seleted =  data.value.product.colors.filter(item => item.color_id === Number(value.id))[0]
      
      categories.value = seleted.categories.map(item => item.category.name)
      productImages.value = (seleted?.images.length === 0) ? imageAux.value : seleted?.images
      color.value = seleted?.color.name
      selectedColor.value = seleted?.color.id.toString()
      selectedColorId.value = seleted.id
      sku.value = seleted?.sku ?? null
  }
}

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

const addCart = () => {

  if(client_id.value) {

    let isWholesale = route.query.wholesale === 'true' ? 1 : 0

    if(isWholesale === onlyWholesale.value || onlyWholesale.value === -1 ) {
      let data = {
        client_id: client_id.value,
        product_color_id: selectedColorId.value,
        quantity: cant_prod.value,
        wholesale: isWholesale
      }

      load.value = true

      cartStores.add(data)
        .then(response => {

          isSnackbarBottomStartVisible.value = true
          message.value = 'Agregado al carrito'
          colorMessage.value = 'primary'
          variant.value = 'tonal'
          load.value = false

          setTimeout(() => {
            isSnackbarBottomStartVisible.value = false
            message.value = ''
            colorMessage.value = ''
          }, 3000)

        }).catch(err => {
          load.value = false
          //console.error(err.message)
        })
    } else {
      isSnackbarBottomStartVisible.value = true
      message.value = 'Debes agregar al carrito productos ' + (isWholesale ? 'al detal' : 'al mayor') + ' debido a tu selección anterior'
      colorMessage.value = 'error'
      variant.value = 'flat'
                      
      setTimeout(() => {
        isSnackbarBottomStartVisible.value = false
        message.value = ''
        colorMessage.value = ''
      }, 3000)
    }

  } else {
    isSnackbarBottomStartVisible.value = true
    message.value = 'Necesitas iniciar sesión antes de agregar un producto al carrito'
    colorMessage.value = 'error'
    variant.value = 'flat'
                    
    setTimeout(() => {
      isSnackbarBottomStartVisible.value = false
      message.value = ''
      colorMessage.value = ''
    }, 3000)
  }

}

const addfavorite = () => {

  if(client_id.value) {
    isFavorite.value = true

    favoritesStores.add({user_id: user_id.value, product_id: product_id.value })
      .then(response => {

        isFavorite.value = false
        isSnackbarBottomStartVisible.value = true
        message.value = 'Agregado a la lista de favoritos'
        isFavoriteProduct.value = true
        colorMessage.value = 'primary'
        variant.value = 'tonal'
                    
        setTimeout(() => {
          isSnackbarBottomStartVisible.value = false
          message.value = ''
          colorMessage.value = ''
        }, 3000)
    
      }).catch(err => {
        isFavorite.value = false

        //console.error(err.message)
      })

    } else {
      isSnackbarBottomStartVisible.value = true
      message.value = 'Necesitas iniciar sesión antes de agregar un producto a la lista'
      colorMessage.value = 'error'
      variant.value = 'flat'

      setTimeout(() => {
        isSnackbarBottomStartVisible.value = false
        message.value = ''
        colorMessage.value = ''
      }, 3000)
  }

}

const controlCant = () => {
  if (parseInt(cant_prod.value) > parseInt(cant_stock.value)) { 
    cant_prod.value = cant_stock.value; 
  } else if (parseInt(cant_prod.value) < 1) {
    cant_prod.value = 1;
  }
}

const wholesaleAction = () => {
  if (route.query.wholesale === 'true') {
    router.push({ 
      name: 'productDetail',
      params: { slug: route.params.slug }
    })
  } else { 
    router.push({ 
      name: 'productDetail',
      params: { slug: route.params.slug },
      query: {  wholesale: 'true' }
    })
  }
}

const increment = () => {
  if (cant_prod.value < cant_stock.value)
    cant_prod.value++
}
    
const decrement = () => {
  if (cant_prod.value > wholesale_min.value)
    cant_prod.value--
}

</script>

<template>
  <section>
    <Head>
      <title>{{ title }}</title>
      <meta name="description" :content="description" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SteffaniiPaola" />
      <meta name="twitter:title" :content="title" />
      <meta name="twitter:description" :content="description" />
      <meta name="twitter:image" :content="imageMeta" />
    </Head>
   <VAppBar flat class="breadcumb tw-bg-cyan pt-1">
      <VContainer class="tw-text-tertiary d-flex align-center px-0">
        <v-breadcrumbs :items="bread" class="px-2" />
      </VContainer>
    </VAppBar>
    <VContainer class="pt-0">
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
            <a :href="searchTwitter" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <instagram class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <threads class="me-2"/>               
            </a>
            <a :href="searchFacebook" target="_blank" class="tw-no-underline hover:tw-text-secondary">
              <facebook class="me-2"/>
            </a>
          </div>
        </VCardTitle>
        <VCardSubtitle class="px-0 d-flex flex-column align-start border-title">
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
            <a :href="searchWhatsapp" target="_blank" class="tw-cursor-pointer tw-no-underline hover:tw-text-secondary">
              <whatsapp_mobile class="me-2" />
            </a>   
            <a :href="searchTwitter" target="_blank" class="tw-cursor-pointer tw-no-underline hover:tw-text-secondary">
              <instagram_mobile class="me-2"/>
            </a>
            <a :href="searchLinkendin" target="_blank" class="tw-cursor-pointer tw-no-underline hover:tw-text-secondary">
              <threads_mobile class="me-2"/>               
            </a>
            <a :href="searchFacebook" target="_blank" class="tw-cursor-pointer tw-no-underline hover:tw-text-secondary">
              <facebook_mobile class="me-2"/>
            </a>
          </div>
        </VCardSubtitle>
        <!-- BODY -->
        <VCardText class="px-0 pb-0 mt-5 d-flex align-items-stretch justify-content-between">
          <VRow class="border-title pb-2 pb-md-5">
            <VCol cols="3" md="1" class="px-1 p-md-2">
              <swiper
                :direction="'vertical'"
                :pagination="{ clickable: true}"
                :spaceBetween="isMobile ? 3 : 5"
                :slidesPerView="isMobile ? 3 : 6"
                :freeMode="true"
                :watchSlidesProgress="true"
                @swiper="setThumbsSwiper"
                class="mySwiper pt-0 d-flex align-center justify-content-center"
              >
                <swiper-slide v-for="(picture, index) in productImages" :key="index">
                  <img width="60" :src="baseURL + picture.image" />
                </swiper-slide>
              </swiper>
            </VCol>
            <VCol cols="9" md="4" class="d-flex justify-content-center">
              <swiper
                :scrollbar="{
                  hide: true,
                }"
                :spaceBetween="isMobile ? 5 : 10"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="modules"
                class="mySwiper2 border-img mx-0 mx-md-auto"
                >
                <swiper-slide v-for="(picture, index) in productImages" :key="index">
                  <img :src="baseURL + picture.image" />
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
                    class="me-4 index heart p-0 tw-cursor-pointer d-flex justify-content-center align-center"
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

              <VCardText class="p-0 d-flex border-title pb-2 mt-2 mt-md-0">
                <VBtn 
                  v-if="wholesale"
                  :class="route.query.wholesale === 'true' ? 'b-mayorista-active': 'b-mayorista'"
                  @click="wholesaleAction">
                  <iconmayorista />
                  <span class="ms-1">
                    {{ route.query.wholesale === 'true' ? 'Precio al detal' : 'Precio al mayor' }}
                  </span>
                </VBtn>
              </VCardText>
              <VCardText class="p-0 d-block mt-2">
                <span class="tw-text-tertiary" style="display: none;">Categorías: 
                  <span class="ms-1">{{ categories.join(", ") }}</span>
                </span>
                <span class="d-block tw-text-tertiary">Tags: 
                  <span class="ms-1">{{ tags.join(", ") }}</span>
                </span>
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
              <router-link to="/products" class="ms-md-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
            </VCol> 
          </VRow>
        </VCardTitle>
        <VCardText class="px-4 px-md-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data && !isMobile">
          <Product1 
            v-for="(product, i) in data.recommendations"
            :key="i"
            :product="product"
            :readonly="true"/>
        </VCardText>  
        <VCardText class="pb-0 px-4 px-md-7 mt-0 mt-md-5 mb-2 swiper-recomendations" v-if="data && isMobile">  
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
            <swiper-slide v-for="(product, i) in data.recommendations" :key="i">
              <Product1 
                :product="product"
                :readonly="true"/>
            </swiper-slide>
          </swiper>
        </VCardText> 
      </VCard>
    </VContainer>
    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
      :variant="variant"
      :color="colorMessage"
    >
      {{ message }}
    </VSnackbar>
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
    cursor: pointer;
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

  .carousel__item img {
    width: 60%;
  }

  .border-img {
    border-radius: 16px !important;
    border: 1px solid #D9EEF2;
    padding: 10px !important;
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

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  .mySwiper {
    box-sizing: border-box;
    padding: 10px 5px;
  }
      
  .mySwiper .swiper-slide {
    opacity: 0.4;
    border-style: solid;
    border-width: 1px;
    border-radius: 8px;
    width: 60px;
    height: 60px !important;
  }
    
  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .mySwiper2 {
    height: 350px;
    width: 100%;
  }

  .swiper-recomendations .swiper::v-deep(.swiper-pagination-bullet-active) {
    background: #FF0090 !important;
  }

  .swiper-recomendations .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 95% !important;
  }
    
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

    .swiper {
      height: 200px;
    }

    .swiper-recomendations .swiper {
      height: 360px !important;
    }

    .mySwiper {
      padding: 0 5px 10px 5px;
    }

    .mySwiper .swiper-slide {
      width: 57px;
    }

    .mySwiper2 {
      max-height: 200px;
      width: 87%;
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
  }
</style>