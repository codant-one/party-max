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
    },
    type: {
        type: Number,
        required: true
    }
})

const emit = defineEmits([
    'delete'
])

const image = ref(null)
const price = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)
const quantity = ref(null)
const service_id = ref(null)
const date = ref(null)
const size = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

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
    }
})

</script>

<template>
    <div class="tw-no-underline zoom-service">
        <VCard 
            class="no-shadown px-0 w-100 py-3 py-md-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow no-gutters>
                <VCol cols="6" md="5" class="d-flex flex-column my-auto">
                    <VCardText class="border-img ms-5 p-0">
                        <img 
                            :width="100"
                            :src="baseURL + image" 
                            :alt="name"
                            class="img-prod" />
                    </VCardText>
                </VCol>
                <VCol cols="12" md="7" class="d-flex flex-column pt-3 py-md-5 ps-4 ps-md-2 my-auto">
                    <VCardText class="px-1">
                        <span class="d-block text_2 py-1 tw-text-tertiary title-service">{{ name }}</span>
                        <span class="d-block py-0 tw-text-gray">Fecha: {{ date }}</span>
                        <span class="d-block py-0 tw-text-gray" v-if="size">Tamaño: {{ size }}</span>
                    </VCardText>
                    <VCardText class="px-1">
                        <span 
                            class="d-flex tw-text-xs py-1 tw-text-primary title-service me-3" 
                            @click="emit('delete', service_id)"
                        >
                            Eliminar
                        </span>
                    </VCardText>
                    <VCardText class="px-1">
                        <span class="d-block py-0 tw-text-gray">{{ quantity }} x 
                            <span class="tw-text-tertiary">${{ formatNumber(price) }}</span>
                        </span>
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
    
</style>
