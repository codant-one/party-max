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
    },
    discount: {
        type: Boolean,
        required: true
    },
    client_id: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits([
    'deleteProduct',
    'deleteService',
    'addCart',
    'couponApply'
])

const coupon = ref(null)

const isLastItem = (index) => {
  return index === props.products.length - 1;
}

const addCart = (data) => {
    emit('addCart', data)
}

const couponApply = () => {
    emit('couponApply', coupon.value)
}


</script>

<template>
    <VCard class="card-products p-0">
        <VCardTitle class="title-card pt-5 pb-0 px-5 text-primary">RESUMEN DE COMPRA</VCardTitle>
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
        <VCardText class="px-5 pt-5 pb-0">
            <VRow no-gutters>
                <VCol cols="7" md="6" class="text-left">
                    <span>Subtotal</span>
                </VCol>
                <VCol cols="5" md="6" class="text-right">
                    <span>${{ formatNumber(props.summary.subTotal) }}</span>
                </VCol>
                <VCol cols="7" md="6" class="text-left tw-text-yellow" v-if="props.summary.discount > 0">
                    <span>Descuento</span>
                </VCol>
                <VCol cols="5" md="6" class="text-right tw-text-yellow" v-if="props.summary.discount > 0">
                    <span>-${{ formatNumber(props.summary.discount) }}</span>
                </VCol>
                <VCol cols="7" md="6" class="text-left">
                    <span>Envío</span>
                </VCol>
                <VCol cols="5" md="6" class="text-right">
                    <span>${{ formatNumber(props.summary.send) }}</span>
                </VCol>
                <VCol cols="12" class="py-2">
                    <VDivider />
                </VCol>
                <VCol cols="7" md="6" class="text-left">
                    <h4>Total</h4>
                </VCol>
                <VCol cols="5" md="6" class="text-right pb-5">
                    <h4>${{ formatNumber(props.summary.total) }}</h4>
                </VCol>
            </VRow>
        </VCardText>
        <VCardText class="card-bono px-5 pt-0 pb-5" v-if="props.client_id">
            <VCardTitle class="text-center d-flex title-bono align-center p-0">
               Cupón de descuento
            </VCardTitle>

            <div class="text-center d-flex justify-content-between textinput w-100">
                <VTextField 
                    v-model="coupon"
                    variant="outlined"
                />
                <VBtn
                    variant="flat"
                    :disabled="!props.client_id" 
                    class="btn-order tw-text-tertiary ms-2"
                    @click="couponApply">
                    Aplicar
                </VBtn>
            </div>
        </VCardText>
         
    </VCard>        
</template>

<style scoped>

    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 8px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 8px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
        border-start-start-radius: 8px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
        font-size: 15px;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .textinput .v-text-field::v-deep(.v-input__details) {
        min-height: 15px !important;
    }


    .textinput .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 14px !important;
    }

    .v-textarea::v-deep(.v-field-label) {
        top: 10% !important;
        font-size: 14px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .card-bono {
        font-family: 'Poppins', sans-serif;
        display: flex;
        padding: 24px 32px;
        flex-direction: column;
        gap: 16px;
        border-radius: 16px;
        box-shadow: none;
    }

    .title-bono {
        font-weight: 700;
    }

    .btn-order {
        border-radius: 8px;
        border: 1px solid var(--Maastricht-tertiary, #0A1B33);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        box-shadow: none;
    }

    /* Estilos cuando el botón está deshabilitado */
    .btn-order.v-btn--disabled {
        border-color: #D9EEF2;
        background-color: #F5F8FA !important;
        color: #9CA3AF !important; /* gris */
        box-shadow: none !important;
    }

    .btn-order.v-btn--disabled:hover {
        border-color: #D9EEF2;
        background-color: #F5F8FA !important;
        color: #9CA3AF !important;
    }

    .btn-order:hover {
        border: 1px solid var(--Maastricht-tertiary, #0A1B33) !important;
        background: var(--Maastricht-tertiary, #0A1B33) !important;
        color: #FFFFFF!important;
    }

    .button-bono {
        display: flex;
        height: 16px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        color:#0A1B33;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px; 
        margin-left: 16px;
    }

    .button-bono:hover {
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        background: var(--Maastricht-Blue, #0A1B33);
        color: #FFFFFF!important;
    }

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
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
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
        padding: 32px;
        max-height: 50vh;
        overflow-y: auto;
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

    /* Custom scrollbar for the scrollable product list */
    .row-cardp::-webkit-scrollbar {
        width: 8px;
    }

    .row-cardp::-webkit-scrollbar-thumb {
        background: #D9EEF2;
        border-radius: 8px;
    }

    .row-cardp::-webkit-scrollbar-track {
        background: transparent;
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

        .card-bono .v-card-title {
            font-size: 16px;
            align-items: center;
        }

        .title-card {
            font-size: 20px !important;
        }

        /* Disable scroll on mobile */
        .row-cardp {
            max-height: none;
            overflow: visible;
        }
    }
</style>