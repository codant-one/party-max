<script setup>

import { formatNumber } from '@formatters'
import arrow_left from '@assets/icons/Arrow_left.svg?inline';

const props = defineProps({
    addresses: {
        type: Object,
        required: true
    },
    summary: {
        type: Object,
        required: true
    },
    province_id: {
        type: Number,
        required: true
    },
    address_id: {
        type: Number,
        required: true
    },
    send_id: {
        type: Number,
        required: true
    },
})

const emit = defineEmits([
    'update:currentStep',
    'changeAddreess',
    'dialog',
    'dialog_error',
    'send',
])

const error_address = ref('Debes agregar una dirección de envio')
const province = ref(props.province_id)
const id = ref(props.address_id)

const send_array = ref(['Envío Nacional: $19.000.00', 'Envío Bogotá: $10.500.00 '])
const sendId = ref(props.send_id)

watch(() => 
    props.address_id, (data) => {
        id.value = data
    });

watch(() => 
    props.send_id, (data) => {
        sendId.value = data
    });

watch(() => 
    props.province_id, (data) => {
        province.value = data
    });
 
const next = () => {

    if (id.value > 0) {
        emit('update:currentStep', 2)
        emit('changeAddreess', id.value)

    } else {
        emit('dialog_error', error_address.value)
    }
    
}

const chanceSend = () => {
    if (id.value !== 0)  {
        province.value = props.addresses.filter(address => address.id === id.value)[0].province_id

        if(province.value === 293) {
            emit('send', 'sendToBogota')
            sendId.value = 1
        } else {
            emit('send', 'send')
            sendId.value = 0
        }
    }
}   

const chanceExpress = () => {
    if(sendId.value === 2)
        emit('send', 'shipping_express')
    else
        emit('send', 'sendToBogota')
}

const isDisabled = (i) => {
    if(i === 0) { //nacional
        if(sendId.value === 0)
            return false
        else 
            return true
    } else if (i === 1) { //bogota
        if(sendId.value === 0)
            return true
        else 
            return false
    }
}

</script>

