<script setup lang="ts">

import { ref } from 'vue'

import Plaza_1 from '@/assets/images/Plaza_1.png';
import Plaza_2 from '@/assets/images/Plaza_2.png';
import Plaza_3 from '@/assets/images/Plaza_3.png';
import Plaza_4 from '@/assets/images/Plaza_4.png';
import Plaza_5 from '@/assets/images/Plaza_5.png';
import Banner from '@/assets/images/Banner.png';
import Slider from '@/assets/images/Slider.png';

const items = ref([
  { text: 'Fiestas infantiles', icon: 'mdi-clock' },
  { text: 'Fiestas temáticas', icon: 'mdi-account' },
  { text: 'Fechas especiales', icon: 'mdi-flag' },
  { text: 'Hora loca', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Desechables', icon: 'mdi-flag' },
  { text: 'Decoración', icon: 'mdi-clock' },
  { text: 'Sorpresas', icon: 'mdi-account' },
  { text: 'Mobiliario', icon: 'mdi-flag' },
  { text: 'Dulces', icon: 'mdi-flag' },
  { text: 'Animación y entretenimiento', icon: 'mdi-flag' },
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
  <VContainer class="mt-5">
    <VRow no-gutters class="transparent">
      <VCol cols="3">
        <VSheet height="100%">
          <VList>
            <VListItem
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
              variant="plain"
              class="list py-0"
            >
              <template v-slot:prepend>
                <VIcon :icon="item.icon"></VIcon>
              </template>

              <VListItemTitle v-text="item.text"></VListItemTitle>
            </VListItem>
          </VList>
        </VSheet>
      </VCol>
      <VCol cols="9">
        <VRow no-gutters class="transparent">
          <VCol cols="7">
            <VSheet height="100%">              
              <VCarousel :show-arrows="false" height="100%">
                <VCarouselItem
                  v-for="(item,i) in sliders"
                  :key="i"
                  :src="item.src"
                  cover
                ></VCarouselItem>
              </VCarousel>
            </VSheet>
          </VCol>
          <VCol cols="5">
            <VRow no-gutters class="transparent">
              <VCol cols="6">
                <VSheet >
                  <VImg :src="Plaza_1" cover/>
                </VSheet>
              </VCol>
              <VCol cols="6">
                <VSheet >
                  <VImg :src="Plaza_2" cover/>
                </VSheet>
              </VCol>
              <VCol cols="12">
                <VSheet >
                  <VImg :src="Plaza_3" cover/>
                </VSheet>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="7">
            <VSheet  height="100%">
              <VImg :src="Banner" cover  height="100%"/>
            </VSheet>
          </VCol>
          <VCol cols="5">
            <VRow no-gutters class="transparent">
              <VCol cols="6">
                <VSheet >
                  <VImg :src="Plaza_4" cover/>
                </VSheet>
              </VCol>
              <VCol cols="6">
                <VSheet >
                  <VImg :src="Plaza_5" cover/>
                </VSheet>
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
    min-height: 52px;
  }
  .transparent {
    background: transparent !important;
  }
</style>
