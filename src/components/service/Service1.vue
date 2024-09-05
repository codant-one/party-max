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
    }
})

const route = useRoute()

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
            params: { slug: slug },
            query: {  
                category: route.query.category,
                fathercategory: route.query.fathercategory,
                subcategory: route.query.subcategory
            }
        }"
        class="tw-no-underline zoom-service">
        <VCard class="no-shadown card-information p-0">
            <VCardText class="border-img ms-1 mb-2">
                <VImg 
                    class="img-prod"
                    :src="baseURL + image" 
                    cover />
            </VCardText>
            <VCardText>
                <span v-if="name.length > 50 && !isMobile" class="d-block text_2 tw-text-tertiary title-service">
                    {{ name.slice(0, 50) + '...'}}
                </span>
                <span v-else class="d-block text_2 tw-text-tertiary title-service">
                    <span v-if="isMobile"> {{ name.slice(0, 25) + '...'}}</span>
                    <span v-else> {{ name }}</span>
                </span>
            </VCardText>
            <VCardText>
                <span class="d-block text_2 store">Tienda:
                    <strong v-if="store.length > 15 && isMobile">{{ store.slice(0, 15) + '...' }}</strong>
                    <strong v-else>{{ store }}</strong>
                </span>
            </VCardText>
            <VCardText class="px-1">
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
            <VCardText class="mt-1">
                <div class="d-flex py-2">
                    <span class="text_1">${{ formatNumber(price) }}</span>
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
        height: 200px;
        border-radius: 16px !important;
        border: 1px solid #D9EEF2;
        padding: 10px !important;
        background-color: white;
        text-align: center;
        align-items: center;
        display: flex;
    }

    .zoom-service  {
        transition: transform ease-in-out 0.3s;
    }

    .zoom-service:hover .v-img {
        transform: scale(1.1) !important;
    }

    .zoom-service:hover .title-service {
        color: #FF0090 !important;
    }

    .title-service {
        min-height: 45px;
    }

    .store {
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

    .card-information {
        width: 230px;
        min-height: 100px;
    }

    .img-prod {
        width:230px;
    }
    

@media only screen and (max-width: 767px) {
    .card-information {
        width: 95%;
    }

    .border-img {
        width: auto;
        height: 150px;
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
