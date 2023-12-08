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
const single_description = ref(null)
const slug = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = props.product.image
        price.value = props.product.price
        price_for_sale.value = props.product.price_for_sale
        name.value = props.product.name
        store.value = props.product.user.name + ' ' + props.product.user.last_name
        rating.value = props.product.rating
        single_description.value = props.product.single_description
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
        <VCard class="no-shadown card-information p-0 pb-5 w-100" >
            <VRow>
                <VCol cols="12" md="3">
                    <VCardText class="border-img">
                        <VImg 
                            :width="230"
                            :src="baseURL + image" 
                            cover />
                    </VCardText>
                </VCol>
                <VCol cols="12" md="5">
                    <VCardText>
                        <span class="d-block text_2 py-1 tw-text-tertiary title-product">{{ name }}</span>
                    </VCardText>
                    <VCardText class="px-1 pb-1">
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
                    <VCardText>
                        <span class="d-block store tw-text-tertiary">Tienda: {{ store }}</span>
                    </VCardText>
                    
                    <VCardText>
                        <span class="d-block text_2 mt-5" v-html="single_description"></span>
                    </VCardText>

                </VCol>
                <VCol cols="12" md="4" class="align-center text-center">
                    <VCardText>
                        <div class="d-flex text-center align-center justify-content-center">
                            <span class="text_1 tw-text-tertiary">${{ price }}</span>
                        </div>
                    </VCardText>
                    <VCardText class="mt-3">
                        <div class="d-flex text-center align-center justify-content-center">
                            <VBtn
                                variant="flat"
                                class="btn-register tw-text-white tw-bg-primary button-hover">
                                Agregar al carrito
                            </VBtn>
                        </div>
                    </VCardText>
                    <VCardText class="mt-3">
                        <div class="d-flex text-center align-center justify-content-center">
                            <span class="text_2">
                                <VIcon
                                    size="20" 
                                    icon="mdi-heart-outline"
                                />
                                Guardar
                            </span>
                        </div>
                    </VCardText>
                </VCol>
            </VRow>
          
        </VCard>
    </router-link>
</template>

<style scoped>

    .card-information {
        border-bottom: 1px solid var(--Grey-2, #E1E1E1);
    }

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
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
    
</style>
