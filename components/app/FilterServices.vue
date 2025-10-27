<script setup>

import { useFiltersStores } from '@/stores/filters'
import { useHomeStores } from "@/stores/home";
import { useMiscellaneousStores } from "@/stores/miscellaneous";
import { formatNumber } from '@formatters'
import { useRouter, useRoute } from 'vue-router'
import { useCategoriesStores } from '@/stores/categories'

const props = defineProps({
    drawer: {
        type: Boolean,
        required: true
    }
})

const route = useRoute();
const router = useRouter();
const filtersStores = useFiltersStores()
const homeStores = useHomeStores();
const categoriesStores = useCategoriesStores()

const categories = ref(null);
const drawer_ = ref(props.drawer)
const panelCat = ref(null);
const openedGroups = ref([]);
const openedSubGroups = ref([]);

const rangPrice = ref([0, 50000]);
const min = ref(null);
const max = ref(null);
const rating = ref(5)
const category = ref(null);

watch(() => 
    props.drawer, (data) => {
        drawer_.value = data
        fetchData()
    }
);

watchEffect(fetchData);

async function fetchData() {

    await homeStores.fetchData();
    categories.value = homeStores.getData.parentServices;

    openedGroups.value = []
    openedSubGroups.value = []
    category.value = null 

    if (categoriesStores.getCategory) {
        panelCat.value = null
        const catNode = categories.value.filter(item => item.slug === categoriesStores.getCategory)[0]
        category.value = {
            title: catNode?.name,
            disabled: false,
            href: `/services/categories/${categoriesStores.getCategory}`
        };

        if (categoriesStores.getFathercategory)
            category.value.fathercategory = catNode?.children.filter(item => item.slug === `${categoriesStores.getCategory}/${categoriesStores.getFathercategory}`)[0]?.name

        if (!categoriesStores.getFathercategory && categoriesStores.getSubcategory)
            category.value.subcategory = catNode?.children.filter(item => item.slug === `${categoriesStores.getCategory}/${categoriesStores.getSubcategory}`)[0]?.name

        if (categoriesStores.getFathercategory && categoriesStores.getSubcategory) 
            category.value.subcategory = catNode?.children.filter(item => item.slug === `${categoriesStores.getCategory}/${categoriesStores.getFathercategory}`)[0]?.grandchildren.filter(item => item.slug === `${categoriesStores.getCategory}/${categoriesStores.getFathercategory}/${categoriesStores.getSubcategory}`)[0]?.name
    }
}

const priceAction = () => {
    min.value = rangPrice.value[0];
    max.value = rangPrice.value[1];

    filtersStores.changePrices({min: min.value, max: max.value})
};

const reviewAction = () => {
    filtersStores.changeRating(rating.value)
};

const toggleGroupFn = (index, cat) => {
    if (openedGroups.value.includes(index)) {
        openedGroups.value = [];
    } else {
        openedGroups.value = [index];
        panelCat.value = [cat]
        // Cambiar el icono de todos los demás elementos a mdi-chevron-down
        for (let i = 0; i < categories.length; i++) {
            if (i !== index) {
                openedGroups.value.push(i);
            }
        }
  }
};

const toggleSubGroupFn = (index, subCat) => {
    if (openedSubGroups.value.includes(index)) {
        openedSubGroups.value = [];
    } else {
        openedSubGroups.value = [index];
        panelCat.value[1] = subCat
    }
};

const buildPrettyPath = (category, subcategory = null, fathercategory = null) => {
  if (category && subcategory && fathercategory)
    return `/services/categories/${category}/${fathercategory}/${subcategory}`
  if (category && subcategory)
    return `/services/categories/${category}/${subcategory}`
  if (category)
    return `/services/categories/${category}`
  return '/services'
}

const handleCategoryClick = (category, subcategory = null, fathercategory = null) => {
  categoriesStores.reset()
  if (category) categoriesStores.setCategory(category)
  if (subcategory) categoriesStores.setSubcategory(subcategory)
  if (fathercategory) categoriesStores.setFathercategory(fathercategory)
  router.push(buildPrettyPath(category, subcategory, fathercategory))
}

