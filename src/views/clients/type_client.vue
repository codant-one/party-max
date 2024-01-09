<script setup>

import festin_image from '@assets/images/festin-register.jpg';
import clients from '@assets/icons/client.svg?inline';
import suppliers from '@assets/icons/proveedor.svg?inline';
import arrow_right from '@assets/icons/arrow-right.svg?inline';

</script>

<template>
    <VContainer class="mt-10">
        <VCard 
            class="no-shadown card-register d-block text-center mx-auto mb-5">
            <VImg :src="festin_image" class="img-festin mx-auto"/>
            <VCardItem class="subtitle-register px-0">
                ¿Cómo quieres ingresar a la fiesta?
            </VCardItem>

            <VCardItem class="d-flex client-card mt-4">
                <router-link to="/login" class="tw-no-underline hover:tw-text-primary link-type-client">
                    <VRow class="text-center d-flex align-center">
                        <VCol cols="4" class="hover-client">
                            <clients class="me-3 ms-4"/>
                        </VCol> 
                        <VCol cols="5">
                            <span class="text-client">Cliente</span>
                        </VCol>
                        <VCol cols="3" class="hover-icon-arrow-right">
                            <arrow_right class="me-3 ms-4"/>    
                        </VCol>  
                    </VRow>
                </router-link>
            </VCardItem> 
                
            <VCardItem class="d-flex client-card mt-4">
                <router-link to="/type_client" class="tw-no-underline hover:tw-text-primary link-type-client">
                    <VRow class="text-center d-flex align-center row-type_client">
                        <VCol cols="4" class="hover-supplier">
                            <suppliers class="me-3 ms-4"/>
                        </VCol> 
                        <VCol cols="5">
                            <span class="text-client">Proveedor</span>
                        </VCol>
                        <VCol cols="3" class="hover-icon-arrow-right">
                            <arrow_right class="me-3 ms-4"/>    
                        </VCol>  
                    </VRow>
                </router-link>
            </VCardItem>  
        </VCard>   
  </VContainer>
</template>

<style scoped>

    .card-register {
        padding: 45px;
        border-radius: 32px;
        width:456px;
        
    }

    .img-festin {

        width: 164px!important;
        height: auto;
    }
    .subtitle-register {
        color: #FF0090;
        text-align: center;
        font-size: 23px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px;
        margin-top: 34px;    
    }

    .text-register {
        color:#0A1B33;
        text-align: center;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */
    }

    .client-card {
        align-items: center;
        border-radius: 16px;
        border: 1px solid  #E1E1E1;
        padding: 16px;
        width: 250px;
        margin: auto;
    }

    .client-card:hover {
        border: 1px solid  #FF0090;
    }

    .client-card:hover span {
        color: #FF0090;
    }

    .client-card:hover .hover-icon-arrow-right::v-deep(path),
    .client-card:hover .hover-supplier::v-deep(path),
    .client-card:hover .hover-client::v-deep(path) {
        fill: #FF0090;
    }

    .client-card:hover svg path {
        fill: #FF0090;
    }
    .text-client {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .client-card .v-card-item__content {
        margin: auto;
    }
    @media only screen and (max-width: 767px){

    .card-register
    {
        width: 358px;
        padding: 40px;
    }    
    .subtitle-register
    {
        font-size: 20px;
        line-height: 24px; /* 120% */
    }

}

</style>