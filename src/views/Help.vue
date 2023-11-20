<script setup lang="ts">
// import { ref } from 'vue'
// import FaqsCategories from '@/components/faqs/FaqsCategories.vue'
import { useCategoriesStores } from '@/stores/useFaqCategories' 


const categoriesStores = useCategoriesStores()

const categories = ref([])
const activeTab = ref(0) 
const activeQuestion = ref(0)
const isRequestOngoing = ref(true)

const fetchData = async () => {

    isRequestOngoing.value = true

    let response = await categoriesStores.allFaqs()

    categories.value = response.categories
    activeTab.value = response.categories[0].name

    isRequestOngoing.value = false
}

watch(activeTab, () => activeQuestion.value = 0)
fetchData()

</script>

<template>
 

  <VContainer class="content py-13 text-center w-100" style="height: 400px">
    <!-- 👉 Banner  -->
    <VCard
        flat
        class="text-center card-header"
    >
        <VCardText>

            <VCardTitle class="font-weight-semibold title-text">
                Hola, ¿cómo podemos ayudar?
            </VCardTitle>

            <p class="subtitle-text mb-0 mt-3">
                Elija una categoría para encontrar rápidamente la ayuda que necesita
            </p>
        </VCardText>
    </VCard>
   

    <!-- 👉 Faq sections and questions -->
    <VRow style="margin-top: 10px">
      <VCol
        v-show="categories.length"
        cols="12"
        sm="12"
        lg="12"
        class="position-relative mt-3"
      >

        <!-- 👉 Tabs -->
        <VTabs
          v-model="activeTab"
          direction="horizontal"
          class="v-tabs-pill"
          grow
          stacked
        >
          <VTab
            v-for="category in categories"
            :key="category.name"
            :value="category.name"
            class="text-high-emphasis tabs ms-1 me-1 rounded-lg"
          >
            <VIcon
              :icon="category.icon"
              :size="20"
              class="icons"
              start
            />
            {{ category.name }}
          </VTab>
        </VTabs> 
      </VCol>

      <VCol
        cols="12"
        sm="8"
        lg="9"
      >
        <!-- 👉 Windows -->
        <VWindow
          v-model="activeTab"
          class="faq-v-window disable-tab-transition"
        >
          <VWindowItem
            v-for="category in categories"
            :key="category.name"
            :value="category.name"
          >
            <div class="d-flex align-center mb-6">
              <VAvatar
                rounded
                :color="category.color ?? 'primary'"
                variant="tonal"
                class="me-3"
                size="large"
              >
                <VIcon
                  :size="32"
                  :icon="category.icon"
                />
              </VAvatar>

              <div>
                <h6 class="text-h6">
                  {{ category.name }}
                </h6>
                <span class="text-sm">{{ category.description }}</span>
              </div>
            </div>

            <VExpansionPanels
              v-model="activeQuestion"
              multiple
            >
              <VExpansionPanel
                v-for="item in category.faqs"
                :key="item.title"
                :title="item.title"
                :text="item.description"
              />
            </VExpansionPanels>
          </VWindowItem>
        </VWindow>
      </VCol>

      <VCol
        v-show="!categories.length"
        cols="12"
        :class="!categories.length ? 'd-flex justify-center align-center' : ''"
      >
        <VIcon
          icon="tabler-help"
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

    .icons{
      color:  #FF0090!important;
    }

    .tabs{
      padding: 31px;
      background-color: var(--Light-Cyan-1, #E2F8FC);

    }
</style>