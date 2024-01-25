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

            <VCard class="card-profile">
                <VRow align="center">
                    
                    <VRow align="center" class="row-summary">

                        <VCol cols="12" md="3" class="d-flex justify-center">
                            <VImg :src="image_product" class="image-product"/>
                        </VCol>
                        <VCol cols="12" md="6" class="d-block">
                           <span class="name-product tw-text-tertiary">Edifier Powered Bookshelf Speakers</span> <br>
                           <span class="text-status tw-text-gray">#2000007185463638</span>
                        </VCol>
                        <VCol cols="12" md="3" class="text-center">

                            <VBtn
                                class="btn-comprar tw-bg-primary tw-text-white"
                                @click="redirect('my_purchases')"
                            >
                                Volver a comprar
                            </VBtn>
                        </VCol>
                    </VRow>
                </VRow>
            </VCard>

            <VCard class="card-profile">
                <VRow align="center" class="row-summary">
                    <VCol cols="12" md="6">
                        <span class="text-opinion tw-text-primary">Tu opinión es importante</span>
                    </VCol>
                    <VCol cols="12" md="4" class="text-center">
                        <v-rating
                            hover
                            :length="5"
                            :size="32"
                            :model-value="3"
                            active-color="yellow"
                         />
                    </VCol>
                    <VCol cols="12" md="2" class="col-editar">
                        <span class="text-editar tw-text-tertiary">Editar opinión</span>
                    </VCol>
                </VRow>
            </VCard>

            <!--DETALLES DE LA COMPRA-->

            <VCard class="card-profile">
                <VRow align="center" class="row-summary">
                    <VCol cols="12" class="col-detalle">
                        <span class="tw-text-tertiary">Detalle de la compra</span>
                    </VCol>

                    <VCol cols="12">
                        <VRow align="center">
                            <VCol cols="6">
                                <span class="text-editar tw-text-tertiary">Productos</span>
                            </VCol>
                            <VCol cols="6 text-right">
                                <span class="text-editar tw-text-tertiary">$567.99</span>
                            </VCol>
                        </VRow>

                        <VRow align="center">
                            <VCol cols="6">
                                <span class="text-editar tw-text-tertiary">Envío</span>
                            </VCol>
                            <VCol cols="6 text-right">
                                <span class="text-editar tw-text-tertiary">$000.00</span>
                            </VCol>
                        </VRow>

                        <VRow align="center">
                            <VCol cols="6">
                                <span class="text-editar tw-text-tertiary tw-font-bold">Total</span>
                            </VCol>
                            <VCol cols="6 text-right">
                                <span class="text-editar tw-text-tertiary tw-font-bold">$567.99</span>
                            </VCol>
                        </VRow>
                    </VCol>
                </VRow>
            </VCard>

            <!--DATOS DE ENTREGA-->

            <VCard class="card-profile">
                <VRow align="center">
                    <VCol cols="12">
                        <span class="text-editar tw-text-secondary">Entregado</span>
                    </VCol>

                    <VCol cols="12">
                        <span class="text-date tw-text-tertiary">Llegó el 18 de diciembre</span>
                    </VCol>

                    <VCol cols="12">
                        <span class="text-editar tw-text-tertiary">Entregamos tu paquete en Carrera 102 #120-40, Pinar de Suba, Suba, Bogotá D.C..</span>
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

.card-profile {
        padding: 16px 32px;
        margin-top: 24px;
        border-radius: 16px;
        box-shadow: none;
    }

.text-opinion
{
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
} 

.text-editar
{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
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

.col-detalle
{
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--Light-Cyan-3, #D9EEF2);
}

.col-detalle span
{
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.text-date
{
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
}

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 20px;
        }

        .btn-comprar
        {
            width: 100%;
        }

        .col-editar
        {
            text-align: center;
        }

    }



</style>