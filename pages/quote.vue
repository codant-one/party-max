<script setup>

import { ref } from 'vue'
import { formatNumber } from '@formatters'
import { requiredValidator, phoneValidator, emailValidator } from '@validators'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'
import { useDocumentTypesStores } from '@/stores/document-types'
import { useQuotesStores } from '@/stores/quotes'
import { useRuntimeConfig } from '#app'

import Product9 from '@/components/product/Product9.vue'
import Service8 from '@/components/service/Service8.vue'

import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import info from '@assets/icons/info-circle.svg?inline';

import Loader from '@/components/common/Loader.vue'

const homeStores = useHomeStores()
const cartStores = useCartStores()
const documentTypesStores = useDocumentTypesStores()
const quotesStores = useQuotesStores()
const config = useRuntimeConfig()

const { isMobile } = useDevice();
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
const quoteId = ref(1)
const quote = ref(null)
const today = new Date();
const futureDate = new Date(today);
const start_date = today.toLocaleDateString('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

futureDate.setDate(today.getDate() + 8);
const due_date = futureDate.toLocaleDateString('es-ES', {
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
    iva: 0,
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

        let iva = ((sum * 19) / 100)
        summary.value.subTotal = (sum - iva).toFixed(2)
        summary.value.iva = iva.toFixed(2)
        summary.value.total = sum.toFixed(2)
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

const download = async() => {
  try {
    const baseURL = config.public.APP_DOMAIN_API_URL+ '/api/'
    const storageURL = config.public.APP_DOMAIN_API_URL + '/storage/'
    const response = await fetch(baseURL + 'proxy-image?url=' + storageURL + quote.value.file);
    const blob = await response.blob();
    
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'quote-' + quote.value.id + '.pdf'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  } catch (error) {
    console.error('Error:', error);
  }
};

const printQuote = async() => {
    try {
        const baseURL = config.public.env.VITE_APP_DOMAIN_API_URL+ '/api/'
        const storageURL = config.public.env.VITE_APP_DOMAIN_API_URL + '/storage/'
        const response = await fetch(baseURL + 'proxy-image?url=' + storageURL + quote.value.file);
        const blob = await response.blob();
        
        const blobUrl = URL.createObjectURL(blob);
        
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        
        iframe.onload = () => {
            iframe.contentWindow.print();
        };
        
        document.body.appendChild(iframe);
    } catch (error) {
        // console.error('Error:', error);
    }
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            isLoading.value = true
            
            let product_color_id = []
            let service_id = []
            let price_product = []
            let quantity_product = []
            let price_service = []
            let quantity_service = []
            let cake_size_id = []
            let flavor_id = []
            let filling_id = []
            let order_file_id = []
            let product_type = 0
            let service_type = 0
            let type = 0

            products.value.forEach(element => {

                if(element.type === 0) {
                    product_color_id.push(element.product_color_id)
                    price_product.push(iswholesale.value === true ? element.product.wholesale_price : element.product.price_for_sale)
                    quantity_product.push(element.quantity)
                    product_type = 1
                } else {
                    let cupcake = element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)

                    service_id.push(element.id)
                    price_service.push(element.cake_size_id === 0 ? element.price : cupcake.price)
                    quantity_service.push(element.quantity)
                    cake_size_id.push(element.cake_size_id === 0 ? null : element.cake_size_id)
                    flavor_id.push(element.cake_size_id > 0 ? element.flavor.id : null)
                    filling_id.push(element.cake_size_id > 0 ? element.filling.id : null)
                    order_file_id.push(element.order_file_id === '0' ? null : element.order_file_id)
                    service_type = 1
                }
            });

            if(product_type === 1 && service_type === 1)
                type = 2
            else
                type = (product_type === 1) ? 0 : 1

            let data = {
                name: billingDetail.value.name,
                company: billingDetail.value.company,
                document_type_id: billingDetail.value.document_type_id,
                document: billingDetail.value.document,
                phone: billingDetail.value.phone,
                email: billingDetail.value.email,
                start_date: start_date,
                due_date: due_date,
                sub_total: summary.value.subTotal,
                tax: summary.value.iva,
                total: summary.value.total,
                product_color_id: product_color_id,
                service_id: service_id,
                price_product: price_product,
                quantity_product: quantity_product,
                price_service: price_service,
                quantity_service: quantity_service,
                cake_size_id: cake_size_id,
                flavor_id: flavor_id,
                filling_id: filling_id,
                type: type
            }

            quotesStores.addQuote(data)
                .then(response => {
                    isLoading.value = false

                    isDialogVisible.value = true
                    isError.value = false
                    message.value = 'Cotización generada exitosamente.'

                    quoteId.value = response.id
                    quote.value = response

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                        quotationGenerated.value = true
                    }, 3000)
                })
                .catch(error => {
                    
                    isLoading.value = false
                    isDialogVisible.value = true
                    message.value = error
                    isError.value = true             

                    setTimeout(() => {
                        isDialogVisible.value = false
                        message.value = ''
                        isError.value = false
                    }, 2000)
                    // console.error('Error:', error);
                });
        }
    })
}
</script>

