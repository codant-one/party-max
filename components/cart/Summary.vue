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
    'update:currentStep',
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
                <VCardText class="px-5 px-md-10 py-5 py-md-6">
                    <VRow>
                        <VCol cols="7" md="6" class="text-left">
                            <span>Productos</span>
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
                            <h4>Subtotal</h4>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <h4>${{ formatNumber(props.summary.discount > 0 ? props.summary.subTotalDiscount : props.summary.subTotal) }}</h4>
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
            <VCard class="card-bono mx-auto" v-if="props.client_id && props.summary.discount === 0">
                <VCardTitle class="text-center d-flex title-bono align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                        <path d="M20.5003 -0.000576019C17.9353 -0.000576019 15.517 1.12609 13.8636 3.08942C13.7053 3.27776 13.4986 3.36443 13.237 3.34776C10.6903 3.13609 8.17195 4.04276 6.35862 5.85609C4.54529 7.66943 3.63029 10.1761 3.85029 12.7344C3.87195 12.9794 3.77862 13.2028 3.59195 13.3594C1.62695 15.0144 0.501953 17.4344 0.501953 19.9978C0.501953 22.5611 1.62862 24.9811 3.59195 26.6344C3.78029 26.7928 3.87362 27.0161 3.85195 27.2611C3.63195 29.8194 4.54695 32.3261 6.36029 34.1394C8.17195 35.9511 10.667 36.8694 13.2386 36.6478C13.4803 36.6278 13.707 36.7178 13.8653 36.9061C15.5186 38.8711 17.937 39.9961 20.502 39.9961C23.067 39.9961 25.4853 38.8694 27.1386 36.9061C27.2986 36.7178 27.5053 36.6311 27.7653 36.6478C30.3003 36.8711 32.8303 35.9528 34.6436 34.1394C36.457 32.3261 37.372 29.8194 37.152 27.2611C37.1303 27.0161 37.2236 26.7928 37.4103 26.6361C39.3753 24.9811 40.5003 22.5611 40.5003 19.9978C40.5003 17.4344 39.3736 15.0144 37.4103 13.3611C37.222 13.2028 37.1286 12.9794 37.1503 12.7344C37.3703 10.1761 36.4553 7.66943 34.642 5.85609C32.8303 4.04442 30.3386 3.12276 27.7636 3.34776C27.5236 3.36109 27.2953 3.27609 27.137 3.08942C25.4836 1.12442 23.0653 -0.000576019 20.5003 -0.000576019ZM13.3103 5.01942C14.0186 5.01942 14.6753 4.71442 15.1403 4.16276C16.4753 2.57609 18.4303 1.66609 20.502 1.66609C22.5736 1.66609 24.5286 2.57609 25.8636 4.16276C26.3736 4.76942 27.1253 5.08609 27.9103 5.00943C29.9786 4.83443 32.002 5.57109 33.467 7.03609C34.932 8.50109 35.6703 10.5261 35.4936 12.5944C35.427 13.3844 35.7353 14.1278 36.342 14.6378C37.927 15.9744 38.837 17.9294 38.837 19.9994C38.837 22.0694 37.927 24.0261 36.3403 25.3628C35.7353 25.8711 35.427 26.6161 35.4936 27.4061C35.6703 29.4744 34.932 31.4994 33.467 32.9644C32.0003 34.4294 29.962 35.1694 27.9103 34.9911C27.1103 34.9244 26.3753 35.2311 25.8636 35.8378C24.5286 37.4244 22.5736 38.3344 20.502 38.3344C18.4303 38.3344 16.4753 37.4244 15.1403 35.8378C14.6286 35.2311 13.8703 34.9261 13.0936 34.9911C11.022 35.1694 9.00195 34.4294 7.53695 32.9644C6.07195 31.4994 5.33362 29.4744 5.51029 27.4061C5.57695 26.6161 5.26862 25.8728 4.66195 25.3628C3.07695 24.0261 2.16695 22.0711 2.16695 20.0011C2.16695 17.9311 3.07695 15.9744 4.66362 14.6378C5.26862 14.1294 5.57695 13.3844 5.51029 12.5944C5.33362 10.5261 6.07195 8.50109 7.53695 7.03609C9.00195 5.57109 11.0353 4.83942 13.0936 5.00943C13.167 5.01609 13.2386 5.01942 13.3103 5.01942ZM15.5003 26.6661C14.5803 26.6661 13.8336 25.9194 13.8336 24.9994C13.8336 24.0794 14.5803 23.3328 15.5003 23.3328C16.4203 23.3328 17.167 24.0794 17.167 24.9994C17.167 25.9194 16.4203 26.6661 15.5003 26.6661ZM25.5003 16.6661C24.5803 16.6661 23.8336 15.9194 23.8336 14.9994C23.8336 14.0794 24.5803 13.3328 25.5003 13.3328C26.4203 13.3328 27.167 14.0794 27.167 14.9994C27.167 15.9194 26.4203 16.6661 25.5003 16.6661ZM17.027 12.8711L25.3603 25.3711C25.6153 25.7544 25.512 26.2711 25.1286 26.5261C24.7486 26.7794 24.2303 26.6778 23.9736 26.2944L15.6403 13.7944C15.3853 13.4111 15.4886 12.8944 15.872 12.6394C16.0136 12.5444 16.1753 12.4994 16.3336 12.4994C16.602 12.4994 16.8653 12.6294 17.027 12.8711Z" fill="#FF0090"/>
                    </svg>  &nbsp;&nbsp;&nbsp;Ingresar un cupón de descuento
                </VCardTitle>

                <VRow class="text-center d-flex textinput w-100 w-md-75">
                    <VTextField 
                        v-model="coupon"
                        variant="outlined"
                        class="me-0 me-md-2"
                    />
                    <button class="button-bono" @click="couponApply">Aplicar</button>
                </VRow>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>

    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
        border-start-start-radius: 24px;
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
        display: flex;
        padding: 24px 32px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-top:16px;
        border-radius: 16px;
        box-shadow: none;
    }

    .button-bono {
        display: flex;
        height: 16px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 32px;
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

        .card-bono .v-card-title {
            font-size: 16px;
            align-items: center;
        }

        .title-card {
            font-size: 20px !important;
        }
    }
</style>