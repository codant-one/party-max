<script setup>

import icon_more from '@assets/icons/more-vertical.svg';
import icon_address from '@assets/icons/icon-domicilio.svg';
import icon_right from '@assets/icons/right-pink.svg';

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

                <VRow align="center" no-gutters class="add-address">
                    <VCol cols="10">
                        <span class="labels tw-text-primary">Agregar domicilio</span>
                    </VCol>
                    <VCol cols="2">
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
    width:8px; 
    height:13px;
    margin: auto;
      
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

.add-address
{
    padding: 24px;
    border-top: 1px solid var(--Grey-2, #E1E1E1);
}

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 16px;
        }
    }



</style>