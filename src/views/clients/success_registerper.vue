<script setup>

import festin_image from '@assets/images/festin-aboutus.jpg';
import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';
import router from '@/router'

const redirect = (name) => {
    router.push({ name : name})
}

</script>

<template>
    <VContainer class="mt-10">
        <VCard
            :width="456" 
            class="no-shadown card-register d-block text-center mx-auto">
            <VImg :src="festin_image" class="img-festin mx-auto"/>
            <VCardText class="subtitle-register p-0">
                ¡Gracias por unirte a <br>nuestra fiesta!
            </VCardText>
            <VCardText class="text-register p-0 my-4">
                Para comenzar a disfrutar de PartyMax te <br> 
                enviamos un correo electrónico de <br> 
                confirmación de tu cuenta.
            </VCardText>
            <!-- <VCardText class="d-flex text-start p-0 mt-8">
                <VCheckbox class="px-6" />
                <div class="pr-10 text1">
                    Acepto los 
                    <router-link
                        :to="{ name: 'home' }"
                        class="text2"
                    >
                        Términos y condiciones
                    </router-link>
                    y autorizo el uso de mis datos de acuerdo a la 
                    <router-link
                        :to="{ name: 'home' }"
                        class="text2"
                    >
                        Declaración de Privacidad.
                    </router-link>
                </div>
            </VCardText> -->  
            <VCardText class="px-0 more">
              <router-link to="/login" class="d-flex tw-text-tertiary my-12 tw-no-underline hover:tw-text-primary hover-icon-arrow-right justify-content-center">
                <span class="ms-5">Ingresar a mi cuenta</span>
                <arrow_right class="ms-2" />
              </router-link>
            </VCardText>    
        </VCard>
    </VContainer>
</template>

<style scoped>

    .hover-icon-arrow-right:hover::v-deep(path) {
        fill: #FF0090;
    }
    .text1 {
        color: #0A1B33 !important;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
    }

    .text2 {
        color: #999;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        text-decoration: none; 
    }
    .more {
        text-align: end;
        display: contents;
    }

    .card-register {
        padding: 20px;
        border-radius: 32px;
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

    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
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
</style>