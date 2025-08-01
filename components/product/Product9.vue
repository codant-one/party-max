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
const color = ref(null)
const quantity = ref(null)
const existence_whole = ref(false)

const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')

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
        color.value = props.product.color.name
        quantity.value = props.product.quantity

        existence_whole.value = props.product.wholesale === 1 ? true : false;
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-product w-100">
        <VCard 
            class="no-shadown px-0 w-100 py-1 bg-transparent" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters class="px-5 px-md-12">
                <VCol cols="2" md="1" class="d-flex flex-column mt-1 mt-md-0 mb-auto my-md-auto">
                    <VCardText class="border-img p-0">
                        <img
                            :width="50"
                            :src="baseURL + image" 
                            :alt="name"
                            class="img-prod"
                            loading="lazy"
                        />
                    </VCardText>
                </VCol>
                <VCol cols="6" md="6" class="d-flex justify-content-center align-center my-md-0 ps-3 ps-md-0">
                    <VCardText>
                        <span class="d-block text_2 py-1 tw-text-tertiary title-product">{{ name }}</span>
                        <span class="d-block text_2 py-0 tw-text-gray">Color: {{ color }}</span>
                    </VCardText>
                </VCol>
                <VCol cols="1" md="1" class="d-flex justify-content-end tw-items-center">
                    <span class="text_1 tw-text-tertiary">{{ quantity }}</span>
                </VCol>
                <VCol cols="2" md="2" class="d-none d-md-flex justify-content-end tw-items-center">
                    <span v-if="existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(wholesale_price) }}</span>
                    <span v-if="!existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(price_for_sale) }}</span>
                </VCol>
                <VCol cols="3" md="2" class="d-flex justify-content-end tw-items-center">
                    <span v-if="existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(wholesale_price * quantity) }}</span>
                    <span v-if="!existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(price_for_sale * quantity) }}</span>
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
        width: 60px;
        height: 60px;
        border-radius: 8px !important;
        border: 1px solid #D9EEF2;
        text-align: center;
        align-items: center;
        display: flex;
    }

    .zoom-product {
        display: inline-block;
        position: relative;
        overflow: visible;
    }

    .zoom-product:hover .img-prod {
        transform: scale(1.1);
    }

    .zoom-product:hover .title-product {
        color: #FF0090 !important;
    }

    .img-prod {
        display: block;
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s ease-in-out;
    }

    .bg-transparent {
        background: transparent;
    }

    .title-product {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
    }

    .text_1 {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    .text_2 {
        font-size: 12px;
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
