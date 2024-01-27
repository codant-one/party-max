<script setup>

import { ref } from 'vue'
import { useAddressesStores } from '@/stores/addresses'
import { useHomeStores } from '@/stores/home'
import { useCartStores } from '@/stores/cart'

import Stepper from '@/components/cart/Stepper.vue'
import Summary from '@/components/cart/Summary.vue'
import Location from '@/components/cart/Location.vue'
import Payments from '@/components/cart/Payments.vue'

import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'

import cart from '@assets/icons/cart.svg?inline'
import address from '@assets/icons/address.svg?inline'
import payment from '@assets/icons/payment.svg?inline'
import confirmation from '@assets/icons/confirmation.svg?inline'

const homeStores = useHomeStores()
const cartStores = useCartStores()
const addressesStores = useAddressesStores()

const data = ref(null)
const bg = ref('tw-bg-green')
const addresses = ref(null)
const products = ref([])
const client_id = ref(null)
const address_id = ref(1)

const summary = ref({
    subTotal: 0,
    send: '2000.00',
    total: 0
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

const currentStep = ref(0)
const isLoading = ref(false)

watchEffect(fetchData)

async function fetchData() {

    if(localStorage.getItem('user_data')){
        const userData = localStorage.getItem('user_data')
        const userDataJ = JSON.parse(userData)
        client_id.value = userDataJ.client.id
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
        address_id.value = addresses.value[index].id

        let sum = 0
        products.value.forEach(element => {
            sum += (parseFloat(element.price_for_sale) * element.quantity)
        });

        summary.value.subTotal = sum.toFixed(2)
        summary.value.total = (parseFloat(summary.value.send) + parseFloat(summary.value.subTotal)).toFixed(2)

        isLoading.value = false
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
        quantity: data.quantity
    }

    cartStores.add(data_)

    fetchData()
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
                        :isActiveStepValid="(products.length === 0) ? true : undefined"
                        :items="checkoutSteps"
                        :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
                    />
                </VCardText>
               
            </VCard>

            <!-- 👉 stepper content -->
            <VWindow
                v-if="products.length > 0"
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
                        @changeAddreess="changeAddreess"/>
                </VWindowItem>
                <VWindowItem>
                    <Payments 
                        v-model:current-step="currentStep"
                        :address_id="address_id"
                        :addresses="addresses"
                        :products="products"
                        :summary="summary"/>
                </VWindowItem>
                <VWindowItem>
                    PAY U
                </VWindowItem>
            </VWindow>

            <VCard v-else class="mb-10 card-timeline px-0">
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