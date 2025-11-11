<script setup>

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
    isDialogOpen: {
        type: Boolean,
        required: false,
        default: false
    },
})

const emit = defineEmits([
    'changeAddreess',
    'dialog',
    'dialog_error',
    'send'
])

const province = ref(Number(props.province_id))
const id = ref(props.address_id)

const send_array = ref(['Envío Bogotá Gratis', 'Envío Nacional: $19.000', 'Envío Bogotá: $12.000'])
const sendId = ref(props.send_id)
const sendDifferentAddress = ref(false)

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
        province.value = Number(data)
        chanceExpress()
    });
 
watch(() => props.isDialogOpen, (val) => {
    if (!val) {
        sendDifferentAddress.value = false
    }
}); 

const chanceExpress = () => {
    // Fuera de Bogotá: siempre seleccionar Nacional
    if (province.value !== 293) {
        sendId.value = 1
        emit('send', 'send')
        return
    }
    // Bogotá: mantener lógica de Express, Bogotá o Gratis según subtotal
    if (sendId.value === 3) {
        emit('send', 'shipping_express')
        return
    }
    if (parseFloat(props.summary.subTotal) <= parseFloat('210000')) {
        sendId.value = 2
        emit('send', 'sendToBogota')
    } else {
        sendId.value = 0
        emit('send', 'free')
    }
}

const onChangeDifferentAddress = (val) => {
    if (val) {
        emit('dialog', true)
    }
}

const isDisabled = (i) => {
    let response = false
    if(i === 0) { //gratis
        switch (sendId.value) {
            case 0:
                response = false
            break;
            case 1:
                response = true
            break;
            case 2:
                response = true
            break;
            case 3:
                response = parseFloat(props.summary.subTotal) <= parseFloat('210000')
            break;
        }
    } else if(i === 1) { //nacional
        switch (sendId.value) {
            case 0:
                response = province.value === 293
            break;
            case 1:
                response = false
            break;
            case 2:
                response = province.value === 293
            break;
            case 3:
                response = province.value === 293
            break;
        }
    } else if (i === 2) { //bogota
        switch (sendId.value) {
            case 0:
                response = true
            break;
            case 1:
                response = province.value !== 293
            break;
            case 2:
                response = province.value !== 293
            break;
            case 3:
                response = parseFloat(props.summary.subTotal) > parseFloat('210000')
            break;
        }
    }

    return response
}

// Mostrar solo Nacional cuando no es Bogotá; en Bogotá mostrar todas
const isOptionVisible = (i) => {
    if (province.value === 293) return true
    return i === 1
}

onMounted(() => {
    chanceExpress()
})
</script>

<template>              
    <VCardText class="row-cardp3 px-5 px-md-8 py-0">
        <VCheckbox
            v-model="sendDifferentAddress"
            class="different-checkbox"
            color="primary"
            hide-details
            @update:modelValue="onChangeDifferentAddress"
        >
            <template #label>
                <span class="ms-2 tw-text-tertiary tw-font-normal">Envia a una dirección diferente</span>
            </template>
        </VCheckbox>
    </VCardText>
    <VCardText class="row-cardp3 px-5 px-md-8 py-0 mt-5">
        <span>Forma de envio</span>
    </VCardText>
    <VCardText class="pt-2">
        <VRadioGroup
            v-model="sendId"
            false-icon="mdi-circle-outline"
            true-icon="mdi-circle-slice-8"
            @update:modelValue="chanceExpress"
            class="radioGroupCustom"
            inline>
            <template v-for="(item, i) in send_array" :key="i">
            <VRadio
                color="primary"
                v-if="(province === 293 && (i === 0 || i === 2)) || (province !== 293 && i === 1)"
                :value="i"
                :readonly="isDisabled(i)"
                :class="[(send_array.length - 1 === i && province !== 293) ? '' : 'border-line', 'custom-radio', { 'is-readonly': isDisabled(i) }]">
                <template v-slot:label>
                    <div class="ship-option">
                        <div class="ship-title">
                            {{ item }}
                        </div>
                        <div class="ship-sub" v-if="i === 0">(De 2 a 3 días hábiles)</div>
                        <div class="ship-sub" v-else-if="i === 1">(De 1 a 2 días hábiles)</div>
                        <div class="ship-sub" v-else>(De 1 a 2 días hábiles)</div>
                    </div>
                </template>
            </VRadio>
            </template>
            <VRadio
                v-if="province === 293"
                color="primary"
                :key="3"
                :value="3"
                class="custom-radio">
                <template v-slot:label>
                    <div class="ship-option">
                        <div class="ship-title">Envío Express $17.000</div>
                        <div class="ship-sub">(Menos de 24 horas )</div>
                    </div>
                </template>
            </VRadio>
        </VRadioGroup>
    </VCardText>       
</template>

