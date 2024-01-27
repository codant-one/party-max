<script setup>

import { ref } from 'vue'
import { useOrdersStores } from '@/stores/orders'
import Loader from '@/components/common/Loader.vue'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import icon_more from '@assets/icons/more-vertical.svg';
import icon_right from '@assets/icons/right-pink.svg';
import image_product from '@assets/images/product_2.png'
import router from '@/router'

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)
const client_id = ref(null)
const isLoading = ref(true)

const ordersStores = useOrdersStores()

const orders = ref(null)
const products = ref(null)


//router.push({ name: 'somewhere', params: { oops: 'gets removed' } })

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

  watchEffect(fetchData)

  async function fetchData() {
    
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone
      client_id.value = userDataJ.client.id
    }

    isLoading.value = true

    await ordersStores.show_by_client(client_id.value)
    orders.value = ordersStores.getData
    products.value = orders.value.products

    isLoading.value = false

  }

</script>

<template>
 

  <VContainer class="mt-15 mb-15 container-dashboard">
   
    <VRow>
        <VCol cols="12" class="d-block">
            <h2 class="data-title">Mis Compras</h2>

            <VCard class="card-profile" v-for="(order, i) in orders">


                <VRow align="center">

                    <VCol cols="12" class="col-date">
                        <span class="text-date tw-text-tertiary">{{  format(order.order_date, 'MMMM d, yyyy', { locale: es }).replace(/(^|\s)\S/g, (char) => char.toUpperCase()) }}</span>
                    </VCol>
                </VRow>
                    <VRow align="center" class="row-summary">

                       <VCol cols="12" md="3" class="d-flex justify-center">
                            <VImg :src="baseURL + order.products[0].product_image" class="image-product"/>
                        </VCol>
                        <VCol cols="12" md="6" class="d-block">
                           <span class="text-status tw-text-secondary">Entregado</span> <br>
                           <span class="name-product tw-text-tertiary">{{ order.products[0].product_name}}</span> <br>
                           <span class="text-status tw-text-gray">{{ order.products[0].quantity }}</span>
                        </VCol>
                        <VCol cols="12" md="3" class="text-center">

                           

                            <router-link
                                :to="{
                                    name: 'detail_pusher',
                                    params: {
                                        id: order.order_id
                                    }
                                }"
                                class="tw-no-underline">
                                <VBtn
                                class="btn-compra tw-text-tertiary"
                                >
                                    Ver compra
                                </VBtn>
                                
                            </router-link>
                            

                            <VBtn
                                class="btn-comprar tw-bg-primary tw-text-white"
                                @click="redirect('form_supplier')"
                            >
                                Volver a comprar
                            </VBtn>
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

.address-add
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
            padding: 0px 20px;
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