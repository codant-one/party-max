<script setup>

import icon_more from '@assets/icons/more-vertical.svg';
import icon_right from '@assets/icons/right-pink.svg';
import image_product from '@assets/images/product_2.png'
import router from '@/router'

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)



const redirect = (name) => {
    router.push({ name : name})
}

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
            <h2 class="data-title">Mis Compras</h2>

            <VCard class="card-profile">


                <VRow align="center">

                    <VCol cols="12" class="col-date">
                        <span class="text-date tw-text-tertiary">18 de diciembre de 2023</span>
                    </VCol>
                    <VRow align="center" class="row-summary">

                        <VCol cols="12" md="3" class="d-flex justify-center">
                            <VImg :src="image_product" class="image-product"/>
                        </VCol>
                        <VCol cols="12" md="6" class="d-block">
                           <span class="text-status tw-text-secondary">Entregado</span> <br>
                           <span class="name-product tw-text-tertiary">Edifier Powered Bookshelf Speakers</span> <br>
                           <span class="text-status tw-text-gray">1 unidad</span>
                        </VCol>
                        <VCol cols="12" md="3" class="text-center">
                            <VBtn
                                class="btn-compra tw-text-tertiary"
                                @click="redirect('detail_pusher')"
                            >
                                Ver compra
                            </VBtn>

                            <VBtn
                                class="btn-comprar tw-bg-primary tw-text-white"
                                @click="redirect('form_supplier')"
                            >
                                Volver a comprar
                            </VBtn>
                        </VCol>
                    </VRow>
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

.text-date
{
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
}

.col-date
{
    padding: 16px 24px;
    border-bottom: 1px solid var(--Grey-2, #E1E1E1);
}

.image-product
{
    width: 173.96px;
    height: 173.96px;
    max-width: 173.96px;
    border-radius: 16px;
    border: 1px solid var(--Light-Cyan-1, #E2F8FC);
    background: lightgray 0px 0px / 100% 100% no-repeat;
}
.row-summary
{
    padding: 24px;
    justify-content: space-between;
    align-items: center;
}

.text-status
{
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
}

.name-product
{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.btn-compra
{
    border-radius: 32px;
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
    width: 177px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    box-shadow: none;
}

.btn-comprar
{
    border-radius: 32px;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    box-shadow: none;
    margin-top: 16px;
}

.btn-comprar:hover
{
    background: var(--Magenta-Party-500, #FF27B3);
    box-shadow: 0px 0px 24px 0px #FF27B3;
}

.btn-compra:hover
{
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
    background: var(--Maastricht-Blue, #0A1B33);
    color: #FFFFFF!important;
}

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 16px;
        }

        .btn-compra
        {
            width: 100%;
        }

        .btn-comprar
        {
            width: 100%;
        }

    }



</style>