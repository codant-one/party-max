
<script setup>
    
import { useAuthStores } from '@/stores/auth'
import { emailValidator, requiredValidator, phoneValidator } from '@validators'
import router from '@/router'
import icon1 from '@assets/icons/Mail.svg';
import icon2 from '@assets/icons/input-user.svg';
import icon3 from '@assets/icons/Phone.svg';
import icon4 from '@assets/icons/nit-icon.svg';

const authStores = useAuthStores()

const errors = ref({
    email: undefined,
    name: undefined,
    phone: undefined,
    nit: undefined
})

const refVForm = ref()
const email = ref('')
const name = ref('')
const phone = ref('')
const nit = ref('')
const load = ref(false)

const inputChange = () => {
    errors.value = {
        email: undefined,
        name: undefined,
        phone: undefined,
        nit: undefined
    }
}

const sendInfo = () => {
    load.value = true

    let data = {
        email: email.value,
        name: name.value,
        phone: phone.value,
        nit: nit.value
    }

    authStores.sendInfo(data)
        .then(response => {
            load.value = false

            router.push({ name: 'success_company' })
        }).catch(err => {
            load.value = false
            
            var message = ''

            if(err.response.data.message.hasOwnProperty('name')) {
                message = err.response.data.message.name[0]
            } else if(err.response.data.message.hasOwnProperty('email')) {
                message = err.response.data.message.email[0]
            } else if(err.response.data.message.hasOwnProperty('nit')) {
                message = err.response.data.message.nit[0]
            } else if(err.response.data.message.hasOwnProperty('phone')) {
                message = err.response.data.message.phone[0]
            }

            errors.value = {
                name: message, 
                nit: '',
                email: '',
                phone: ''
            }

            //console.error('error', err.response.data)
        })
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            sendInfo()
        }
    })
}

</script>

<template>
    <VContainer class="mt-1 mt-md-10">
        <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
            > 
            <VCard 
                class="no-shadown card-register d-block text-center mx-auto">
                <VCardItem class="subtitle-register">
                    Completa los datos para solicitar tu <br> cuenta como proveedor
                </VCardItem>
                <VCardItem class="client-card">
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon2" class="me-3" alt="icono2"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Nombre de tu empresa</span> <br>
                            <span class="p-client text-left">Cuéntanos cómo quieres que te llamemos.</span>
                        </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Nombre"
                                v-model="name"
                                variant="outlined"
                                :rules="[requiredValidator]"
                                :error-messages="errors.name"
                                @input="inputChange()"
                            />
                        </VCol>
                    </VRow>
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon4" class="me-3" alt="icono4"/> 
                            <div cols="10" class="d-block">
                                <span class="text-client text-left">Agrega tu NIT</span> <br>
                                <span class="p-client text-left">Nos ayudará a identificar tu negocio.</span>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="NIT"
                                v-model="nit"
                                variant="outlined"
                                :rules="[requiredValidator, phoneValidator]"
                                :error-messages="errors.nit"
                                @input="inputChange()"
                            />
                        </VCol>
                    </VRow>
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon1" class="me-3" alt="icono1"/>
                            <div cols="10" class="d-block">
                                <span class="text-client text-left">Agrega tu e-mail</span> <br>
                                <span class="p-client text-left">Recibirás información de tu cuenta.</span>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="E-mail"
                                v-model="email"
                                variant="outlined"
                                type="email"
                                :rules="[requiredValidator, emailValidator]"
                                :error-messages="errors.email"
                                @input="inputChange()"
                            />
                        </VCol>
                    </VRow>
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon3" class="me-3" alt="icono3"/> 
                            <div cols="10" class="d-block">
                                <span class="text-client text-left">Valida tu teléfono</span> <br>
                                <span class="p-client text-left">Podrás usarlo para ingresar a tu cuenta.</span>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Teléfono"
                                placeholder="+57 23 456 7890"
                                v-model="phone"
                                variant="outlined"
                                :rules="[requiredValidator, phoneValidator]"
                                :error-messages="errors.phone"
                                @input="inputChange()"
                            />
                        </VCol>
                        <VCol cols="12" class="d-flex text-start p-0">
                            <VCheckbox color="primary" :rules="[requiredValidator]"/>
                            <div class="text1 ms-5 mt-2 mb-3 mb-md-0">
                                Acepto los 
                                <a href="/terms-and-conditions" target="_blank" class="text2">
                                    términos y condiciones
                                </a>
                                y autorizo el uso de mis datos de acuerdo a la 
                                <a href="/privacy-statement" target="_blank" class="text2">
                                    declaración de privacidad
                                </a>
                                y
                                <a href="/data-protection" target="_blank" class="text2">
                                    protección de datos.
                                </a>
                            </div>
                        </VCol>
                    </VRow>
                </VCardItem>   
                <VCardText class="d-block align-center text-center justify-content-center pb-2">
                    <VBtn
                        variant="flat"
                        :width="288"
                        :height="48"
                        block
                        type="submit"
                        class="btn-register tw-text-white tw-bg-primary button-hover"
                    >
                        Continuar
                        <VProgressCircular
                            v-if="load"
                            indeterminate
                            color="#fff"
                        />
                    </VBtn>
                </VCardText>  
            </VCard>    
        </VForm>
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
        color: #FF0090;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        text-decoration: none; 
    }

    .text2:hover {
        color: #999;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .card-register {
        padding: 28px 48px;
        border-radius: 32px;
        width: 536px; 
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

    .v-checkbox::v-deep(.v-messages__message) { 
        margin-top: -10px;
        width: 130px !important;
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
        color: #999999 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }
    
    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 12px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    @media only screen and (max-width: 767px) {
        .card-register {
            width: auto;
            padding: 40px 20px !important;
        }

        .subtitle-register {
            font-size: 20px;
            line-height: 24px; /* 120% */
        }

        .v-row.v-row--no-gutters > .v-col, .v-row.v-row--no-gutters > [class*=v-col-] {
            line-height: 20px;
        }

        .v-checkbox::v-deep(.v-messages__message) { 
            margin-top: -15px;
            width: 210px !important;
        }
    }

</style>