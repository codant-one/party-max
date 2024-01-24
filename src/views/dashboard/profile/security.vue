<script setup>

import { useProfileStores } from '@/stores/profile';
import { confirmedValidator, passwordValidator, requiredValidator, phoneValidator} from '@validators'
import router from '@/router'

import icon_right from '@assets/icons/right-icon.svg';
import icon_candado from '@assets/icons/candado.svg';
import icon_email from '@assets/icons/icon-email.svg';
import icon_phone from '@assets/icons/icon-phone.svg';
import icon_auth from '@assets/icons/icon-authenticator.svg';
import festin_about from '@assets/images/festin-aboutus.jpg';
import festin_cancel from '@assets/images/festin_cancel.jpg';

const profileStores = useProfileStores()

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)
const refVForm = ref()
const password = ref()
const isPasswordVisible = ref(false)
const passwordConfirmation = ref()
const isConfirmPasswordVisible = ref(false)
const newphone = ref()
const message = ref()
const isError = ref(false)
const dialog = ref(false)
const isDialogVisible = ref(false)
const dialog_phone = ref(false)

const load = ref(false)

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

const errors_phone = ref({ newphone:undefined})
const inputChangeP = () =>{
    errors_phone.value = {
    newphone: undefined
  }
}


const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone
      newphone.value = userDataJ.user_details.phone

    }
  }

  me()

  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            load.value = true

            let data = {
                password: password.value,
                confirmPassword: passwordConfirmation.value
            }

            profileStores.change_password(data)
                .then(response => {

                    isDialogVisible.value = true
                    message.value = response.data
                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        router.push({ name: 'security_client' })
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

                    // console.error(err.message)
                })
        }
    })

  }

  const onSubmitP = ()=>{
    refVForm.value?.validate().then(({ valid: isValid }) => {
        load.value = true

        let data = {
            phone: newphone.value
        }

        profileStores.change_phone(data)
                .then(response => {

                    isDialogVisible.value = true
                    message.value = response.data
                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        router.push({ name: 'security_client' })
                    }, 5000)

                    load.value = false                    
                    
                }).catch(err => {

                    load.value = false

                    if(err.message === 'error'){
                        isDialogVisible.value = true
                        message.value = err.errors_phone
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

                    // console.error(err.message)
                })
    })
  }
</script>

