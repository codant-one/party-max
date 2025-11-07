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
    },
    isLastItem: {
        type: Boolean,
        required: true
    }
})

const config = useRuntimeConfig()
const emit = defineEmits([
    'delete', 
    'addCart'
])

const image = ref(null)
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
const in_stock = ref(null)

const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.product).length === 0) && props.product.constructor === Object) {
        image.value = (props.product.images.length === 0) ? props.product.product.image : props.product.images[0]?.image
        price_for_sale.value = props.product.product.price_for_sale
        name.value = props.product.product.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
        store.value = props.product.user.user_detail.store_name ?? (props.product.supplier?.company_name ?? (props.product.user.name + ' ' + (props.product.user.last_name ?? '')))
        rating.value = props.product.rating
        single_description.value = props.product.product.single_description
        slug.value = props.product.product.slug
        stock.value = props.product.stock
        quantity.value = props.product.quantity ?? 1
        product_id.value = props.product.product.id
        product_color_id.value = props.product.product_color_id
        color.value = props.product.color.name
        in_stock.value = props.product.in_stock
    }
})

const onChange = () => {

    let data = {
        quantity: quantity.value,
        product_color_id: parseInt(product_color_id.value),
        type: 0
    }

    emit('addCart', data)
}

const increment = () => {
    if (quantity.value < stock.value) {
        quantity.value++
        onChange()
    }
}
    
const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--
        onChange()
    }
}

</script>

<template>
    <div class="tw-no-underline zoom-product w-100">
        <VCard 
            class="no-shadown py-5 px-5 w-100" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters>
                <VCol cols="3" md="4" class="d-flex flex-column my-auto">
                    <VCardText class="border-img p-0">
                        <img 
                            :width="60"
                            :src="baseURL + image" 
                            :alt="name"
                            class="img-prod"
                            loading="lazy"
                        />
                        <div v-if="in_stock === 0" class="out-of-stock-label">AGOTADO</div>   
                    </VCardText>
                </VCol>
                <VCol cols="9" md="8" class="d-flex flex-column my-auto">
                    <VCardText class="px-0">
                        <span class="d-block text_2 py-md-1 tw-text-tertiary title-product">{{ name }}</span>
                        <div class="d-flex justify-content-between">
                            <div>
                                <span class="d-block py-0 tw-text-gray text_2">Color: {{ color }}</span>
                                <span 
                                    class="d-flex tw-text-xs tw-text-primary title-product me-3 cursor-pointer" 
                                    @click="emit('delete', product_color_id)"
                                >
                                    Eliminar
                                </span>
                                <span class="d-block py-0 tw-text-gray text_2">{{ quantity }} x 
                                    <span class="tw-text-tertiary text_2">${{ formatNumber(price_for_sale) }}</span>
                                </span>
                            </div>
                            <div>
                                <div class="d-flex text-center align-center ps-7 ps-md-2 tw-justify-start md:tw-justify-center"> 
                                    <div class="number-input-wrapper" :class="(quantity > stock) ? 'warning' : ''">
                                        <VBtn icon size="x-small" @click="decrement" variant="plain" color="#0A1B33">
                                            <VIcon>mdi-minus</VIcon>
                                        </VBtn>
                                        <VTextField
                                            v-model="quantity"
                                            variant="solo"
                                            type="text"
                                            readonly
                                            class="h-text-field"
                                        />
                                        <VBtn icon size="x-small" @click="increment" variant="plain" color="#0A1B33">
                                            <VIcon>mdi-plus</VIcon>
                                        </VBtn>
                                    </div>
                                </div>
                                <div class="d-flex text-center align-center mt-md-2 ps-8 ps-md-2 tw-justify-start md:tw-justify-center">
                                    <span class="tw-text-xs text_2" :class="(quantity > stock) ? 'tw-text-yellow' : 'tw-text-gray'">
                                        {{ (in_stock === 1) ? stock + ( stock > 1 ? ' disponibles' : ' disponible')  : 'AGOTADO' }}
                                    </span>
                                </div>
                            </div>
                        </div>                        
                    </VCardText>
                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>
    .out-of-stock-label {
        position: absolute;
        top: 30%;
        left: 47%;
        transform: translate(-50%, -50%) rotate(-30deg);
        background-color: rgba(255, 0, 144, 0.7);
        color: white;
        padding: 5px 10px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        z-index: 10;
        pointer-events: none; /* Para que no interfiera con el zoomer */
        width: 90%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    
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
        width: 100px;
        height: 100px;
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
        width: 100px;
        height: 100px;
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

    .h-text-field {
        height: 30px;
    }

    @media only screen and (max-width: 767px) {

        .text_2 {
            font-size: 12px;
        }

        .number-input-wrapper{
            height: 30px;
        }

        .v-text-field::v-deep(.v-field) { 
            font-size: 12px;
            height: 20px;
        } 

        .v-text-field::v-deep(.v-field__field) { 
            height: 20px;
        }

        .v-text-field::v-deep(.v-field__input){
            min-height: 20px;
        }

        .h-text-field {
            height: 20px;
        }

        .border-img, .img-prod {
            width: 75px;
            height: 75px;
        }

        .out-of-stock-label {
            font-size: 16px;
            top: 25%;
            left: 50%;
        }
    }
    
</style>
