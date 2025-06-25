<script setup>

import { formatNumber } from '@formatters'

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

const emit = defineEmits(['delete'])

const image = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const slug = ref(null)
const product_id = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        slug.value = props.product.slug
        product_id.value = props.product.id
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-product w-100">
        <VCard 
            class="no-shadown py-5 pb-5 w-100 d-block d-md-flex" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VCardText class="border-img ms-5 ms-md-10 p-0">
                <router-link
                    :to="{
                        name: 'productDetail',
                        params: {
                            slug: slug
                        }
                    }"
                    class="tw-no-underline">
                    <img 
                        :width="100"
                        :src="baseURL + image" 
                        class="img-prod" />
                </router-link>
            </VCardText>
            <VCardText class="pl-5 d-block details">
                <span class="d-block my-3 my-md-5 text_2 tw-text-tertiary title-product">{{ name }}</span>
                <span class="d-block my-3 my-md-5 tw-text-tertiary price_prod">${{ formatNumber(price_for_sale) }}</span>
                <span 
                    class="d-block my-3 my-md-5 text-left p-0 tw-text-primary text-delete hover:tw-text-yellow" 
                    @click="emit('delete', {is_product: 1, product_id: product_id})">
                    Eliminar
                </span>
            </VCardText>
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

    .details {
        width: 85%;
    }
    .border-img {
        width: 130px;
        height: 130px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        text-align: center;
        align-items: center;
        display: flex;
        overflow: hidden;
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
        width: 130px;
        height: 130px;
        object-fit: cover;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
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

    .price_prod {
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px; /* 66.667% */
    }

    .text-delete {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 100% */
    }
    
    @media only screen and (max-width: 767px) {
        .title-product {
            line-height: 20px;
        }
    }
</style>
