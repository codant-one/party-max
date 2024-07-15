<script setup>

import { formatNumber } from '@formatters'
import { useRuntimeConfig } from '#app'

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    readonly: {
        type: Boolean,
        required: true
    },
    isLastItem: {
        type: Boolean,
        required: true
    }
})

const config = useRuntimeConfig()

const image = ref(null)
const wholesale_price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const stock = ref(null)
const color = ref(null)
const quantity = ref(null)
const existence_whole = ref(false)

const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')
const isMobile = process.client && /Mobi/i.test(navigator.userAgent)

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = (props.product.images.length === 0) ? props.product.product.image : props.product.images[0]?.image
        wholesale_price.value = props.product.product.wholesale_price ?? '0.00'
        price_for_sale.value = props.product.product.price_for_sale
        name.value = props.product.product.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        store.value = props.product.user.user_detail.store_name ?? (props.product.supplier?.company_name ?? (props.product.user.name + ' ' + (props.product.user.last_name ?? '')))
        rating.value = props.product.product.rating
        single_description.value = props.product.single_description
        slug.value = props.product.product.slug
        stock.value = props.product.product.stock
        color.value = props.product.color.name
        quantity.value = props.product.quantity

        existence_whole.value = props.product.wholesale === 1 ? true : false;
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-product">
        <VCard 
            class="no-shadown p-0 w-100 py-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters class="px-5 px-md-14">
                <VCol cols="6" md="1" class="d-flex justify-content-center align-center">
                    <VCardText class="border-img ms-md-16">
                        <VImg
                            :width="100"
                            :src="baseURL + image" 
                            cover />
                    </VCardText>
                </VCol>
                <VCol cols="6" md="12" v-if="isMobile"></VCol>
                <VCol cols="10" md="8" class="d-flex justify-content-center align-center mt-3 my-md-0 ps-md-14">
                    <VCardText>
                        <span class="d-block text_2 py-1 tw-text-tertiary title-product">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Color: {{ color }}</span>
                        <span class="d-block py-0 tw-text-gray">
                            <span>{{ quantity }} </span>
                            <span>{{ (quantity > 1) ? ' Unidades' : ' Unidad' }}</span>
                        </span>
                    </VCardText>
                </VCol>
                <VCol cols="2" md="3" class="d-flex justify-content-end tw-items-end md:tw-items-center">
                    <div class="me-0">
                        <VCardText class="d-flex text-end align-end justify-content-end">
                        </VCardText>
                        <VCardText class="mt-1">
                            <div class="d-flex text-center align-end tw-justify-end md:tw-justify-center">
                                <span v-if="existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(wholesale_price) }}</span>
                                <span v-if="!existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(price_for_sale) }}</span>
                            </div>
                        </VCardText>
                    </div>
                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>

    .card-information {
        border-bottom: 1px solid var(--Grey-2, #E1E1E1);
        border-radius: 0;
    }

    .btn-register {
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 8px 0px #FF27B3;
    }
    
    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 130px;
        height: 130px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        padding: 10px !important;
        text-align: center;
        align-items: center;
        display: flex;
    }

    .zoom-product  {
        transition: transform ease-in-out 0.3s;
    }

    .zoom-product:hover .v-img {
        transform: scale(1.1) !important;
    }

    .title-product {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .text_1 {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    .text_2 {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .store {
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 8px; /* 80% */ 
    }

    .v-text-field::v-deep(.v-field) { 
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        border: 1.5px solid #E1E1E1 !important;
        height: 45px;
        width: 50px;
        box-shadow: none;
    } 

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        color: #0A1B33 !important;
    }

    .v-text-field::v-deep(.v-input__details) {
        height: 0px !important;
        min-height: 0px !important;
        padding: 0px !important;
    }
    
</style>
