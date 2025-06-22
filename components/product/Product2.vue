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
    }
})

const route = useRoute()
const config = useRuntimeConfig()

const image = ref(null)
const wholesale_price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const slug = ref(null)
const existence_whole = ref(false)

const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        wholesale_price.value = props.product.wholesale_price ?? '0.00'
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        store.value = props.product.user.user_detail.store_name ?? (props.product.user.supplier?.company_name ?? (props.product.user.name + ' ' + (props.product.user.last_name ?? '')))
        rating.value = props.product.rating
        slug.value = props.product.slug
    }

    existence_whole.value = route.query.wholesalers === 'true' ? true : false;
})

</script>

<template>
    <NuxtLink 
        :to="{
            name: 'products-slug',
            params: { slug: slug },
        }"
        class="tw-no-underline zoom-product">
        <VCard class="no-shadown card-information p-0 mb-5">
            <div class="d-flex">
                <VCardText class="border-img p-0 my-auto">
                    <img 
                        :src="baseURL + image" 
                        class="img-prod" />
                </VCardText>
                
                <VCardText class="w-75 d-flex flex-column justify-content-between mb-1">
                    <span v-if="name.length > 40" class="d-block text_2 tw-text-tertiary title-product">
                        {{ name.slice(0, 30) + '...'}}
                    </span>
                    <span v-else class="d-block text_2 tw-text-tertiary title-product">
                        {{ name }}
                    </span>
                    <div class="d-flex mt-1">
                        <span class="text_1">${{ formatNumber(price_for_sale) }}</span>
                        <span v-if="existence_whole" class="text_2 ms-2">${{ formatNumber(wholesale_price) }}</span>
                    </div>
                </VCardText>
            </div>
        </VCard>
    </NuxtLink>
</template>

<style scoped>

    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 70px;
        height: 70px;
        border-radius: 8px !important;
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
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
    }

    .text_1 {
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 25.2px;
    }

    .text_2 {
        color: #999;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.6px;
    }
    
</style>