<script setup>

import { ref } from 'vue'
import { requiredValidator, phoneValidator } from '@validators'
import { useAddressesStores } from '@/stores/addresses'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'
import { useCountriesStores } from '@/stores/countries'
import { useProvincesStores } from '@/stores/provinces'
import { useOrdersStores } from '@/stores/orders'
import { usePaymentsStores } from '@/stores/payments'
import router from '@/router'

import Stepper from '@/components/cart/Stepper.vue'
import Summary from '@/components/cart/Summary.vue'
import Location from '@/components/cart/Location.vue'
import Payments from '@/components/cart/Payments.vue'
import Confirmation from '@/components/cart/Confirmation.vue'

import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';

import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import CustomRadiosWithIcon from '@/components/app/CustomRadiosWithIcon.vue'

import cart from '@assets/icons/cart.svg?inline'
import address from '@assets/icons/address.svg?inline'
import payment from '@assets/icons/payment.svg?inline'
import confirmation from '@assets/icons/confirmation.svg?inline'

const homeStores = useHomeStores()
const cartStores = useCartStores()
const addressesStores = useAddressesStores()
const provincesStores = useProvincesStores()
const countriesStores = useCountriesStores()
const ordersStores = useOrdersStores()
const paymentsStores = usePaymentsStores()
const route = useRoute()

const isMobile = /Mobi/i.test(navigator.userAgent)
const refVForm = ref()
const load = ref(false)
const dialog = ref(false)
const isDialogVisible = ref(false)
const message = ref()
const isError = ref(false)
const data = ref(null)
const bg = ref('tw-bg-green')
const addresses = ref(null)
const products = ref([])
const client_id = ref(null)
const address_id = ref(0)

const summary = ref({
    subTotal: 0,
    send: '2000.00',
    total: 0
})

const addressTypes = [
  {
    icon: {
      icon: 'mdi-home-city',
      size: '40',
    },
    title: 'Hogar',
    desc: 'Hora de entrega </br>(7 a.m. - 9 p.m.)',
    value: '1',
  },
  {
    icon: {
      icon: 'mdi-office-building',
      size: '40',
    },
    title: 'Oficina',
    desc: 'Hora de entrega </br>(10 a.m. - 6 p.m.)',
    value: '2',
  },
]

const selectedAddress = ref({
    id: 0,
    addresses_type_id: '1',
    country_id: 'Colombia',
    province_id: '',
    title: '',
    street: '',
    city: '',
    address: '',
    phone: '',
    postal_code: null,
    default: false
})

const checkoutSteps = [
  {
    title: 'Carrito',
    icon: cart,
  },
  {
    title: 'Dirección',
    icon: address,
  },
  {
    title: 'Pago',
    icon: payment,
  },
  {
    title: 'Confirmación',
    icon: confirmation,
  },
]

const listCountries = ref([])
const listProvinces = ref([])
const listProvincesByCountry = ref([])
const client_country_id = ref(null)
const provinceOld_id = ref('')

const currentStep = ref(0)
const isLoading = ref(false)
const isActiveStepValid = ref(false)
const iswholesale = ref(false)

const getProvinces = computed(() => {
  return listProvincesByCountry.value.map((province) => {
    return {
      title: province.name,
      value: province.id,
    }
  })
})

onMounted(async () => {

    await countriesStores.getAll();
    await provincesStores.getAll();

    loadCountries()
    loadProvinces()

    selectCountry(selectedAddress.value.country_id)
})

watchEffect(fetchData)

