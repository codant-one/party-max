<script setup>

import { requiredValidator} from '@validators'
import { useOpenaiStores } from '@/stores/openai'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';

import Product1 from '@/components/product/Product1.vue'
import Service1 from "@/components/service/Service1.vue";
import festinabout from '@/assets/images/festin-aboutus.jpg'
import festinfooter from '@assets/images/festin-footer.webp'
import festin_pending from '@assets/icons/festin_mantenimiento.svg';
import Loader from '@/components/common/Loader.vue'

const isMobile = /Mobi/i.test(navigator.userAgent);
const isDialogVisible = ref(false)
const openaiStore = useOpenaiStores();

const modules = ref([Pagination])

const event_type = ref(null)
const refVForm = ref()
const theme = ref(null)
const guests = ref(null)
const responseData = ref(null);
const imageGenerated = ref(null);
const isLoading = ref(false)
const listPartyTypes = ref([
    'Cumpleaños','Halloween','Despedida de soltera','Aniversario','Graduación','Día del niño','Baby shower', 'Jubilación', 'Compromiso',
    'Revelación de sexo', 'Fiesta de bienvenida', 'Fiesta de empresa', 'Fiesta temática', 'Fiesta sorpresa', 'Navidad', 'Año nuevo',
    'Pascua', 'Primera comunión', 'Bautizo', 'Fiesta de 15 años', 'Matrimonio / Boda', 'Picnic / Fiesta al aire libre', 'Reencuentro familiar / amigos',
    'Fiesta de inauguración', 'Fiesta escolar / colegio'
])
const listthematic = ref([
    'Vallenata', 'Mexicana', 'Niños', 'Niñas', 'Bebes', 'Graduación', 'Deportes', 'Vaquera', 'Hora loca', 'Sorpresas', 'Disco',
    'Superhéroes', 'Princesas', 'Selva / Safari', 'Circo', 'Espacial / Galaxia', 'Arcoíris / Unicornio', 'Piratas', 'Marina / Playa',
    'Retro / 80s - 90s', 'Películas / Cine', 'Personajes animados', 'Animales', 'Luau / Hawaiana', 'Gamer / Videojuegos', 'Neón / Fluorescente',
    'Fantasía / Magia', 'Rock & Roll', 'Black & White', 'Carnaval / Tropical', 'Festival de colores / Holi', 'Bosque encantado / Hadas'
])

const formatText = (text) => {
    if (Array.isArray(text)) {
        text = text.join('\n') // Convertimos el array a texto plano
    } else {
        text = String(text ?? '')
    }

    return text
        .replace(/\n### (.*)/g, '<h3>$1</h3>') // Títulos H3
        .replace(/\n- \*\*ID: (\d+)\*\* - \*\*(.*?)\*\*, Precio: ([\d.]+)/g, '<li><strong>ID:</strong> $1 - <strong>$2</strong>, Precio: $3</li>')
        .replace(/\n- (.*?)\n/g, '<li>$1</li>') // Otros ítems
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negritas
        .replace(/\n/g, '<br />') // Saltos de línea
}

const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
            const formData = { 
                event_type: event_type.value,
                theme: theme.value,
                guests: parseInt(guests.value)
            };
            isLoading.value = true

            setTimeout(() => {
                isDialogVisible.value = true
            }, 1000)

            openaiStore.show(formData)
                .then((response) => {
                    responseData.value = response;
                    imageGenerated.value = response.recommendations.image_url
                    isLoading.value = false
                    isDialogVisible.value = false
                })
                .catch((error) => {
                    console.error('Error al enviar datos:', error);
                    isLoading.value = false
                    isDialogVisible.value = false
                }); 
        }
    })
}

</script>

