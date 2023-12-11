<script setup>

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous'
import Loader from '@/components/common/Loader.vue'

import whatsapp from '@assets/icons/whatsapp.svg?inline';
import facebook from '@assets/icons/facebook2.svg?inline';
import instagram from '@assets/icons/instagram2.svg?inline';
import threads from '@assets/icons/threads2.svg?inline';

const route = useRoute()
const miscellaneousStores = useMiscellaneousStores()

const isLoading = ref(true)

const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  }
])

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const data = ref(null)

const title = ref(null)
const brand = ref(null)
const rating = ref(null)
const sku = ref(null)
const price = ref(null)
const price_for_sale = ref(null)
const store = ref(null)
const in_stock = ref(null)
const color = ref(null)
const single_description = ref(null)
const categories = ref([])
const tags = ref([])

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

  await miscellaneousStores.getProduct(route.params.slug)
  data.value = miscellaneousStores.getData

  console.log('product', data.value.product)

  title.value = data.value.product.name
  brand.value = data.value.product.brand.name
  rating.value = data.value.product.rating
  sku.value = data.value.product.colors[0].sku
  price.value = data.value.product.price
  price_for_sale.value = data.value.product.price_for_sale
  store.value = data.value.product.user.name + ' ' + data.value.product.user.last_name
  in_stock.value = data.value.product.in_stock
  color.value = data.value.product.colors[0].color.name
  single_description.value = data.value.product.single_description

  data.value.product.colors[0].categories.forEach(element => { 
    categories.value.push(element.category.name)
  });

  data.value.product.tags.forEach(element => { 
    tags.value.push(element.tag.name)
  });
 
  isLoading.value = false
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
        <VCardText class="px-0 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
          <VRow no-gutters>
            <VCol cols="12" md="5">
                IMAGEN
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
                  <span class="d-block tw-text-tertiary">Color: 
                    <strong class="tw-text-tertiary tw-text-base ms-1">{{ color }}</strong>
                  </span>
                  <span class="d-block tw-text-tertiary mb-2">
                    IMAGEN
                  </span>
              </VCardText>
              <VCardText class="p-0 d-block border-title mt-2" v-if="single_description !== null">
                  <span class="d-block tw-text-tertiary ms-5 mb-2 tw-leading-5" v-html="single_description" />
              </VCardText>

              <VCardText class="p-0 d-flex border-title mt-2">
                  <VTextField
                    placeholder="Cantidad"
                    flat
                    variant="solo"
                    type="number"
                  />
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
    </VCard>     
    </VContainer>
  </section>
</template>

<style scoped>

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

</style>