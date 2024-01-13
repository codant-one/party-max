<script setup>

import { useAuthStores } from '@/stores/auth'
import { confirmedValidator, passwordValidator, requiredValidator } from '@validators'
import festin_image from '@assets/images/festin-register.jpg';
import router from '@/router'
import icon4 from '@assets/icons/icon-password.svg';
import festin_about from '@assets/images/festin-aboutus.jpg';
import festin_cancel from '@assets/images/festin_cancel.jpg';

const route = useRoute()
const authStores = useAuthStores()

const user = route.query.user

const load = ref(false)

const refVForm = ref()
const password = ref()
const isPasswordVisible = ref(false)
const passwordConfirmation = ref()
const isConfirmPasswordVisible = ref(false)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)

const errors = ref({
    password: undefined,
    passwordConfirmation: undefined,
})

const inputChange = () => {
  errors.value = {
    password: undefined, 
    passwordConfirmation: undefined
  }
}

watchEffect(fetchData)

async function fetchData() {

    authStores.find(route.query.token)
        .then(response => {
        }).catch(err => {
            if(err.response.data.message === 'not_found'){
                isDialogVisible.value = true
                message.value = err.response.data.errors
                isError.value = true
            }

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 5000)

            console.error(err.message)
        })
}

const onSubmit = () => {

    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            load.value = true

            let data = {
                token: route.query.token,
                password: password.value
            }

            authStores.change(data)
                .then(response => {

                    isDialogVisible.value = true
                    message.value = response.data
                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        router.push({ name: 'login' })
                    }, 5000)

                    load.value = false                    
                    
                }).catch(err => {

                    load.value = false

                    if(err.message === 'error'){
                        isDialogVisible.value = true
                        message.value = err.errors
                        isError.value = true
                    } else {
                        isDialogVisible.value = true
                        isError.value = true
                        message.value = 'Se ha producido un error...! (Server Error)'
                    }                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                    }, 5000)

                    console.error(err.message)
                })
        }
    })
}

</script>

<template>
    <VContainer class="mt-1 mt-md-10">
        <VForm 
              ref="refVForm"
              @submit.prevent="onSubmit">
            <VCard
                class="no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image" class="img-festin mx-auto"/>
                <VCardText class="subtitle-register p-0">
                    Restablecer contraseña🔒
                </VCardText>
                <VCardText class="text-register px-2 my-0 my-md-2 py-0">
                    Para <span class="font-weight-bold">{{ user }}</span>
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
                                label="Contraseña"
                                variant="outlined"
                                v-model="password"
                                :error-messages="errors.password"
                                :rules="[requiredValidator, passwordValidator]"
                                @input="inputChange()"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
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
                                v-model="passwordConfirmation"
                                :error-messages="errors.passwordConfirmation"
                                :rules="[requiredValidator, confirmedValidator(passwordConfirmation, password)]"
                                @input="inputChange()"
                                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                            />
                        </VCol>
                    </VRow>
                </VCardItem>
                <VCardText class="mt-2 pb-0 pb-md-2 d-block align-center text-center justify-content-center">
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
        </VForm>
        <VDialog v-model="isDialogVisible" >
            <VCard 
                :width="800"
                class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg width="100" :src="isError ? festin_cancel : festin_about" class="mx-auto"/>
                <VCardText class="text-register p-0 mb-5">
                    {{ message }}
                </VCardText>
            </VCard>
        </VDialog>
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
        border-radius: 32px !important;
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