async function fetchData() {

    if(localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)

        client_id.value = userDataJ.client.id
        selectedAddress.value.client_id = userDataJ.client.id
    }

    if(cartStores.getCount > 0) {
        isLoading.value = true
        
        await homeStores.fetchData()
        data.value = homeStores.getData

        let data_ = {
            limit: -1,
            client_id: client_id.value
        }

        await addressesStores.fetchAddresses(data_)
        addresses.value = addressesStores.getAddresses


        await cartStores.fetchCart({client_id: client_id.value})
        products.value = cartStores.getData

        let index = addresses.value.findIndex((item) => item.default === 1) 
        if (addresses.value.length > 0) {
            address_id.value = (index > -1) ? addresses.value[index].id : addresses.value[0].id 

        } 

        let sum = 0
        products.value.forEach(element => {
            let value = element.wholesale === 1 ? element.product.wholesale_price : element.product.price_for_sale
            iswholesale.value = element.wholesale === 1 ? true : false
            sum += (parseFloat(value) * element.quantity)
        });

        summary.value.subTotal = sum.toFixed(2)
        summary.value.total = (parseFloat(summary.value.send) + parseFloat(summary.value.subTotal)).toFixed(2)

        isLoading.value = false
    }

    if(route.query.merchantId) {
        currentStep.value = 3
        isActiveStepValid.value = true
    }
}

const loadCountries = () => {
  listCountries.value = countriesStores.getCountries
}

const loadProvinces = () => {
  listProvinces.value = provincesStores.getProvinces
}

const selectCountry = country => {
  if (country) {
    let _country = listCountries.value.find(item => item.name === country)
    client_country_id.value = _country.name
 
    selectedAddress.value.province_id = null
    
    listProvincesByCountry.value = listProvinces.value.filter(item => item.country_id === _country.id)
  }
}

const changeAddreess = (id) => {
    address_id.value = id
}

const deleteProduct = (product_color_id) => {

    let data = {
        client_id: client_id.value,
        product_color_id: product_color_id,
    }

    cartStores.delete(data)
    fetchData()   

}

const addCart = (data)=>{

    let data_ = {
        client_id: client_id.value,
        product_color_id: data.product_color_id,
        quantity: data.quantity,
        wholesale: data.wholesale
    }

    cartStores.add(data_)

    fetchData()
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            addAddress()
        }
    })

}

const addAddress = () => {
    load.value = true

    selectedAddress.value.default = (selectedAddress.value.default === false) ? 0 : 1
    selectedAddress.value.province_id = (Number.isInteger(selectedAddress.value.province_id)) ? selectedAddress.value.province_id : provinceOld_id.value,

    addressesStores.addAddress(selectedAddress.value)
        .then(response => {

            isDialogVisible.value = true
            message.value = 'Dirección creada exitosamente'
            closeDialog()

            fetchData()

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 3000)

            load.value = false                    
            
        }).catch(err => {

            load.value = false

            if(err.message === 'error'){
                isDialogVisible.value = true
                message.value = err.errors
                isError.value = true
            } else {
                isDialogVisible.value = true
                isError.value = true
                message.value = 'Se ha producido un error...! (Server Error)'
            }                    

            setTimeout(() => {
                isDialogVisible.value = false
                message.value = ''
                isError.value = false
            }, 3000)

            // console.error(err.message)
        })

}

