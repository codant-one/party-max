<script setup>

import icon_more from '@assets/icons/more-vertical.svg';
import icon_right from '@assets/icons/right-pink.svg';
import image_product from '@assets/images/product_2.png'

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
            <h2 class="data-title">Favoritos</h2>

            <VCard class="card-profile">


                <VRow align="center">

                    <VRow align="center" class="row-summary">

                        <VCol cols="3">
                            <VImg :src="image_product" class="image-product"/>
                        </VCol>
                        <VCol cols="9" class="d-block">
                            <span class="name-product tw-text-tertiary">Edifier Powered Bookshelf Speakers</span> <br><br>
                            <span class="text-price tw-text-tertiary">$567.99</span> <br> <br>
                           <span class="text-status tw-text-primary">Eliminar</span>
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

.text-price
{
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
}


</style>