</script>

<template>
  <VNavigationDrawer
      v-model="drawer_"
      class="tw-bg-green"
      location="right"
      @update:modelValue="filtersStores.changeDrawer"
      temporary>
      <VCard class="px-0 transparent no-shadown">
          <VCardItem class="px-2 p-0 text-left mt-2"> CATEGORÍAS </VCardItem>

          <VCardItem v-if="categoriesStores.getCategory" class="p-0 text-allcategories tw-font-bold mt-6">
            <NuxtLink
              to="/services"
              @click="categoriesStores.reset()"
              class="tw-no-underline tw-text-tertiary hover:tw-text-primary"
            >
              <span>
                <VIcon icon="mdi-chevron-left" />TODAS LAS CATEGORIAS
              </span>
            </NuxtLink>
          </VCardItem>

          <VList v-else v-model:opened="panelCat">
            <div v-for="(i, index) in categories" :key="index">
              <VListItem v-if="i.children.length === 0" class="px-2">
                <VListItemTitle>
                  <NuxtLink
                    :to="buildPrettyPath(i.slug.split('/')[0])"
                    @click="handleCategoryClick(i.slug.split('/')[0])"
                    class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                    {{ i.name }}
                  </NuxtLink> 
                </VListItemTitle>
              </VListItem>
              <VListGroup v-else :value="i.name" class="px-0">
                <template #activator="{ props }">
                  <VListItem class="px-2">
                    <NuxtLink
                      :to="buildPrettyPath(i.slug.split('/')[0])"
                      @click="handleCategoryClick(i.slug.split('/')[0])"
                      class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      <VListItemTitle>{{ i.name }}</VListItemTitle>
                    </NuxtLink>
                    <template #append>
                      <VIcon
                        v-bind="props"
                        :icon="openedGroups.includes(index)
                        ? 'mdi-chevron-up'
                        : 'mdi-chevron-down'"
                        @click="toggleGroupFn(index, i.name)"
                      />
                    </template>
                  </VListItem>
                </template>

                <div v-for="(j, jIndex) in i.children" :key="jIndex">
                  <VListItem v-if="j.grandchildren.length === 0">
                    <NuxtLink
                      :to="buildPrettyPath(i.slug.split('/')[0], j.slug.split('/')[1])"
                      @click="handleCategoryClick(i.slug.split('/')[0], j.slug.split('/')[1])"
                      class="tw-no-underline tw-text-tertiary hover:tw-text-primary">
                      <VListItemTitle> {{ j.name }} </VListItemTitle>
                    </NuxtLink>
                  </VListItem>
                  <VListGroup v-else :value="j.name">
                    <template #activator="{ props }">
                      <VListItem>
                        <NuxtLink
                          :to="buildPrettyPath(i.slug.split('/')[0], j.slug.split('/')[1])"
                          @click="handleCategoryClick(i.slug.split('/')[0], j.slug.split('/')[1])"
                          class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                          <VListItemTitle> {{ j.name }} </VListItemTitle>
                        </NuxtLink>
                        <template #append>
                          <VIcon
                            v-bind="props"
                            :icon="openedSubGroups.includes(jIndex)
                            ? 'mdi-chevron-up'
                            : 'mdi-chevron-down'"
                            @click="toggleSubGroupFn(jIndex, j.name)"
                          />
                        </template>
                      </VListItem>
                    </template>
                    <div v-for="k in j.grandchildren" :key="k">
                      <VListItem>
                        <NuxtLink
                          :to="buildPrettyPath(i.slug.split('/')[0], k.slug.split('/')[2], j.slug.split('/')[1])"
                          @click="handleCategoryClick(i.slug.split('/')[0], k.slug.split('/')[2], j.slug.split('/')[1])"
                          class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                          {{ k.name }}
                        </NuxtLink> 
                      </VListItem>
                    </div>
                  </VListGroup>
                </div>
              </VListGroup>
            </div>
          </VList>

          <!-- padres, hijos y nietos -->
          <VList v-if="categoriesStores.getFathercategory && category" v-model:opened="panelCat" class="pt-1">
            <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
              <span>
                <VIcon icon="mdi-chevron-left" />
                <NuxtLink
                  :to="buildPrettyPath(categoriesStores.getCategory)"
                  @click="handleCategoryClick(categoriesStores.getCategory)"
                  class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                    {{ category.title }}
                </NuxtLink> 
              </span>
            </VListItem>

            <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
              <span>
                <VIcon icon="mdi-chevron-left" />
                <NuxtLink
                  :to="buildPrettyPath(categoriesStores.getCategory, categoriesStores.getFathercategory)"
                  @click="handleCategoryClick(categoriesStores.getCategory, categoriesStores.getFathercategory)"
                  class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                    {{ category.fathercategory }}
                </NuxtLink> 
              </span>
            </VListItem>

            <VListItem class="px-2">
              <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                {{  category.subcategory }}
              </VListItemTitle>
            </VListItem>
          </VList>

          <!-- solo padres e hijos -->
          <VList 
            v-if="!categoriesStores.getFathercategory && 
            categoriesStores.getSubcategory &&
            categoriesStores.getCategory && category" 
            v-model:opened="panelCat">

            <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
              <span>
                <VIcon icon="mdi-chevron-left" />
                <NuxtLink
                  :to="buildPrettyPath(categoriesStores.getCategory)"
                  @click="handleCategoryClick(categoriesStores.getCategory)"
                  class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                    {{ category.title }}
                </NuxtLink> 
              </span>
            </VListItem>

            <VListItem class="px-2">
              <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                {{  category.subcategory }}
              </VListItemTitle>
            </VListItem>

            <div 
              v-for="(j, jIndex) in 
              categories.filter(item =>item.slug === categoriesStores.getCategory)[0].children.filter(item =>item.slug === categoriesStores.getCategory + '/' + categoriesStores.getSubcategory)[0].grandchildren" 
              :key="jIndex">
              <VListItem>
                <NuxtLink
                  :to="buildPrettyPath(categoriesStores.getCategory, j.slug.split('/')[2], categoriesStores.getSubcategory)"
                  @click="handleCategoryClick(categoriesStores.getCategory, j.slug.split('/')[2], categoriesStores.getSubcategory)"
                  class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                    {{ j.name }}
                </NuxtLink> 
              </VListItem>
            </div>
          </VList>

          <!-- Solo padres -->
          <VList 
            v-if="!categoriesStores.getFathercategory && 
            !categoriesStores.getSubcategory && 
            categoriesStores.getCategory && category" 
            v-model:opened="panelCat">

            <VListItem class="px-2">
              <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                {{ category.title }}
              </VListItemTitle>
            </VListItem>

            <div v-for="(j, jIndex) in categories.filter(item =>item.slug === categoriesStores.getCategory)[0].children" :key="jIndex">
                <VListItem v-if="j.grandchildren.length === 0">
                  <NuxtLink
                    :to="buildPrettyPath(categoriesStores.getCategory, j.slug.split('/')[1])"
                    @click="handleCategoryClick(categoriesStores.getCategory, j.slug.split('/')[1])"
                    class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ j.name }}
                  </NuxtLink> 
                </VListItem>
                <VListGroup v-else :value="j.name">
                  <template #activator="{ props }">
                    <VListItem>
                      <NuxtLink
                        :to="buildPrettyPath(categoriesStores.getCategory, j.slug.split('/')[1])"
                        @click="handleCategoryClick(categoriesStores.getCategory, j.slug.split('/')[1])"
                        class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                        <VListItemTitle> {{ j.name }} </VListItemTitle>
                      </NuxtLink>
                      <template #append>
                        <VIcon
                          v-bind="props"
                          :icon="openedGroups.includes(jIndex)
                          ? 'mdi-chevron-up'
                          : 'mdi-chevron-down'"
                          @click="toggleGroupFn(jIndex, j.name)"
                        />
                      </template>
                    </VListItem>
                  </template>
                  <div v-for="k in j.grandchildren" :key="k">
                    <VListItem>
                      <NuxtLink
                        :to="buildPrettyPath(categoriesStores.getCategory, k.slug.split('/')[2], j.slug.split('/')[1])"
                        @click="handleCategoryClick(categoriesStores.getCategory, k.slug.split('/')[2], j.slug.split('/')[1])"
                        class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                        {{ k.name }}
                      </NuxtLink> 
                    </VListItem>
                  </div>
                </VListGroup>
            </div>
          </VList>

      </VCard>

      <VCard class="px-0 transparent no-shadown">
          <VDivider class="mb-6 mt-6"/>

          <VCardItem class="px-2 p-0 text-left mb-7 mt-2"> PRECIO </VCardItem>
          <VCardText class="text-left align-left px-4 pb-0 mt-4">
            <VRow class="align-center container-vslider">
              <VCol cols="12">
                <VRangeSlider
                  v-model="rangPrice"
                  :max="50000"
                  step="10"
                  thumb-label="always"
                  color="primary"
                  @end="priceAction"
                />
              </VCol>
            </VRow>
            <VCardItem class="p-0 text-left">
              ${{ formatNumber(rangPrice[0]) }} - ${{ formatNumber(rangPrice[1]) }}
            </VCardItem>
          </VCardText>
         
          <VDivider class="mb-6 mt-6"/>

          <VCardItem class="px-2 p-0 text-left mt-2"> REVIEW </VCardItem>
          <VCardText class="px-2 p-0 text-left mb-6">
            <VRating
              half-increments
              :length="5"
              :size="40"
              v-model="rating"
              hover
              color="yellow-darken-2"
              active-color="yellow-darken-2"
              @update:modelValue="reviewAction"
              :ripple="false"
              density="compact"
              />
          </VCardText>
      </VCard>
  </VNavigationDrawer>