<style scoped>

    ::v-deep(.v-input__details) {
        padding: 0;
        height: 0;
        min-height: 0;
    }
    
    ::v-deep(.custom-radio) {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #eef0ef;
        border-radius: 12px;
        padding: 10px 14px;
        margin-inline-end: 5px;
        transition: background-color .2s ease;
        cursor: pointer;
    }

    .text-send {
        color: #0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .radioGroupCustom {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    ::v-deep(.custom-radio .v-selection-control__wrapper) {
        margin-inline-end: 5px;
    }

    .ship-option {
        text-align: left;
    }

    .ship-title {
        color: #0A1B33;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
    }

    .ship-sub {
        color: #6B7280;
        font-size: 12px;
        font-style: italic;
        line-height: 14px;
        margin-top: 2px;
    }

    .v-checkbox::v-deep(.v-selection-control) {
        min-height: 15px !important;
    }

    /* Selected state */
    ::v-deep(.custom-radio.v-selection-control--dirty) {
        background: #FF0090;
    }

    ::v-deep(.custom-radio.v-selection-control--dirty) .ship-title,
    ::v-deep(.custom-radio.v-selection-control--dirty) .ship-sub {
        color: #FFFFFF;
    }

    /* Replace default icon with custom white ring + fuchsia inner dot */
    ::v-deep(.custom-radio.v-selection-control--dirty .v-selection-control__wrapper .v-icon) {
        display: none;
    }

    ::v-deep(.custom-radio.v-selection-control--dirty .v-selection-control__wrapper) {
        width: 22px;
        height: 22px;
        min-width: 22px;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    ::v-deep(.custom-radio.v-selection-control--dirty .v-selection-control__wrapper)::after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #FF0090;
        display: block;
    }

    /* Disabled */
    ::v-deep(.custom-radio.v-selection-control--disabled) {
        opacity: .5;
        cursor: not-allowed !important;
    }

    ::v-deep(.custom-radio.v-selection-control--disabled:hover) {
        cursor: not-allowed !important;
    }

    ::v-deep(.custom-radio.v-selection-control--disabled .v-selection-control__wrapper),
    ::v-deep(.custom-radio.v-selection-control--disabled .v-label),
    ::v-deep(.custom-radio.v-selection-control--disabled .ship-option) {
        cursor: not-allowed !important;
    }

    /* Readonly state (treat like disabled for UX) */
    ::v-deep(.custom-radio.v-input--readonly),
    ::v-deep(.custom-radio.v-selection-control--readonly) {
        opacity: .5;
        cursor: not-allowed !important;
    }

    ::v-deep(.custom-radio.v-input--readonly:hover),
    ::v-deep(.custom-radio.v-selection-control--readonly:hover) {
        cursor: not-allowed !important;
    }

    ::v-deep(.custom-radio.v-input--readonly .v-selection-control__wrapper),
    ::v-deep(.custom-radio.v-input--readonly .v-label),
    ::v-deep(.custom-radio.v-input--readonly .ship-option),
    ::v-deep(.custom-radio.v-selection-control--readonly .v-selection-control__wrapper),
    ::v-deep(.custom-radio.v-selection-control--readonly .v-label),
    ::v-deep(.custom-radio.v-selection-control--readonly .ship-option) {
        cursor: not-allowed !important;
    }

    /* Fallback: explicit class when item is readonly */
    ::v-deep(.custom-radio.is-readonly) {
        opacity: .5;
        cursor: not-allowed !important;
    }
    ::v-deep(.custom-radio.is-readonly .v-selection-control__wrapper),
    ::v-deep(.custom-radio.is-readonly .v-label),
    ::v-deep(.custom-radio.is-readonly .ship-option) {
        cursor: not-allowed !important;
    }

    .text-address {
        color: #0A1B33;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    
    .text-address svg {
        transform: scale(0.8);
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

    .btn-order:hover::v-deep(path) {
        fill: #FFFFFF;
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
        padding: 16px 40px;
    }

    .row-cardp3 span {
        font-family: 'Poppins', sans-serif;
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    /* Different address checkbox styles */
    ::v-deep(.different-checkbox .v-selection-control__wrapper .v-icon) {
        display: none;
    }
    ::v-deep(.different-checkbox .v-selection-control__wrapper) {
        width: 18px;
        height: 18px;
        min-width: 18px;
        border: 2px solid #CFCFCF;
        border-radius: 2px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    ::v-deep(.different-checkbox.v-selection-control--dirty .v-selection-control__wrapper) {
        border-color: #FF0090;
        background: #FF0090;
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
        .text-address svg {
            width: 35px;
        }

        .title-card {
            font-size: 20px;
        }

        .btn-register, .btn-order {
            width: 100%;
        }

        .text-send {
            font-size: 12px !important;
        }

        /* Stack shipping options and make them full width on mobile */
        .radioGroupCustom {
            display: block;
        }

        ::v-deep(.custom-radio) {
            width: 100%;
            margin-inline-end: 0;
            margin-bottom: 8px;
        }
    }

</style>