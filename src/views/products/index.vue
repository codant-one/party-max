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
const categories = ref(null)
const products = ref([])
const tab = ref('0')
const category = ref(null)
const toggle = ref(null)

const rowPerPage = ref(12)
const currentPage = ref(1)
const totalPages = ref(1)
const totalProducts = ref(0)
const rang_price = ref([0,100000])

const min = ref(null)
const max = ref(null)

const categories_url = ref(null)

const colors_chip = ref([{id: 1, color:'#0000FF'},{id:2, color:'#ffff00'},{id:3, color:'#FF0000'},{id: 4, color:'#008000'},
                        {id: 5, color:'#515151'},{id:6, color:'#000000'},{id:7, color:'#ffffff'},{id: 8, color:'#4A2364'},
                        {id: 9, color:'#FF0090'},{id: 10, color:'#FF8000'},{id: 12, color:'#e3e4e5'},{id: 13, color:'#D4AF37'},
                        {id: 14, color:'#b76e79'},{id: 15, color:'#2ef8a0'},{id: 16, color:'#8b8b8e'},{id: 17, color:'#C8A2C8'}])

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
 
  categories.value = homeStores.getData.parentCategories
  
  let info = {
    orderByField: 'id',
    orderBy: 'desc',
    limit: rowPerPage.value,
    page: currentPage.value,
    category: route.query.category ?? null,
    subcategory: route.query.subcategory ?? null,
    colorId: route.query.color_id ?? null,
    search: route.query.search ?? null,
    min: min.value ?? null,
    max: max.value ?? null,
    wholesalers: route.query.wholesalers ? true : false
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

const change_price = ()=>{

  min.value = rang_price.value[0]
  max.value = rang_price.value[1]
  console.log(max.value)
  fetchData()

}
const valores = ref([10, 200])

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
              <VCardItem class="p-0 text-left mb-6 mt-6">
                CATEGORÍAS
              </VCardItem> 

              <VCardItem class="p-0 text-allcategories tw-font-bold ml-5">
                <router-link to="/products" class="tw-no-underline tw-text-tertiary">
                  TODAS LAS CATEGORIAS
                </router-link>
              </VCardItem> 

              <VCardItem class="p-0 text-allcategories tw-font-bold" style="margin-top: 10px;">
                Categoría
              </VCardItem> 
              
             

              <v-list class="text-left sidebar-container mb-6">
              
                <v-list-group  v-for="(i, index2) in categories" :key="index2" :value="i.id">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="i.name"></v-list-item>
                    
                  </template>

                  <v-list-item v-for="(j, index3) in i.children" :key="index3">

                    <router-link
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: j.slug.split('/')[1]
                          }
                        }"
                        class="tw-no-underline tw-text-tertiary">
                        <span class="text-subitem tw-text-tertiary">{{ j.name }}</span>
                      </router-link>
                  </v-list-item>

                </v-list-group>
                      
              </v-list>
          </VCard>
          <VCard class="mt-7 sidebar-container">
              <VCardItem class="p-0 text-left mb-6 mt-6">
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

              <v-card-text class="text-left align-left p-0 mt-4">
                
                  <div class="d-flex align-center flex-column">
                    <v-btn-toggle
                      v-model="toggle"
                      color="primary"
                      class="tw-bg-none"
                      mandatory
                      style="flex-wrap: wrap; height:auto"
                    >
                      <router-link
                        v-for="(color_, i) in colors_chip"
                        :to="{
                          name: 'products',
                          query:{
                            color_id: color_.id
                          }
                        }"
                      >
                        <v-chip
                          :key="i" 
                          :style="{background:color_.color}"  class="color-chip tw-cursor-pointer">
                        </v-chip>
                      </router-link>
                    </v-btn-toggle>
                  
                  </div>
              

              </v-card-text>

              <v-checkbox class="custom-check tw-text-tertiary"
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
                    v-model="rang_price"
                    :max="100000"
                    step="10"
                    thumb-label="always"
                    @update:modelValue="change_price"
                  ></v-range-slider>
                </VCol>
              </VRow>
              <VCardItem class="p-0 text-left mt-5">
                Price: {{rang_price}}
              </VCardItem>

              <VCardItem class="p-0 text-left mt-9">
                REVIEW
              </VCardItem>

              <VCardItem class="p-0 text-left mt-5 mb-6">
                  <v-rating
                    hover
                    :length="5"
                    :size="24"
                    :model-value="3"
                    active-color="yellow"
                  /> 
                
              </VCardItem>
              
            </VCard>  
        </VCol> 
        
        <VCol cols="12" md="9" class="col-menuproduct"> 
          <VCard class="mt-7 menu-prod">
            <VRow no-gutters class="align-center">
              <VCol cols="6" md="6" class="text-left order-first order-md-first">
                <span>{{ totalProducts }} </span>
                <span v-if="totalProducts === 1">  Producto </span>
                <span v-else>  Productos </span>
              </VCol>

              <VCol cols="6" md="4" class="text-left">
                <v-select class="my-custom-select"
                  clearable
                  label="Select"
                  :items="['producto 1', 'producto 2', 'producto 3', 'producto 3', 'producto 4', 'producto 5']"
                  variant="outlined"
                ></v-select>
              </VCol> 

              <VCol cols="6" md="2"  class="pl-7 d-flex align-center justify-content-between order-first order-md-last">
                <span>Vista</span>
                <VTabs v-model="tab"  >
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
                                  :readonly="true"
                                  />
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
              <VCardText v-if="totalProducts === 0" class="d-flex align-center justify-content-center py-3 px-5">
                Datos no disponibles
              </VCardText>
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

.color-chip {
  width: 20px!important;
  height: 20px!important;
  border-radius: 50%;
  opacity: 1!important;
}

.button-chip {
  padding: 0;
  opacity: 1!important;
}
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
    padding: 0px 20px;
    background-color: #E2F8FC;
    border-radius: 16px; 
    box-shadow: none !important;
  }

  .col-menuproduct
  {
    padding-left: 20px!important;
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

  .custom-check::deep(.v-label)
  {
    margin-left: 10px!important;
  }

  .text-left
  {
    font-size: 18px;
  }

  .text-allcategories
  {
    font-size: 14px;
  }

  .text-subitem
  {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  .color-chip {
  margin: 4px;
  cursor: pointer;
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

    .menu-prod
    {
      border-radius: 16px;
    }

    .col-menuproduct
    {
      padding-left: 0px!important;
    }

  
  }

</style>