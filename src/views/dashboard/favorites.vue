<script setup>


import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import { useFavoriteStores } from '@/stores/favorites'

import icon_more from '@assets/icons/more-vertical.svg';
import icon_right from '@assets/icons/right-pink.svg';
import image_product from '@assets/images/product_2.png'
import Product7 from '@/components/product/Product7.vue'

const name = ref(null)
const usermail= ref(null)
const phone= ref(null)

const homeStores = useHomeStores()
const miscellaneousStores = useMiscellaneousStores()
const favoriteStores = useFavoriteStores()

const products = ref([])

const user_id = ref(null)
const isLoading = ref(true)


const me = async () => {
    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')
      usermail.value = userDataJ.email
      phone.value = userDataJ.user_details.phone
      user_id.value = userDataJ.id  
    }
  }

  
watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true


  await favoriteStores.show_favorites(user_id.value)
  products.value = favoriteStores.getData

  console.log('favoritos: ',products.value)

  isLoading.value = false
}

const redirect = (name) => {
    router.push({ name : name})
}

const isLastItem = (index) => {
  return index === products.length - 1;
}

const deleteFavorite = (product_id) => {

    let data = {
                user_id: user_id.value,
                product_id: product_id,
            }

            favoriteStores.delete_favorite(data)
 
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

                        <VCol cols="12" md="9" class="d-block">
                          <!--  <span class="name-product tw-text-tertiary">Edifier Powered Bookshelf Speakers</span> <br><br>
                            <span class="text-price tw-text-tertiary">$567.99</span> <br> <br>
                           <span class="text-status tw-text-primary">Eliminar</span>-->

                           <Product7
                                v-for="(product, i) in products"
                                :key="i"
                                :product="product"
                                :readonly="true"
                                :isLastItem="isLastItem(i)"
                                @delete="deleteFavorite"/>
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

@media only screen and (max-width: 767px) 
    {
        .container-dashboard
        {
            padding: 0px 20px;
        }
    }



</style>