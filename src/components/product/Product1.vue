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
const description = ref(null)
const store = ref(null)
const rating = ref(null)

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price_1.value = props.product.price_1
        price_2.value = props.product.price_2
        description.value = props.product.description
        store.value = props.product.store
        rating.value = props.product.rating
    }
})

</script>

<template>
     <VCard class="no-shadown card-information p-0">
        <VCardText>
            <VImg :src="image" cover clas="border-img"/>
        </VCardText>
        <VCardText class="mt-2">
            <div class="d-flex py-2">
              <span class="text_1">${{ price_1 }}</span>
              <span class="text_2 ms-2">${{ price_2 }}</span>
            </div>
        </VCardText>
        <VCardText>
            <span class="d-block text_2 py-2 tw-text-terciary">{{ description }}</span>
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