</template>

<style scoped>

  .v-rating::v-deep(.v-icon--size-default) {
      font-size: 35px;
  }

  .v-range-slider::v-deep(.v-input__details) {
      padding-top: 0 !important;
      min-height: 0 !important;
      height: 0 !important;
  }

  .v-btn-group::v-deep(.v-btn--size-default) {
      padding: 0 !important;
      min-width: 32px !important;
  }

  .v-btn-toggle::v-deep(.v-btn.v-btn--active:not(.v-btn--disabled) > .v-btn__overlay) {
      opacity: 0 !important;
  }

  .color-chip {
      border: 2px solid #F3FCFE;
  }

  .color-selected {
      border: 2px solid #E2F8FC;
      box-shadow: 0 0 0 2px #0A1B33;
  }

  .v-list {
      background-color: #e2f8fc;
  }

  .v-list::v-deep(.v-list-item:hover > .v-list-item__overlay) {
      opacity: 0 !important;
  }

  .v-list::v-deep(.v-list-item__overlay) {
      background-color: #e2f8fc;
  }

  .v-list-group__items .v-list-item {
      padding-inline-start: calc(5px + var(--indent-padding)) !important;
  }

  .v-list::v-deep(.v-list-item-title) {
      font-size: 12px !important;
  }

  .v-list-item--density-default.v-list-item--one-line {
      min-height: 30px !important;
  }

  .v-list::v-deep(.v-list-item__content) {
      font-size: 12px !important;
  }

  .v-list::v-deep(.v-list-item--active) {
      background-color: #F3FCFE !important;
  }

  .text-allcategories {
      font-size: 12px;
  }

  .transparent {
      background: transparent !important;
  }

  .v-navigation-drawer {
      position: fixed !important;
  }

  .v-navigation-drawer::v-deep(.v-navigation-drawer__content) {
      padding: 10px 10px 0 10px;
  }

  .v-navigation-drawer::v-deep(.v-expansion-panel-text__wrapper) {
      padding: 10px;
  }
</style>