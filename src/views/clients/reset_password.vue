<script setup>

import festin_image from '@assets/images/festin-register.jpg';
import arrow_left from '@assets/icons/Arrow_left.svg?inline';
import router from '@/router'

const redirect = (name) => {
    router.push({ name : name})
}

</script>

<template>
    <VContainer class="mt-10">
        <VCard
            class="no-shadown card-register d-block text-center mx-auto">
            <VImg :src="festin_image" class="img-festin mx-auto"/>
            <VCardText class="subtitle-register">
                Restablecer contraseña
            </VCardText>
            <VRow style="padding:0px 40px;">
                <VCol cols="12" class="p-0">
                            <VTextField
                                label="Nueva contraseña"
                                variant="outlined"
                                type="password"
                            />
                </VCol>

                <VCol cols="12" class="p-0">
                            <VTextField
                                label="Confirmar contraseña"
                                variant="outlined"
                                type="password"
                            />
                </VCol>
            </VRow>
            <VCardText class="p-0 more">
              <VRow style="padding: 20px 50px;">
                <VBtn
                            variant="flat"
                            block
                            type="submit"
                            class="btn-register tw-text-white tw-bg-primary button-hover"
                        >
                            Enviar
                            <VProgressCircular
                                v-if="load"
                                indeterminate
                                color="#fff"
                            />
                </VBtn>

                <router-link to="/login" class="d-flex my-6 tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center" style="margin: auto;">
                    <arrow_left class="ms-2" />
                    <span class="ms-5">Volver a inicio de sesión</span>
                </router-link>
              </VRow>
            </VCardText>    
        </VCard>
    </VContainer>
</template>

<style scoped>
    .hover-icon-arrow-right:hover::v-deep(path) {
        fill: #FF0090;
    }

    .more {
        text-align: end;
        display: contents;
    }

    .card-register {
        padding: 20px;
        border-radius: 32px;
        width: 456px; 
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
        margin-bottom: 34px;   
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

    .v-text-field::v-deep(.v-field-label) {
        top: 30% !important;
        font-size: 12px !important;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        border-start-start-radius: 24px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
    }

    .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }
    
    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
    }
    


    @media only screen and (max-width: 767px){
    .card-register
        {
            width: 358px;
            padding: 40px 20px;
        }

        .subtitle-register
        {
            font-size: 20px;
            line-height: 24px; /* 120% */
        }
    }
</style>