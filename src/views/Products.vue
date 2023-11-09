<script setup lang="ts">
import { ref } from 'vue'

import icon1 from '@/assets/icons/icon-menu-product.svg'
import icon2 from '@/assets/icons/icon-menu-product2.svg'

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



</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
    
    <VRow no-gutters class="transparent">

      <VCol cols="12" md="3">
        <VCard class="mt-7 no-shadown card-information sidebar-container">
            <VCardItem class="p-0 text-left mb-5">
              CATEGORÍAS
            </VCardItem> 
            
            <v-list :items="items" class="text-left"></v-list>

        </VCard>

        <VCard class="mt-7 no-shadown card-information sidebar-container">

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

            <v-checkbox
              v-for="(item, index) in items_check"
              :key="index"
              v-model="item.selected"
              :label="item.name"
            ></v-checkbox>

            <v-row class="align-center">
              <v-col cols="12">
                <v-slider
                  v-model="priceRange"
                  :min="minPrice"
                  :max="maxPrice"
                  thumb-label="always"
                  thumb-color="primary"
                  track-color="primary"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="6">
                <v-text-field    
                  v-model="minPrice"
                  label="Precio Mínimo"
                  outlined
                  
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="maxPrice"
                  label="Precio Máximo"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <VCardItem class="p-0 text-left mt-5">
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
        
        <VCard class="mt-7 no-shadown card-information menu-prod">

          <v-row align="start" no-gutters>

            <v-col cols="6" class="text-left">
              <span>8 Productos</span>
            </v-col>

            <v-col cols="4" class="text-left">
              <v-select
                clearable
                label="Select"
                :items="['producto 1', 'producto 2', 'producto 3', 'producto 3', 'producto 4', 'producto 5']"
                variant="outlined"
              ></v-select>
            </v-col> 

            <v-col cols="2" class="text-left flex pl-4 pr-2">
              <span>Vista</span>
              <img :src="icon1" class="ml-3"/>
              <img :src="icon2" class="ml-3"/>

            </v-col>  
          </v-row>

        </VCard>  
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
}


</style>