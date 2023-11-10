<script setup>
import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import icon1 from '@/assets/icons/icon-menu-product.svg'
import icon2 from '@/assets/icons/icon-menu-product2.svg'

import Product1 from '@/components/product/Product1.vue'
import sold from '@assets/icons/sold.svg';

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

 const priceRange = '[0, 1000]' // Valores iniciales del rango de precios
 const minPrice = 0 // Valor mínimo del rango
 const maxPrice = 1000 // Valor máximo del rango

 const homeStores = useHomeStores()

const data = ref(null)

watchEffect(fetchData)

async function fetchData() {

  await homeStores.fetchData()
  data.value = homeStores.getData
 
}


      const  valores= [20, 40]
      
    
 

</script>

<template>
 

  <VContainer class="mt-10">
    
    <VRow no-gutters>

      <VCol cols="12" md="3">
        <VCard class="mt-7 card-information sidebar-container">
            <VCardItem class="p-0 text-left mb-5">
              CATEGORÍAS
            </VCardItem> 
            
            <v-list :items="items" class="text-left sidebar-container"></v-list>

        </VCard>

        <VCard class="mt-7 card-information sidebar-container">

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
              ></v-text-field>
            </v-card-text>

            <v-checkbox class="custom-check"
              v-for="(item, index) in items_check"
              :key="index"
              v-model="item.selected"
              :label="item.name"
            ></v-checkbox>

            <VCardItem class="p-0 text-left mt-5">
              PRICE
            </VCardItem>

            <v-row class="align-center container-vslider">
              <v-col cols="12">
                <v-range-slider class="custom-vslider"
                  v-model="valores"
                  step="10"
                  thumb-label="always"
                ></v-range-slider>
              </v-col>
            </v-row>
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
        
        <VCard class="mt-7 card-information menu-prod">

          <v-row align="center" no-gutters>

            <v-col cols="6" class="text-left">
              <span>8 Productos</span>
            </v-col>

            <v-col cols="4" class="text-left">
              <v-select class="my-custom-select"
                clearable
                label="Select"
                :items="['producto 1', 'producto 2', 'producto 3', 'producto 3', 'producto 4', 'producto 5']"
                variant="outlined"
              ></v-select>
            </v-col> 

            <v-col cols="2"  class="text-left flex pl-4 pr-2">
              <span>Vista</span>
              <router-link to="/services">
                <img :src="icon1" class="ml-3"/>
              </router-link>
              <router-link to="/services">
                <img :src="icon2" class="ml-3"/>
              </router-link>

            </v-col>  
          </v-row>

        </VCard> 
        
        <v-row class="align-center row-products">
          
        </v-row>
        
      </VCol>


    </VRow>  

    
  </VContainer>
</template>



<style scoped>
.sidebar-container
{
  padding: 25px 20px;
}

.menu-prod
{
  padding: 8px 16px;
  border-radius: 32px;
  background-color: #E2F8FC;
}
.my-custom-select{
  border-radius: 48px!important;
  font-size: 12px!important;
  max-height: 33px!important;
}


.v-select::v-deep(.v-label)
{
  font-size: 14px!important;
}


.v-select::v-deep(.v-field__field)
{
  height: 33px!important;
  border-radius: 48px!important;
 
}
.v-select::v-deep(.v-input__details)
{
  height: 0px!important;
}

.v-select::v-deep(.v-field--appended)
{
  background-color:#FFFFFF;
}


.sidebar-container[data-v-a03b6bb9]
{
  background-color: #E2F8FC;

}

.row-products{
  padding: 50px 30px;
}


.custom-check
{
  max-height: 50px!important;
}

.custom-vslider::deep(.v-slider-track)
{
  background-color: #0A1B33!important;
}

.container-vslider
{
  max-height: 40px!important;
  margin-top: 24px;
}



</style>