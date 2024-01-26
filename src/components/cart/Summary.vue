<script setup>

import Product5 from '@/components/product/Product5.vue'

const props = defineProps({
    products: {
        type: Object,
        required: true
    }
})

var sum_price = ref(0)
var price_q = ref(0)//Precio por cantidad
var tot_sumprice = ref(0)

const emit = defineEmits(['update:currentStep','delete','add_cart'])

const isLastItem = (index) => {
  return index === props.products.length - 1;
}

watchEffect(fetchData)
async function fetchData() 
{
    sum_price.value = 0
    props.products.forEach(element => {
     
        price_q = parseFloat(element.price_for_sale)*element.quantity
        sum_price.value += price_q
        tot_sumprice.value = Number(sum_price.value.toFixed(2))
     
        
    });

}

const add_cart = (data)=>
{

    emit('add_cart',data)
}

</script>

<template>
   <VRow>
        <VCol cols="12" md="8">
            <VCard class="card-products px-0">
                <VCardTitle class="title-card">Productos</VCardTitle>
                <VCardText class="row-cardp px-0">
                    <Product5
                        v-for="(product, i) in props.products"
                        :key="i"
                        :product="product"
                        :readonly="true"
                        :isLastItem="isLastItem(i)"
                        @delete="emit('delete', product.id)"
                        @add_cart="add_cart"
                        />
                </VCardText>
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
            <VCard class="card-buy px-0">
                <VCardTitle class="subtitle-card row-buy pb-8">Resumen de compra</VCardTitle>
                <VCardText class="px-10 mt-5">
                    <VRow>
                        <VCol cols="12" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <span>{{ tot_sumprice}}</span>
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

</style>