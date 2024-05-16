<script setup>

import festin_success from '@assets/icons/festin_success.svg';
import festin_error from '@assets/icons/festin_error.svg';
import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

const route = useRoute()

const emit = defineEmits([
    'refresh',
    'completed',
    'deleteAll',
    'updatePaymentState'
])

const merchant_id = ref(null)
const TX_VALUE = ref(null)
const New_value = ref(null)
const currency = ref(null)
const transactionState = ref(null)
const signature = ref(null)
const reference_pol = ref(null)
const cus = ref(null)
const extra1 = ref(null)
const pseBank = ref(null)
const lapPaymentMethod = ref(null)
const referenceCode = ref(null)

const message = ref()
const subMessage = ref()
const isError = ref(false)


watchEffect(() => {

    merchant_id.value = route.query.merchantId
    referenceCode.value = route.query.referenceCode
    TX_VALUE.value = route.query.TX_VALUE
    New_value.value = TX_VALUE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    currency.value = route.query.currency
    transactionState.value = route.query.transactionState
    signature.value = route.query.signature
    reference_pol.value = route.query.reference_pol
    cus.value = route.query.cus
    extra1.value = route.query.description
    pseBank.value = route.query.pseBank
    lapPaymentMethod.value = route.query.lapPaymentMethod

    switch (transactionState.value) {
        case '4':
            message.value = 'Transacción aprobada'
            subMessage.value = 'Para nosotros es un placer acompañarte en tus momentos más especiales, ahora a disfrutar de la fiesta.'
            emit('deleteAll')
            emit('updatePaymentState', 4)
            break;
        case '6':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Lamentamos que no pudieses finalizar tu compra, te invitamos a que lo vuelvas a intentar con otro método de pago.'
            isError.value = true
            emit('updatePaymentState', 3)
            break;
        case '104':
            message.value = 'Error'
            subMessage.value = 'Lamentamos que no pudieses finalizar tu compra, te invitamos a que lo vuelvas a intentar con otro método de pago.'
            isError.value = true
            emit('updatePaymentState', 2)
            break;
        case '7':
            message.value = 'Pago pendiente'
            subMessage.value = 'Lamentamos que no pudieses finalizar tu compra, te invitamos a que lo vuelvas a intentar con otro método de pago.'
            isError.value = true
            emit('updatePaymentState', 1)
            break;
        default:
            message.value = route.query.mensaje
    }
})

</script>

<template>
   <VRow>
        <VCol cols="12">
            <VCard
                class="px-10 py-10 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg width="200" :src="isError ? festin_error : festin_success" class="mx-auto"/>
                <VCardText class="text-message border-line">
                    {{ message }}
                </VCardText>

                <VCardText class="text-submessage my-5 pb-5 border-line">
                    {{ subMessage }}
                </VCardText>

                <VCardText class="px-0 more" v-if="!isError">
                    <div 
                        class="d-flex tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center"
                        @click="emit('completed')">
                        <span class="ms-5">Seguir comprando</span>
                        <arrow_right class="ms-2" />
                    </div>
                </VCardText> 

                <VCardText class="px-0 more" v-else>
                    <div
                        class="d-flex tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center" 
                        @click="emit('refresh')">
                        <span class="ms-5">Volver a intentar</span>
                        <arrow_right class="ms-2" />
                    </div>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>

    .hover-icon-arrow-right:hover::v-deep(path) {
        fill: #FF0090;
    }
    .border-line {
        border-bottom: 1px solid #D9EEF2;
    }
    .card-register {
        width: 500px;
        border-radius: 32px!important;
    }

    .text-submessage {
        color: #0A1B33;
        text-align: center;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */ 
    }
    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px; 
        padding: 10px 80px !important;
    }

    @media only screen and (max-width: 767px) {

        .text-message {
            padding: 0 30px !important;
            font-size: 18px;
        }

        .card-register {
            padding: 20px;
            width: auto;
        }
    }


</style>