<script setup>

import { requiredValidator, phoneValidator, emailValidator } from '@validators'

const props = defineProps({
    products: {
        type: Object,
        required: true
    },
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
    },
    countries: {
        type: Object,
        required: true
    },
    document_types: {
        type: Object,
        required: true        
    },
    provinces: {
        type: Object,
        required: true
    },
    step: {
        type: Number,
        required: true
    }
})

const emit = defineEmits([
    'submit', 
    'send', 
    'update:currentStep', 
    'dialog_error',
    'province-changed'
])

const error_address = ref('Debes agregar una dirección de envio')
const id = ref(props.address_id)

const refVForm = ref()
const { isMobile } = useDevice();
const address = ref(null)
const listDocumentTypes = ref(props.document_types)
const listCountries = ref(props.countries)
const listProvinces = ref(props.provinces)
const listProvincesByCountry = ref([])
const client_country_id = ref(null)
const billingDetail = ref({
    name: '',
    last_name: '',
    company: '',
    country_id: 'Colombia',
    province_id: '',
    document_type_id: '',
    document: '',
    street: '',
    city: '',
    address: '',
    phone: '',
    postal_code: null,
    email: '',
    note: null
})

const isLastItem = (index) => {
  return index === props.products.length - 1;
}

const getProvinces = computed(() => {
  return listProvincesByCountry.value.map((province) => {
    return {
      title: province.name,
      value: province.id,
    }
  })
})

const isLoggedIn = ref(false)

onMounted(async () => {
    selectCountry(billingDetail.value.country_id)

    if(localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)
        isLoggedIn.value = true
        
        billingDetail.value.name = userDataJ.name
        billingDetail.value.last_name = userDataJ.last_name
        billingDetail.value.province_id = userDataJ.user_details.province.id
        billingDetail.value.address  = userDataJ.user_details.address
        billingDetail.value.phone = userDataJ.user_details.phone
        billingDetail.value.email = userDataJ.email
        billingDetail.value.document_type_id = userDataJ.user_details.document_type_id
        billingDetail.value.document = userDataJ.user_details.document
    }
})

watch(() => 
    props.step, (data) => {
        if (data === 2 && id.value === 0) {
            emit('update:currentStep', 0)
            emit('dialog_error', error_address.value)
        }
    });

watch(() => 
    props.address_id, (data) => {
        id.value = data
    });

watchEffect(() => {

    if (id.value === 0 && props.step === 2) {
        emit('update:currentStep', 0)
        emit('dialog_error', error_address.value)
    }

    if (!(Object.entries(props.addresses).length === 0) && id.value > 0) {
        let index = props.addresses.findIndex((item) => item.id === props.address_id)
        address.value = props.addresses[index]
    }
})

watch(() => billingDetail.value.province_id, (val) => {
    if (val !== undefined && val !== null && val !== '') emit('province-changed', Number(val))
})

const selectCountry = country => {
  if (country) {
    let _country = listCountries.value.find(item => item.name === country)
    client_country_id.value = _country.name
 
    billingDetail.value.province_id = null
    
    listProvincesByCountry.value = listProvinces.value.filter(item => item.country_id === _country.id)
  }
}

const onSubmit = () => {
    refVForm.value?.validate()
}

async function validateAndGetBillingDetail() {
    const result = await refVForm.value?.validate()
    if (result && result.valid) {
        return { valid: true, data: billingDetail.value }
    }
    return { valid: false }
}

defineExpose({ validateAndGetBillingDetail })

const getFlagCountry = country => {
  let val = listCountries.value.find(item => {
    return item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  })

  if(val)
    return 'https://hatscripts.github.io/circle-flags/flags/'+val.iso.toLowerCase()+'.svg'
  else
    return ''
}
</script>

