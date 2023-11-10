<script setup lang="ts">

import festin_image from '@assets/images/festin-register.jpg';

</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
    
    <VRow no-gutters>

        <VCol cols="12" md="3"></VCol>
        <VCol cols="12" md="6" class="text-center">
            <VCard class="mt-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image" class="img-festin mx-auto"/>
                <VCardItem class="subtitle-register">
                    Para crear tu cuenta te pediremos <br> algunos datos
                </VCardItem>
                <span class="text-register">Solo te tomará unos minutos.</span>
                <v-checkbox label="Acepto los Términos y condiciones y autorizo el 
                    uso de mis datos de acuerdo a la Declaración de Privacidad." class="p-register"></v-checkbox>
                <VCardItem class="d-block">
                    <router-link :to="{name:'formclient',}">
                        <v-btn class="tw-bg-primary button-register" density="default">Crear cuenta personal</v-btn>
                    </router-link>
                    <router-link :to="{name:'formproveedor',}">
                        <v-btn class="tw-bg-primary button-register2" density="default">Crear cuenta empresa</v-btn>
                    </router-link>   
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
.p-register
{
    margin-top: 34px;
   
}

.v-checkbox::v-deep(.v-label)
{

    color:#0A1B33;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
}

.button-register
{

    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 87.5% */
    border-radius: 32px;

}

.button-register2
{

    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 87.5% */
    border-radius: 32px;
    margin-top: 20px;

}
</style>