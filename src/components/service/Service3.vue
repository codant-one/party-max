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
    bg: {
        type: String,
        default: 'tw-bg-white',
        required: false
    }
})

const isMobile = /Mobi/i.test(navigator.userAgent);
const image = ref(null)
const price = ref(null)
const name = ref(null)
const store = ref(null)
const rating = ref(null)
const slug = ref(null)

const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

watchEffect(() => {

    if (!(Object.entries(props.service).length === 0) && props.service.constructor === Object) {
        image.value = props.service.image
        price.value = props.service.cupcakes.length > 0 ? props.service.cupcakes[0].price : props.service.price
        name.value = props.service.name.toLowerCase().replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase());
        store.value = props.service.user.user_detail.store_name ?? (props.service.user.supplier?.company_name ?? (props.service.user.name + ' ' + (props.service.user.last_name ?? '')))
        rating.value = props.service.rating
        slug.value = props.service.slug
    }
})

</script>

<template>
    <router-link
        :to="{
            name: 'serviceDetail',
            params: {
                slug: slug
            }
        }"
        class="tw-no-underline zoom-service">
        <VCard class="no-shadown card-information p-0" :width="isMobile ? 'auto' : 230" :class="props.bg">
            <VCardText class="border-img ms-1 p-0">
                <img
                    :width="230"
                    :src="baseURL + image" 
                    class="img-prod"
                    alt="Imagen del servicio"
                />
            </VCardText>
            <VCardText class="mt-2">
                <div class="d-flex">
                <span class="text_1">${{ formatNumber(price) }}</span>
                </div>
            </VCardText>
            <VCardText>
                <span v-if="name.length > 50 && !isMobile" class="text-start d-block text_2 tw-text-tertiary title-service">
                    {{ name.slice(0, 50) + '...'}}
                </span>
                <span v-else class="text-start d-block text_2 tw-text-tertiary title-service">
                    <span v-if="isMobile"> {{ name.slice(0, 25) + '...'}}</span>
                    <span v-else> {{ name }}</span>
                </span>
            </VCardText>
            <VCardText>
                <span class="text-start d-block text_2 store">Tienda:
                    <strong v-if="store.length > 15 && isMobile">{{ store.slice(0, 15) + '...' }}</strong>
                    <strong v-else>{{ store }}</strong>
                </span>
            </VCardText>
            <VCardText class="px-1 mt-2 d-none">
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
        </VCard>
    </router-link>
</template>

<style scoped>

    .v-card-text {
        padding: 0 10px;
    }

    .border-img {
        width: 210px;
        height: 210px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        background-color: white;
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
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
    }

    .title-service, .store {
        min-height: 45px;
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

    @media only screen and (max-width: 767px) {
        .border-img {
            width: 140px;
            height: 140px;
        }

        .text_1 {
            font-size: 16px;
        }

        .text_2 {
            font-size: 13px;
        }

        .title-service {
            min-height: 40px;
        }

        .store {
            min-height: 40px;
        }
    }
    
</style>
