<script setup>

import { formatNumber } from '@formatters'

const props = defineProps({
    service: {
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

const image = ref(null)
const price = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const quantity = ref(null)
const service_id = ref(null)
const size = ref(null)
const is_full = ref(true)
const flavor = ref(null)
const flavor_id = ref(null)
const filling = ref(null)
const filling_id = ref(null)
const cake_size_id = ref(null)
const date = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const isMobile = /Mobi/i.test(navigator.userAgent)

watchEffect(() => {

    if (!(Object.entries(props.service).length === 0) && props.service.constructor === Object) {
        let cupcake = props.type === 0 ? null : props.service.cupcakes.find(item => item.cake_size_id === props.service.cake_size_id)

        image.value = (props.service.images.length === 0) ? props.service.image : props.service.images[0]?.image
        price.value = props.service.cake_size_id === 0 ? props.service.price : cupcake.price
        name.value = props.service.name.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())
        store.value = props.service.user.user_detail.store_name ?? (props.service.supplier?.company_name ?? (props.service.user.name + ' ' + (props.service.user.last_name ?? '')))
        rating.value = props.service.rating
        single_description.value = props.service.single_description
        slug.value = props.service.slug
        quantity.value = props.service.quantity ?? 1
        service_id.value = props.service.id
        date.value = props.service.date
        size.value = props.service.cake_size_id === 0 ? null : cupcake.cake_size.name
        flavor.value = props.service.cake_size_id === 0 ? null : props.service.flavor.name
        flavor_id.value = props.service.cake_size_id === 0 ? null : props.service.flavor.id
        filling.value = props.service.cake_size_id === 0 ? null : props.service.filling.name
        filling_id.value = props.service.cake_size_id === 0 ? null : props.service.filling.id
        cake_size_id.value = props.service.cake_size_id
        is_full.value = props.service.is_full === 1 ? true : false
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-service w-100">
        <VCard 
            class="no-shadown px-0 w-100 py-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters class="px-5 px-md-14">
                <VCol cols="6" md="2" class="d-flex flex-column my-auto">
                    <VCardText class="border-img ms-md-2 p-0">
                        <img
                            :width="100"
                            :src="baseURL + image" 
                            :alt="name"
                            class="img-prod"
                            loading="lazy"
                        />
                    </VCardText>
                </VCol>
                <VCol cols="6" md="12" v-if="isMobile"></VCol>
                <VCol cols="10" md="7" class="d-flex justify-content-center align-center mt-3 my-md-0 ps-md-5">
                    <VCardText class="px-0">
                        <span class="d-block text_2 py-1 tw-text-tertiary title-service">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Fecha: {{ date }}</span>
                        <span class="d-block py-0 tw-text-gray" v-if="size">Tamaño: {{ size }}</span>
                        <span class="d-block py-0 tw-text-gray" v-if="size && is_full">
                            Sabor: {{ flavor }} / Relleno: {{ filling }}
                        </span>
                        <span class="d-block py-0 tw-text-gray" v-if="size">
                            <span>{{ quantity }} </span>
                            <span>{{ (quantity > 1) ? ' Unidades' : ' Unidad' }}</span>
                        </span>
                        <span class="d-block py-0 tw-text-gray" v-else>
                            <span>1 Servicio</span>
                        </span>
                    </VCardText>
                </VCol>
                <VCol cols="2" md="3" class="d-flex justify-content-end tw-items-end md:tw-items-center">
                    <div class="me-0">
                        <VCardText class="d-flex text-end align-end justify-content-end">
                        </VCardText>
                        <VCardText class="mt-1">
                            <div class="d-flex text-center align-end tw-justify-end md:tw-justify-center">
                                <span class="text_1 tw-text-tertiary">${{ formatNumber(price) }}</span>
                            </div>
                        </VCardText>
                    </div>
                </VCol>
            </VRow>
        </VCard>
    </div>
</template>

<style scoped>

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
        width: 130px;
        height: 130px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        text-align: center;
        align-items: center;
        display: flex;
        overflow: hidden;
    }

    .zoom-service {
        display: inline-block;
        position: relative;
        overflow: visible;
    }

    .zoom-service:hover .img-prod {
        transform: scale(1.1);
    }

    .zoom-service:hover .title-service {
        color: #FF0090 !important;
    }

    .img-prod {
        display: block;
        width: 130px;
        height: 130px;
        object-fit: cover;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
    }

    .title-service {
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

    .v-text-field::v-deep(.v-field) { 
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        border: 1.5px solid #E1E1E1 !important;
        height: 45px;
        width: 50px;
        box-shadow: none;
    } 

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        color: #0A1B33 !important;
    }

    .v-text-field::v-deep(.v-input__details) {
        height: 0px !important;
        min-height: 0px !important;
        padding: 0px !important;
    }
    
</style>
