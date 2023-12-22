<script setup>

import { useAuthStores } from '@/stores/auth'
import { emailValidator, requiredValidator } from '@validators'
import router from '@/router'
import festin_image2 from '@assets/images/festin-register.jpg';
import icon2 from '@assets/icons/input-user.svg';
import icon4 from '@assets/icons/icon-password.svg';

const authStores = useAuthStores()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()
const isPasswordVisible = ref(false)
const email = ref('')
const password = ref('')
const remember_me = ref(true)
const load = ref(false)

watchEffect(fetchData)

async function fetchData() {

  remember_me.value = (localStorage.getItem('remember_me') === 'true') ? true : false
  email.value = localStorage.getItem('email') ?? ''
  password.value = localStorage.getItem('password') ?? ''
  
}

const inputChange = () => {
  errors.value = {
    email: undefined, 
    password: undefined
  }
}

const login = () => {
  load.value = true

  let data = {
    email: email.value,
    password: password.value,
  }

  authStores.login(data)
    .then(response => {
        load.value = false

        const { qr, token, accessToken, user_data, userAbilities } = response.data     
        const two_factor = { generate_qr: (response.message === '2fa-generate') ? true : false }       

        localStorage.setItem('userAbilities', JSON.stringify(userAbilities))      
        localStorage.setItem('user_data', JSON.stringify(user_data))
        localStorage.setItem('accessToken', accessToken)     
        localStorage.setItem('qr', qr)
        localStorage.setItem('token', token)
        localStorage.setItem('two_factor', JSON.stringify(two_factor)) 

        localStorage.setItem('remember_me', remember_me.value);

        if(remember_me.value){
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);
        } else {
            localStorage.setItem('email', '');
            localStorage.setItem('password', ''); 
        }

        router.push({ name: 'dashboard' }).catch(() => {}).finally(() => {
            location.reload(true);
        });
    }).catch(err => {

      load.value = false

      errors.value = {
        email: err.response.data.errors, 
        password: ''
      }

      console.error('error', err.response.data)
    })
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            login()
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
            <VRow no-gutters>
                <VCard
                    :width="500" 
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
                            <VCol cols="12" class="mb-1">
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

                            <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon4" class="me-3"/>
                            <div cols="10" class="d-block">
                                <span class="text-client text-left">Contraseña</span> <br>
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
                        </VRow>
                    </VCardItem>
                    <VCardText class="d-flex align-center flex-wrap justify-space-between pb-0">
                        <VCheckbox
                            v-model="remember_me" 
                            label="Recordar mi cuenta"/>
                        <router-link
                            class="letter hover:tw-text-primary"
                            :to="{ name: 'home' }"
                        >
                            ¿Olvidaste su contraseña?
                        </router-link>
                    </VCardText>
                    <VCardText class="d-block align-center text-center justify-content-center">
                        <VBtn
                            variant="flat"
                            :width="288"
                            :height="48"
                            block
                            type="submit"
                            class="btn-register tw-text-white tw-bg-primary button-hover"
                        >
                            Iniciar sesión
                            <VProgressCircular
                                v-if="load"
                                indeterminate
                                color="#fff"
                            />
                        </VBtn>
                    </VCardText>
                    
                </VCard>
            </VRow>
        </VForm>
    </VContainer>    
</template>

<style scoped>

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }

    .letter {
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
        margin-left: 10px;
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

    /* .v-text-field::v-deep(.v-input__details) { 
        padding: 0;
        height: 0;
        min-height: 0;
    } */


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