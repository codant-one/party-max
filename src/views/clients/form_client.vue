<script setup>

import icon1 from '@assets/icons/Mail.svg';
import icon2 from '@assets/icons/input-user.svg';
import icon3 from '@assets/icons/Phone.svg';
import icon4 from '@assets/icons/icon-password.svg';

</script>

<template>
    <VContainer class="mt-10">
        <VCard 
            :width="536" 
            class="no-shadown card-register d-block text-center mx-auto">
            <VCardItem class="subtitle-register">
                Completa los datos para <br>crear tu cuenta
            </VCardItem>
            <VCardItem class="client-card">
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon1" class="me-3"/>
                        <div class="d-block">
                            <span class="text-client text-left">Agrega tu e-mail</span> <br>
                            <span class="p-client text-left">Recibirás información de tu cuenta.</span>
                        </div>
                    </VCol>
                    <VCol cols="12" class="mb-5">
                        <v-text-field
                            label="E-mail"
                            placeholder=""
                            variant="outlined"
                        />
                    </VCol>
                </VRow>
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon2" class="me-3"/>
                        <div class="d-block">
                            <span class="text-client text-left">Elige tu nombre</span> <br>
                            <span class="p-client text-left">Cuéntanos cómo quieres que te llamemos.</span>
                        </div>
                    </VCol>
                    <VCol cols="12" class="mb-5">
                        <v-text-field
                            label="Name"
                            placeholder=""
                            variant="outlined"
                        />
                    </VCol>
                </VRow>
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon3" class="me-3"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Valida tu teléfono</span> <br>
                            <span class="p-client text-left">Podrás usarlo para ingresar a tu cuenta.</span>
                        </div>
                    </VCol>
                    <VCol cols="12" class="mb-5">
                        <v-text-field
                            label="Teléfono"
                            placeholder=""
                            variant="outlined"
                        />
                    </VCol>
                </VRow>
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon4" class="me-3"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Crea tu contraseña</span> <br>
                            <span class="p-client text-left">Mantendrás tu cuenta protegida.</span>
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
                    <VCol cols="12">
                        <v-checkbox 
                            label="Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad." 
                        />
                    </VCol>
                </VRow>
            </VCardItem>
            <VCardText class="d-block align-center text-center justify-content-center pb-2">
                <VBtn
                    variant="flat"
                    :width="288"
                    :height="48"
                    block
                    class="btn-register tw-text-white tw-bg-primary button-hover"
                >
                    Continuar
                </VBtn>
            </VCardText>                  
        </VCard>
    </VContainer>
</template>

<style scoped>

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

</style>