<template>
   <div class="checkout-page">
        <Loader :isLoading="isLoading" class="d-print-none"/>
        <VContainer class="checkout-card">
            <VForm
                v-if="!quotationGenerated"
                ref="refVForm" 
                class="d-print-none"
                @submit.prevent="onSubmit"> 
                <VRow>
                    <VCol cols="12" md="8">     
                        <VCard class="card-products mx-auto px-0">
                            <h1 class="title-summary border-title pb-4">Resumen de cotización</h1>
                            <VCardText class="row-cardp p-0">
                                <VRow no-gutters class="px-5 px-md-12 mt-1 pb-1">
                                    <VCol cols="7" md="7" class="d-flex justify-content-start align-start">
                                        <h4 class="text_2">Productos {{ iswholesale ? '(al mayor)' : ''}}</h4>
                                    </VCol>
                                    <VCol cols="2" md="1" class="d-flex justify-content-end tw-items-end">
                                        <h4 class="text_2">Cant.</h4>
                                    </VCol>
                                    <VCol cols="2" md="2" class="d-none d-md-flex justify-content-end tw-items-end">
                                        <h4 class="text_2">Unitario</h4>
                                    </VCol>
                                    <VCol cols="3" md="2" class="d-flex justify-content-end tw-items-end">
                                        <h4 class="text_2">Total</h4>
                                    </VCol>
                                </VRow>
                            </VCardText>
                            <VCardText class="row-cardp p-0 mb-4">
                                <template v-for="(item, i) in products" :key="i">
                                    <Product9
                                        v-if="item.type === 0"
                                        :product="item"
                                        :readonly="true"
                                        :isLastItem="isLastItem(i)"/>
                                    <Service8
                                        v-else
                                        :service="item"
                                        :readonly="true"
                                        :isLastItem="isLastItem(i)"/>
                                </template>
                            </VCardText>
                            <VRow no-gutters class="px-5 px-md-12 my-0 my-md-3 summary">
                                <VCol cols="8" md="10" class="d-flex justify-content-end align-center">
                                    <span>Subtotal</span>
                                </VCol>
                                <VCol cols="4" md="2" class="d-flex justify-content-end align-center">
                                    <span>${{ formatNumber(summary.subTotal) }}</span> 
                                </VCol>
                            </VRow>

                            <VRow no-gutters class="px-5 px-md-12 my-0 my-md-3 summary">
                                <VCol cols="8" md="10" class="d-flex justify-content-end align-center">
                                    <span>IVA</span>
                                </VCol>
                                <VCol cols="4" md="2" class="d-flex justify-content-end align-center">
                                    <span>${{ formatNumber(summary.iva) }}</span> 
                                </VCol>
                            </VRow>

                            <VRow no-gutters class="px-5 px-md-12 my-0 my-md-3 summary">
                                <VCol cols="8" md="10" class="text-right tw-text-primary">
                                    <span>Total</span>
                                </VCol>
                                <VCol cols="4" md="2" class="text-right tw-text-primary">
                                    <span>${{ formatNumber(summary.total) }}</span> 
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
                                    </VRow>
                                </VCardItem>
                                <VCardItem class="p-0 text-center">
                                    <VBtn
                                        variant="flat"
                                        width="88%"
                                        style="border-radius:32px;"
                                        type="submit"
                                        class="btn-register tw-text-white tw-bg-primary button-hover my-3"
                                        >
                                            generar cotización
                                    </VBtn>
                                </VCardItem>
                            </VCardText>
                        </VCard>
                    </VCol>
                </VRow>
            </VForm>

            <VRow v-if="quotationGenerated">
                <VCol cols="12" md="8">    
                    <div class="print-container">
                        <VCard class="card-quote mx-auto content-to-print">
                            <VCardText class="d-md-flex justify-content-between p-5 px-md-12 mt-quote">
                                <VRow no-gutters>
                                    <VCol cols="12" md="6" class="d-flex flex-column order-last order-md-first mt-5 mt-md-0">
                                        <h4 class="text_2">CLIENTE</h4>
                                        <span class="text_2"><strong>Nombre:</strong> {{ billingDetail.name }}</span>
                                        <span class="text_2" v-if="billingDetail.company"><strong>Empresa:</strong> {{ billingDetail.company }}</span>
                                        <span class="text_2"><strong>Documento:</strong> {{ documentTypes.filter(doc => doc.id === Number(billingDetail.document_type_id))[0].code }}-{{ billingDetail.document }}</span>
                                        <span class="text_2"><strong>Teléfono:</strong> {{ billingDetail.phone.includes('+57') ? '' : '(+57)'}} {{ billingDetail.phone }}</span>
                                        <span class="text_2"><strong>Correo electrónico:</strong> {{ billingDetail.email }}</span>
                                    </VCol>
                                    <VCol cols="12" md="6" class="d-flex flex-column align-end">
                                        <span class="title-summary">Cotización # {{quoteId}}</span>
                                        <h4 class="text_2 text-right"><strong>Fecha de solicitud:</strong> {{ start_date }}</h4>
                                        <h4 class="text_2 text-right"><strong>Fecha de vencimiento:</strong> {{ due_date }}</h4>
                                    </VCol>
                                </VRow>
                            </VCardText>
                            <VCardText class="row-cardp p-0 border-top">
                                <VRow no-gutters class="px-5 px-md-12 mt-1 pb-1">
                                    <VCol cols="7" md="7" class="d-flex justify-content-start align-start">
                                        <h4 class="text_2">Productos {{ iswholesale ? '(al mayor)' : ''}}</h4>
                                    </VCol>
                                    <VCol cols="2" md="1" class="d-flex justify-content-end tw-items-end">
                                        <h4 class="text_2">Cant.</h4>
                                    </VCol>
                                    <VCol cols="2" md="2" class="d-none d-md-flex justify-content-end tw-items-end">
                                        <h4 class="text_2">Unitario</h4>
                                    </VCol>
                                    <VCol cols="3" md="2" class="d-flex justify-content-end tw-items-center">
                                        <h4 class="text_2">Total</h4>
                                    </VCol>
                                </VRow>
                            </VCardText>
                            <template v-for="(item, i) in products" :key="i">
                                <Product9
                                    v-if="item.type === 0"
                                    :product="item"
                                    :readonly="true"
                                    :isLastItem="isLastItem(i)"/>
                                <Service8
                                    v-else
                                    :service="item"
                                    :readonly="true"
                                    :isLastItem="isLastItem(i)"/>
                            </template>
                            <VCardText class="p-0 border-top">
                                <VRow no-gutters class="px-5 px-md-12 my-3">
                                    <VCol cols="8" md="10" class="d-flex justify-content-end align-end">
                                        <span>Subtotal</span>
                                    </VCol>
                                    <VCol cols="4" md="2" class="d-flex justify-content-end align-end">
                                        <span>${{ formatNumber(summary.subTotal) }}</span> 
                                    </VCol>
                                </VRow>
                                <VRow no-gutters class="px-5 px-md-12 my-3">
                                    <VCol cols="8" md="10" class="d-flex justify-content-end align-end">
                                        <span>IVA</span>
                                    </VCol>
                                    <VCol cols="4" md="2" class="d-flex justify-content-end align-end">
                                        <span>${{ formatNumber(summary.iva) }}</span> 
                                    </VCol>
                                </VRow>
                                <VRow no-gutters class="px-5 px-md-12 my-3">
                                    <VCol cols="8" md="10" class="d-flex tw-text-primary justify-content-end align-end">
                                        <span>Total</span>
                                    </VCol>
                                    <VCol cols="4" md="2" class="d-flex tw-text-primary justify-content-end align-end">
                                        <span>${{ formatNumber(summary.total) }}</span> 
                                    </VCol>
                                </VRow>
                            </VCardText>
                            <VCardText class="d-flex px-5 px-md-12 mt-auto">
                                <span class="text-address d-block tw-text-gray d-flex align-center my-2">
                                    <info />
                                    <span class="ms-2">
                                        Los precios mostrados en esta cotización corresponden únicamente a los productos seleccionados. <br>
                                        El costo de envío no está incluido y se calculará por separado, según la dirección de entrega. <br>
                                        Todos nuestros productos en el marketplace incluyen el IVA. <br>
                                        Esta cotización tiene una validez de 8 días a partir de la fecha de emisión.
                                    </span>
                                </span>
                            </VCardText>
                        </VCard>    
                    </div>  
                </VCol>
                <VCol cols="12" md="4" class="d-print-none">
                    <VCard class="card-bono mx-auto p-0 bg-transparent">
                        <VCardText class="d-flex flex-column row-realizar title-card w-100 px-5 px-md-10 py-2 ">
                            <VBtn
                                block
                                variant="flat"
                                type="submit"
                                 class="btn-register tw-text-white tw-bg-primary button-hover"
                                @click="printQuote">
                                    Imprimir
                            </VBtn>
                            <VBtn
                                block
                                variant="flat"
                                type="submit"
                                 class="btn-order tw-bg-green tw-text-tertiary my-2 me-2"
                                @click="download">
                                Descargar
                            </VBtn>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VContainer>

        <!--PopUp Message-->
        <VDialog v-model="isDialogVisible" class="d-print-none">
            <VCard
                class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" class="mx-auto"/>
                <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
                    {{ message }}
                </VCardText>
            </VCard>
        </VDialog>
    </div>
</template>
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

        .summary span {
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
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
        box-shadow: 0px 0px 12px 0px #FF27B3;
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
        padding: 16px 32px;
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

    .border-top {
        border-top: 1px solid #D9EEF2;
        border-bottom: 1px solid #D9EEF2;
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
        font-size: 10px;
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
<style lang="scss">

    .content-to-print {
        background-color: white;
        border-radius: 24px;
        padding: 0;
    }

    .card-quote {
        box-shadow: none;
        background-color: white;
    }

    .bg-transparent {
        background-color: transparent;
    }

    .mt-quote {
        margin-top: 20px;
    }
</style>