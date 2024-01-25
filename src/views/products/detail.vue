<script setup>

import { ref } from 'vue'
import { requiredValidator } from '@validators'
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'
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
import heart from '@assets/icons/heart.svg?inline';
import default_image from '@assets/images/default-description.png';
import default_review from '@assets/images/image-review.png';
import festin_about from '@assets/images/festin-aboutus.jpg';
import festin_cancel from '@assets/images/festin_cancel.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar'

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()
const homeStores = useHomeStores()
const cartStores = useCartStores()

const refVForm = ref()
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
const modules = ref([FreeMode, Navigation, Thumbs, Scrollbar])
const thumbsSwiper = ref(null);

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)
const data_ = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const sku = ref(null)
const wholesale_price = ref(null)
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

const radioContent = ref([])
const selectedColor = ref(null)
const color = ref('')
const imageAux = ref('')

const cant_prod = ref(1)
const client_id = ref(null)
const product_id = ref(null)
const load = ref(false)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)

const me = async () => {

    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)
      client_id.value = userDataJ.client.id
    }
  }



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

  product_id.value = data.value.product.id

  title.value = data.value.product.name
  brand.value = data.value.product.brand.name
  rating.value = data.value.product.rating
  sku.value = data.value.product.colors[0].sku
  wholesale_price.value = data.value.product.wholesale_price
  price_for_sale.value = data.value.product.price_for_sale
  store.value = data.value.product.user.name + ' ' + (data.value.product.user.last_name ?? '')
  in_stock.value = data.value.product.in_stock
  color.value = data.value.product.colors[0].color.name
  single_description.value = data.value.product.single_description
  description.value = data.value.product.description

  width.value = data.value.product.detail.width
  weigth.value = data.value.product.detail.weigth
  height.value = data.value.product.detail.height
  deep.value = data.value.product.detail.deep
  material.value = data.value.product.detail.material

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


const onSubmit = () => {

  if(client_id.value!==null)
  {
    refVForm.value?.validate().then(({ valid: isValid }) =>{

      if (isValid) 
      {
          load.value = true

            let data = {
                client_id: client_id.value,
                product_id: product_id.value,
                quantity: cant_prod.value
            }

            cartStores.add_cart(data)
                .then(response => {
                    isDialogVisible.value = true
                    message.value = response.data
                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        router.push({ name: 'information_client' })
                    }, 5000)

                    load.value = false                    
                    
                }).catch(err => {

                    load.value = false

                    if(err.message === 'error'){
                        isDialogVisible.value = true
                        message.value = err.errors
                        isError.value = true
                    } else {
                        isDialogVisible.value = true
                        isError.value = true
                        message.value = 'Se ha producido un error...! (Server Error)'
                    }                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                    }, 5000)

                    console.error(err.message)
                })


      }

      else
      {
        console.log('DEBES INICIAR SESIÓN PARA PODER COMPRAR')
      }

    })  
  }

}
me() 
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
      <VCard class="mt-7 no-shadown card-information p-0" v-if="!isLoading">
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
              <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
              > 
                <VCardText class="p-0">
                  <div class="d-flex py-2">
                  <span class="text_1">$ {{ price_for_sale }}</span>
                  <span class="text_2 ms-2 d-flex align-end">$ {{ wholesale_price }}</span>
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
                  <VRow align="center" class="row-add d-flex align-center">
                    <VCol cols="12" md="2" class="d-flex flex-column">
                      <span>Cantidad:</span>
                      <VTextField
                        v-model="cant_prod"
                        variant="solo"
                        type="number"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      
                        <VBtn 
                          variant="flat"
                          :width="288"
                          :height="48"
                          type="submit"
                          class="btn-register tw-text-white tw-bg-primary button-hover" 
                          >
                          Agregar al carrito
                        </VBtn>
                    
                    </VCol>
                    <VCol cols="12" md="4">
                      <VBtn 
                      variant="plain" 
                      icon 
                      class="me-4 index heart"
                      :class="(name === null) ? 'ms-10': 'me-24'">
                        <heart />
                      </VBtn>
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
                  <span class="tw-text-tertiary" style="display: none;">Categorías: 
                    <span class="ms-1">{{ categories.join(", ") }}</span>
                  </span>
                  <span class="d-block tw-text-tertiary">Tags: 
                    <span class="ms-1">{{ tags.join(", ") }}</span>
                  </span>
                </VCardText>
              </VForm>
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
                  <VCardText class="mb-10">
                    <VRow>
                      <VCol cols="2" md="2" class="col-item"><span>Alto</span></VCol>
                      <VCol cols="10" md="10" class="col-value"><span>{{ height }}cm</span></VCol>
                      <VCol cols="2" md="2" class="col-item"><span>Ancho</span></VCol>
                      <VCol cols="10" md="10" class="col-value"><span>{{ width }}cm</span></VCol>
                      <VCol cols="2" md="2" class="col-item"><span>Peso</span></VCol>
                      <VCol cols="10" md="10" class="col-value"><span>{{ weigth }}g</span></VCol>
                      <VCol cols="2" md="2" class="col-item"><span>Profundo</span></VCol>
                      <VCol cols="10" md="10" class="col-value"><span>{{ deep }}cm</span></VCol>
                      <VCol cols="2" md="2" class="col-item"><span>Material</span></VCol>
                      <VCol cols="10" md="10" class="col-value"><span>{{ material }}</span></VCol>
                    </VRow>
                  </VCardText>
                </v-window-item>
                <v-window-item value="2">
                  <VCardText class="mb-10 py-0">
                    <VRow class="row-reviews border-title" v-for="n in 3">
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
                  </VCardText>
                </v-window-item>
              </v-window>
            </VCol>

            <VCol cols="12" class="d-flex col-recomendaciones">
              <VRow align="center">
                <VCol cols="6" class="text-left">
                  <p class="text-lef">Recomendaciones que te pueden interesar</p>
                </VCol>
                <VCol cols="6" class="text-right">
                  <router-link to="/products" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
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


    <!--PopUp de respuesta-->

    <VDialog v-model="isDialogVisible" >
            <VCard 
                :width="800"
                class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg width="100" :src="isError ? festin_cancel : festin_about" class="mx-auto"/>
                <VCardText class="text-register p-0 mb-5">
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

  .text-pink-accent-3 {
    color: #FF0090 !important;
  }
  .v-text-field::v-deep(.v-field) { 
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1.5px solid #E1E1E1 !important;
    height: 45px;
    width: 88px;
    margin-top: 10px;
    box-shadow: none;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    color: #0A1B33 !important;
  }

  
  .heart:hover::v-deep(path), .shoppinp_cart:hover::v-deep(path) {
    fill: #FF0090;
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

  .description {
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
    .col-value span
    {
      color: #999;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 100% */
    }

    .row-reviews {
      padding: 32px;
    }

    .image-review {
      width: 70px;
      border-radius: 70px;
      border: 1px solid var(--Grey-2, #E1E1E1);
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

</style>