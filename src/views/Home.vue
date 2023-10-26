<script setup lang="ts">

import { ref } from 'vue'

import Plaza_1 from '@/assets/images/Plaza_1.jpg';
import Plaza_2 from '@/assets/images/Plaza_2.jpg';
import Plaza_3 from '@/assets/images/Plaza_3.jpg';
import Plaza_4 from '@/assets/images/Plaza_4.jpg';
import Plaza_5 from '@/assets/images/Plaza_5.jpg';
import Banner from '@/assets/images/Banner.jpg';
import Slider from '@/assets/images/Slider.jpg';

import icon1 from '@/assets/icons/fiestas_infantiles.svg';
import icon2 from '@/assets/icons/fiestas_tematicas.svg';
import icon3 from '@/assets/icons/fechas_especiales.svg';
import icon4 from '@/assets/icons/hora_loca.svg';
import icon5 from '@/assets/icons/desechables.svg';
import icon6 from '@/assets/icons/decoración.svg';
import icon7 from '@/assets/icons/sorpresas.svg';
import icon8 from '@/assets/icons/mobiliario.svg';
import icon9 from '@/assets/icons/dulces.svg';
import icon10 from '@/assets/icons/animación.svg';

const items = ref([
  { text: 'Fiestas infantiles', icon: icon1 },
  { text: 'Fiestas temáticas', icon: icon2 },
  { text: 'Fechas especiales', icon: icon3 },
  { text: 'Hora loca', icon: icon4 },
  { text: 'Desechables', icon: icon5 },
  { text: 'Decoración', icon: icon6 },
  { text: 'Sorpresas', icon: icon7 },
  { text: 'Mobiliario', icon: icon8 },
  { text: 'Dulces', icon: icon9 },
  { text: 'Animación y entretenimiento', icon: icon10 },
])

const sliders = ref( [
  { src: Slider },
  { src: Slider },
  { src: Slider },
  { src: Slider },
  { src: Slider }
])

</script>

<template>
  <VContainer class="mt-10">
    <VRow no-gutters class="transparent">
      <VCol cols="3">
        <VSheet class="border">
          <VList class="p-0 border">
            <router-link
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              :to="'/help'"
              class="tw-no-underline tw-text-terciary"
            >
              <VListItem
                color="primary"
                variant="plain"
                class="list py-0"
              >
                <template v-slot:prepend>
                  <VImg :src="item.icon" class="me-3 ms-4"/>
                </template>

                <VListItemTitle v-text="item.text"></VListItemTitle>
              </VListItem>
            </router-link>
          </VList>
        </VSheet>
      </VCol>
      <VCol cols="9">
        <VRow no-gutters class="transparent">
          <VCol cols="7">        
              <VCarousel :show-arrows="false" height="393px">
                <VCarouselItem
                  v-for="(item,i) in sliders"
                  :key="i"
                  :src="item.src"
                  cover
                />
              </VCarousel>
          </VCol>
          <VCol cols="5">
            <VRow no-gutters class="transparent">
              <VCol cols="6">
                <router-link to="/help">
                  <VImg :src="Plaza_1"/>
                </router-link>
              </VCol>
              <VCol cols="6">
                <router-link to="/help">
                  <VImg :src="Plaza_2" class="border-top-right"/>
                </router-link>
              </VCol>
              <VCol cols="12">
                <router-link to="/help">
                  <VImg :src="Plaza_3"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="7">
            <router-link to="/help">
              <VImg :src="Banner" height="197" cover/>
            </router-link>
          </VCol>
          <VCol cols="5">
            <VRow no-gutters class="transparent">
              <VCol cols="6">
                <router-link to="/help">
                  <VImg :src="Plaza_4"/>
                </router-link>
              </VCol>
              <VCol cols="6">
                <router-link to="/help">
                  <VImg :src="Plaza_5" class="border-bottom-right"/>
                </router-link>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCol>     
    </VRow>
  </VContainer>
</template>

<style scoped>
  .list {
    min-height: 59px;
  }
  .transparent {
    background: transparent !important;
  }
  .border {
    border: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 16px !important;
    border-bottom-left-radius: 16px !important;
  }

  .border-top-right {
    border-top-right-radius: 16px !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  .border-bottom-right {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 16px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
</style>
