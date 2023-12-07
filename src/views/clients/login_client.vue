<script setup>

import festin_image2 from '@assets/images/festin-register.jpg';
import icon2 from '@assets/icons/input-user.svg';
import icon3 from '@assets/icons/Phone.svg';
import icon4 from '@assets/icons/icon-password.svg';

import router from '@/router'

const redirect = (name) => {
    router.push({ name : name})
}
</script>

<template>
    <VContainer class="mt-10">
    
        <VRow no-gutters>
            <VCard
                :width="456" 
                class="no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image2" class="img-festin mx-auto"/>
                <VCardText class="subtitle-register p-0">
                    ¡Bienvenidx a la fiesta!
                </VCardText>
                <VCardItem class="client-card">
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon2" class="me-3"/>
                            <div class="d-block">
                                <span class="text-client text-left">E-mail o usuario</span> <br>
                            </div>
                        </VCol>
                        <VCol cols="12" class="mb-5">
                            <v-text-field
                                label="E-mail"
                                placeholder=""
                                variant="outlined"
                            />
                        </VCol>

                        <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon4" class="me-3"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Contraseña</span> <br>
                        </div>
                    </VCol>
                    <VCol cols="12" class="mb-5">
                        <v-text-field
                            label="Password"
                            type="password"
                            placeholder=""
                            variant="outlined"
                        />
                    </VCol>
                    </VRow>
                </VCardItem>
                <VCardText class=" d-flex text-start p-0 mt-4 mb-4">
                    <!--<VCheckbox
                        label="Recordar mi cuenta"></VCheckbox>-->
                        <span>¿Olvidaste tu contraseña?</span>
                </VCardText>
                <VCardItem>
                    <VBtn
                            variant="flat"
                            width="100%"
                            :height="auto"
                            class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                            @click="redirect('form_supplier')">
                            Iniciar sesión
                    </VBtn>
                </VCardItem>
                  
            </VCard>
        </VRow>

    </VContainer>    
</template>

<style scoped>

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

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }
    .card-register {
        padding: 48px;
        border-radius: 32px;
    }

    .subtitle-register {
        color: #FF0090;
        text-align: center;
        font-size: 23px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px; 
    }

    .text-register {
        color:#0A1B33;
        text-align: center;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */
    }
    .v-checkbox::v-deep(.v-label){
        color:#0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
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

    .client-card {
        align-items: center;
        border-radius: 16px;
        padding: 16px 16px 0 16px;
        margin: auto;
    }
    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .v-text-field::v-deep(.v-input__details) { 
        padding: 0;
        height: 0;
        min-height: 0;
    }


    .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
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
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 30% !important;
        font-size: 12px !important;
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