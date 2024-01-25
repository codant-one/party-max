<script setup>

import icon_more from '@assets/icons/more-vertical.svg';
import icon_address from '@assets/icons/icon-domicilio.svg';
import icon_right from '@assets/icons/right-pink.svg?inline';

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)
const dialog = ref(false)

const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone

    }
  }

  me()
</script>

<template>
 

  <VContainer class="mt-15 mb-15 container-dashboard">
   
    <VRow>
        <VCol cols="12" class="d-block">
            <h2 class="data-title">Domicilios</h2>

            <VCard class="card-profile">

                <VRow align="center" class="mt-5 mb-10" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_address" class="icons"/>
                    </VCol>
                    <VCol cols="7" class="d-block">
                        <span class="labels tw-text-tertiary">Carrera 102 # 155 - 50</span><br>
                        <span class="labels tw-text-gray">Bogotá D.C.</span> <br>
                        <span class="labels tw-text-gray">{{ name }}</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_more" class="icon-more"/>
                    </VCol>

                </VRow>

                <VRow align="center" no-gutters class="address/add">
                    <VCol cols="10">
                        <span class="labels tw-text-primary">Agregar domicilio</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <v-btn variant="plain" @click="dialog=true">
                            <icon_right class="icon-right"></icon_right>
                        </v-btn>
                    </VCol>
                </VRow>

            </VCard>
        </VCol>
    </VRow>


    <!--MODAL ACTUALIZAR DATOS-->
    <VDialog v-model="dialog" transition="dialog-top-transition">
        <VForm
            @submit.prevent="onSubmit"
        > 
                <VCard class="py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto card-form">
                    
                    <VCardText class="text-register p-0 mb-5">
                        <v-container>
                            <v-row class="row-form">
                                <v-col cols="12" class="text-center">
                                    
                                        <h2>AGREGAR NUEVA DIRECCIÓN</h2>
                        
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="6"
                                        class="col-field"
                                >
                                    <v-text-field
                                        label="Departamento"
                                        variant="outlined"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Ciudad"
                                        variant="outlined"
                                        
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        label="Teléfono de contacto"
                                        variant="outlined"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Calle o avenida"
                                        variant="outlined"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Dirección"
                                        variant="outlined"
                                        required
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
                                        Agregar dirección
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

.icon-right 
    {
        cursor: pointer;
      
    }
.icon-more
{
    width: 24px;
    height: 24px;
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

.address-add
{
    padding: 24px;
    border-top: 1px solid var(--Grey-2, #E1E1E1);
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
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
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
            padding: 0px 20px;
        }

        .card-form
        {
            width: 350px;
        }
    }



</style>