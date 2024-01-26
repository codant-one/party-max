<script setup>

import { ref } from 'vue'
import { useFavoritesStores } from '@/stores/favorites'
import Loader from '@/components/common/Loader.vue'
import Product7 from '@/components/product/Product7.vue'

const favoritesStores = useFavoritesStores()

const products = ref([])
const user_id = ref(null)
const isLoading = ref(true)

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true

   if(localStorage.getItem('user_data')) {
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)

        user_id.value = userDataJ.id  
    }

    await favoritesStores.fetchFavorites({ user_id: user_id.value })
    products.value = favoritesStores.getData

    isLoading.value = false
}

const isLastItem = (index) => {
    return index === products.value.length - 1;
}

const deleteFavorite = async (product_id) => {

    await favoritesStores.delete({
        user_id: user_id.value, 
        product_id: product_id
    })

    fetchData()
 
}

</script>

<template>
    <Loader :isLoading="isLoading"/>
    <VContainer class="mt-1 mt-md-10 container-dashboard">
        <h2 class="data-title mt-5">Favoritos</h2>
        <VCard class="card-profile px-0 py-0" v-if="products.length > 0">
            {{  }}
            <Product7
                v-for="(product, i) in products"
                :key="i"
                :product="product"
                :readonly="true"
                :isLastItem="isLastItem(i)"
                @delete="deleteFavorite"/>
        </VCard>
  </VContainer>
</template>

<style scoped>
    .container-dashboard {
        padding: 10px 200px;
    }
    .data-title {
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

    .image-product {
        width: 173.96px;
        height: 173.96px;
        max-width: 173.96px;
        border-radius: 16px;
        border: 1px solid var(--Light-Cyan-1, #E2F8FC);
        background: lightgray 0px 0px / 100% 100% no-repeat;
    }
    .row-summary {
        padding: 24px;
        justify-content: space-between;
        align-items: center;
    }

    .text-status {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
    }
    .text-price {
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
    }

    @media only screen and (max-width: 767px) {
        .container-dashboard {
            padding: 0px 20px;
        }
    }
</style>