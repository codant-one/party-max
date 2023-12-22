<script setup>

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { useHomeStores } from '@/stores/home'
import { FreeMode, Navigation, Thumbs, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CustomRadiosWithIcon from '@/components/app/CustomRadiosWithIcon.vue'
import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import whatsapp from '@assets/icons/whatsapp.svg?inline';
import facebook from '@assets/icons/facebook2.svg?inline';
import instagram from '@assets/icons/instagram2.svg?inline';
import threads from '@assets/icons/threads2.svg?inline';
import iconmayorista from '@assets/icons/Union.svg';
import default_image from '@assets/images/default-description.png';
import default_review from '@assets/images/image-review.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar'

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()
const homeStores = useHomeStores()

const isLoading = ref(true)
const tab = ref('0')

const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  }
])

const productImages = ref([])
const currentSlide = ref(0)
const modules = ref([FreeMode, Navigation, Thumbs, Scrollbar])
const thumbsSwiper = ref(null);

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)
const data_ = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const sku = ref(null)
const price = ref(null)
const price_for_sale = ref(null)
const store = ref(null)
const in_stock = ref(null)
const single_description = ref(null)
const description = ref(null)
const categories = ref([])
const tags = ref([])

const radioContent = ref([])
const selectedColor = ref(null)
const color = ref('')
const imageAux = ref('')

watchEffect(fetchData)

async function fetchData() {

  if(route.query.category) {
    const category = {
      title: formatTitle(route.query.category),
      disabled: false,
      href: 'categories/' + route.query.category,
    }

    bread.value.push(category)
  }

  const product_ = {
    title: 'Producto',
    disabled: true,
    href: '',
  }

  bread.value.push(product_)

  isLoading.value = true

  await homeStores.fetchData()
  data_.value = homeStores.getData

  await miscellaneousStores.getProduct(route.params.slug)
  data.value = miscellaneousStores.getData

  console.log('product', data.value.product)

  imageAux.value = [{ image : data.value.product.image }]

  categories.value = data.value.product.colors[0]?.categories.map(item => item.category.name)
  productImages.value = (data.value.product.colors[0]?.images.length === 0) ? imageAux.value : data.value.product.colors[0]?.images
  color.value = data.value.product.colors[0]?.color.name
  selectedColor.value = data.value.product.colors[0]?.color.id.toString()

  data.value.product.colors.forEach(element => { 
    var aux = {
      value: element.color.id.toString(),
      title: element.color.name,
      image:  (element.images.length === 0) ? data.value.product.image : element.images[0].image
    }

    radioContent.value.push(aux)
  });

  title.value = data.value.product.name
  brand.value = data.value.product.brand.name
  rating.value = data.value.product.rating
  sku.value = data.value.product.colors[0].sku
  price.value = data.value.product.price
  price_for_sale.value = data.value.product.price_for_sale
  store.value = data.value.product.user.name + ' ' + (data.value.product.user.last_name ?? '')
  in_stock.value = data.value.product.in_stock
  color.value = data.value.product.colors[0].color.name
  single_description.value = data.value.product.single_description
  description.value = data.value.product.description

  data.value.product.colors[0].categories.forEach(element => { 
    categories.value.push(element.category.name)
  });

  data.value.product.tags.forEach(element => { 
    tags.value.push(element.tag.name)
  });
 
  isLoading.value = false
}

const chanceRadio = (value) => {

  if (Number.isInteger(Number(value.id))) {        
      var seleted =  data.value.product.colors.filter(item => item.color_id === Number(value.id))[0]
      
      categories.value = seleted.categories.map(item => item.category.name)
      productImages.value = (seleted?.images.length === 0) ? imageAux.value : seleted?.images
      color.value = seleted?.color.name
      selectedColor.value = seleted?.color.id.toString()
      sku.value = seleted?.sku ?? null
  }
}

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
}

</script>

