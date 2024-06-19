<script setup>

import { formatNumber } from '@formatters'
import heart from '@assets/icons/heart_gray.svg?inline';

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
    },
    loading: {
        type: Boolean,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }
})

const route = useRoute()

const emit = defineEmits([
    'addCart',
    'addfavorite'
])

const id = ref(null)
const image = ref(null)
const wholesale_price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const in_stock = ref(null)
const cant_prod = ref(1)
const cant_stock = ref(1)
const existence_whole = ref(false)

const product_color_id = ref(null)
const load = ref(props.loading)
const isFavoriteProduct = ref(null)
const product_id = ref(props.productId)
const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const isMobile = /Mobi/i.test(navigator.userAgent);

watch(() => 
    props.loading, (data) => {
      load.value = data
    });

watch(() => 
    props.productId, (data) => {
        product_id.value = data
    });

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        wholesale_price.value = props.product.wholesale_price
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        store.value = props.product.user.name + ' ' + (props.product.user.last_name ?? '')
        rating.value = props.product.rating
        single_description.value = props.product.single_description
        slug.value = props.product.slug
        isFavoriteProduct.value = props.product.is_favorite
        id.value = props.product.id
        product_color_id.value =  props.product.colors[0]?.id
        in_stock.value = props.product.in_stock
        cant_prod.value = route.query.wholesalers === 'true' ? props.product.wholesale_min : 1
        cant_stock.value = parseInt(props.product.stock)
    }

    existence_whole.value = route.query.wholesalers === 'true' ? true : false;
})

const addCart = () => {
    let data = {
        product_id: id.value,
        product_color_id: product_color_id.value,
        cant_prod: cant_prod.value
    }
    emit('addCart',  data)
}

const addfavorite = () => {
    emit('addfavorite', id.value)
}

</script>

<template>
    <div class="zoom-product">
        <VCard 
            class="no-shadown p-0 pb-5 w-100 mb-3 mb-md-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow>
                <VCol cols="6" md="3">
                    <VCardText class="border-img ms-md-5 text-center justify-content-center align-center d-flex">
                        <router-link
                            :to="{
                                name: 'productDetail',
                                params: {
                                    slug: slug
                                }
                            }"
                            class="tw-no-underline">
                            <VImg 
                                :width="isMobile ? 135 : 177"
                                :src="baseURL + image" 
                                cover />
                        </router-link>
                    </VCardText>
                </VCol>
                <VCol cols="12" md="6" class="py-0 py-md-3">
                    <VCardText class="d-flex px-1 px-md-2">
                        <span class="d-block text_2 py-md-1 tw-text-tertiary title-product">{{ name }}</span>
                        <strong class="tw-text-gray tw-text-base ms-3">
                            {{ (in_stock === 1) ? ''  : 'AGOTADO' }}
                        </strong>
                    </VCardText>
                    <VCardText class="px-0 px-md-1 pb-1">
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
                            <span class="text_2 ms-2 mt-1">({{ cant_stock }})</span>
                        </div>
                    </VCardText>
                    <VCardText class="px-1 px-md-2">
                        <span class="d-block store tw-text-tertiary">Tienda: {{ store }}</span>
                    </VCardText>          
                    <VCardText class="px-1 px-md-2">
                        <span class="d-block text_2 mt-3 mt-md-5" v-html="single_description"></span>
                    </VCardText>
                </VCol>
                <VCol cols="12" md="3" class="align-center text-center pb-0">
                    <VCardText class="px-1 px-md-2">
                        <div class="d-flex text-center align-center tw-justify-start md:tw-justify-center">
                            <span v-if="!existence_whole" class="text_1 tw-text-tertiary">${{formatNumber(price_for_sale) }}</span>
                            <span v-if="existence_whole" class="text_1 tw-text-tertiary">${{formatNumber(wholesale_price) }}</span>
                        </div>
                    </VCardText>
                    <VCardText class="mt-3 px-1 px-md-2">
                        <div class="d-flex text-center align-center tw-justify-start md:tw-justify-center">
                            <VBtn
                                variant="flat"
                                @click="addCart"
                                class="btn-register tw-text-white tw-bg-primary button-hover"
                                :disabled="(in_stock === 0 || cant_prod > cant_stock) ? true : false">
                                Agregar al carrito 
                                <VProgressCircular
                                    v-if="load && (product_id === id)"
                                    indeterminate
                                    color="#fff"
                                />
                            </VBtn>
                        </div>
                    </VCardText>
                    <VCardText class="mt-3 px-1 px-md-2">
                        <div class="d-flex text-center align-center tw-justify-start md:tw-justify-center tw-cursor-pointer heart" @click="addfavorite">
                            <span class="text_2 d-flex align-center">
                                <span 
                                    class="me-2 pt-1"
                                    :class="(isFavoriteProduct) ? 'heart_fill' : ''" 
                                    >
                                <heart />
                                </span>
                                <span :class="(isFavoriteProduct) ? 'tw-text-primary' : ''">
                                    Guardar
                                </span>
                            </span>
                        </div>
                    </VCardText>
                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>

    .heart:hover::v-deep(path), .shoppinp_cart:hover::v-deep(path) {
        fill: #FF0090;
    }

    .heart:hover::v-deep(span) {
        color: #FF0090;
    }

    .heart_fill::v-deep(path) {
        fill: #FF0090 !important;
    }

    .hearth-icon path {
        fill:#0A1B33;
    }

    .hearth-icon path:hover {
        fill: #FF0090;
    }

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
        width: 200px;
        height: 200px;
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

    .zoom-product:hover .title-product{
        color: #FF0090 !important;
    }

    .text_1 {
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px;
    }

    .text_2 {
        color: #999;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.6px;
    }

    .store {
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 8px; /* 80% */ 
    }

    @media only screen and (max-width: 767px) {
    
        .border-img {
            width: auto;
            height: 160px;
        }

        .btn-register {
            font-size: 10px;
        }
    }
    
</style>
