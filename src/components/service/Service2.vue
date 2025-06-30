<script setup>

import { formatNumber } from '@formatters'
import heart from '@assets/icons/heart_gray.svg?inline';

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
    loading: {
        type: Boolean,
        required: true
    },
    serviceId: {
        type: Number,
        required: true
    }
})

const route = useRoute()

const emit = defineEmits([
    'addfavorite'
])

const id = ref(null)
const image = ref(null)
const price = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const single_description = ref(null)
const slug = ref(null)

const client_id = ref(null)
const load = ref(props.loading)
const isFavoriteService = ref(null)
const service_id = ref(props.serviceId)
const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')
const isMobile = /Mobi/i.test(navigator.userAgent);

watch(() => 
    props.loading, (data) => {
      load.value = data
    }
);

watch(() => 
    props.serviceId, (data) => {
        service_id.value = data
    }
);

watchEffect(() => {

    if (!(Object.entries(props.service).length === 0) && props.service.constructor === Object) {
        image.value = props.service.image
        price.value = props.service.first_cupcake ? props.service.first_cupcake.price : props.service.price
        name.value = props.service.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        store.value = props.service.store ?? (props.service.company ?? props.service.user)
        rating.value = props.service.rating
        single_description.value = props.service.single_description
        slug.value = props.service.slug
        isFavoriteService.value = props.service.is_favorite
        id.value = props.service.id

        if(localStorage.getItem('user_data')){
            const userData = localStorage.getItem('user_data')
            const userDataJ = JSON.parse(userData)
            
            client_id.value = userDataJ.client.id
        }
    }
})

const addfavorite = () => {
    emit('addfavorite', id.value)
}

</script>

<template>
    <div class="zoom-service w-100">
        <VCard 
            class="no-shadown px-0 pt-0 pb-5 w-100 mb-3 mb-md-5" 
            :class="props.isLastItem ? '' : 'card-information'">
            <VRow>
                <VCol cols="6" md="3">
                    <VCardText class="border-img ms-md-5 text-center justify-content-center align-center d-flex p-0">
                        <router-link
                            :to="{
                                name: 'serviceDetail',
                                params: { slug: slug },
                                query: {  
                                    category: route.query.category,
                                    fathercategory: route.query.fathercategory,
                                    subcategory: route.query.subcategory
                                }
                            }"
                            class="tw-no-underline">
                            <img 
                                :width="isMobile ? 135 : 177"
                                :src="baseURL + image" 
                                class="img-prod"
                            />
                        </router-link>
                    </VCardText>
                </VCol>
                <VCol cols="12" md="6" class="py-0 py-md-3">
                    <VCardText class="d-flex px-1 px-md-2">
                        <span class="d-block text_2 py-md-1 tw-text-tertiary title-service">{{ name }}</span>
                    </VCardText>
                    <VCardText class="px-0 px-md-1 pb-1 d-none">
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
                            <span class="text_1 tw-text-tertiary">${{formatNumber(price) }}</span>
                        </div>
                    </VCardText>
                    <VCardText class="mt-3 px-1 px-md-2">
                        <div v-if="client_id" class="d-flex text-center align-center tw-justify-start md:tw-justify-center heart" @click="addfavorite">
                            <span class="text_2 d-flex align-center">
                                <span 
                                    class="me-2 pt-1"
                                    :class="(isFavoriteService) ? 'heart_fill' : ''" 
                                    >
                                <heart />
                                </span>
                                <span :class="(isFavoriteService) ? 'tw-text-primary' : ''">
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
        width: 200px;
        height: 200px;
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
