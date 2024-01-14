<script setup>

import icon_right from '@assets/icons/right-icon.svg';
import icon_candado from '@assets/icons/candado.svg';
import icon_email from '@assets/icons/icon-email.svg';
import icon_phone from '@assets/icons/icon-phone.svg';
import icon_auth from '@assets/icons/icon-authenticator.svg';

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
            <h2 class="data-title">Métodos de verificación</h2>
            <h6 class="data-subtitle tw-text-tertiary">Los métodos de verificación sirven para confirmar que eres tú cuando inicias sesión.</h6>

            <VCard class="card-profile">

                <VRow align="center" class="mt-5 mb-10" no-gutters>

                    <VCol cols="3">
                        <VImg :src="icon_candado" class="icons"/>
                    </VCol>
                    <VCol cols="7" class="d-block">
                        <span class="labels tw-text-tertiary">Contraseña</span><br>
                        <span class="labels tw-text-gray">Puedes actualizar tu contraseña.</span>
                    </VCol>
                    <VCol cols="2" class="text-right">
                        <VImg :src="icon_right" class="icon-right"/>
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
                        <VImg :src="icon_right" class="icon-right"/>
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

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 16px;
        }
    }   


</style>