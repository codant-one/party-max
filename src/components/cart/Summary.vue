<script setup>

import Product5 from '@/components/product/Product5.vue'
import Service5 from '@/components/service/Service5.vue'
import { formatNumber } from '@formatters'

const props = defineProps({
    products: {
        type: Object,
        required: true
    },
    summary: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'update:currentStep',
    'deleteProduct',
    'deleteService',
    'addCart'
])

const isLastItem = (index) => {
  return index === props.products.length - 1;
}

const addCart = (data) => {
    emit('addCart', data)
}

</script>

<template>
   <VRow>
        <VCol cols="12" md="8">
            <VCard class="card-products p-0">
                <VCardTitle class="title-card mt-4 ms-4 px-2 px-md-5">Productos</VCardTitle>
                <VCardText class="row-cardp p-0">
                    <template v-for="(item, i) in props.products" :key="i">
                        <Product5  
                            v-if="item.type === 0"                          
                            :product="item"
                            :readonly="true"
                            :isLastItem="isLastItem(i)"
                            @delete="emit('deleteProduct', item.product_color_id)"
                            @addCart="addCart"
                            />
                        <Service5
                            v-else
                            :service="item"
                            :readonly="true"
                            :type="item.type"
                            :isLastItem="isLastItem(i)"
                            @delete="emit('deleteService', item.id)"
                            @addCart="addCart"
                            />
                    </template>
                </VCardText>
            </VCard>
        </VCol>
        <VCol cols="12" md="4">
            <VCard class="card-products p-0">
                <VCardTitle class="subtitle-card row-buy mt-4 px-5 px-md-10 pt-4 pb-8">Resumen de compra</VCardTitle>
                <VCardText class="px-5 px-md-10 mt-5">
                    <VRow>
                        <VCol cols="7" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <span>${{ formatNumber(props.summary.subTotal) }}</span>
                        </VCol>
                        <VCol cols="7" md="6" class="text-left">
                            <h4>Subtotal</h4>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <h4>${{ formatNumber(props.summary.subTotal) }}</h4><!--Cambie total por subtotal-->
                        </VCol>
                        <VCol cols="12" style="padding:24px 0px;">
                            <VBtn
                                variant="flat"
                                width="100%"
                                style="border-radius:32px;"
                                class="btn-register tw-text-white tw-bg-primary button-hover mt-2"
                                @click="emit('update:currentStep', 1)">
                                    Continuar compra
                            </VBtn>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
        height: 54px;
    }
    
    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
        box-shadow: none;
    }

    .card-buy {
        background-color:#FFFFFF;
        padding:24px 32px;
        border-radius: 24px;
        box-shadow: none;
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
        margin-top:11px;
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
        border-bottom: 1px solid #D9EEF2;
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

    .festin-icon {
        width: 67.741px;
        height: 131px;
    }

    .card-timeline {
        padding: 16px 0px;
        border-radius: 24px;
        box-shadow: none;
    }


    @media only screen and (max-width: 767px) {
        .title-card {
            font-size: 20px !important;
        }
    }
</style>