const sendPayU = async (billingDetail) => {

    let product_color_id = []
    let price = []
    let quantity = []

    products.value.forEach(element => {
        product_color_id.push(element.product_color_id)
        price.push(element.product.price_for_sale)
        quantity.push(element.quantity)
    });

    isLoading.value = true

    let response = await cartStores.checkAvailability({client_id: client_id.value})
    
    if(response.allAvailable === false) {

        currentStep.value = 0
        await fetchData()

        message.value = "Todos los productos no estan disponibles"
        isDialogVisible.value = true
        isError.value = true

        setTimeout(() => {
            isDialogVisible.value = false
            message.value = ''
            isError.value = false
        }, 5000)

        isLoading.value = false
    } else {

        let data = {
            client_id:  client_id.value,
            address_id: address_id.value,
            sub_total: summary.value.subTotal,
            shipping_total: summary.value.send,
            tax: 0,
            total: summary.value.total,
            product_color_id: product_color_id,
            price: price,
            quantity: quantity,
            province_id: billingDetail.province_id,
            name: billingDetail.name,
            last_name: billingDetail.last_name,
            company: billingDetail.company,
            email: billingDetail.email,
            phone: billingDetail.phone,
            address: billingDetail.address,
            street: billingDetail.street,
            city: billingDetail.city,
            postal_code: billingDetail.postal_code,
            note: billingDetail.note,
            wholesale: iswholesale.value === true ? 1 : 0
        }

        isLoading.value = true 

        let order = await ordersStores.addOrder(data)
        let payment = await paymentsStores.signature({referenceCode: order.reference_code, amount: summary.value.total})
        
        localStorage.setItem('order_id', order.id)

        const formData = new URLSearchParams();

        formData.append('merchantId', payment.merchantId);
        formData.append('accountId', payment.accountId);
        formData.append('description', 'Order #'+ order.id);
        formData.append('referenceCode', payment.referenceCode);
        formData.append('amount', summary.value.total);
        formData.append('tax', '0');
        formData.append('taxReturnBase', '0');
        formData.append('currency', 'COP');
        formData.append('signature', payment.signature);
        formData.append('test', (payment.test) ? '1' : '0');
        formData.append('buyerEmail', billingDetail.email);
        formData.append('buyerFullName', billingDetail.name + ' ' + billingDetail.last_name);
        formData.append('mobilePhone', billingDetail.phone);
        formData.append('telephone', billingDetail.phone);
        formData.append('logoUrl', import.meta.env.VITE_APP_DOMAIN_API_URL + '/logos/slogan.png');
        formData.append('shippingAddress', billingDetail.address);
        formData.append('shippingCity', billingDetail.city);
        formData.append('shippingCountry', 'CO');
        formData.append('responseUrl', payment.responseUrl);
        formData.append('confirmationUrl', payment.confirmationUrl);

        paymentsStores.redirectToPayU(formData)
            .then(response => {
                // console.log('response:', response);
                isLoading.value = false
                window.location.href = response.url;
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
                }, 3000)
                // console.error('Error:', error);
            });
    }
}

const deleteAll = async () => {
    await cartStores.deleteAll({client_id: client_id.value})
}

const updatePaymentState = async (payment_state_id) => {
    await ordersStores.updatePaymentState({ 
        payment_state_id: payment_state_id
    }, localStorage.getItem('order_id'))
}

const completed = () => {
    window.location.href = router.resolve({ name: 'products' }).href
}

const refresh = () => {
    window.location.href = router.resolve({ name: 'cart' }).href
}

const closeDialog = () => {
    dialog.value = false
    selectedAddress.value = {
        id: 0,
        addresses_type_id: '1',
        country_id: 'Colombia',
        province_id: '',
        title: '',
        street: '',
        city: '',
        address: '',
        phone: '',
        postal_code: null,
        default: false
    }
}

