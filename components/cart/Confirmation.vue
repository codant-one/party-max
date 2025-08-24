<script setup>

import festin_success from '@assets/icons/festin_success.svg';
import festin_error from '@assets/icons/festin_error.svg';
import festin_pending from '@assets/icons/festin_pending.svg';
import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';
import { useRuntimeConfig } from '#app'
import { useCartStores } from '~/stores/cart'

const route = useRoute()
const cartStores = useCartStores()

const emit = defineEmits([
    'refresh',
    'completed',
    'deleteAll'
])

const merchant_id = ref(null)
const TX_VALUE = ref(null)
const New_value = ref(null)
const currency = ref(null)
const transactionState = ref(null)
const polResponseCode = ref(null)
const lapResponseCode = ref(null)
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
const isPending = ref(false)

const config = useRuntimeConfig()
const products = ref([])
const purchaseEventSent = ref(false)
const content_ids = ref([])
const contents = ref([])
const num_items = ref(0)
const sum = ref(0)

const { isMobile } = useDevice();
const { $metapixel } = useNuxtApp()

watchEffect(() => {
    merchant_id.value = route.query.merchantId
    referenceCode.value = route.query.referenceCode
    TX_VALUE.value = route.query.TX_VALUE
    New_value.value = TX_VALUE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    currency.value = route.query.currency
    transactionState.value = route.query.transactionState
    polResponseCode.value = route.query.polResponseCode
    lapResponseCode.value = route.query.lapResponseCode
    signature.value = route.query.signature
    reference_pol.value = route.query.reference_pol
    cus.value = route.query.cus
    extra1.value = route.query.description
    pseBank.value = route.query.pseBank
    lapPaymentMethod.value = route.query.lapPaymentMethod

    switch (polResponseCode.value) {
        case '1':
            message.value = 'Transacción aprobada'
            subMessage.value = 'Para nosotros es un placer acompañarte en tus momentos más especiales, ahora a disfrutar de la fiesta.'

            if(config.public.NODE_ENV === 'development') {//solo para produccion
                if ($metapixel && $metapixel.trackEvent && !purchaseEventSent.value) {

                    products.value = cartStores.getData;

                    // Si no hay artículos, no hacemos nada.
                    if (!products.value || products.value.length === 0) {
                        return; 
                    }

                    // Usamos .reduce() para recorrer el array UNA SOLA VEZ y calcular todo.
                    const purchaseData = products.value.reduce((acc, item) => {
                        // --- 1. LIMPIEZA Y CONSTRUCCIÓN DEL ID ---
                        const cleanId = String(item.id).replace(/"/g, '')
                        const finalId = item.type === 0 ? `PRODUCT_${cleanId}` : `SERVICE_${cleanId}`;
                        
                        // --- 2. CÁLCULO DEL PRECIO DEL ARTÍCULO INDIVIDUAL ---
                        const cupcake = item.type === 0 ? null : item.cupcakes.find(c => c.cake_size_id === item.cake_size_id);
                        const itemPrice = 
                            item.type === 0 ? 
                            (item.wholesale === 1 ? item.product.wholesale_price : item.product.price_for_sale) :
                            (item.cake_size_id === 0 ? item.price : cupcake.price);
                        
                        // --- 3. ACTUALIZAMOS EL ACUMULADOR ---
                        acc.content_ids.push(finalId);
                        acc.contents.push({ id: finalId, quantity: item.quantity });
                        acc.num_items += (Number(item.quantity) || 0);
                        acc.total_value += (Number(itemPrice) || 0) * (Number(item.quantity) || 0);

                        return acc; // Devolvemos el acumulador para la siguiente iteración
                    }, {
                        // Estado inicial del acumulador
                        content_ids: [],
                        contents: [],
                        num_items: 0,
                        total_value: 0
                    });

                    // --- 4. LLAMADA AL PÍXEL CON LOS DATOS AGREGADOS ---
                    console.log('🛍️ Enviando Purchase:', purchaseData);

                    $metapixel.trackEvent('Purchase', {
                        content_ids: purchaseData.content_ids,
                        contents: purchaseData.contents,
                        content_type: 'product',
                        value: purchaseData.total_value, // El valor ya es un número y es la suma total
                        currency: 'COP',
                        num_items: purchaseData.num_items,
                    });

                    // --- 5. CERRAMOS EL CERROJO ---
                    purchaseEventSent.value = true;

                    // Opcional: Limpia el carrito para evitar reenvíos
                    // cartStores.clearCart();
                    }
                /*if ($metapixel && $metapixel.trackEvent && content_ids.value.length === 0) {
                    products.value = cartStores.getData
                    content_ids.value = products.value.map(item => item.type === 0 ? `PRODUCT_${item.id}` : `SERVICE_${item.id}`)
                    contents.value = products.value.map(item => ({id: item.type === 0 ? `PRODUCT_${item.id}` : `SERVICE_${item.id}`, quantity: item.quantity}))
                    num_items.value = products.value.reduce((total, item) => total + (Number(item.quantity) || 0), 0)

                    products.value.forEach(element => {
                    
                        let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
                        let value = 
                            element.type === 0 ? 
                            (element.wholesale === 1 ? element.product.wholesale_price : element.product.price_for_sale) :
                            (element.cake_size_id === 0 ? element.price : cupcake.price)

                        sum.value += (parseFloat(value) * element.quantity)
                    })
                    $metapixel.trackEvent('Purchase', { 
                        content_ids: content_ids.value,
                        contents: contents.value,
                        content_type: 'product',
                        value: sum.value,
                        currency: 'COP',
                        num_items: num_items.value,
                    });//SEGUIMIENTO META OJO
                }*/
            }
            emit('deleteAll')
            break;
        case '4':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Transacción rechazada por entidad financiera.'
            isError.value = true
            break;
        case '5':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Transacción rechazada por el banco.'
            isError.value = true
            break;
        case '6':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Fondos insuficientes.'
            isError.value = true
            break;
        case '8':
            message.value = 'Transacción rechazada'
            subMessage.value = lapResponseCode.value === 'CONTACT_THE_ENTITY' ? 'Por favor, contactar a la entidad financiera.' : 'Débito automático no permitido.'
            isError.value = true
            break;
        case '9':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Tarjeta vencida.'
            isError.value = true
            break;
        case '10':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Tarjeta restringida.'
            isError.value = true
            break;
        case '12':
            message.value = 'Transacción rechazada'
            subMessage.value = 'La fecha de expiración o el código de seguridad son inválidos.'
            isError.value = true
            break;
        case '13':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Reintentar pago.'
            isError.value = true
            break;
        case '14':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Transacción inválida.'
            isError.value = true
            break;
        case '17':
            message.value = 'Transacción rechazada'
            subMessage.value = 'El valor excede el máximo permitido por la entidad.'
            isError.value = true
            break;
        case '19':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Transacción abandonada por el pagador.'
            isError.value = true
            break;
        case '22':
            message.value = 'Transacción rechazada'
            subMessage.value = 'La tarjeta no está autorizada para comprar por internet.'
            isError.value = true
            break;
        case '23':
            message.value = 'Transacción rechazada'
            subMessage.value = lapResponseCode.value === 'ANTIFRAUD_REJECTED' ? 'Transacción rechazada por el módulo antifraude.' : 'Transacción rechazada debido a sospecha de fraude en la entidad financiera.'
            isError.value = true
            break;
        case '9995':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Certificado digital no encontrado.'
            isError.value = true
            break;
        case '9996':
            message.value = 'Transacción rechazada'
            subMessage.value = lapResponseCode.value === 'BANK_UNREACHABLE' ? 'Error tratando de comunicarse con el banco.' : 'No se recibió respuesta de la entidad financiera'
            isError.value = true
            break;
        case '9997':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Error comunicándose con la entidad financiera.'
            isError.value = true
            break;
        case '9998':
            message.value = 'Transacción rechazada'
            subMessage.value = lapResponseCode.value === 'NOT_ACCEPTED_ TRANSACTION' ? 'Transacción no permitida al tarjetahabiente.' : 'Transacción no permitida.'
            isError.value = true
            break;
        case '9999':
            message.value = 'Error'
            subMessage.value = 'Error interno.'
            isError.value = true
            break;
        case '20':
            message.value = 'Transacción rechazada'
            subMessage.value = 'Transacción expirada.'
            isError.value = true
            break;
        case '15':
            message.value = 'Pago pendiente'
            subMessage.value = 'Transacción pendiente de aprobación. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
            break;
        case '25':
            message.value = 'Pago pendiente'
            subMessage.value = 'Recibo de pago generado. En espera de pago. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
            break;
        case '26':
            message.value = 'Pago pendiente'
            subMessage.value = 'Recibo de pago generado. En espera de pago. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
            break;
        case '29':
            message.value = 'Pago pendiente'
            subMessage.value = 'Recibo de pago generado. En espera de pago. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
            break;
        case '9994':
            message.value = 'Pago pendiente'
            subMessage.value = '	En espera de confirmación de PSE. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
            break;
        default:
            message.value = 'Pago pendiente'
            subMessage.value = 'Lamentamos que no pudieses finalizar tu compra, te invitamos a que lo vuelvas a intentar con otro método de pago. Su pago está en proceso. Una vez confirmado, se le enviará un correo electrónico con el resumen de su compra.'
            isPending.value = true
    }
})

</script>

<template>
   <VRow>
        <VCol cols="12">
            <VCard
                class="px-10 py-5 py-md-10 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :width="isMobile ? (isPending ? '80' : '130') : '200'" :src="isError ? festin_error : (isPending ? festin_pending : festin_success)" class="mx-auto"/>
                <VCardText class="text-message border-line">
                    {{ message }}
                </VCardText>

                <VCardText class="text-submessage pb-5 border-line">
                    {{ subMessage }}
                </VCardText>

                <VCardText class="px-0 more" v-if="!isError">
                    <div 
                        class="tw-cursor-pointer d-flex tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center"
                        @click="emit('completed')">
                        <span class="ms-5">Seguir comprando</span>
                        <arrow_right class="ms-2" />
                    </div>
                </VCardText> 

                <VCardText class="px-0 more" v-else>
                    <div
                        class="tw-cursor-pointer d-flex tw-no-underline tw-text-tertiary hover:tw-text-primary hover-icon-arrow-right justify-content-center" 
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