<template>
  <section>
    <VAppBar flat class="breadcumb tw-bg-cyan pt-1">
      <VContainer class="tw-text-tertiary d-flex align-center">
        <v-breadcrumbs :items="bread" />
      </VContainer>
    </VAppBar>
    <VContainer class="pt-0">
      <Loader :isLoading="isLoading"/>
      <!-- HEADER -->
      <VCard class="mt-7 no-shadown card-information p-0">
        <VCardTitle class="p-0 d-flex align-end">
          {{ title }}
          <VSpacer />
          <div class="d-flex align-end">
            <whatsapp class="me-2" />
            <instagram class="me-2"/>
            <threads class="me-2"/>               
            <facebook class="me-2"/>
          </div>
        </VCardTitle>
        <VCardSubtitle class="px-0 d-flex align-center border-title">
          <VRow no-gutters>
            <VCol cols="12" md="6">
              Marca: {{ brand }}
              <VDivider :thickness="2" color="#999" class="hr" vertical />
              <VRating
                half-increments
                readonly
                :length="5"
                :size="15"
                :model-value="rating"
                color="yellow-darken-2"
                active-color="yellow-darken-2"
              />

              (1 Review)

              <VDivider :thickness="2" color="#999" class="hr" vertical />
              SKU: {{ sku }}
            </VCol>
            <VCol cols="12" md="6" class="align-right">
            </VCol>
          </VRow>
        </VCardSubtitle>

        <!-- BODY -->
        <VCardText class="px-0 pb-0 mt-5 d-flex align-items-stretch justify-content-between">
          <VRow class="border-title pb-5">
            <VCol cols="12" md="1">
              <swiper
                :direction="'vertical'"
                :pagination="{ clickable: true}"
                :spaceBetween="5"
                :slidesPerView="6"
                :freeMode="true"
                :watchSlidesProgress="true"
                @swiper="setThumbsSwiper"
                class="mySwiper"
              >
                <swiper-slide v-for="(picture, index) in productImages" :key="index">
                  <img :src="baseURL + picture.image" />
                </swiper-slide>
              </swiper>
            </VCol>
            <VCol cols="12" md="4">
              <swiper
                :scrollbar="{
                  hide: true,
                }"
                :spaceBetween="10"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="modules"
                class="mySwiper2"
                >
                <swiper-slide v-for="(picture, index) in productImages" :key="index">
                  <img :src="baseURL + picture.image" />
                </swiper-slide>
              </swiper>
            </VCol>
            <VCol cols="12" md="7">
              <VCardText class="p-0">
                <div class="d-flex py-2">
                <span class="text_1">$ {{ price }}</span>
                <span class="text_2 ms-2 d-flex align-end">$ {{ price_for_sale }}</span>
                </div>
              </VCardText>
              <VCardText class="p-0 d-flex border-title">
                  <span class="d-block tw-text-tertiary">Tienda: 
                    <strong class="tw-text-gray tw-text-base ms-1">{{ store }}</strong>
                  </span>
                  <span class="d-block tw-text-tertiary ms-8 mb-2">Status: 
                    <strong class="tw-text-gray tw-text-base ms-1">
                      {{ (in_stock === 1) ? 'En Stock' : 'Agotado' }}
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
                      :grid-column="{ sm: '2', cols: '12' }"
                      class="custom-input-setting"
                      @change="chanceRadio"
                    >
                      <template #default="{ item }">
                        <div class="text-center">
                          <span class="font-weight-semibold text-uppercase tw-text-sm">
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
              <VCardText class="p-0 d-block border-title mt-2" v-if="single_description !== null">
                  <span class="d-block tw-text-tertiary ms-5 mb-2 tw-leading-5" v-html="single_description" />
              </VCardText>

              <VCardText class="p-0 d-flex my-2">
                <VRow no-gutters class="row-add d-flex align-center">
                  <VCol cols="12" md="2" class="d-flex flex-column">
                    <span>Cantidad:</span>
                    <VTextField
                      placeholder="0"
                      variant="solo"
                      type="number"
                    />
                  </VCol>
                  <VCol cols="12" md="6">
                    <router-link
                      :to="{
                        name:'shopping_cart'
                      }"
                      class="link-button px-10">
                      <VBtn 
                        variant="flat"
                        :width="288"
                        :height="48"
                        class="btn-register tw-text-white tw-bg-primary button-hover" 
                        >
                        Agregar al carrito
                      </VBtn>
                    </router-link>
                  </VCol>
                  <VCol cols="12" md="4">
                    <svg class="hearth-icon" xmlns="http://www.w3.org/2000/svg" width="29" height="26" viewBox="0 0 29 26" fill="none">
                      <path d="M14.2529 25.8008C14.1846 25.8008 14.1211 25.7935 14.0625 25.7788C14.0039 25.7642 13.9453 25.7422 13.8867 25.7129C13.8477 25.6934 13.6279 25.564 13.2275 25.3247C12.8271 25.0854 12.3071 24.751 11.6675 24.3213C11.0278 23.8916 10.3027 23.3691 9.49219 22.7539C8.68164 22.1387 7.85156 21.4502 7.00195 20.6885C6.49414 20.2295 6.01562 19.7705 5.56641 19.3115C5.11719 18.8525 4.69238 18.3936 4.29199 17.9346C3.8916 17.4756 3.51807 17.0142 3.17139 16.5503C2.82471 16.0864 2.50977 15.625 2.22656 15.166C1.85547 14.5801 1.53076 13.9917 1.25244 13.4009C0.974121 12.8101 0.742188 12.2241 0.556641 11.6431C0.371094 11.062 0.231934 10.481 0.13916 9.8999C0.0463867 9.31885 0 8.74512 0 8.17871C0 7.09473 0.20752 6.07422 0.622559 5.11719C1.0376 4.16016 1.60156 3.3252 2.31445 2.6123C3.02734 1.89941 3.85986 1.33545 4.81201 0.92041C5.76416 0.505371 6.78711 0.297852 7.88086 0.297852C8.24219 0.297852 8.61084 0.332031 8.98682 0.400391C9.36279 0.46875 9.73633 0.568848 10.1074 0.700684C10.4785 0.83252 10.8472 0.993652 11.2134 1.18408C11.5796 1.37451 11.9336 1.59668 12.2754 1.85059C12.6758 2.14355 13.042 2.46338 13.374 2.81006C13.7061 3.15674 13.999 3.51562 14.2529 3.88672C14.4971 3.51562 14.7876 3.15674 15.1245 2.81006C15.4614 2.46338 15.8301 2.14355 16.2305 1.85059C16.5723 1.59668 16.9238 1.37451 17.2852 1.18408C17.6465 0.993652 18.0127 0.83252 18.3838 0.700684C18.7549 0.568848 19.1284 0.46875 19.5044 0.400391C19.8804 0.332031 20.2539 0.297852 20.625 0.297852C21.709 0.297852 22.7295 0.505371 23.6865 0.92041C24.6436 1.33545 25.4785 1.89941 26.1914 2.6123C26.9043 3.3252 27.4683 4.16016 27.8833 5.11719C28.2983 6.07422 28.5059 7.09473 28.5059 8.17871C28.5059 8.74512 28.457 9.31885 28.3594 9.8999C28.2617 10.481 28.1201 11.062 27.9346 11.6431C27.749 12.2241 27.5195 12.8101 27.2461 13.4009C26.9727 13.9917 26.6504 14.5801 26.2793 15.166C25.9863 15.625 25.6689 16.0864 25.3271 16.5503C24.9854 17.0142 24.6143 17.4756 24.2139 17.9346C23.8135 18.3936 23.3862 18.8525 22.9321 19.3115C22.478 19.7705 22.002 20.2295 21.5039 20.6885C20.6543 21.4502 19.8242 22.1387 19.0137 22.7539C18.2031 23.3691 17.478 23.8916 16.8384 24.3213C16.1987 24.751 15.6763 25.0854 15.271 25.3247C14.8657 25.564 14.6484 25.6934 14.6191 25.7129C14.5605 25.7422 14.4995 25.7642 14.436 25.7788C14.3726 25.7935 14.3115 25.8008 14.2529 25.8008ZM7.88086 1.80664C7.00195 1.80664 6.17432 1.97266 5.39795 2.30469C4.62158 2.63672 3.94531 3.09082 3.36914 3.66699C2.79297 4.24316 2.33643 4.91943 1.99951 5.6958C1.6626 6.47217 1.49414 7.2998 1.49414 8.17871C1.49414 9.32129 1.69434 10.4297 2.09473 11.5039C2.49512 12.5781 3.00781 13.6011 3.63281 14.5728C4.25781 15.5444 4.95361 16.4502 5.72021 17.29C6.48682 18.1299 7.24121 18.8818 7.9834 19.5459C8.6377 20.1514 9.28955 20.7056 9.93896 21.2085C10.5884 21.7114 11.1914 22.1582 11.748 22.5488C12.3047 22.9395 12.8003 23.2739 13.2349 23.5522C13.6694 23.8306 14.0088 24.043 14.2529 24.1895C14.4873 24.043 14.8218 23.8306 15.2563 23.5522C15.6909 23.2739 16.189 22.9395 16.7505 22.5488C17.312 22.1582 17.915 21.7114 18.5596 21.2085C19.2041 20.7056 19.8584 20.1514 20.5225 19.5459C21.2549 18.8818 22.0068 18.1299 22.7783 17.29C23.5498 16.4502 24.248 15.5444 24.873 14.5728C25.498 13.6011 26.0083 12.5781 26.4038 11.5039C26.7993 10.4297 26.9971 9.32129 26.9971 8.17871C26.9971 7.2998 26.8311 6.47217 26.499 5.6958C26.167 4.91943 25.7104 4.24316 25.1294 3.66699C24.5483 3.09082 23.8721 2.63672 23.1006 2.30469C22.3291 1.97266 21.5039 1.80664 20.625 1.80664C19.9902 1.80664 19.3677 1.92383 18.7573 2.1582C18.147 2.39258 17.5854 2.7002 17.0728 3.08105C16.5601 3.46191 16.1182 3.8916 15.7471 4.37012C15.376 4.84863 15.1123 5.32227 14.9561 5.79102C14.9072 5.9375 14.8169 6.05957 14.6851 6.15723C14.5532 6.25488 14.4092 6.30371 14.2529 6.30371C14.0869 6.30371 13.938 6.25488 13.8062 6.15723C13.6743 6.05957 13.584 5.9375 13.5352 5.79102C13.3789 5.32227 13.1152 4.84863 12.7441 4.37012C12.373 3.8916 11.9336 3.46191 11.4258 3.08105C10.918 2.7002 10.3589 2.39258 9.74854 2.1582C9.13818 1.92383 8.51562 1.80664 7.88086 1.80664Z"/>
                    </svg>
                  </VCol>
                </VRow>  
              </VCardText>

              <VCardText class="p-0 d-flex border-title pb-2">
                <VBtn class="b-mayorista">
                  <img :src="iconmayorista" alt="Icono Mayorista" style="width: 24px; height: 24px; margin-right: 8px;">
                    Precio al mayor
                </VBtn>
              </VCardText>
              <VCardText class="p-0 d-block mt-2">
                <span class="d-block tw-text-tertiary">Categorías: 
                  <span class="ms-1">{{ categories.join(", ") }}</span>
                </span>
                <span class="d-block tw-text-tertiary">Tags: 
                  <span class="ms-1">{{ tags.join(", ") }}</span>
                </span>
              </VCardText>
            </VCol>
          </VRow>
          </VCardText>
          <VCardText class="px-0 mb-5 d-flex align-items-stretch justify-content-between">
          <VRow no-gutters>
            <VCol cols="12" class="text-center">
              <VTabs v-model="tab" color="pink-accent-3" align-tabs="center">
                <VTab value="0">Descripción</VTab>
                <VTab value="1">Especificaciones</VTab>
                <VTab value="2">Reviews (3)</VTab>
              </VTabs>
            </VCol>

            <VCol cols="12" class="d-block description">
              <v-window v-model="tab">
                <v-window-item value="0">
                  <span v-html="description" class="content"></span>
                </v-window-item>
                <v-window-item value="1">
                  <VRow align="center">
                    <VCol cols="3" md="2" class="col-item"><span>Alto</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>20 cm</span></VCol>
                    <VCol cols="3" md="2" class="col-item"><span>Ancho</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>20 cm</span></VCol>
                    <VCol cols="3" md="2" class="col-item"><span>Peso</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>200 g</span></VCol>
                    <VCol cols="3" md="2" class="col-item"><span>Profundo</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>40 cm</span></VCol>
                    <VCol cols="3" md="2" class="col-item"><span>Material</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>Titanio</span></VCol>
                    <VCol cols="3" md="2" class="col-item"><span>Color</span></VCol>
                    <VCol cols="9" md="10" class="col-value"><span>Verde</span></VCol>
                  </VRow>
                </v-window-item>
                <v-window-item value="2">
                  <VRow align="center" class="row-reviews">
                    <VCol cols="1">
                      <VImg :src="default_review" class="image-review"/>
                    </VCol>
                    <VCol cols="11">
                      <v-rating
                        hover
                        :length="5"
                        :size="32"
                        :model-value="3"
                        style="margin-left:-10px;"
                        active-color="#FFC549"
                      />

                      <p>De <span>Diego Bolivar</span> | 26 de Octubre, 2023</p> <br>
                      <p>Lorem ipsum dolor sit amet consectetur. Lorem nunc scelerisque consequat quis adipiscing. Dui vulputate lacus tellus consectetur auctor.</p> 
                    </VCol>
                  </VRow>
                </v-window-item>
              </v-window>
            </VCol>

            <VCol cols="12" class="d-flex col-recomendaciones">
              <VRow align="center">
                <VCol cols="6" class="text-left">
                  <p class="text-lef">Recomendaciones que te pueden interesar</p>
                </VCol>
                <VCol cols="6" class="text-right">
                  <span class="text-right">Ver todos</span>
                </VCol>
                
              </VRow>
            </VCol>

            <VCol cols="12">
              <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between" v-if="data">
                <Product1 
                  v-for="(product, i) in data_.recommendations"
                  :key="i"
                  :product="product"
                  :readonly="true"/>
              </VCardText>
            </VCol>
          </VRow>
        </VCardText>  
    </VCard>     
    </VContainer>
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

  
  .v-text-field::v-deep(.v-field) { 
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1.5px solid #E1E1E1 !important;
    height: 50px;
    width: 88px;
    margin-top: 10px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    color: #0A1B33 !important;
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
    margin: 0 10px;
  }

  .border-title {
    border-bottom: 1px solid #D9EEF2;
  }

  .border-title2
  {
    border-bottom: 1px solid #D9EEF2;
    border-top: 1px solid #D9EEF2;
    padding-top: 16px;
    margin-top: 40px;
  }

  .border-title2 span
  {
    color:  #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.2px;
  }

  .border-title2 p
  {
    color: #0A1B33;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.4px; 
  }
  .border-title2 span
  {
    color: #0A1B33;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    margin: auto;
    line-height: 20px; /* 100% */
  }

  .border-title2 span:hover
  {
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
  }

  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }
  .breadcumb {
    height: 55px !important;
  }

  
  .hearth-icon path
  {
    fill:#0A1B33;
  }
  .hearth-icon path:hover
  {
    fill: #FF0090;
  }

  .row-add
  {
    width: 100%;
  }

  .b-mayorista
  {
    display: inline-flex;
    height: 38px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 32px;
    border: 1px solid  #0A1B33;
    color:#0A1B33;
    font-weight: 700;
  }

  .b-mayorista:hover
  {
    background-color:  #FFC549;
    border: 1px solid #FFC549;
  }

  .description
  {
    border-bottom: 1px solid #D9EEF2;
    border-top: 1px solid #D9EEF2;
    padding: 16px 0px!important;
  }

  .col-recomendaciones
  {
    background-color: #E2F8FC;
    border-radius: 32px;
    align-items: center;
    padding: 16px 48px !important;
    margin-top: 16px;
    color:  #0A1B33;
  }
  .col-recomendaciones p
  {
    font-size:24px;
  }
  .col-recomendaciones span
  {
    font-size:14px;
  }
 
</style>

<style scoped>

    .carousel__item img {
        width: 60%;
    }

    .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet {
        display: none !important;
    }
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper {
        width: 100%;
        height: 350px;
        margin-left: auto;
        margin-right: auto;
    }

    .swiper-slide {
        background-size: cover;
        background-position: center;
    }

    .mySwiper2 {
        height: 350px;
        width: 100%;
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
    }

    .mySwiper .swiper-slide-thumb-active {
        opacity: 1;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    }

    .col-item
    {
      padding: 16px 32px;
      border: 1px solid  #E1E1E1;
      background-color: #E2F8FC;
    }

    .col-value
    {
      padding: 16px 32px;
      border: 1px solid #E1E1E1;
      background-color: #FFF;
    }

    .col-item span
    {
      color: #0A1B33;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px; /* 100% */
    }
    .col-value span
    {
      color: #999;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 100% */
    }

    .row-reviews
    {
      padding: 32px;
    }

    .image-review
    {
      width: 70px;
      border-radius: 70px;
      border: 1px solid var(--Grey-2, #E1E1E1);
    }

    .row-reviews p
    {
      color: #999;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
    }

    .row-reviews span
    {
      color: #FF0090;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
    }

</style>