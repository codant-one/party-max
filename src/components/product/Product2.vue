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
const price_1 = ref(null)
const price_2 = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price_1.value = props.product.price_1
        price_2.value = props.product.price_2
        name.value = props.product.name
        store.value = props.product.store
        rating.value = props.product.rating
    }
})

</script>

<template>
    <router-link to="/products" class="tw-no-underline">
        <VCard class="no-shadown card-information p-0 mb-5">
            <div class="d-flex">
                <VCardText>
                    <VImg :src="image" :width="75" class="border-img"/>
                </VCardText>
                
                <VCardText>
                    <span class="d-block text_2 tw-text-tertiary">{{ name }}</span>
                    <div class="d-flex mt-1">
                        <span class="text_1">${{ price_1 }}</span>
                        <span class="text_2 ms-2">${{ price_2 }}</span>
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
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
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
