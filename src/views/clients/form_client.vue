<script setup>

import { useAuthStores } from '@/stores/auth'
import { emailValidator, requiredValidator } from '@validators'
import router from '@/router'
import icon1 from '@assets/icons/Mail.svg';
import icon2 from '@assets/icons/input-user.svg';
import icon3 from '@assets/icons/Phone.svg';
import icon4 from '@assets/icons/icon-password.svg';

const authStores = useAuthStores()

const errors = ref({
  email: undefined,
  name: undefined,
  phone: undefined,
  password: undefined
})

const refVForm = ref()
const isPasswordVisible = ref(false)
const email = ref('')
const name = ref('')
const phone = ref('')
const password = ref('')
const remember_me = ref(true)
const load = ref(false)


const inputChange = () => {
  errors.value = {
    email: undefined,
    name: undefined,
    phone: undefined,
    password: undefined
  }
}


const register = () => {
  load.value = true

  let data = {
    email: email.value,
    name: name.value,
    phone: phone.value,
    password: password.value,
    rolname: 'cliente'
  }

  authStores.register(data)
    .then(response => {
        load.value = false

        router.push({ name: 'success_person' })
    }).catch(err => {

      load.value = false
    
      var message = ''

      if(err.response.data.message.hasOwnProperty('name')) {
        message = err.response.data.message.name[0]
      } else if(err.response.data.message.hasOwnProperty('email')) {
        message = err.response.data.message.email[0]
      } else if(err.response.data.message.hasOwnProperty('password')) {
        message = err.response.data.message.password[0]
      } else if(err.response.data.message.hasOwnProperty('phone')) {
        message = err.response.data.message.phone[0]
      } else if(err.response.data.message.hasOwnProperty('rolname')) {
        message = err.response.data.message.rolname[0]
      }

      errors.value = {
        email: message, 
        password: ''
      }

      console.error('error', err.response.data)
    })
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            register()
        }
    })
}

</script>

<template>
    <VContainer class="mt-10">
        <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
            > 
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
                            <img :src="icon2" class="me-3"/>
                            <div class="d-block">
                                <span class="text-client text-left">Elige tu nombre</span> <br>
                                <span class="p-client text-left">Cuéntanos cómo quieres que te llamemos.</span>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Name"
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
                            <img :src="icon3" class="me-3"/>
                            <div cols="10" class="d-block">
                                <span class="text-client text-left">Valida tu teléfono</span> <br>
                                <span class="p-client text-left">Podrás usarlo para ingresar a tu cuenta.</span>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Teléfono"
                                v-model="phone"
                                variant="outlined"
                                :rules="[requiredValidator]"
                                :error-messages="errors.phone"
                                @input="inputChange()"
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
                        <VCol cols="12">
                            <VTextField
                                label="Contraseña"
                                variant="outlined"
                                v-model="password"
                                :error-messages="errors.password"
                                :rules="[requiredValidator]"
                                @input="inputChange()"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                            />
                        </VCol>
                        <VCol cols="12" class="d-flex text-start p-0">
                            <VCheckbox :rules="[requiredValidator]"/>
                            <div class="text1 ms-5 mt-2">
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
        color: #999;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        text-decoration: none; 
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }
    .card-register {
        padding: 28px 48px;
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

</style>