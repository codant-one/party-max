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
    bg: {
        type: String,
        default: 'tw-bg-white',
        required: false
    }
})

const route = useRoute()

const isMobile = /Mobi/i.test(navigator.userAgent);
const image = ref(null)
const wholesale_price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const slug = ref(null)
const existence_whole = ref(false)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        wholesale_price.value = props.product.wholesale_price ?? '0.00'
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
        store.value = props.product.user.user_detail.store_name ?? (props.product.user.supplier?.company_name ?? (props.product.user.name + ' ' + (props.product.user.last_name ?? '')))
        rating.value = props.product.rating
        slug.value = props.product.slug
    }

    existence_whole.value = route.query.wholesalers ? true : false;
})

</script>

<template>
    <router-link
        :to="{
            name: 'productDetail',
            params: {
                slug: slug
            }
        }"
        class="tw-no-underline zoom-product">
        <VCard class="no-shadown card-information p-0" :width="isMobile ? 'auto' : 230" :class="props.bg">
            <VCardText class="border-img ms-1">
                <VImg 
                    :width="230"
                    :src="baseURL + image" 
                    cover />
            </VCardText>
            <VCardText class="mt-2">
                <div class="d-flex py-2">
                <span class="text_1">${{ formatNumber(price_for_sale) }}</span>
                <span v-if="existence_whole" class="text_2 ms-2">${{ formatNumber(wholesale_price) }}</span>
                </div>
            </VCardText>
            <VCardText>
                <span v-if="name.length > 50 && !isMobile" class="d-block text_2 tw-text-tertiary title-product">
                    {{ name.slice(0, 50) + '...'}}
                </span>
                <span v-else class="d-block text_2 tw-text-tertiary title-product">
                    <span v-if="isMobile"> {{ name.slice(0, 25) + '...'}}</span>
                    <span v-else> {{ name }}</span>
                </span>
            </VCardText>
            <VCardText>
                <span class="d-block text_2 store">Tienda: <strong>{{ store }}</strong></span>
            </VCardText>
            <VCardText class="px-1 mt-2">
                <div class="d-flex">
                    <VRating
                        half-increments
                        :length="5"
                        :size="isMobile ? 20 : 25"
                        :model-value="rating"
                        :readonly="readonly"
                        color="yellow-darken-2"
                        active-color="yellow-darken-2"
                        />
                    <span class="text_2 ms-2 mt-1">02</span>
                </div>
            </VCardText>
        </VCard>
    </router-link>
</template>

<style scoped>

    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 210px;
        height: 200px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        padding: 10px !important;
        background-color: white;
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

    .zoom-product:hover .title-product {
        color: #FF0090 !important;
    }

    .title-product, .store {
        min-height: 45px;
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

    @media only screen and (max-width: 767px) {
        .border-img {
            width: 110px;
            height: 110px;
        }

        .text_1 {
            font-size: 16px;
        }

        .text_2 {
            font-size: 13px;
        }

        .title-product {
            min-height: 40px;
        }

        .store {
            min-height: 40px;
        }
    }
    
</style>
