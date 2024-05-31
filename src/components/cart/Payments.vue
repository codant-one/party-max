<script setup>

import { requiredValidator, phoneValidator, emailValidator } from '@validators'
import { formatNumber } from '@formatters'
import Product6 from '@/components/product/Product6.vue'
import Payu from '@/assets/icons/payu.svg'

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
    provinces: {
        type: Object,
        required: true
    },
    iswholesale: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits(['submit', 'send'])

const refVForm = ref()
const isMobile = /Mobi/i.test(navigator.userAgent)
const address = ref(null)
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
    street: '',
    city: '',
    address: '',
    phone: '',
    postal_code: null,
    email: '',
    note: null
})

const sendToBogota = ref(false)
const shipping_express = ref(false)

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

onMounted(async () => {
    selectCountry(billingDetail.value.country_id)
})

watchEffect(() => {

    if (!(Object.entries(props.addresses).length === 0)) {
        let index = props.addresses.findIndex((item) => item.id === props.address_id)
        address.value = props.addresses[index]
    }
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
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            emit('submit', billingDetail.value)
        }
    })

}

const getFlagCountry = country => {
  let val = listCountries.value.find(item => {
    return item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  })

  if(val)
    return 'https://hatscripts.github.io/circle-flags/flags/'+val.iso.toLowerCase()+'.svg'
  else
    return ''
}

const chanceSend = () => {
    if(sendToBogota.value)
        emit('send', 'sendToBogota')
    else
        emit('send', 'send')

}

const chanceExpress = () => {
    if(shipping_express.value)
        emit('send', 'shipping_express')
    else
        emit('send', 'sendToBogota')
}
</script>

