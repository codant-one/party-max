<script setup>

import { formatNumber } from '@formatters'

const props = defineProps({
    addresses: {
        type: Object,
        required: true
    },
    summary: {
        type: Object,
        required: true
    },
    address_id: {
        type: Number,
        required: true
    }
})

const error_address = ref('Debes agregar una dirección de envio')

const emit = defineEmits([
    'update:currentStep',
    'changeAddreess',
    'dialog',
    'dialog_error'
])

const id = ref(props.address_id)

watch(() => 
    props.address_id, (data) => {
        id.value = data
    });

const next = () => {

    if (id.value > 0) {
        emit('update:currentStep', 2)
        emit('changeAddreess', id.value)

    } else {
        emit('dialog_error', error_address.value)
    }
    
}

</script>

<template>
    <VRow>
        <VCol cols="12" md="8">
            <VCard class="card-products p-0">
                <VCardTitle class="title-card border-line mt-4 ps-10">Elige la forma de entrega</VCardTitle>
                <VCardText class="home px-10 pb-0 my-3">Enviar a domicilio</VCardText>
                <VCardText class="row-cardp p-0">
                    <VRadioGroup
                        v-model="id"
                        false-icon="mdi-circle-off-outline"
                        true-icon="mdi-circle-slice-8"
                    >
                        <VRadio
                            v-for="(address, i) in props.addresses"
                            :key="i"
                            :value="address.id"
                            color="primary"
                            class="ps-10 border-line"
                        >
                            <template v-slot:label>
                                <VCardText class="d-flex my-1">
                                    <div class="d-block">
                                        <span class="d-block text-address ms-7 me-auto tw-font-semibold">{{ address.title }}</span>
                                        <span class="d-block text-address ms-7 me-auto">{{ address.address }}</span>
                                    </div>
                                    <VSpacer />
                                    <span class="text-address my-auto">$0.000</span>
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

            <VCard class="card-products px-0 mt-5" v-if="false">
                <VCardTitle class="home">Retirar en un punto físico </VCardTitle>
                <VCardText class="row-cardp_ px-0 pt-2">
                    <VRow class="row-card px-5 mt-2">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>

                    <!--item 2-->
                    <VRow class="row-card2 px-5">
                        <VCol cols="8" md="7">
                            <VRow>
                                <VCol cols="2" class="text-center">    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8.25" r="6.5" stroke="#FF0090" stroke-width="2"/>
                                    </svg>
                                </VCol>
                                <VCol cols="9">
                                    <span>Calle 000 #000-00</span>
                                </VCol>
                            </VRow>
                        </VCol>

                        <VCol cols="4" md="5" class="text-right">
                            <span class="free-text">Gratis</span>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
            
            <VCardText class="d-flex">
                <VSpacer />
                <VBtn
                    variant="flat"
                    style="border-radius:32px;"
                    class="btn-register tw-text-white tw-bg-primary button-hover my-5"
                    @click="next">
                    Continuar
                </VBtn>
            </VCardText>
        </VCol>
        <VCol cols="12" md="4">
            <VCard class="card-products p-0">
                <VCardTitle class="subtitle-card row-buy mt-4 ps-10 pt-4 pb-5">Resumen de compra</VCardTitle>
                <VCardText class="px-10 mt-5 mb-2">
                    <VRow align="center">
                        <VCol cols="7" md="6" class="text-left">
                            <span>Productos</span>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <span>${{ formatNumber(props.summary.subTotal) }}</span>
                        </VCol>
                        <VCol cols="7" md="6" class="text-left">
                            <span>Envío</span>
                        </VCol>
                        <VCol cols="5" md="6" class="text-right">
                            <span>${{ formatNumber(props.summary.send) }}</span>
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

    ::v-deep(.v-label) {
        width: 100% !important;
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

    @media only screen and (max-width: 767px)
    {
        .title-card
        {
            font-size: 20px;
        }
        .btn-register
        {
            width: 100%;
        }
    }

</style>