<template>
    <VForm
        ref="refVForm" class="form-payment"
        @submit.prevent="onSubmit">     
        <VCardText class="row-cardp3 px-5 pb-0">
            <span class="tw-text-tertiary tw-font-bold"> Facturación y Envío  </span>
        </VCardText>

        <VCardText class="p-0 mt-3 px-5 px-md-8">
            <VCardItem class="p-0">
                <VRow no-gutters class="text-left align-center">
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            label="Nombre"
                            v-model="billingDetail.name"
                            variant="outlined"
                            :rules="[requiredValidator]"
                            class="me-0 me-md-2"
                            />
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            label="Apellido"
                            v-model="billingDetail.last_name"
                            variant="outlined"
                            class="me-0 me-md-2"
                            :rules="[requiredValidator]"
                            />
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            v-model="billingDetail.phone"
                            type="tel"
                            label="Teléfono"
                            placeholder="+57 23 456 7890"
                            variant="outlined"
                            :rules="[requiredValidator, phoneValidator]"
                        />
                    </VCol> 
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            :disabled="isLoggedIn"
                            v-model="billingDetail.email"
                            label="Dirección de E-mail"
                            variant="outlined"
                            class="me-0 me-md-2"
                            :rules="[requiredValidator, emailValidator]"
                        />    
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VAutocomplete
                            variant="outlined"
                            v-model="billingDetail.document_type_id"
                            label="Tipo de Documento"
                            :rules="[requiredValidator]"
                            :items="listDocumentTypes"
                            class="me-0 me-md-2"
                            :menu-props="{ maxHeight: '200px' }"
                            /> 
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            label="Nro Documento"
                            v-model="billingDetail.document"
                            variant="outlined"
                            :rules="[requiredValidator]"
                        />   
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VAutocomplete
                            disabled    
                            variant="outlined"
                            v-model="billingDetail.country_id"
                            label="País"
                            :rules="[requiredValidator]"
                            :items="listCountries"
                            item-title="name"
                            item-value="name"
                            readonly
                            :menu-props="{ maxHeight: '200px' }"
                            @update:model-value="selectCountry"
                            class="me-0 me-md-2" >
                            <template
                                v-if="billingDetail.country_id"
                                #prepend
                                >
                                <VAvatar
                                    start
                                    style="margin-top: -8px;"
                                    :size="isMobile ? '30' : '36'"
                                    :image="getFlagCountry(billingDetail.country_id)"
                                />
                            </template>
                        </VAutocomplete>
                    </VCol>  
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VAutocomplete
                            v-model="billingDetail.province_id"
                            item-title="title"
                            item-value="value"
                            variant="outlined"
                            label="Departamento"
                            :items="getProvinces"
                            :rules="[requiredValidator]"
                            :menu-props="{ maxHeight: '200px' }"
                            class="me-0 me-md-2"
                        />    
                    </VCol>
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            label="Ciudad"
                            v-model="billingDetail.city"
                            variant="outlined"
                            :rules="[requiredValidator]"
                        />
                    </VCol>  
                    <VCol cols="12" md="4" class="textinput mb-0 mb-md-2">
                        <VTextField
                            label="Localidad / Barrio"
                            v-model="billingDetail.street"
                            variant="outlined"                            
                            class="me-0 me-md-2"
                            /> 
                    </VCol> 
                    <VCol cols="12" md="8" class="textinput mb-0 mb-md-2">
                        <VTextField
                            v-model="billingDetail.address"
                            label="Dirección"
                            variant="outlined"
                            :rules="[requiredValidator]"
                        />
                    </VCol> 
                    <VCol cols="12" md="12" class="textinput mb-0 mb-md-2 pb-0">
                        <VTextField
                            v-model="billingDetail.note"
                            label="Nota"
                            placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                            variant="outlined"
                            class="pb-0"
                        />
                    </VCol>
                </VRow>
            </VCardItem>
        </VCardText>           
    </VForm>
</template>

<style scoped>
    
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

    .v-autocomplete::v-deep(.v-field__overlay) {
        background: white !important;
    }

    .v-autocomplete::v-deep(.v-field__input) { 
        padding-top: 0 !important;
    }

    .v-autocomplete::v-deep(.v-input__prepend) {
        margin-inline-end: 0 !important;
    }

    .v-textarea::v-deep(.v-field) { 
        border-radius: 24px !important;
    }

    .v-checkbox::v-deep(.v-selection-control) {
        min-height: 15px;
    }
    
    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
        margin-left: 10px;
    }

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }

    .border-title {
        border-bottom: 1px solid #D9EEF2;
    }

    .title-summary {
        color: #0A1B33;
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .title-card {
        color: #0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-cardp {
        border-bottom: 1px solid #D9EEF2;
        border-top: 1px solid #D9EEF2;
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

    .row-cardelivery3 {
        margin-top:20px;
        padding-top:20px;
        padding-bottom:20px;
        border-top: 1px solid #E2F8FC;

    }

    .row-cardelivery3 h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
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

    .row-total {
        width:100%;
        border-bottom: 1px solid  #E2F8FC;
        padding: 16px 32px;
    }

    .row-total h4 {
        color: #0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align:left;

    }

    .row-total h5 {
        color: #FF0090;
        text-align: right;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-realizar {
        padding: 15px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .row-realizar button {
        display: flex;
        width: 100%;
        height: 54px;
        padding: 0px 32px;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        background:  #FF0090;
        color: #FFF;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px; 
    }

    .row-realizar button:hover {
        background:  #FF27B3;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .row-payu span, p {
        color: #999;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
    }

    @media only screen and (max-width: 767px) {

        .form-payment {
            width: 100%!important;
        }

        .title-summary, .title-card {
            font-size: 20px !important;
        }

        .row-payu span, p {
            font-size: 14px !important;
        }

        .btn-register, .btn-order {
            width: 100%;
        }
    }

</style>