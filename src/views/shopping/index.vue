<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import router from '@/router'

const homeStores = useHomeStores()
const data = ref(null)
const bg = ref('tw-bg-cyan')

const isLoading = ref(true)

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()
  data.value = homeStores.getData
 
  isLoading.value = false
}

const redirect = (name) => {
    router.push({ name : name})
}

</script>


<template>
    <VContainer class="mt-10">

        <VRow>
            <VCol cols="12" md="8">
                <VCard class="card-products">
                    <h2 class="title-card">Productos</h2>
                    <VRow class="row-cardp">
                        detalle producto
                    </VRow>
                    <VRow class="row-cardp2">
                        detalle producto 2
                    </VRow>
                    <VRow class="row-cardp3">
                        <VCol cols="12" md="6" class="text-left">
                            <span>Envío</span>
                        </VCol>

                        <VCol cols="12" md="6" class="text-right">
                           <h4>$0.000</h4> 
                        </VCol>
                    </VRow>
                </VCard>

            </VCol>



            <VCol cols="12" md="4">

                <VCard class="card-buy">
                    <h3 class="subtitle-card">Resumen de compra</h3>
                    <VRow class="row-buy">
                        <VCol cols="12" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <span>$5.600</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-left">
                            <span>Envío</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <span>$2.000</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-left">
                            <h4>Total</h4>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <h4>$7.600</h4>
                        </VCol>
                        <VCol cols="12" style="padding:24px 0px;">
                            <VBtn
                            variant="flat"
                            width="100%"
                            style="border-radius:32px;"
                            class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                            @click="redirect('shopping_delivery')">
                                Continuar compra
                            </VBtn>
                        </VCol>

                    </VRow>
                </VCard>

            </VCol>
        </VRow>

        <!--SECCIÓN PRODUCTOS RECOMENDADOS-->

        <VRow class="row-recomendados">
           <VCol cols="12" style="border-bottom: 1px solid #0A1B33;">
            <VRow style="padding:16px 0px;">
                <VCol cols="12" md="6" class="text-left">
                    <h3>Recomendaciones que te pueden interesar</h3>
                </VCol>
                <VCol cols="12" md="6" class="text-right">
                    <span>Ver todos</span>
                </VCol>
            </VRow>
           </VCol>
           
           <VCol cols="12">
                <VCard class="mt-1 no-shadown card-information p-0" style="background:none;">
                    <VCardText class="px-0 mt-3 mb-3 d-flex align-items-stretch justify-content-between" v-if="data">
                        <Product1 
                            v-for="(product, i) in data.recommendations"
                            :key="i"
                            :product="product"
                            :readonly="true"
                            :bg="bg"/>
                    </VCardText> 
                </VCard> 
           </VCol>
        </VRow>

    </VContainer>
</template>

<style scoped>

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
    }

    .card-buy {
        background-color:#FFFFFF;
        padding:24px 32px;
        border-radius: 24px;
    }

    .title-card {
        color: #0A1B33;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .subtitle-card {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .row-cardp {
        border-bottom: 1px solid #D9EEF2;
        border-top: 1px solid #D9EEF2;
        margin-top:16px;
        height:100px;
        padding: 32px;
    }

    .row-cardp2 {
        border-bottom: 1px solid #D9EEF2;
        height:100px;
        padding: 32px;

    }

    .row-cardp3 {
        padding: 16px 32px;
    }

    .row-cardp3 span {
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .row-cardp3 h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-buy {
        margin-top:24px;
        border-top: 1px solid #D9EEF2;
    }

    .row-buy span {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .row-buy h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .row-recomendados {
        padding: 16px;
        margin-top:16px;
    }

    .row-recomendados h3 {
        color:#0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 28.8px;
    }

    .row-recomendados span {
        color:#0A1B33;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
    }

</style>