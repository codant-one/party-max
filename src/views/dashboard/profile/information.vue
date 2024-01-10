<script setup>

import icon_right from '@assets/icons/right-icon.svg';

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)

const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone

      console.log(phone.value)
    }
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

                    <VCol cols="3">
                        <span class="labels tw-text-tertiary">E-mail</span>
                    </VCol>
                    <VCol cols="7">
                        <span class="labels tw-text-gray">{{ usermail }}</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

            </VCard>
            <h6 class="data-subtitle tw-text-tertiary">Datos personales</h6>

            <VCard class="card-profile">

                <VRow align="center" class="mt-5 mb-10" no-gutters>

                    <VCol cols="3">
                        <span class="labels tw-text-tertiary">Nombre y apellido</span>
                    </VCol>
                    <VCol cols="7">
                        <span class="labels tw-text-gray">{{ name }}</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-10" no-gutters>

                    <VCol cols="3">
                        <span class="labels tw-text-tertiary">Documento</span>
                    </VCol>
                    <VCol cols="7">
                        <span class="labels tw-text-gray">123456</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

                <VRow align="center" class="mt-10 mb-5" no-gutters>

                    <VCol cols="3">
                        <span class="labels tw-text-tertiary">Teléfono</span>
                    </VCol>
                    <VCol cols="7">
                        <span class="labels tw-text-gray">{{ phone }}</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
                    </VCol>

                </VRow>

            </VCard>
        </VCol>
    </VRow>
    
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

.icon-right {
        width: 20px;
        margin: auto;
      
    }


</style>