<template>
 

  <VContainer class="mt-15 mb-15 container-dashboard">
   
    <VRow>
        <VCol cols="12" class="d-block">
            <h2 class="data-title">Métodos de verificación</h2>
            <h6 class="data-subtitle tw-text-tertiary">Los métodos de verificación sirven para confirmar que eres tú cuando inicias sesión.</h6>

            <VCard class="card-profile">

                <VRow align="center" class="mt-5 mb-10" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_candado" class="icons"/>
                    </VCol>
                    <VCol cols="8" class="d-block">
                        <span class="labels tw-text-tertiary">Contraseña</span><br>
                        <span class="labels tw-text-gray">Puedes actualizar tu contraseña.</span>
                    </VCol>
                    <VCol cols="1" class="text-right">
                        <v-btn variant="text" class="edit-button tw-text-tertiary" @click="dialog=true">
                            <VImg :src="icon_right" class="icon-right"/>
                        </v-btn>
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-10" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_email" class="icons"/>
                    </VCol>
                    <VCol cols="8" class="d-block">
                        <span class="labels tw-text-tertiary">E-mail</span><br>
                        <span class="labels tw-text-gray">{{ usermail }}</span>
                    </VCol>
                    <VCol cols="1" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-10" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_phone" class="icons"/>
                    </VCol>
                    <VCol cols="8" class="d-block">
                        <span class="labels tw-text-tertiary">Teléfono</span><br>
                        <span class="labels tw-text-gray">{{ phone }}</span>
                    </VCol>
                    <VCol cols="1" class="text-right">
                        <v-btn variant="text" class="edit-button tw-text-tertiary" @click="dialog_phone=true">
                            <VImg :src="icon_right" class="icon-right"/>
                        </v-btn>
                        
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-5" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_auth" class="icons"/>
                    </VCol>
                    <VCol cols="8" class="d-block">
                        <span class="labels tw-text-tertiary">Google Authenticator </span><br>
                        <span class="labels tw-text-gray">Actívalo para usar códigos de verificación.</span>
                    </VCol>
                    <VCol cols="1" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

            </VCard>
        </VCol>
    </VRow>


    <!--MODAL ACTUALIZAR DATOS-->
    <VDialog v-model="dialog" transition="dialog-top-transition">
            <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
            > 
                <VCard class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto card-form px-5">
                    
                    <VCardText class="text-register p-0 mb-5">
                        <v-container>
                            <v-row class="row-form">
                                <v-col cols="12" class="text-center">
                                    
                                        <h2 class="tw-text-primary">Actualizar contraseña</h2>
                        
                                </v-col>
                                <v-col
                                        cols="12"
                                        class="col-field"
                                >
                                    <VTextField
                                        label="Nueva Contraseña"
                                        variant="outlined"
                                        v-model="password"
                                        :error-messages="errors.password"
                                        :rules="[requiredValidator, passwordValidator]"
                                        @input="inputChange()"
                                        :type="isPasswordVisible ? 'text' : 'password'"
                                        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
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
                                </v-col>

                                <v-col cols="12">
                                    <VBtn
                                        variant="flat"
                                        :width="288"
                                        :height="48"
                                        block
                                        type="submit"
                                        class="btn-register tw-text-white tw-bg-primary button-hover"
                                    >
                                        Cambiar contraseña
                                        <VProgressCircular
                                            v-if="load"
                                            indeterminate
                                            color="#fff"
                                        />
                                    </VBtn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </VCardText>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            variant="text"
                            class="text-close"
                            @click="dialog = false"
                        >
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </VCard>
            </VForm>
        </VDialog>

        <!--MODAL ACTUALIZAR NÚMERO DE TELÉFONO-->

        <VDialog v-model="dialog_phone" transition="dialog-top-transition">
            <VForm
            ref="refVForm"
            @submit.prevent="onSubmitP"
            > 
                <VCard class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto card-form px-5">
                    
                    <VCardText class="text-register p-0 mb-5">
                        <v-container>
                            <v-row class="row-form">
                                <v-col cols="12" class="text-center">
                                    
                                        <h2 class="tw-text-primary">Actualizar número de teléfono</h2>
                        
                                </v-col>
                                <v-col
                                        cols="12"
                                        class="col-field"
                                >
                                    <VTextField
                                        label="Teléfono"
                                        v-model="newphone"
                                        variant="outlined"
                                        :rules="[requiredValidator,phoneValidator]"
                                        :error-messages="errors.newphone"
                                        @input="inputChangeP()"
                                    />
                                </v-col>

                                <v-col cols="12">
                                    <VBtn
                                        variant="flat"
                                        :width="288"
                                        :height="48"
                                        block
                                        type="submit"
                                        class="btn-register tw-text-white tw-bg-primary button-hover"
                                    >
                                        Cambiar número de teléfono
                                        <VProgressCircular
                                            v-if="load"
                                            indeterminate
                                            color="#fff"
                                        />
                                    </VBtn>
                                </v-col>

                            </v-row>
                        </v-container>
                    </VCardText>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            variant="text"
                            class="text-close"
                            @click="dialog_phone = false"
                        >
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </VCard>
            </VForm>
        </VDialog>



        <!--PopUp de respuesta-->

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
.container-dashboard {
        padding: 10px 200px;
    }
.data-title
{

    color: #0A1B33;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;

}

.data-subtitle
{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.card-profile {
        padding: 16px 32px;
        margin-top: 24px;
        border-radius: 16px;
        box-shadow: none;
    }
.labels
{
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
}

.icon-right {
        width: 20px;
        margin: auto;
      
    }
.icons
{
    width: 56px;
    height: 56px;
    border-radius: 27px;
    border: 1px solid var(--Grey-2, #E1E1E1);
    background: var(--White, #FFF);
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
        font-size: 14px !important;
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


.card-register
    {
        border-radius: 32px!important;
    }

    .card-form
    {
        width: 600px;
    }

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 20px;
        }

        .card-form
        {
            width: 350px;
        }
    }   


</style>