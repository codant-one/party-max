<script setup>

import banner_principal from '@assets/images/banner1_category.png';
import banner2_category from '@assets/images/banner2_category.png';
import banner3_category from '@assets/images/banner3_category.png';
import banner4_category from '@assets/images/banner4_category.png';

</script>

<template>
 
  <!--Banner Principal-->
  <VContainer class="content py-13 text-center w-100">
   
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardItem class="p-0">
        <VImg :src="banner_principal" cover/>
      </VCardItem>  
    </VCard>

    <!-- novedades -->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardTitle class="px-7 py-3 d-flex align-center">
        <span>Novedades</span>
        <VSpacer />
        <router-link to="/suppliers" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
      </VCardTitle>
      <VDivider />
      <VCardText class="px-7 mt-5 mb-5 d-flex align-items-stretch justify-content-between">
       
      </VCardText>  
    </VCard>

    <!-- banner 2 , banner 3-->
    <VCard class="mt-7 no-shadown card-information p-0 d-flex transparent">
        <VCard class="no-shadown card-information p-0 w-50">
          <router-link to="/products" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner2_category" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5">
          <router-link to="/products" class="tw-no-underline">
            <VCardItem class="p-0">
              <VImg :src="banner3_category" cover/>
            </VCardItem>  
          </router-link>
        </VCard>
    </VCard>

      <!--Banner 4-->
    <VCard class="mt-7 no-shadown card-information p-0">
      <VCardItem class="p-0">
        <VImg :src="banner4_category" cover/>
      </VCardItem>  
    </VCard>
    <VCard class="mt-7 no-shadown card-information transparent p-0">  
            <v-btn class="tw-bg-primary tw-text-white button-product" rounded="xl" block>Ver todos los productos</v-btn>
    </VCard>

    
  </VContainer>
</template>

<style scoped>

.transparent {
    background: transparent !important;
  }

.button-product
{
  font-size: 16px!important;
  font-weight: 700;
  padding: 24px!important;
}
.button-product:hover{
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
}
</style>