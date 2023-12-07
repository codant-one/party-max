<script setup>

import festin_image from '@assets/images/festin-register.jpg';
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
                Para crear tu cuenta te pediremos <br> algunos datos
            </VCardText>
            <VCardText class="text-register p-0 mt-4">Solo te tomará unos minutos.</VCardText>
            <VCardText class="d-flex text-start p-0 mt-8">
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
            </VCardText>
            <VCardText class="d-block align-center text-center justify-content-center py-2">
                    <VBtn
                        variant="flat"
                        :width="288"
                        :height="48"
                        class="btn-register tw-text-white tw-bg-primary button-hover"
                        @click="redirect('form_client')">
                        Crear cuenta personal
                    </VBtn>
                    <VBtn
                        variant="flat"
                        :width="288"
                        :height="48"
                        class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                        @click="redirect('form_supplier')">
                        Crear cuenta empresa
                    </VBtn>
            </VCardText>    
            <VCardText class="px-0 more">
              <router-link to="/register" class="d-flex my-6 tw-no-underline hover:tw-text-yellow hover-icon-arrow-right justify-content-center">
                <span class="ms-5">Ya tengo una cuenta</span>
                <arrow_right class="ms-2" />
              </router-link>
            </VCardText>    
        </VCard>
    </VContainer>
</template>

<style scoped>

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