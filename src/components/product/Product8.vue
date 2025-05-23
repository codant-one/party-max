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

const emit = defineEmits([
    'delete'
])

const image = ref(null)
const wholesale_price = ref(null)
const wholesale_min = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const color = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const quantity = ref(null)
const product_id = ref(null)
const product_color_id = ref(null)
const existence_whole = ref(false)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = (props.product.images.length === 0) ? props.product.product.image : props.product.images[0]?.image
        wholesale_price.value = props.product.product.wholesale_price ?? '0.00'
        price_for_sale.value = props.product.product.price_for_sale
        name.value = props.product.product.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
        store.value = props.product.user.user_detail.store_name ?? (props.product.supplier?.company_name ?? (props.product.user.name + ' ' + (props.product.user.last_name ?? '')))
        rating.value = props.product.rating
        single_description.value = props.product.product.single_description
        slug.value = props.product.product.slug
        quantity.value = props.product.quantity ?? 1
        product_id.value = props.product.product.id
        product_color_id.value = props.product.product_color_id
        color.value = props.product.color.name
        existence_whole.value = props.product.wholesale === 1 ? true : false;
        wholesale_min.value = props.product.wholesale === 1 ? props.product.product.wholesale_min : 1
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-product">
        <VCard 
            class="no-shadown px-0 w-100 py-3 py-md-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters>
                <VCol cols="6" md="5" class="d-flex flex-column my-auto">
                    <VCardText class="border-img ms-5 p-0">
                        <img 
                            :width="100"
                            :src="baseURL + image" 
                            class="img-prod" />
                    </VCardText>
                </VCol>
                <VCol cols="12" md="7" class="d-flex flex-column pt-3 py-md-5 ps-4 ps-md-8 my-auto">
                    <VCardText class="px-1">
                        <span class="d-block text_2 py-1 tw-text-tertiary title-product">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Color: {{ color }}</span>
                    </VCardText>
                    <VCardText class="px-1">
                        <span 
                            class="d-flex tw-text-xs py-1 tw-text-primary title-product tw-cursor-pointer me-3" 
                            @click="emit('delete', product_color_id)"
                        >
                            Eliminar
                        </span>
                    </VCardText>
                    <VCardText class="px-1">
                        <span class="d-block py-0 tw-text-gray">{{ quantity }} x 
                            <span v-if="existence_whole" class="tw-text-tertiary">${{ formatNumber(wholesale_price) }}</span>
                            <span v-if="!existence_whole" class="tw-text-tertiary">${{ formatNumber(price_for_sale) }}</span>
                        </span>
                    </VCardText>

                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>

    .warning {
        border: 2px solid #FFC549 !important;
    }

    .number-input-wrapper {
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 2px solid #E1E1E1;
        height: 40px;
    }

    .text-pink-accent-3 {
        color: #FF0090 !important;
    }

    .v-text-field::v-deep(.v-field) { 
        border: 0 !important;
        height: 30px;
        box-shadow: none;
    } 

    .v-text-field::v-deep(.v-field__input){
        min-height: 30px;
        padding: 0 !important;
        width: 20px;
        text-align: center;
    }
    
    .v-text-field::v-deep(.v-field__field) { 
        height: 30px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding: 0 0 0 5px !important;
        color: #0A1B33 !important;
    }
    
    .v-text-field::v-deep(.v-input__details){
        padding: 0;
        min-height: 0;
    }

    .card-information {
        border-bottom: 1px solid var(--Grey-2, #D9EEF2);
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
        border: 1px solid #E1E1E1;
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
    
</style>
