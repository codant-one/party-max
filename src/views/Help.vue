<script setup>

import { ref } from 'vue'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import FaqsCategories from '@/components/faqs/FaqsCategories.vue'
import Loader from '@/components/common/Loader.vue'

const categoriesStores = useMiscellaneousStores()

const categories = ref([])
const isLoading = ref(true)

const fetchData = async () => {
  isLoading.value = true

  let response = await categoriesStores.allFaqs()
  categories.value = response.categories

  isLoading.value = false
}

fetchData()

const setFocus = async(category) => {
  window.location.hash = "#"+category;
}

</script>

<template>
  <VContainer class="mt-0 mt-md-10 text-center">
    <Loader :isLoading="isLoading"/>
    <VCard flat class="text-center card-header p-0">
      <VCardTitle class="font-weight-semibold title-text px-0">
        Hola, ¿cómo podemos ayudar?
      </VCardTitle>
      <VCardText class="subtitle-text mb-0 pb-0 pb-md-7">
        Elija una categoría para encontrar rápidamente la ayuda que necesita
      </VCardText>
    </VCard>
    <VRow no-gutters style="margin-top: 10px">
      <VCol
        v-show="categories.length"
        cols="12"
        sm="12"
        lg="12"
        align-self="center"
        id="faqsCategoriesDiv"
        class="mb-5 mb-md-10"
      >
        <VBtn
          v-for="category in categories"
          min-width="20%"
          class="selected-class"
          selected-class="selected-class"
          rounded="lg"
          elevation="0"
          @click="setFocus(category.name)"
          v-show="category.faqs.length"
          >
          <VRow>
            <VCol
              cols="12"
              sm="12"
              lg="12">
              <VIcon
                :icon="category.icon"
                size="42"
                class="icons"
              />
            </VCol>
            <VCol
              cols="12"
              sm="12"
              lg="12"
              class="icons-text tw-text-tertiary">
              {{ category.name }}
            </VCol>
          </VRow>
        </VBtn>
      </VCol>
      <VCol
        v-show="categories.length"
        cols="12"
        sm="12"
        lg="12"
        class="position-relative mt-md-3 mb-0 mb-md-15"
      >
        <FaqsCategories 
          v-for="category in categories"
          :name="category.name"
          :items="category.faqs "
        />
      </VCol>
      <VCol
        v-show="!categories.length"
        cols="12"
        :class="!categories.length ? 'd-flex justify-center align-center' : ''"
      >
        <VIcon
          icon="mdi-alert-circle"
          start
          size="20"
        />
        <span class="text-base font-weight-medium">
          Datos no disponibles
        </span>
      </VCol>
    </VRow>
  </VContainer>
</template>


<style scoped>

  .title-text {
    color:  #FF0090!important;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
  }

  .subtitle-text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; 
  }

  .icons {
    color:  #FF0090!important;
    font-size: 35px!important;
  }

  .icons-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }

  .selected-class {
    background-color: var(--Light-Cyan-1, #E2F8FC);
    margin: 0.25rem !important;
    padding: 0.25rem 0 !important;
    width: 20%;
  }

  .v-btn.v-btn--density-default {
    height: 100px !important;
  }

  @media only screen and (max-width: 767px) {
    .title-text {
      text-align: center;
      font-size: 23px;
      line-height: 24px; /* 100% */
      white-space: pre-wrap;
    }

    .subtitle-text {
      text-align: center;
      line-height: 24px; /* 133.333% */
    }

    .selected-class {
      width: 47%;
    }
  }
</style>