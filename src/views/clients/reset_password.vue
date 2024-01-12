<script setup>

import festin_image from '@assets/images/festin-register.jpg';
import arrow_left from '@assets/icons/Arrow_left.svg?inline';
import router from '@/router'
import icon4 from '@assets/icons/icon-password.svg';

const redirect = (name) => {
    router.push({ name : name})
}

</script>

<template>
    <VContainer class="mt-1 mt-md-10">
        <VCard
            class="no-shadown card-register d-block text-center mx-auto">
            <VImg :src="festin_image" class="img-festin mx-auto"/>
            <VCardText class="subtitle-register p-0">
                Restablecer contraseña
            </VCardText>
            <VCardText class="text-register px-2 my-0 my-md-2 py-0">
                Para Juan perez
            </VCardText>
            <VCardItem class="pb-0 client-card">
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon4" class="me-3"/>
                        <div class="d-block">
                            <span class="text-client text-left">Ingrese tu contraseña</span> <br>
                                <span class="p-client text-left">Mantendrás tu cuenta protegida.</span>
                        </div>
                    </VCol>
                    <VCol cols="12" class="mb-1">
                        <VTextField
                            label="Nueva contraseña"
                            variant="outlined"
                            type="password"
                        />
                    </VCol>
                </VRow>
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon4" class="me-3"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Confirma tu contraseña</span> <br>
                            <span class="p-client text-left">Mantendrás tu cuenta protegida.</span>
                        </div>
                    </VCol>
                    <VCol cols="12" class="p-0">
                        <VTextField
                            label="Confirmar contraseña"
                            variant="outlined"
                            type="password"
                        />
                    </VCol>
                </VRow>
            </VCardItem>
            <VCardText class="pb-0 pb-md-2 d-block align-center text-center justify-content-center">
                <VBtn
                    variant="flat"
                    :width="288"
                    :height="48"
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
        width: 500px; 
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
   
    .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }
    
    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
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
        padding-bottom: 0 !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 30% !important;
        font-size: 12px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .text-client {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 8px; /* 50% */
    }

    .p-client {
        color:  #999;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 8px; /* 50% */
    }

    @media only screen and (max-width: 767px) {
        .card-register {
            width: auto;
            padding: 40px 20px;
        }

        .subtitle-register {
            font-size: 20px;
            line-height: 24px; /* 120% */
        }

        .img-festin {
            width: 120px !important;
            height: auto;
            display: none;
        }

        .v-row.v-row--no-gutters > .v-col, .v-row.v-row--no-gutters > [class*=v-col-] {
            line-height: 20px;
        }
    }
</style>