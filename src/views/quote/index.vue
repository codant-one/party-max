<script setup>

import { ref } from 'vue'
import { formatNumber } from '@formatters'
import { requiredValidator, phoneValidator, emailValidator } from '@validators'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'
import { useDocumentTypesStores } from '@/stores/document-types'

import Product6 from '@/components/product/Product6.vue'
import Service6 from '@/components/service/Service6.vue'

import logo from '@assets/images/logo.svg';
import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import info from '@assets/icons/info-circle.svg?inline';

import Loader from '@/components/common/Loader.vue'

const homeStores = useHomeStores()
const cartStores = useCartStores()
const documentTypesStores = useDocumentTypesStores()

const isMobile = /Mobi/i.test(navigator.userAgent)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)
const data = ref(null)
const products = ref([])
const documentTypes = ref([])
const isLoading = ref(false)
const iswholesale = ref(false)
const refVForm = ref()
const quotationGenerated = ref(false)
const today = new Date().toLocaleDateString('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

const billingDetail = ref({
    name: '',
    company: '',
    document_type_id: '',
    document: '',
    phone: '',
    email: ''
})

const summary = ref({
    subTotal: 0,
    send: '12000.00',
    shipping_express: 0,
    total: 0
})

watchEffect(fetchData)

async function fetchData() {

    isLoading.value = true

    if(cartStores.getCount > 0) {
        await homeStores.fetchData()
        data.value = homeStores.getData

        await cartStores.fetchCart()
        products.value = cartStores.getData

        let sum = 0
        products.value.forEach(element => {
            let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
            let value = 
            element.type === 0 ? 
              (element.wholesale === 1 ? element.product.wholesale_price : element.product.price_for_sale) :
              (element.cake_size_id === 0 ? element.price : cupcake.price)

            iswholesale.value = element.wholesale === 1 ? true : false
            sum += (parseFloat(value) * element.quantity)
        });
        summary.value.subTotal = sum.toFixed(2)
        summary.value.total = (parseFloat(summary.value.send) + parseFloat(summary.value.subTotal)).toFixed(2)
    }

    await documentTypesStores.fetchDocumentTypes()
    documentTypes.value = documentTypesStores.getData

    isLoading.value = false
}

const isLastItem = (index) => {
  return index === products.value.length - 1;
}

const getDocumentTypes = computed(() => {
    return documentTypes.value.map((documentType) => {
        return {
        title: '(' + documentType.code + ') - ' + documentType.name,
        value: documentType.id,
        }
    })
})

const printQuote = () => {
  window.print()
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            isLoading.value = true
            
            setTimeout(() => {
                isLoading.value = false

                isDialogVisible.value = true
                isError.value = false
                message.value = 'Cotización generada exitosamente.'

                setTimeout(() => {
                    isDialogVisible.value = false
                    message.value = ''
                    isError.value = false
                    quotationGenerated.value = true
                }, 3000)
            }, 1000)
            
        }
    })
}
</script>