<template>
    <VForm
        ref="refVForm" class="form-facturacion"
        @submit.prevent="onSubmit"> 
        <VRow>
            <VCol cols="12">
                <VCard class="card-products mx-auto px-0">
                    <h1 class="title-summary border-title pb-4">Detalles de Facturación</h1>
                    <VCardText class="p-0 mt-3 px-2 px-md-15">
                        <VCardItem class="pb-0 px-2 px-md-10">
                            <VRow no-gutters class="text-left align-center px-2 px-md-15">
                                <VCol cols="12" md="6" class="textinput mb-2 mb-md-2 pt-3">
                                    <VTextField
                                        label="Nombre"
                                        v-model="billingDetail.name"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        class="me-0 me-md-2"
                                        />
                                </VCol>
                                <VCol cols="12" md="6" class="textinput mb-2 mb-md-2 pt-3">
                                    <VTextField
                                        label="Apellido"
                                        v-model="billingDetail.last_name"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        />
                                </VCol>
                                <VCol cols="12" md="6" class="textinput mb-2 mb-md-2">
                                    <VTextField
                                        label="Nombre de la empresa (opcional)"
                                        v-model="billingDetail.company"
                                        variant="outlined"
                                        class="me-0 me-md-2"
                                        />
                                </VCol>
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VTextField
                                        v-model="billingDetail.email"
                                        label="Dirección de E-mail"
                                        variant="outlined"
                                        :rules="[requiredValidator, emailValidator]"
                                    />    
                                </VCol>
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VAutocomplete
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
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VAutocomplete
                                        variant="outlined"
                                        v-model="billingDetail.province_id"
                                        label="Estado"
                                        :rules="[requiredValidator]"
                                        :items="getProvinces"
                                        :menu-props="{ maxHeight: '200px' }"
                                        :readonly="sendToBogota"
                                    />    
                                </VCol>
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VTextField
                                        label="Ciudad"
                                        v-model="billingDetail.city"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                        class="me-0 me-md-2"
                                        :readonly="sendToBogota"
                                    />
                                </VCol>  
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VTextField
                                        label="Calle"
                                        v-model="billingDetail.street"
                                        variant="outlined"
                                        /> 
                                </VCol> 
                                <VCol cols="12">
                                    <VTextarea
                                        v-model="billingDetail.address"
                                        rows="2"
                                        label="Dirección"
                                        variant="outlined"
                                        :rules="[requiredValidator]"
                                    />
                                </VCol>                                
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VTextField
                                        v-model="billingDetail.phone"
                                        type="tel"
                                        label="Teléfono"
                                        placeholder="+57 23 456 7890"
                                        variant="outlined"
                                        class="me-0 me-md-2"
                                        :rules="[requiredValidator, phoneValidator]"
                                    />
                                </VCol>  
                                <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                    <VTextField
                                        v-model="billingDetail.postal_code"
                                        label="Código Postal"
                                        variant="outlined"
                                        type="tel"
                                        :rules="[requiredValidator, phoneValidator]"
                                    />    
                                </VCol>
                                <VCol cols="12">
                                    <VTextarea
                                        v-model="billingDetail.note"
                                        rows="5"
                                        label="Nota"
                                        placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                                        variant="outlined"
                                    />
                                </VCol>
                            </VRow>
                        </VCardItem>
                    </VCardText>
                </VCard>

                <VCard class="card-products mx-auto px-0">
                    <h1 class="title-summary border-title pb-4">Resumen de compra</h1>
                    <h2 class="title-card px-16 my-3">Productos {{ props.iswholesale ? '(al mayor)' : ''}}</h2>
                    <VCardText class="row-cardp p-0">
                        <Product6
                            v-for="(product, i) in props.products"
                            :key="i"
                            :product="product"
                            :readonly="true"
                            :isLastItem="isLastItem(i)"/>
                    </VCardText>
                    <VRow class="row-cardp3 pb-0 px-16">
                        <VCol cols="12" md="6" class="text-left">
                            <span>Subtotal</span>
                        </VCol>

                        <VCol cols="12" md="6" class="text-right">
                            <h4>${{ formatNumber(props.summary.subTotal) }}</h4> 
                        </VCol>
                    </VRow>
                </VCard>

                <VCard class="card-products mx-auto px-0">
                    <h2 class="title-card px-16 my-3">Forma de entrega</h2>
                    <VRow class="row-cardelivery3 px-16">
                        <VCol cols="12" md="3" class="textinput mb-0 mb-md-7">
                            <VCheckbox
                                v-model="sendToBogota" 
                                label="Envío a Bogota"
                                color="primary"
                                @update:modelValue="chanceSend"
                            />
                        </VCol>
                        <VCol cols="12" md="9" class="textinput mb-0 mb-md-7">
                            <VCheckbox
                                v-if="sendToBogota"
                                v-model="shipping_express" 
                                label="Envío express"
                                color="primary"
                                @update:modelValue="chanceExpress"
                            />
                        </VCol>
                        <VCol cols="12" md="10" class="text-left">
                            <h4>
                                {{ address.address }} ,
                                {{ address.street }} <span v-if="address.street !== null">,</span>
                                {{ address.city }} ,
                                {{ address.province.name }}.<br>
                                Código Postal: {{ address.postal_code }}. 
                            </h4>
                        </VCol>
                        <VCol cols="12" md="2" class="text-right">
                            <h4>${{ formatNumber(props.summary.send) }}</h4> 
                        </VCol>
                    </VRow>
                </VCard>

                <VCard class="card-bono mx-auto" v-if="false">
                    <VCardTitle class="text-center d-flex title-bono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                            <path d="M20.5003 -0.000576019C17.9353 -0.000576019 15.517 1.12609 13.8636 3.08942C13.7053 3.27776 13.4986 3.36443 13.237 3.34776C10.6903 3.13609 8.17195 4.04276 6.35862 5.85609C4.54529 7.66943 3.63029 10.1761 3.85029 12.7344C3.87195 12.9794 3.77862 13.2028 3.59195 13.3594C1.62695 15.0144 0.501953 17.4344 0.501953 19.9978C0.501953 22.5611 1.62862 24.9811 3.59195 26.6344C3.78029 26.7928 3.87362 27.0161 3.85195 27.2611C3.63195 29.8194 4.54695 32.3261 6.36029 34.1394C8.17195 35.9511 10.667 36.8694 13.2386 36.6478C13.4803 36.6278 13.707 36.7178 13.8653 36.9061C15.5186 38.8711 17.937 39.9961 20.502 39.9961C23.067 39.9961 25.4853 38.8694 27.1386 36.9061C27.2986 36.7178 27.5053 36.6311 27.7653 36.6478C30.3003 36.8711 32.8303 35.9528 34.6436 34.1394C36.457 32.3261 37.372 29.8194 37.152 27.2611C37.1303 27.0161 37.2236 26.7928 37.4103 26.6361C39.3753 24.9811 40.5003 22.5611 40.5003 19.9978C40.5003 17.4344 39.3736 15.0144 37.4103 13.3611C37.222 13.2028 37.1286 12.9794 37.1503 12.7344C37.3703 10.1761 36.4553 7.66943 34.642 5.85609C32.8303 4.04442 30.3386 3.12276 27.7636 3.34776C27.5236 3.36109 27.2953 3.27609 27.137 3.08942C25.4836 1.12442 23.0653 -0.000576019 20.5003 -0.000576019ZM13.3103 5.01942C14.0186 5.01942 14.6753 4.71442 15.1403 4.16276C16.4753 2.57609 18.4303 1.66609 20.502 1.66609C22.5736 1.66609 24.5286 2.57609 25.8636 4.16276C26.3736 4.76942 27.1253 5.08609 27.9103 5.00943C29.9786 4.83443 32.002 5.57109 33.467 7.03609C34.932 8.50109 35.6703 10.5261 35.4936 12.5944C35.427 13.3844 35.7353 14.1278 36.342 14.6378C37.927 15.9744 38.837 17.9294 38.837 19.9994C38.837 22.0694 37.927 24.0261 36.3403 25.3628C35.7353 25.8711 35.427 26.6161 35.4936 27.4061C35.6703 29.4744 34.932 31.4994 33.467 32.9644C32.0003 34.4294 29.962 35.1694 27.9103 34.9911C27.1103 34.9244 26.3753 35.2311 25.8636 35.8378C24.5286 37.4244 22.5736 38.3344 20.502 38.3344C18.4303 38.3344 16.4753 37.4244 15.1403 35.8378C14.6286 35.2311 13.8703 34.9261 13.0936 34.9911C11.022 35.1694 9.00195 34.4294 7.53695 32.9644C6.07195 31.4994 5.33362 29.4744 5.51029 27.4061C5.57695 26.6161 5.26862 25.8728 4.66195 25.3628C3.07695 24.0261 2.16695 22.0711 2.16695 20.0011C2.16695 17.9311 3.07695 15.9744 4.66362 14.6378C5.26862 14.1294 5.57695 13.3844 5.51029 12.5944C5.33362 10.5261 6.07195 8.50109 7.53695 7.03609C9.00195 5.57109 11.0353 4.83942 13.0936 5.00943C13.167 5.01609 13.2386 5.01942 13.3103 5.01942ZM15.5003 26.6661C14.5803 26.6661 13.8336 25.9194 13.8336 24.9994C13.8336 24.0794 14.5803 23.3328 15.5003 23.3328C16.4203 23.3328 17.167 24.0794 17.167 24.9994C17.167 25.9194 16.4203 26.6661 15.5003 26.6661ZM25.5003 16.6661C24.5803 16.6661 23.8336 15.9194 23.8336 14.9994C23.8336 14.0794 24.5803 13.3328 25.5003 13.3328C26.4203 13.3328 27.167 14.0794 27.167 14.9994C27.167 15.9194 26.4203 16.6661 25.5003 16.6661ZM17.027 12.8711L25.3603 25.3711C25.6153 25.7544 25.512 26.2711 25.1286 26.5261C24.7486 26.7794 24.2303 26.6778 23.9736 26.2944L15.6403 13.7944C15.3853 13.4111 15.4886 12.8944 15.872 12.6394C16.0136 12.5444 16.1753 12.4994 16.3336 12.4994C16.602 12.4994 16.8653 12.6294 17.027 12.8711Z" fill="#FF0090"/>
                        </svg>  &nbsp; &nbsp; &nbsp;Ingresar un cupón de descuento
                    </VCardTitle>

                    <VRow class="text-center d-flex" style="width:70%; margin-top:16px;">
                        <v-text-field label="" variant="outlined"></v-text-field>
                        <button class="button-bono">Aplicar</button>
                    </VRow>
                </VCard>

                <VCard class="card-bono mx-auto p-0">
                    <VCardTitle class="d-flex row-total title-card px-16">
                        <h4>Total</h4>     
                        <VSpacer />
                        <h5 class="tw-font-semibold">${{ formatNumber(props.summary.total) }}</h5>
                    </VCardTitle>
                    <VCardText class="d-flex row-realizar title-card w-100 px-16">
                        <VBtn
                            block
                            variant="flat"
                            type="submit"
                            class="btn-register tw-text-white tw-bg-primary button-hover">
                                Realizar pedido
                        </VBtn>
                    </VCardText>
                    <VCardText class="d-block row-payu align-center text-center p-0 px-8 px-md-16 pb-5">
                        <div class="d-flex align-center text-center justify-content-center">
                            <span class="me-5">PayU Latam Online Payments</span>
                            <img :src="Payu"/>
                        </div>
                        <VCardItem class="align-center text-center py-5 py-md-0 px-2 px-md-15">
                            <span>
                                Pague con tarjeta de crédito, debito o transacción bancaria de forma segura a través de los
                                servidores seguros de PayU Latinoamérica.
                            </span>
                        </VCardItem>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </VForm>
</template>

<style scoped>
    
    
    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999 !important;
        font-size: 15px;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-input__details) {
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
    
    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
        margin-top:16px;
        box-shadow: none;
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
        height: 38px;
        padding: 24px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 32px;
        border: 1px solid  #0A1B33;
        color:#0A1B33;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px; 
        margin-left: 16px;
    }

    .button-bono:hover {
        background-color:  #FFC549;
        border: 1px solid #FFC549;
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

    @media only screen and (max-width: 767px)
    {
        .card-products
        {
            padding: 16px 10px;
        }

        .form-facturacion
        {
            width: 100%!important;
        }
    }

</style>