<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import Loader from '@/components/common/Loader.vue'
import icon1 from '@/assets/icons/icon-menu-product.svg'
import icon2 from '@/assets/icons/icon-menu-product2.svg'

import Product3 from '@/components/product/Product3.vue'
import Product4 from '@/components/product/Product4.vue'

const route = useRoute()

const items = ref([
  { title: 'Item 01',value: 1, },
  { title: 'Item 02',value: 2, },
  { title: 'Item 03',value: 3, },
  { title: 'Item 04',value: 4, },
  { title: 'Item 05',value: 5, },
  { title: 'Item 06',value: 6, },
])

const items_check = ref([
  { name: 'item 1 (2)', selected: false },
  { name: 'item 2 (3)', selected: false },
  { name: 'item 3 (4)', selected: false },
])

const homeStores = useHomeStores()
const miscellaneousStores = useMiscellaneousStores()

const isLoading = ref(true)
const data = ref(null)
const products = ref([])
const tab = ref('0')
const category = ref(null)

const rowPerPage = ref(12)
const currentPage = ref(1)
const totalPages = ref(1)
const totalProducts = ref(0)

const formatTitle = (slug) => {
  const words = slug.split('-');
  const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return title;
}

const bread = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  }
])

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPages.value)
    currentPage.value = totalPages.value
})

watchEffect(fetchData)

async function fetchData() {

  if(route.query.category && category.value === null) {
    category.value = {
      title: formatTitle(route.query.category),
      disabled: false,
      href: 'categories/' + route.query.category,
    }

    bread.value.push(category.value)

    if(route.query.subcategory) {
      const subcategory = {
        title: formatTitle(route.query.subcategory),
        disabled: true,
        href: '',
    }

      bread.value.push(subcategory)
    }

    const product_ = {
      title: 'Productos',
      disabled: true,
      href: '',
    }

    bread.value.push(product_)
  } 

  

  isLoading.value = true

  await homeStores.fetchData()
    
  data.value = homeStores.getData
  
  let info = {
    orderByField: 'id',
    orderBy: 'desc',
    limit: rowPerPage.value,
    page: currentPage.value
  }

  var aux = await miscellaneousStores.products(info)
  products.value = aux.products.data
  
  totalPages.value = aux.products.last_page
  totalProducts.value = aux.productsTotalCount

  isLoading.value = false
}

const chancePagination = () => {
  fetchData()
}

