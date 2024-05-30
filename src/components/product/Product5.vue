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

const route = useRoute()

const emit = defineEmits([
    'delete', 
    'addCart'
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
const stock = ref(null)
const quantity = ref(null)
const product_id = ref(null)
const product_color_id = ref(null)
const existence_whole = ref(false)
const in_stock = ref(null)

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
        stock.value = props.product.product.stock
        quantity.value = props.product.quantity ?? 1
        product_id.value = props.product.product.id
        product_color_id.value = props.product.product_color_id
        color.value = props.product.color.name
        existence_whole.value = props.product.wholesale === 1 ? true : false;
        wholesale_min.value = props.product.wholesale === 1 ? props.product.product.wholesale_min : 1
        in_stock.value = props.product.product.in_stock
    }
})

const onChange = () => {

    let data = {
        quantity: quantity.value,
        product_color_id: product_color_id.value,
        wholesale: existence_whole.value ? 1 : 0
    }

    emit('addCart',data)
}

const control_cant = () => {
   
    if (parseInt(quantity.value) > parseInt(stock.value)) { 
       quantity.value = stock.value; 
    } else if (parseInt(quantity.value) < 1) {
        quantity.value = 1;
    }
}

const increment = () => {
    if (quantity.value < stock.value) {
        quantity.value++
        onChange()
    }
}
    
const decrement = () => {
    if (quantity.value > wholesale_min.value) {
        quantity.value--
        onChange()
    }
}

</script>

<template>
    <div class="tw-no-underline zoom-product">
        <VCard 
            class="no-shadown p-0 w-100 py-7" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters>
                <VCol cols="6" md="2" class="d-flex justify-content-center align-center">
                    <VCardText class="border-img ms-10">
                        <VImg 
                            :width="100"
                            :src="baseURL + image" 
                            cover />
                    </VCardText>
                </VCol>
                <VCol cols="12" md="6" class="d-flex flex-column py-5 ps-7 my-auto">
                    <VCardText>
                        <span class="d-block text_2 py-1 tw-text-tertiary title-product">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Color: {{ color }}</span>
                    </VCardText>
                    <VCardText>
                        <span 
                            class="d-flex tw-text-xs py-1 tw-text-primary title-product tw-cursor-pointer me-3" 
                            @click="emit('delete', product_color_id)"
                        >
                            Eliminar
                        </span>
                    </VCardText>

                </VCol>
                <VCol cols="6" md="2" class="d-flex flex-column py-5 my-auto">
                    <VCardText class="d-flex text-center align-center justify-content-center"> 
                        <div class="number-input-wrapper" :class="(quantity > stock) ? 'warning' : ''">
                            <VBtn icon size="x-small" @click="decrement" variant="plain" color="#0A1B33">
                                <VIcon>mdi-minus</VIcon>
                            </VBtn>
                            <VTextField
                                v-model="quantity"
                                variant="solo"
                                type="text"
                                readonly
                                style="height: 30px;"
                            />
                            <VBtn icon size="x-small" @click="increment" variant="plain" color="#0A1B33">
                                <VIcon>mdi-plus</VIcon>
                            </VBtn>
                        </div>
                        <!-- <VTextField
                            v-model="quantity"
                            placeholder="0"
                            variant="solo"
                            type="number"
                            :min="wholesale_min"
                            :max="stock"
                            @change="onChange"
                            @input="control_cant"
                            :disabled="(quantity > stock)"
                        /> -->
                    </VCardText>
                    <VCardText class="d-flex text-center align-center justify-content-center mt-2">
                        <span class="tw-text-xs" :class="(quantity > stock) ? 'tw-text-yellow' : 'tw-text-gray'">
                            {{ (in_stock === 1) ? stock + ' disponibles'  : 'AGOTADO' }}
                        </span>
                    </VCardText>
                  </VCol>
                <VCol cols="6" md="2" class="align-center text-center py-5 my-auto pe-4">
                    <!-- <VCardText class="d-flex text-center align-center justify-content-center">
                        <div class="d-flex text-center align-center justify-content-center">
                            <span class="tw-text-gray">${{ formatNumber(wholesale_price) }}</span>
                        </div>
                    </VCardText> -->
                    <VCardText class="mt-1">
                        <div class="d-flex text-center align-center justify-content-center">
                            <span v-if="existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(wholesale_price) }}</span>
                            <span v-if="!existence_whole" class="text_1 tw-text-tertiary">${{ formatNumber(price_for_sale) }}</span>
                        </div>
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