<template>
    <VRow>
        <VCol cols="12" md="8">
            <VCard class="card-products p-0">
                <VCardTitle class="title-card border-line mt-4 px-5 px-md-10">Elige la forma de entrega</VCardTitle>
                <VCardText class="home pb-0 mt-3 mb-0 my-md-3 px-5 px-md-10">Enviar a domicilio</VCardText>
                <VCardText class="p-0">
                    <VRadioGroup
                        v-model="id"
                        false-icon="mdi-circle-off-outline"
                        true-icon="mdi-circle-slice-8"
                        @update:modelValue="chanceSend"
                    >
                        <VRadio
                            v-for="(address, i) in props.addresses"
                            :key="i"
                            :value="address.id"
                            color="primary"
                            class="ps-5 ps-md-10 border-line">
                            <template v-slot:label>
                                <VCardText class="d-flex my-1">
                                    <div class="d-block">
                                        <span class="d-block text-address ms-1 me-auto tw-font-semibold">{{ address.title }}</span>
                                        <span class="d-block text-address ms-1 me-auto">
                                            {{ address.address }} ,
                                            {{ address.street }} <span v-if="address.street !== null">,</span>
                                            {{ address.city }} ,
                                            {{ address.province.name }}.
                                            Código Postal: {{ address.postal_code }}. 
                                        </span>
                                    </div>
                                    <VSpacer />
                                    <!-- <span class="text-address my-auto">${{ formatNumber(props.summary.send) }}</span> -->
                                </VCardText>
                            </template>
                        </VRadio>
                    </VRadioGroup>
                </VCardText>
                <VCardText class="row-cardp3">
                    <span
                        class="tw-cursor-pointer" 
                        @click="emit('dialog', true)">
                        Agregar domicilio
                    </span>
                </VCardText>
            </VCard>
            <VCardText class="d-md-flex pt-5 pb-0 px-0">
                <VSpacer />
                <VBtn
                    variant="flat"
                    class="btn-order tw-bg-green tw-text-tertiary my-2 mt-md-5 me-2"
                    @click="emit('update:currentStep', 0)">
                    <arrow_left class="me-2" />
                    Regresar
                </VBtn>
                <VBtn
                    variant="flat"
                    class="btn-register tw-text-white tw-bg-primary button-hover my-2 mt-md-5"
                    @click="next">
                    Continuar
                </VBtn>
            </VCardText>
        </VCol>
        <VCol cols="12" md="4">
            <VCard class="card-products p-0 tw-bg-cyan">
                <VCardTitle class="subtitle-card row-buy mt-4 ps-10 pt-0 pt-md-4 pb-5">Resumen de compra</VCardTitle>
                <VCardText class="px-10 mt-5 mb-2">
                    <VRow align="center">
                        <VCol cols="7" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <span>${{ formatNumber(props.summary.subTotal) }}</span>
                        </VCol>
                        <VCol cols="3" md="4" class="text-left py-0">
                            <span>Envío</span>
                        </VCol>
                        <VCol cols="9" md="8" class="text-right py-0">
                            <VRadioGroup
                                v-model="sendId"
                                false-icon="mdi-circle-off-outline"
                                true-icon="mdi-circle-slice-8"
                                @update:modelValue="chanceExpress"
                            >
                                <VRadio
                                    v-for="(item, i) in send_array"
                                    color="primary"
                                    :key="i"
                                    :value="i"
                                    :disabled="isDisabled(i)"
                                    :class="(send_array.length - 1 === i && province !== 293) ? '' : 'border-line'"
                                    class="custom-radio">
                                    <template v-slot:label>
                                        <span class="d-flex pl-1 pr-0 text-right text-send tw-font-semibold py-2 me-1 me-md-2">
                                            {{ item }}
                                        </span>
                                    </template>
                                </VRadio>
                                <VRadio
                                    v-show="province === 293"
                                    color="primary"
                                    :key="2"
                                    :value="2"
                                    class="custom-radio">
                                    <template v-slot:label>
                                        <span class="d-flex pl-1 pr-0 text-right text-send tw-font-semibold py-2 me-1 me-md-2">
                                            Envío Express: $17.000.00
                                        </span>
                                    </template>
                                </VRadio>
                            </VRadioGroup>
                        </VCol>
                        <VCol cols="7" md="6" class="text-left">
                            <h4>Total</h4>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <h4>${{ formatNumber(props.summary.total) }}</h4>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>

    ::v-deep(.v-input__details) {
        padding: 0;
        height: 0;
        min-height: 0;
    }
    
    .custom-radio {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .text-send {
        color: #0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .text-address {
        color: #0A1B33;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .card-summary {
        background-color:#F3FCFE;
        padding:24px 32px;
        border-radius: 24px;
        box-shadow: none;
        
    }

    .row-card3 span, .free-text {
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .home { 
        color:  #0A1B33;
        font-size: 20px;
        font-weight: 500;
        line-height: normal; 
    }

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
        height: 54px;
        width: 25%;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .btn-order {
        border-radius: 32px;
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        height: 54px;
        width: 177px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        box-shadow: none;
    }

    .btn-order:hover {
        border: 1px solid var(--Maastricht-Blue, #0A1B33) !important;
        background: var(--Maastricht-Blue, #0A1B33) !important;
        color: #FFFFFF!important;
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
        margin-top:11px;
        padding: 32px;
    }

    .row-cardp_ {
        margin-top:11px;
        padding: 32px;
    }

    .row-cardp2 {
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

    .row-buy, .border-line {
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

    @media only screen and (max-width: 767px) {
        .title-card {
            font-size: 20px;
        }

        .btn-register, .btn-order {
            width: 100%;
        }

        .text-send {
            font-size: 12px !important;
        }
    }

</style>