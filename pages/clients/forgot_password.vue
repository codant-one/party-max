<script setup>

import { useAuthStores } from '@/stores/auth'
import { emailValidator, requiredValidator } from '@validators'
import { useRouter } from 'vue-router'
import festin_image from '@assets/images/festin-register.jpg';
import check_circle from '@assets/icons/check-circle.svg';
import arrow_left from '@assets/icons/Arrow_left.svg?inline';
import icon1 from '@assets/icons/Mail.svg';

const router = useRouter()
const authStores = useAuthStores()

const errors = ref({
  email: undefined
})

const refVForm = ref()
const email = ref('')
const load = ref(false)
const isDialogVisible = ref(false)

const inputChange = () => {
  errors.value = {
    email: undefined
  }
}

const forgot_password = () => {
  load.value = true

  let data = {
    email: email.value
  }

  authStores.forgot_password(data)
    .then(response => {
        load.value = false
        isDialogVisible.value = true

        setTimeout(() => {
            router.push({ name: 'login' })
        }, 3000)

    }).catch(err => {

      load.value = false
      var message = ''

      if(err.message === 'error') {
        message = err.data.register_success
      } else if(err.message === 'not_found'){
        message = err.errors
      } else {
        message = 'Se ha producido un error...! (Server Error)'
      }

      errors.value = {
        email: message, 
        password: ''
      }

    //   console.error('error', err.response.data)
    })
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            forgot_password()
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
                class="pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image" class="img-festin mx-auto"/>
                <VCardText class="subtitle-register p-0">
                    ¿Olvido su contraseña?
                </VCardText>
                <VCardText class="text-register px-2 my-0 my-md-2 pb-0">
                    Ingrese su correo electrónico y enviaremos un link para reiniciar su contraseña
                </VCardText>
                <VCardItem class="pb-0 client-card">
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon1" class="me-3"/>
                            <div class="d-block">
                                <span class="text-client text-left">E-mail</span> <br>
                                <span class="p-client text-left">Recibirás información.</span>
                            </div>
                        </VCol>
                        <VCol cols="12" class="mb-3">
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
                <VCardText class="px-0 more">
                    <NuxtLink :to="{ name: 'login'}" class="d-flex my-6 tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center align-center" style="margin: auto;">
                        <arrow_left class="ms-2" />
                        <span class="ms-5">Volver a inicio de sesión</span>
                    </NuxtLink>
                </VCardText>    
            </VCard>
        </VForm>
        <VDialog v-model="isDialogVisible" >
            <VCard
                class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg width="100" :src="check_circle" class="mx-auto"/>
                <VCardText class="text-message mt-10 mb-5">
                    Tu solicitud se ha procesado satisfactoriamente.
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

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px; 
        padding: 0 80px !important;
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

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 17% !important;
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
            padding: 40px 20px !important;
        }

        .text-message {
            padding: 0 30px !important;
            font-size: 18px;
        }

        .subtitle-register {
            font-size: 20px;
            line-height: 24px; /* 120% */
        }

        .img-festin {
            width: 120px !important;
            height: auto;
        }

        .v-row.v-row--no-gutters > .v-col, .v-row.v-row--no-gutters > [class*=v-col-] {
            line-height: 20px;
        }
    }
</style>