<template>
   <div class="checkout-page">
        <Loader :isLoading="isLoading"/>
        <VContainer class="checkout-card">
            <VForm
                v-if="!quotationGenerated"
                ref="refVForm" 
                class="form-facturacion"
                @submit.prevent="onSubmit"> 
                <VRow>
                    <VCol cols="12" md="8">     
                        <VCard class="card-products mx-auto px-0">
                            <h1 class="title-summary border-title pb-4">Resumen de cotización</h1>
                            <h2 class="title-card px-5 px-md-16 my-3">Productos {{ iswholesale ? '(al mayor)' : ''}}</h2>
                            <VCardText class="row-cardp p-0">
                                <template v-for="(item, i) in products" :key="i">
                                    <Product6
                                        v-if="item.type === 0"
                                        :product="item"
                                        :readonly="true"
                                        :isLastItem="isLastItem(i)"/>
                                    <Service6
                                        v-else
                                        :service="item"
                                        :readonly="true"
                                        :isLastItem="isLastItem(i)"/>
                                </template>

                            </VCardText>
                            <VRow class="row-cardp3 pb-0 px-5 px-md-16">
                                <VCol cols="6" md="6" class="text-left">
                                    <span>Subtotal</span>
                                </VCol>

                                <VCol cols="6" md="6" class="text-right pe-6 pe-md-3">
                                    <h4>${{ formatNumber(summary.subTotal) }}</h4> 
                                </VCol>
                            </VRow>
                        </VCard>     
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCard class="card-products mt-0 px-0">
                            <h1 class="title-summary border-title pb-4">Información del Cliente</h1>
                            <VCardText class="p-0 mt-3 px-5 px-md-10">
                                <VCardItem class="pb-0">
                                    <VRow no-gutters class="text-left align-center">
                                        <VCol cols="12" md="12" class="textinput mb-0 mb-md-1">
                                            <VTextField
                                                v-model="billingDetail.name"
                                                label="Nombre completo"
                                                variant="outlined"
                                                :rules="[requiredValidator]"
                                                class="me-0 me-md-2 mt-2"
                                                />
                                        </VCol>
                                        <VCol cols="12" md="12" class="textinput mb-0 mb-md-1">
                                            <VTextField
                                                v-model="billingDetail.company"
                                                label="Nombre de la empresa (opcional)"
                                                variant="outlined"
                                                class="me-0 me-md-2"
                                                />
                                        </VCol>
                                        <VCol cols="12" md="12" class="textinput mb-0 mb-md-1">
                                            <VAutocomplete
                                                v-model="billingDetail.document_type_id"
                                                variant="outlined"
                                                label="Tipo de Documento"
                                                :rules="[requiredValidator]"
                                                :items="getDocumentTypes"
                                                class="me-0 me-md-2"
                                                :menu-props="{ maxHeight: '200px' }"
                                                /> 
                                        </VCol>
                                        <VCol cols="12" md="12" class="textinput mb-0 mb-md-1">
                                            <VTextField
                                                v-model="billingDetail.document"
                                                label="Nro Documento"
                                                variant="outlined"
                                                :rules="[requiredValidator]"
                                            />   
                                        </VCol>                              
                                        <VCol cols="12" md="12" class="textinput mb-0 mb-md-1">
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
                                        <VCol cols="12" md="12" class="textinput mb-0">
                                            <VTextField
                                                v-model="billingDetail.email"
                                                label="Dirección de E-mail"
                                                variant="outlined"
                                                :rules="[requiredValidator, emailValidator]"
                                            />     
                                        </VCol>
                                        <VCol cols="12" md="12" class="mb-0 mb-md-1">
                                            <VBtn
                                                variant="flat"
                                                width="100%"
                                                style="border-radius:32px;"
                                                type="submit"
                                                class="btn-register tw-text-white tw-bg-primary button-hover"
                                                >
                                                    generar cotización
                                            </VBtn>
                                        </VCol>
                                    </VRow>
                                </VCardItem>
                            </VCardText>
                        </VCard>
                    </VCol>
                </VRow>
            </VForm>

            <VRow v-if="quotationGenerated">
                <VCol cols="12" md="8">     
                    <VCard class="card-products mx-auto px-0">
                        <VCardText class="d-block d-md-flex justify-content-between p-5 px-md-16">
                            <div class="d-flex flex-column">
                                <img :src="logo" width="300" alt="logo" cover/>
                            </div>
                            <div class="d-flex flex-column align-end">
                                <span class="title-summary">Cotización</span>
                                <h4 class="text_2 pb-2">{{ today }}</h4>
                            </div>
                        </VCardText>
                        <VCardText class="d-flex flex-column border-title px-5 px-md-16">
                            <h4 class="text_2">CLIENTE</h4>
                            <span class="text_2">{{ billingDetail.name }}</span>
                            <span class="text_2" v-if="billingDetail.company">{{ billingDetail.company }}</span>
                            <span class="text_2">{{ documentTypes.filter(doc => doc.id === Number(billingDetail.document_type_id))[0].code }}-{{ billingDetail.document }}</span>
                            <span class="text_2">(+57) {{ billingDetail.phone }}</span>
                            <span class="text_2">{{ billingDetail.email }}</span>
                        </VCardText>

                        <h2 class="title-card px-5 px-md-16 my-3">Productos {{ iswholesale ? '(al mayor)' : ''}}</h2>

                        <VCardText class="row-cardp p-0">
                            <template v-for="(item, i) in products" :key="i">
                                <Product6
                                    v-if="item.type === 0"
                                    :product="item"
                                    :readonly="true"
                                    :isLastItem="isLastItem(i)"/>
                                <Service6
                                    v-else
                                    :service="item"
                                    :readonly="true"
                                    :isLastItem="isLastItem(i)"/>
                            </template>

                        </VCardText>

                        <VRow class="row-cardp3 border-title pb-0 px-5 px-md-16">
                            <VCol cols="6" md="6" class="text-left">
                                <span>Subtotal</span>
                            </VCol>

                            <VCol cols="6" md="6" class="text-right pe-6 pe-md-3">
                                <h4>${{ formatNumber(summary.subTotal) }}</h4> 
                            </VCol>
                        </VRow>

                        <VCardText class="d-flex px-5 px-md-16 mt-auto">
                            <span class="text-address d-block tw-text-gray d-flex align-center my-2">
                                <info />
                                <span class="ms-2">
                                    Los precios mostrados en esta cotización corresponden únicamente al valor de los productos seleccionados. <br>
                                    El costo de envío no está incluido y será calculado por separado según la dirección de entrega.</span>
                            </span>
                        </VCardText>
                    </VCard>     
                </VCol>
                <VCol cols="12" md="4" class="d-print-none">
                    <VCard class="card-bono mx-auto p-0 py-5">
                        <VCardText class="d-flex row-realizar title-card w-100 px-5 px-md-10 py-2">
                            <VBtn
                                block
                                variant="flat"
                                type="submit"
                                class="btn-register tw-text-white tw-bg-primary button-hover">
                                    Descargar
                            </VBtn>
                        </VCardText>
                        <VCardText class="d-flex row-realizar title-card w-100 px-5 px-md-10 py-2 ">
                            <VBtn
                                block
                                variant="flat"
                                type="submit"
                                class="btn-order"
                                @click="printQuote">
                                    Imprimir
                            </VBtn>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VContainer>

        <!--PopUp Message-->
        <VDialog v-model="isDialogVisible" >
            <VCard
                class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" class="mx-auto"/>
                <VCardText class="text-message mt-10 mb-5">
                    {{ message }}
                </VCardText>
            </VCard>
        </VDialog>
    </div>