<template>
    <VContainer class="mt-2 mt-md-10">
        <Loader :isLoading="isLoading" class="d-print-none"/>
        <div class="card-container-generator">
            <div class="d-flex flex-column flex-md-row align-center">
                <img
                    class="festin-footer-size me-md-15" 
                    alt="festin" 
                    :width="isMobile ? '150' : '400'"
                    :src="responseData ? festinabout : festinfooter"
                />
                <div class="w-100">
                    <h1 class="title-generator text-center text-md-start mb-5">
                        Planifica tu fiesta con inteligencia
                    </h1>
                    <div class="desc_generator text-center text-md-start">
                        Cuéntale a Festín qué vas a celebrar y deja que, junto con su inteligencia artificial, te sorprenda con ideas únicas, creativas y listas para hacer de tu evento algo inolvidable.
                    </div>
                    <VForm
                        ref="refVForm"
                        class="w-md-50 text-start align-start"
                        @submit.prevent="onSubmit"
                    > 
                        <VRow no-gutters class="mt-5">
                            <VCol cols="12" md="12">
                                <VTextField
                                    v-model="event_type"
                                    variant="outlined"
                                    label="Tipo de celebración"
                                    :rules="[requiredValidator]"
                                /> 
                            </VCol>
                            <VCol cols="12" md="12">
                                <VTextField
                                    v-model="theme"
                                    variant="outlined"
                                    label="Temática"
                                    :rules="[requiredValidator]"
                                /> 
                            </VCol>

                            <VCol cols="12" md="12">
                                <VTextField
                                    variant="outlined"
                                    v-model="guests"
                                    label="Número de invitados"
                                    type="number"
                                    :rules="[requiredValidator]"
                                    min="1"
                                />
                            </VCol>
                        </VRow>
                        <VBtn
                            variant="flat"
                            type="submit"
                            :height="48"
                            class="w-100 w-md-50 btn-register tw-text-white tw-bg-primary button-hover mt-2"
                        >
                            Generar Ideas
                        </VBtn>
                    </VForm>
                </div>
            </div>
            
            <VRow no-gutters v-if="responseData">
                <VCol cols="12">
                    <VCard class="px-0 transparent no-shadown">
                        <VCardText class="px-0">
                            <VRow no-gutters v-if="typeof responseData === 'object'">
                                <VCol
                                    v-for="(value, key) in responseData"
                                    :key="key"
                                    cols="12"
                                    md="12"
                                    class="mt-2"
                                    >

                                    <div v-if="key === 'recommendations'" class="text-center mb-6">
                                        <VImg
                                            alt="Imagen generada por IA"
                                            :src="value.image_url"
                                            class="mx-auto rounded-lg"
                                            cover
                                        />
                                    </div>

                                    <div v-html="formatText(value.text_response)" v-if="key === 'recommendations'" class="prose prose-sm max-w-none card-ia"/>

                                    <div v-if="key !== 'recommendations' && value.length > 0">
                                        <strong >{{ key }}:</strong>
                                        
                                        <VCardText class="py-0 px-0 px-md-4 mb-2">  
                                            <swiper
                                                :pagination="{
                                                    dynamicBullets: true,
                                                }"
                                                :navigation="true"
                                                :modules="modules"
                                                :spaceBetween="2"
                                                :slidesPerView="isMobile ? 2 : 5"
                                                :freeMode="true"
                                                :watchSlidesProgress="true"
                                                :style="{ height: isMobile ? '340px' : '405px' }"
                                                >
                                                <swiper-slide
                                                    v-for="(item, i) in value"
                                                    :key="i"
                                                    class="flex justify-center"
                                                >
                                                    <Product1 v-if="key === 'Productos'" :product="item" :readonly="true" />
                                                    <Service1 v-else :service="item" :readonly="true" />
                                                </swiper-slide>
                                            </swiper>

                                        </VCardText> 
                                       
                                    </div>
                                </VCol>
                            </VRow>
                            <!-- Si es un valor simple -->
                            <div v-else>
                                {{ responseData }}
                            </div>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </div>
    </VContainer>
    <VDialog v-model="isDialogVisible" >
      <VCard
        class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
        <VImg :width="isMobile ? '100' : '180'" :src="festin_pending" class="mx-auto"/>
        <VCardText class="text-message p-0 px-md-5">
            ¡Estamos trabajando en tu fiesta ideal!
        </VCardText>
        <VCardText class="mb-5 px-0 px-md-5 pt-0">
            Festín está consultando a nuestro agente de inteligencia artificial para armar ideas únicas para tu celebración.<br>
            <strong>Esto puede tardar unos segundos...</strong> <br>
            ⏳ No recargues la página, <br>
            ¡la magia ya está en camino!
        </VCardText>
      </VCard>
    </VDialog>
</template>

<style scoped>
    .swiper::v-deep(.swiper-pagination-bullet-active) {
        background: white !important; /* Fondo blanco para el espacio */
        border: 2px double #FF0090 !important; /* Borde rosado */
        box-shadow: inset 0 0 0 3px white; /* "Recorta" el interior */
        width: 16px; 
        height: 16px;
        
        /* Círculo interior rosado */
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;  /* Tamaño del círculo rosado */
            height: 6px;
            background: #FF0090;
            border-radius: 50%;
        }
    }

    :deep(.swiper-pagination-bullets-dynamic) {
        overflow: visible !important;
    }

    :deep(.swiper-pagination-bullet),
    :deep(.swiper-pagination-bullet-active-next),
    :deep(.swiper-pagination-bullet-active-next-next) {
        width: 16px; 
        height: 16px;
    }
    
    .swiper::v-deep(.swiper-pagination-horizontal ) {
      top: 95%;
    } 

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        font-size: 18px;

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    :deep(.swiper-button-next){
        background-image: url('@/assets/icons/arrow-square-right.svg');
        background-color: #FF0090;
        background-position: center;
        border-radius: 11px;
        width: 4%;
        /* Oculta la flecha predeterminada */
        &::after {
            content: '' !important;
        }
        top: 7% !important; 
    }

    
    :deep(.swiper-button-prev) {
        background-image: url('@/assets/icons/arrow-square-left.svg');
        background-color: #FF0090;
        background-position: center;
        border-radius: 11px;
        width: 4%;
        /* Oculta la flecha predeterminada */
        &::after {
            content: '' !important;
        }
        top: 7% !important; 
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 20px;
        font-weight: bold;
        color: #333;
    }

    .swiper-button-next {
        right: 10px;
    }

    .swiper-button-prev {
        left: 10px;
    }

    .card-ia::v-deep(h3) {
        margin-top: 20px;
    }

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px !important;
    }

    .card-register {
        width: 500px;
        border-radius: 32px!important;
        line-height: 20px;
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

    .card-container-generator {
        display: flex;
        flex-direction: column;
        gap: 16px;
        background-color: #FFFFFF;
        padding: 48px;
        border-radius: 16px;
        border: none;
        min-height: 500px;
    }

    .title-generator {
        font-size: 40px;
        font-weight: 900;
        line-height: 36px;
    }

    .desc_generator {
        font-size: 16px;
        line-height: 20px;
    }

    .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }
    
    .v-autocomplete::v-deep(.v-field__input) {
        padding-top: 0% !important;
    }

    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
    }
    
    .v-text-field::v-deep(.v-field__outline__start) {
        border-start-start-radius: 24px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 12px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    @media only screen and (max-width: 767px) {

        .title-generator {
            font-size: 24px;
            line-height: 24px;
        }

        .card-register {
            padding: 20px;
            width: auto;
        }

        .text-message {
            font-size: 18px;
        }

        .card-container-generator {
            padding: 20px;
            width: auto;
        } 
    }
</style>