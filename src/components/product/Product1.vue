<script setup>

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

const image = ref(null)
const price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const slug = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price.value = props.product.price
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name
        store.value = props.product.user.name + ' ' + (props.product.user.last_name ?? '')
        rating.value = props.product.rating
        slug.value = props.product.slug
    }
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
        <VCard class="no-shadown card-information p-0" :width="230" :class="props.bg">
            <VCardText class="border-img ms-1">
                <VImg 
                    :width="230"
                    :src="baseURL + image" 
                    cover />
            </VCardText>
            <VCardText class="mt-2">
                <div class="d-flex py-2">
                <span class="text_1">${{ price }}</span>
                <span class="text_2 ms-2">${{ price_for_sale }}</span>
                </div>
            </VCardText>
            <VCardText>
                <span v-if="name.length > 40" class="d-block text_2 py-2 tw-text-tertiary title-product">
                    {{ name.slice(0, 40) + '...'}}
                </span>
                <span v-else class="d-block text_2 py-2 tw-text-tertiary title-product">
                    {{ name }}
                </span>
            </VCardText>
            <VCardText>
                <span class="d-block text_2">Store: <strong>{{ store }}</strong></span>
            </VCardText>
            <VCardText class="px-1 mt-2">
                <div class="d-flex">
                    <VRating
                        half-increments
                        :length="5"
                        :size="25"
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

    .title-product {
        min-height: 60px;
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