</template>

<style lang="scss">
    @media print {

        .border-img, .avatar-dynamic {
            width: 50px !important;
            height: 50px !important;
        }

        .checkout-page, .checkout-card {
            margin-top: 0 !important;
        }

        .v-card {
            border-top: 1px solid #999999;
            border-radius: 0 !important;
            margin: 0 !important;
        }

        body {
            background: none !important;
        }
        
        @page { margin: 0; size: auto; }

        .layout-page-content,
        .v-row,
        .v-col-md-1, .v-col-md-2, .v-col-md-3, .v-col-md-4,
        .v-col-md-5, .v-col-md-6, .v-col-md-7, .v-col-md-8,
        .v-col-md-9, .v-col-md-10, .v-col-md-11, .v-col-md-12 {
            padding: 0;
            margin: 0;
        }

        .v-navigation-drawer,
        .layout-vertical-nav,
        .app-customizer-toggler,
        .layout-footer,
        .layout-navbar,
        .layout-navbar-and-nav-container {
            display: none !important;
        }

        .v-card {
            box-shadow: none !important;

            .print-row {
                flex-direction: row !important;
            }
        }

        .layout-content-wrapper {
            padding-inline-start: 0 !important;
        }

        .v-table__wrapper {
            overflow: hidden !important;
        }
    }
</style>
<style lang="scss">

    .w-60 {
        width: 65%;
    }

    .checkout-card {
        margin-top: 40px;
        margin-block-end: 2rem;
    }

    @media (max-width: 960px) and (min-width: 600px) {
        .checkout-page {
            .v-container {
                padding-inline: 2rem !important;
            }
        }
    }

    @media (max-width: 600px){
        .checkout-card {
            margin-top: 8px;
            margin-block-end: 0 !important;
        }
    }
</style>
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

    .btn-order {
        border-radius: 32px;
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        box-shadow: none;
        height: 54px;
    }

    .btn-order:hover {
        border: 1px solid var(--Maastricht-Blue, #0A1B33) !important;
        background: var(--Maastricht-Blue, #0A1B33) !important;
        color: #FFFFFF!important;
    }

    .card-register {
        width: 500px;
        border-radius: 32px!important;
    }

    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
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

    .v-autocomplete::v-deep(.v-input__prepend) {
        margin-inline-end: 0 !important;
    }

    .v-textarea::v-deep(.v-field) { 
        border-radius: 24px !important;
    }

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }

    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
        margin-left: 10px;
    }

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px !important;
        padding: 0 60px !important;
    }

    .card-products {
        background-color:#FFFFFF;
        padding:16px 32px;
        border-radius: 24px;
        box-shadow: none;
    }

    .title-card {
        color: #0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
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
    
    .card-bono {
        display: flex;
        padding: 24px 32px;
        flex-direction: column;
        align-items: center;
        border-radius: 16px;
        box-shadow: none;
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

    .row-cardp {
        border-bottom: 1px solid #D9EEF2;
        border-top: 1px solid #D9EEF2;
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

    .text-address {
        color: #0A1B33;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    
    .text-address svg {
        transform: scale(0.8);
    }

    @media only screen and (max-width: 767px) {

        .text-address {
            font-size: 8px;
            line-height: 12px;
        }

        .text-address svg {
            width: 35px;
        }

        .title-summary, .title-card {
            font-size: 20px !important;
        }

        .card-products {
            padding: 16px 10px;
        }

        .v-checkbox::v-deep(.v-selection-control) {
            text-align: center;
            align-items: center; 
            justify-content: center; 
            min-height: 35px;
        }

        .text-message {
            padding: 0 20px !important;
            font-size: 18px;
        }

        .card-register {
            padding: 20px;
            width: auto;
        }

        .w-60 {
            width: 100%;
        }

        .text-left {
            line-height: 24px;
        }

        .btn-register, .btn-order {
            width: 100%;
        }

    }
</style>