<script setup>

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

const image = ref(null)
const price = ref(null)
const price_for_sale = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price.value = props.product.price
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name
        store.value = props.product.store
        rating.value = props.product.rating
    }
})

</script>

<template>
    <router-link to="/products" class="tw-no-underline zoom-product">
        <VCard class="no-shadown card-information p-0 mb-5">
            <div class="d-flex">
                <VCardText class="border-img">
                    <VImg 
                        :src="baseURL + image" 
                        :width="61" />
                </VCardText>
                
                <VCardText class="w-75">
                    <span class="d-block text_2 tw-text-tertiary title-product">{{ name }}</span>
                    <div class="d-flex mt-1">
                        <span class="text_1">${{ price }}</span>
                        <span class="text_2 ms-2">${{ price_for_sale }}</span>
                    </div>
                </VCardText>
            </div>
        </VCard>
    </router-link>
</template>

<style scoped>

    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 60px;
        height: 60px;
        border-radius: 8px !important;
        border: 1px solid #D9EEF2;
        padding: 2px !important;
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