const dialog_error = ()=> {
    message.value = "Debes agregar una dirección de envío"
    isDialogVisible.value = true
    isError.value = true

    setTimeout(() => {
        isDialogVisible.value = false
        message.value = ''
        isError.value = false
    }, 3000)
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

</script>


<template>
   <div class="checkout-page">
        <VContainer 
            class="mt-10 checkout-card"
            :class="currentStep === 2 ? 'w-60': ''">
            <Loader :isLoading="isLoading"/>

            <VCard class="mb-10 card-timeline px-0">
                <VCardText>
                    <!-- 👉 Stepper -->
                    <Stepper
                        v-model:current-step="currentStep"
                        class="checkout-stepper"
                        :isActiveStepValid="(products.length === 0 || isActiveStepValid) ? true : undefined"
                        :items="checkoutSteps"
                        :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
                    />
                </VCardText>
               
            </VCard>

            <!-- 👉 stepper content -->
            <VWindow
                v-if="products.length > 0 || (typeof route.query.merchantId !== 'undefined')"
                v-model="currentStep"
                class="disable-tab-transition mb-5"
                :touch="false"
                >
                <VWindowItem>
                    <Summary
                        v-model:current-step="currentStep"
                        :products="products"
                        :summary="summary"
                        @delete="deleteProduct"
                        @addCart="addCart"
                    />
                </VWindowItem>
                <VWindowItem>
                    <Location 
                        v-model:current-step="currentStep"
                        :address_id="address_id"
                        :addresses="addresses"
                        :summary="summary"
                        @changeAddreess="changeAddreess"
                        @dialog="dialog = true"
                        @dialog_error = "dialog_error"
                        />
                </VWindowItem>
                <VWindowItem>
                    <Payments 
                        v-model:current-step="currentStep"
                        :address_id="address_id"
                        :addresses="addresses"
                        :products="products"
                        :summary="summary"
                        :countries="listCountries"
                        :provinces="listProvinces"
                        :iswholesale="iswholesale"
                        @submit="sendPayU"/>
                </VWindowItem>
                <VWindowItem>
                   <Confirmation 
                        @refresh="refresh"
                        @completed="completed"
                        @updatePaymentState="updatePaymentState"
                        @deleteAll="deleteAll"/>
                </VWindowItem>
            </VWindow>

            <VCard 
                v-if="products.length === 0 && (typeof route.query.merchantId === 'undefined')"
                class="mb-10 card-timeline px-0">
                <VCardText class="d-flex flex-colum align-center text-center justify-content-center">
                    <VCardItem class="d-block align-center text-center justify-content-center">
                        <cart class="d-block mx-auto mb-5"/>
                        <span class="d-block cart-empty">Tu carrito esta vacio.</span>
                    </VCardItem>
               </VCardText>
            </VCard>

            <!--SECCIÓN PRODUCTOS RECOMENDADOS-->
            <VRow class="mt-5" v-if="currentStep === 0 && products.length > 0">
                <VCol cols="12" style="border-bottom: 1px solid #0A1B33;">
                    <VRow style="padding:16px 0px;">
                        <VCol cols="12" md="6" class="text-left">
                            <h3>Recomendaciones que te pueden interesar</h3>
                        </VCol>
                        <VCol cols="12" md="6" class="text-right">
                            <router-link to="/products" class="ms-5 tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">Ver todos</router-link>
                        </VCol>
                    </VRow>
                </VCol>
            
                <VCol cols="12">
                        <VCard class="mt-1 no-shadown card-information p-0" style="background:none;">
                            <VCardText class="px-0 mt-3 mb-3 d-flex align-items-stretch justify-content-between" v-if="data">
                                <Product1 
                                    v-for="(product, i) in data.recommendations"
                                    :key="i"
                                    :product="product"
                                    :readonly="true"
                                    :bg="bg"/>
                            </VCardText> 
                        </VCard> 
                </VCol>
            </VRow>

        </VContainer>
        <!--MODAL ADD ADDRESS-->
        <VDialog v-model="dialog" transition="dialog-top-transition">
            <VForm
                ref="refVForm"
                @submit.prevent="onSubmit"
            > 
                <VCard class="pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                    <VCardText class="subtitle-register p-0 mt-0 mt-md-7">
                        AGREGAR NUEVA DIRECCIÓN
                    </VCardText>           
                    <VCardItem class="pb-0 px-3 px-md-10">
                        <VRow no-gutters class="text-left align-center">
                            <VCol cols="12" md="12" class="textinput mb-0 mb-md-2 mt-3">
                                <CustomRadiosWithIcon
                                    v-model:selected-radio="selectedAddress.addresses_type_id"
                                    :radio-content="addressTypes"
                                    :grid-column="{ sm: '6', cols: '6' }"
                                />
                            </VCol>  
                            <VCol cols="12" md="12" class="textinput mb-2 mb-md-2">
                                <VTextField
                                    label="Descripción"
                                    v-model="selectedAddress.title"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                    />
                            </VCol>
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VAutocomplete
                                    variant="outlined"
                                    v-model="selectedAddress.country_id"
                                    label="País"
                                    :rules="[requiredValidator]"
                                    :items="listCountries"
                                    item-title="name"
                                    item-value="name"
                                    :menu-props="{ maxHeight: '200px' }"
                                    @update:model-value="selectCountry"
                                    class="me-0 me-md-2"
                                    >
                                    <template
                                        v-if="selectedAddress.country_id"
                                        #prepend
                                        >
                                        <VAvatar
                                            start
                                            style="margin-top: -8px;"
                                            :size="isMobile ? '30' : '36'"
                                            :image="getFlagCountry(selectedAddress.country_id)"
                                        />
                                    </template>
                                </VAutocomplete>
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VAutocomplete
                                    variant="outlined"
                                    v-model="selectedAddress.province_id"
                                    label="Estado"
                                    :rules="[requiredValidator]"
                                    :items="getProvinces"
                                    :menu-props="{ maxHeight: '200px' }"
                                />    
                            </VCol> 
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    label="Ciudad"
                                    v-model="selectedAddress.city"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                    class="me-0 me-md-2"
                                    />
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    label="Calle"
                                    v-model="selectedAddress.street"
                                    variant="outlined"
                                    /> 
                            </VCol> 
                            <VCol cols="12">
                                <VTextarea
                                    v-model="selectedAddress.address"
                                    rows="2"
                                    label="Dirección"
                                    variant="outlined"
                                    :rules="[requiredValidator]"
                                />
                            </VCol>
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    v-model="selectedAddress.phone"
                                    label="Teléfono"
                                    placeholder="+57 23 456 7890"
                                    variant="outlined"
                                    class="me-0 me-md-2"
                                    :rules="[requiredValidator, phoneValidator]"
                                />
                            </VCol>  
                            <VCol cols="12" md="6" class="textinput mb-0 mb-md-2">
                                <VTextField
                                    v-model="selectedAddress.postal_code"
                                    label="Código Postal"
                                    variant="outlined"
                                    :rules="[requiredValidator, phoneValidator]"
                                />    
                            </VCol> 
                            <VCol cols="12" md="8"></VCol>
                            <VCol cols="12" md="4" class="mb-3 mb-md-0">
                                <VCheckbox
                                    v-model="selectedAddress.default"
                                    label="Dir. por Defecto"
                                    true-icon="mdi-check-bold"
                                    false-icon="mdi-window-close"
                                    />
                            </VCol>
                        </VRow>
                    </VCardItem>
                    <VCardActions class="px-10 d-flex justify-content-center">
                        <VSpacer class="d-none d-md-block"/>
                        <VBtn
                            variant="flat"   
                            type="submit"
                            class="btn-register tw-text-white tw-bg-primary button-hover"
                            >
                            Enviar
                            <VProgressCircular
                                v-if="load"
                                indeterminate
                                color="#fff"
                            />
                        </VBtn>
                        <VBtn
                            color="primary"
                            variant="outlined"
                            class="btn-register"
                            @click="closeDialog"
                        >
                        Cerrar
                        </VBtn>
                    </VCardActions>
                </VCard>
            </VForm>
        </VDialog>

        <!--PopUp Message-->
        <VDialog v-model="isDialogVisible" >
            <VCard
                class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg width="100" :src="isError ? error_circle : check_circle" class="mx-auto"/>
                <VCardText class="text-message mt-10 mb-5">
                    {{ message }}
                </VCardText>
            </VCard>
        </VDialog>
    </div>
</template>

<style lang="scss">

    .cart-empty {
        color: #FF0090;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        line-height: 30px;
    }

    .w-60 {
        width: 65%;
    }

    .card-timeline {
        padding: 16px 0px;
        border-radius: 24px;
        box-shadow: none;
    }

    .checkout-stepper {
        .stepper-icon-step {
            .step-wrapper + svg {
                margin-inline: 1.5rem !important;
            }
        }
    }

    .checkout-card {
        margin-block-end: 6.25rem;
        margin-block-start: 9.75rem;
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
            margin-block-start: 6rem;
        }
    }
</style>
<style scoped>

    .btn-register {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
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
        color: #0A1B33 !important;
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
        line-height: 30px; 
        padding: 0 80px !important;
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

        .w-60
        {
            width: 100%;
        }

    }
</style>