const isLastItem = (index) => {
  return index === products.value.length - 1;
}
const  valores= [20, 40]

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
      <VRow no-gutters>
        <VCol cols="12" md="3" class="col-left">
          <VCard class="mt-7 sidebar-container">
              <VCardItem class="p-0 text-left mb-5">
                CATEGORÍAS
              </VCardItem> 
              <v-list :items="items" class="text-left sidebar-container"></v-list>
          </VCard>
          <VCard class="mt-7 sidebar-container">
              <VCardItem class="p-0 text-left mb-5">
                PROVEEDORES
              </VCardItem>
              <v-card-text class="text-left align-left p-0">
                <v-text-field
                  density="compact"
                  variant="solo"
                  label=""
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                />
              </v-card-text>

              <v-checkbox class="custom-check"
                v-for="(item, index) in items_check"
                :key="index"
                v-model="item.selected"
                :label="item.name"
              />

              <VCardItem class="p-0 text-left mt-5">
                PRICE
              </VCardItem>

              <VRow class="align-center container-vslider">
                <VCol cols="12">
                  <v-range-slider class="custom-vslider"
                    v-model="valores"
                    step="10"
                    thumb-label="always"
                  ></v-range-slider>
                </VCol>
              </VRow>
              <VCardItem class="p-0 text-left mt-5">
                Price: $10 — $200
              </VCardItem>

              <VCardItem class="p-0 text-left mt-9">
                REVIEW
              </VCardItem>

              <VCardItem class="p-0 text-left mt-5">
                <v-rating
                  hover
                  :length="5"
                  :size="32"
                  :model-value="3"
                  active-color="primary"
                /> 
              </VCardItem>
              
            </VCard>  
        </VCol> 
        
        <VCol cols="12" md="9" class="pl-5"> 
          <VCard class="mt-7 menu-prod">
            <VRow no-gutters class="align-center">
              <VCol cols="6" class="text-left">
                <span>{{ products.length }} </span>
                <span v-if="products.length === 1">  Producto </span>
                <span v-else>  Productos </span>
              </VCol>
              <VCol cols="4" class="text-left">
                <v-select class="my-custom-select"
                  clearable
                  label="Select"
                  :items="['producto 1', 'producto 2', 'producto 3', 'producto 3', 'producto 4', 'producto 5']"
                  variant="outlined"
                ></v-select>
              </VCol> 
              <VCol cols="2"  class="pl-7 d-flex align-center justify-content-between">
                <span>Vista</span>
                <VTabs v-model="tab" >
                  <VTab value="0" >
                      <img :src="icon1"/>
                  </VTab>
                  <VTab value="1" >
                      <img :src="icon2" />
                  </VTab>
              </VTabs>
              </VCol>  
            </VRow>
          </VCard> 
          <VRow class="align-center row-products" no-gutters>
            <VCol cols="12">
              <v-window v-model="tab">
                  <v-window-item value="0">
                      <VRow no-gutters class="ms-3">
                          <VCol cols="6" md="3" v-for="(product, i) in products" class="mb-7">
                              <Product3
                                  :key="i"
                                  :product="product"
                                  :readonly="true"/>
                          </VCol>
                      </VRow>
                  </v-window-item>
                  <v-window-item value="1">
                      <VRow no-gutters class="ms-3">
                          <VCol cols="12" v-for="(product, i) in products">
                              <Product4
                                  :key="i"
                                  :product="product"
                                  :readonly="true"
                                  :isLastItem="isLastItem(i)"/>
                          </VCol>
                      </VRow>
                  </v-window-item>
              </v-window>
            </VCol>
            <VCol cols="12">
              <VCardText class="d-flex align-center justify-content-center py-3 px-5">
                <VPagination
                  v-model="currentPage"
                  size="small"
                  :total-visible="5"
                  :length="totalPages"
                  rounded="circle"
                  @update:modelValue="chancePagination"
                />
              </VCardText>
            </VCol>
          </VRow>      
        </VCol>
      </VRow>      
    </VContainer>
  </section>
</template>

<style scoped>
  .breadcumb {
    height: 55px !important;
  }
  .v-btn--size-default {
    padding: 0 10px !important;
  }

  .v-tab.v-tab {
    min-width: 15px !important;
  }

  .sidebar-container {
    padding: 25px 20px;
    background-color: #E2F8FC;
    border-radius: 16px; 
    box-shadow: none !important;
  }
  .menu-prod {
    padding: 8px 16px;
    border-radius: 32px;
    background-color: #E2F8FC;
    box-shadow: none !important;
  }

  .my-custom-select {
    border-radius: 48px!important;
    font-size: 12px!important;
    max-height: 33px!important;
  }
  .v-select::v-deep(.v-label) {
    font-size: 14px!important;
  }
  .v-select::v-deep(.v-field__field) {
    height: 33px!important;
    border-radius: 48px!important;
  }
  .v-select::v-deep(.v-input__details) {
    height: 0px!important;
  }
  .v-select::v-deep(.v-field--appended) {
    background-color:#FFFFFF;
  }
  .row-products {
    padding: 50px 0;
  }
  .custom-check {
    max-height: 50px!important;
  }
  .custom-vslider::deep(.v-slider-track) {
    background-color: #0A1B33!important;
  }
  .container-vslider {
    max-height: 40px!important;
    margin-top: 24px;
  }

  @media only screen and (max-width: 767px)
  {
    .col-left
    {
      display: none;
    }
    .text-left
    {
      color: var(--Maastricht-Blue, #0A1B33);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
    }
  }

</style>