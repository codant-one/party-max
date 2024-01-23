<script setup>

import { useProfileStores } from '@/stores/profile'
import { requiredValidator } from '@validators'
import router from '@/router'

import icon_right from '@assets/icons/right-icon.svg';
import festin_about from '@assets/images/festin-aboutus.jpg';
import festin_cancel from '@assets/images/festin_cancel.jpg';

const profileStores = useProfileStores()

const load = ref(false)
const refVForm = ref()

const name = ref(null)
const first_name = ref(null)
const last_name = ref(null)
const usermail= ref(null)
const phone= ref(null)
const document= ref(null)
const country = ref(null)
const address = ref(null)
const dialog = ref(false)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)

const newfname = ref(null) 
const newlname = ref(null)
const newdocument = ref(null)
const newaddress = ref(null)
const newbirthday = ref(null)
const newgender = ref(null)
const newprovince = ref(null)
const newusername = ref(null)

const errors = ref({
  newfname: undefined,
  newlname: undefined,
  newdocument: undefined,
  newaddress: undefined,
  newbirthday: undefined,
  newgender: undefined,
  newprovince: undefined,
  newusername: undefined
})


const inputChange = () => {
  errors.value = {
    newfname: undefined,
    newlname: undefined,
    newdocument: undefined,
    newaddress: undefined,
    newbirthday: undefined,
    newgender: undefined,
    newprovince: undefined,
    newusername: undefined
  }
}


const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      console.log(userDataJ)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      first_name.value = userDataJ.name
      last_name.value = userDataJ.last_name
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone
      document.value = userDataJ.user_details.document 
      country.value = userDataJ.user_details.province.country.name
      address.value = userDataJ.user_details.address

      newfname.value = userDataJ.name
      newlname.value = userDataJ.last_name
      newdocument.value = userDataJ.user_details.document
      newaddress.value = userDataJ.user_details.address
      newbirthday.value = userDataJ.client.birthday
      newgender.value = userDataJ.client.gender_id 
      newprovince.value = userDataJ.user_details.province_id 
      newusername.value = userDataJ.username

    }
  }

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {

            load.value = true

            let data = {
                name: newfname.value,
                last_name: newlname.value,
                document: newdocument.value,
                address: newaddress.value,
                gender_id: newgender.value,
                province_id: newprovince.value,
                username: newusername.value,
                birthday: newbirthday.value
            }

            profileStores.update_profile(data)
                .then(response => {
                    isDialogVisible.value = true
                    message.value = response.data
                    

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        router.push({ name: 'information_client' })
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
  
me() 
</script>

<template>
 

  <VContainer class="mt-15 mb-15 container-dashboard">
   
    <VRow>
        <VCol cols="12" class="d-block">
            <h2 class="data-title">Mis datos</h2>
            <h6 class="data-subtitle tw-text-tertiary">Datos de cuenta</h6>

            <VCard class="card-profile">

                <VRow align="center" no-gutters>

                    <VCol cols="4">
                        <span class="labels tw-text-tertiary">E-mail</span>
                    </VCol>
                    <VCol cols="8" class="col-info">
                        <span class="labels tw-text-gray">{{ usermail }}</span>
                    </VCol>

                </VRow>

            </VCard>
            <h6 class="data-subtitle tw-text-tertiary">Datos personales</h6>

            <VCard class="card-profile">

                <VRow align="center">
                    <VCol cols="12" class="col-edit text-right">

                        <v-btn variant="plain" class="edit-button" @click="dialog=true">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit icon-edit" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                            <path d="M16 5l3 3" />
                                        </svg>
                        </v-btn>
                    </VCol>
                </VRow>


                <VRow align="center" class="mt-5 mb-10" no-gutters>
                    <VCol cols="4">
                        <span class="labels tw-text-tertiary">Nombre y apellido</span>
                    </VCol>
                    <VCol cols="8" class="col-info">
                        <span class="labels tw-text-gray">{{ name }}</span>
                    </VCol>
                </VRow>

                <VRow align="center" class="mt-10 mb-10" no-gutters>

                    <VCol cols="4">
                        <span class="labels tw-text-tertiary">País</span>
                    </VCol>
                    <VCol cols="8" class="col-info">
                        <span class="labels tw-text-gray">{{ country }}</span>
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-10" no-gutters>

                    <VCol cols="4">
                        <span class="labels tw-text-tertiary">Documento</span>
                    </VCol>
                    <VCol cols="8" class="col-info">
                        <span class="labels tw-text-gray">{{ document }}</span>
                    </VCol>

                </VRow>
  
                
                <VRow align="center" class="mt-10 mb-5" no-gutters>

                    <VCol cols="4">
                        <span class="labels tw-text-tertiary">Dirección</span>
                    </VCol>
                    <VCol cols="8" class="col-info">
                        <span class="labels tw-text-gray">{{ address }}</span>
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
                <VCard class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto card-form">
                    
                    <VCardText class="text-register p-0 mb-5">
                        <v-container>
                            <v-row class="row-form">
                                <v-col cols="12" class="text-center">
                                    
                                        <h2>ACTUALIZAR DATOS</h2>
                        
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="6"
                                        class="col-field"
                                >
                                    <v-text-field
                                        label="Nombre"
                                        v-model="newfname"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newfname"
                                        @input="inputChange()"
                                        
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Apellido"
                                        v-model="newlname"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newlname"
                                        @input="inputChange()"
                                        
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Username"
                                        v-model="newusername"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newusername"
                                        @input="inputChange()"
                                        
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Fecha de nacimiento"
                                        v-model="newbirthday"
                                        type="date"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newbirthday"
                                        @input="inputChange()"
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Nro Documento"
                                        v-model="newdocument"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newdocument"
                                        @input="inputChange()"
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Genero"
                                        v-model="newgender"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newgender"
                                        @input="inputChange()"
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="País"
                                        v-model="newprovince"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newprovince"
                                        @input="inputChange()"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Dirección"
                                        v-model="newaddress"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        :error-messages="errors.newaddress"
                                        @input="inputChange()"
                                    ></v-text-field>
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
                                        Actualizar datos
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

 
.col-edit
{
    padding: 16px 24px;
    border-bottom: 1px solid var(--Grey-2, #E1E1E1);
    margin-bottom: 16px;
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
    font-weight: 600;
    line-height: normal;
    margin-top: 32px;
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

.icon-edit 
{
    stroke:#FF0090; 
      
}

.link-menu
{
    text-decoration: none;
}



.edit-button
{
    box-shadow: none;
}

.edit-button .icon-edit:hover
{
    stroke:#FF27B3; 
    transform: scale(1.2);
}

.text-close
{
    font-size:18px;
    font-weight: 700;
}


.row-form
{
    padding: 0px 32px;
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
        width: 800px;
    }
    @media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 16px;
        }
        .labels
        {
            font-size: 13px;
        }

        .col-info
        {
            padding-left: 16px!important;
        }

        .card-form
        {
            width: 350px;
        }
    }    


</style>