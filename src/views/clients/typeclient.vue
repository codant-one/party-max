<script setup lang="ts">

import festin_image from '@assets/images/festin-register.jpg';
import icon1 from '@assets/icons/client.svg';
import icon2 from '@assets/icons/proveedor.svg';
import arrow_right from '@assets/icons/arrow-right.svg';
</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
    
    <VRow no-gutters>

        <VCol cols="12" md="3"></VCol>
        <VCol cols="12" md="6" class="text-center">
            <VCard class="mt-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image" class="img-festin mx-auto"/>
                <VCardItem class="subtitle-register">
                    ¿Cómo quieres ingresar a la fiesta?
                </VCardItem>

                <VCardItem class="d-flex client-card mt-4">
                    <VRow class="text-center d-flex align-center">
                       <VCol cols="4">
                        <img :src="icon1" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="5">
                        <span class="text-client">Cliente</span>
                       </VCol>
                       <VCol cols="3">
                        <img :src="arrow_right" class="me-3 ms-4"/>    
                       </VCol>  
                    </VRow>
                    
                </VCardItem> 
                
                <VCardItem class="d-flex client-card mt-4">
                    <VRow class="text-center d-flex align-center">
                       <VCol cols="4">
                        <img :src="icon1" class="me-3 ms-4"/>
                       </VCol> 
                       <VCol cols="5">
                        <span class="text-client">Proveedor</span>
                       </VCol>
                       <VCol cols="3">
                        <img :src="arrow_right" class="me-3 ms-4"/>    
                       </VCol>  
                    </VRow>
                    
                </VCardItem>  
                
            </VCard>
        
        </VCol>
        <VCol cols="12" md="3"></VCol>

    </VRow>

    
  </VContainer>
</template>

<style scoped>

.card-register
{
    padding: 48px;
    border-radius: 32px;
    
}

.img-festin
{

    width: 164px!important;
    height: auto;
}
.subtitle-register
{
    color: #FF0090;
    text-align: center;
    font-size: 23px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    margin-top: 34px;    
}

.text-register
{
    color:#0A1B33;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
}




.client-card
{
    align-items: center;
    border-radius: 16px;
    border: 1px solid  #E1E1E1;
    padding: 16px;
    width: 250px;
    margin: auto;
}

.text-client
{
    color: #0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.client-card .v-card-item__content
{
    margin: auto;
}
</style>