<script setup>

import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import Stepper from '@/components/cart/Stepper.vue'
import Summary from '@/components/cart/Summary.vue'
import Location from '@/components/cart/Location.vue'
import Payments from '@/components/cart/Payments.vue'

import Loader from '@/components/common/Loader.vue'
import Product1 from '@/components/product/Product1.vue'
import router from '@/router'

import cart from '@assets/icons/cart.svg?inline'
import address from '@assets/icons/address.svg?inline'
import payment from '@assets/icons/payment.svg?inline'
import confirmation from '@assets/icons/confirmation.svg?inline'

const homeStores = useHomeStores()
const miscellaneousStores = useMiscellaneousStores()
const data = ref(null)
const bg = ref('tw-bg-green')
const products = ref([])

const isLoading = ref(true)

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

watchEffect(fetchData)

async function fetchData() {

  isLoading.value = true
  
  await homeStores.fetchData()
  data.value = homeStores.getData

  let info = {
    orderByField: 'id',
    orderBy: 'desc',
    limit: 2,
    page: 1
  }

  var aux = await miscellaneousStores.products(info)
  products.value = aux.products.data

  isLoading.value = false
}

const redirect = (name) => {
    router.push({ name : name})
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
                        :items="checkoutSteps"
                        :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
                    />
                </VCardText>
               
            </VCard>

            <!-- 👉 stepper content -->
            <VWindow
                v-model="currentStep"
                class="disable-tab-transition mb-5"
                :touch="false"
                >
                <VWindowItem>
                    <Summary
                        v-model:current-step="currentStep"
                        :products="products"/>
                </VWindowItem>
                <VWindowItem>
                    <Location 
                        v-model:current-step="currentStep"/>
                </VWindowItem>
                <VWindowItem>
                    <Payments 
                        v-model:current-step="currentStep"
                        :products="products"/>
                </VWindowItem>
                <VWindowItem>
                    PAY U
                </VWindowItem>
            </VWindow>

            <!--SECCIÓN PRODUCTOS RECOMENDADOS-->

            <VRow class="row-recomendados" v-if="currentStep === 0">
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